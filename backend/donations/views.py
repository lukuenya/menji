import stripe
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DonationCause, Donation
from .serializers import (
    DonationCauseSerializer,
    DonationSerializer,
    DonationCreateSerializer
)

stripe.api_key = settings.STRIPE_SECRET_KEY

class DonationCauseViewSet(viewsets.ModelViewSet):
    queryset = DonationCause.objects.all()
    serializer_class = DonationCauseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = DonationCause.objects.all()
        if self.action == 'list':
            # Only show active causes in the list view
            queryset = queryset.filter(is_active=True)
        return queryset

    @action(detail=True, methods=['get'])
    def donations(self, request, pk=None):
        """Get all donations for a specific cause"""
        cause = self.get_object()
        donations = cause.donations.exclude(
            status='failed'
        ).filter(
            is_anonymous=False
        ).order_by('-created_at')
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data)

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return DonationCreateSerializer
        return DonationSerializer

    @action(detail=False, methods=['post'])
    def create_payment_intent(self, request):
        """Create a Stripe PaymentIntent"""
        try:
            data = request.data
            amount = int(float(data['amount']) * 100)  # Convert to cents
            currency = data['currency'].lower()

            # Create or retrieve Stripe customer
            customer = stripe.Customer.create(
                email=data['donor_email'],
                name=data['donor_name']
            )

            # Create PaymentIntent
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                customer=customer.id,
                metadata={
                    'cause_id': data['cause'],
                    'donor_name': data['donor_name'],
                    'donor_email': data['donor_email'],
                    'is_anonymous': data.get('is_anonymous', False)
                }
            )

            return Response({
                'clientSecret': intent.client_secret,
                'paymentIntentId': intent.id
            })

        except stripe.error.StripeError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def confirm_payment(self, request):
        """Confirm a successful payment and update donation status"""
        payment_intent_id = request.data.get('paymentIntentId')
        
        try:
            # Retrieve the PaymentIntent
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            
            if intent.status == 'succeeded':
                # Create donation record
                donation = Donation.objects.create(
                    cause_id=intent.metadata['cause_id'],
                    amount=intent.amount / 100,  # Convert from cents
                    currency=intent.currency.upper(),
                    donor_name=intent.metadata['donor_name'],
                    donor_email=intent.metadata['donor_email'],
                    is_anonymous=intent.metadata['is_anonymous'] == 'true',
                    status='completed',
                    stripe_payment_intent_id=payment_intent_id,
                    stripe_customer_id=intent.customer
                )
                
                serializer = DonationSerializer(donation)
                return Response(serializer.data)
            
            return Response(
                {'error': 'Payment not succeeded'},
                status=status.HTTP_400_BAD_REQUEST
            )

        except stripe.error.StripeError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def webhook(self, request):
        """Handle Stripe webhooks"""
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )

            # Handle specific events
            if event.type == 'payment_intent.succeeded':
                payment_intent = event.data.object
                # Update donation status if needed
                Donation.objects.filter(
                    stripe_payment_intent_id=payment_intent.id
                ).update(status='completed')

            elif event.type == 'payment_intent.payment_failed':
                payment_intent = event.data.object
                # Update donation status
                Donation.objects.filter(
                    stripe_payment_intent_id=payment_intent.id
                ).update(status='failed')

            return Response({'status': 'success'})

        except (ValueError, stripe.error.SignatureVerificationError) as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
