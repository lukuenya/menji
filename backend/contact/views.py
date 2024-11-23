from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Contact
from .serializers import ContactSerializer, ContactAdminSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return ContactAdminSerializer
        return ContactSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save contact with IP and user agent
        contact = serializer.save(
            ip_address=self.get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        # Send email notification to admin
        self.send_notification_email(contact)
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
    
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
    
    def send_notification_email(self, contact):
        subject = f'New Contact Form Submission: {contact.subject}'
        message = f"""
        New contact form submission received:
        
        Name: {contact.name}
        Email: {contact.email}
        Phone: {contact.phone}
        Subject: {contact.subject}
        Message: {contact.message}
        
        IP Address: {contact.ip_address}
        Submitted on: {contact.created_at}
        """
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            # Log the error but don't prevent form submission
            print(f"Error sending notification email: {str(e)}")
