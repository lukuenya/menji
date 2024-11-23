from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserSerializer,
    UserRegistrationSerializer,
    ChangePasswordSerializer,
    ResetPasswordSerializer,
    ResetPasswordConfirmSerializer
)

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'reset_password', 'reset_password_confirm']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserRegistrationSerializer
        elif self.action == 'change_password':
            return ChangePasswordSerializer
        elif self.action == 'reset_password':
            return ResetPasswordSerializer
        elif self.action == 'reset_password_confirm':
            return ResetPasswordConfirmSerializer
        return UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate verification token and send email
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        verification_url = f"{settings.FRONTEND_URL}/verify-email/{uid}/{token}/"
        
        context = {
            'user': user,
            'verification_url': verification_url
        }
        
        html_message = render_to_string('accounts/email_verification.html', context)
        plain_message = render_to_string('accounts/email_verification.txt', context)
        
        try:
            send_mail(
                'Verify your email address',
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                html_message=html_message,
                fail_silently=False
            )
        except Exception as e:
            # Log the error but don't prevent registration
            print(f"Error sending verification email: {str(e)}")
        
        # Generate tokens for automatic login
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Verification email has been sent.'
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def verify_email(self, request):
        try:
            uid = force_str(urlsafe_base64_decode(request.data.get('uid', '')))
            user = User.objects.get(pk=uid)
            token = request.data.get('token', '')
            
            if default_token_generator.check_token(user, token):
                user.email_verified = True
                user.save()
                return Response(
                    {'message': 'Email successfully verified.'},
                    status=status.HTTP_200_OK
                )
            return Response(
                {'error': 'Invalid verification token.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {'error': 'Invalid verification link.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def change_password(self, request):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Check old password
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'error': 'Wrong password.'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Set new password
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        return Response(
            {'message': 'Password successfully changed.'},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['post'])
    def reset_password(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"
            
            context = {
                'user': user,
                'reset_url': reset_url
            }
            
            html_message = render_to_string('accounts/password_reset.html', context)
            plain_message = render_to_string('accounts/password_reset.txt', context)
            
            send_mail(
                'Reset your password',
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                html_message=html_message,
                fail_silently=False
            )
            
            return Response(
                {'message': 'Password reset email has been sent.'},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {'message': 'Password reset email has been sent.'},
                status=status.HTTP_200_OK
            )

    @action(detail=False, methods=['post'])
    def reset_password_confirm(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            uid = force_str(urlsafe_base64_decode(request.data.get('uid', '')))
            user = User.objects.get(pk=uid)
            token = serializer.validated_data['token']
            
            if default_token_generator.check_token(user, token):
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                return Response(
                    {'message': 'Password has been reset.'},
                    status=status.HTTP_200_OK
                )
            return Response(
                {'error': 'Invalid reset token.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {'error': 'Invalid reset link.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def perform_update(self, serializer):
        serializer.save()
        
    def get_object(self):
        pk = self.kwargs.get('pk')
        if pk == "me":
            return self.request.user
        return super().get_object()
