from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(_('phone number'), max_length=15, blank=True)
    bio = models.TextField(_('biography'), blank=True)
    profile_picture = models.ImageField(
        _('profile picture'),
        upload_to='profile_pictures/',
        blank=True
    )
    email_verified = models.BooleanField(_('email verified'), default=False)
    
    # Additional fields for tracking
    date_modified = models.DateTimeField(_('date modified'), auto_now=True)
    last_login_ip = models.GenericIPAddressField(blank=True, null=True)
    failed_login_attempts = models.PositiveIntegerField(default=0)
    account_locked_until = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        
    def __str__(self):
        return self.email
