from django.db import models
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _

class DonationCause(models.Model):
    """Model for different donation causes/campaigns"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    target_amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    current_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    image = models.ImageField(upload_to='causes/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def progress_percentage(self):
        if self.target_amount > 0:
            return (self.current_amount / self.target_amount) * 100
        return 0

class Donation(models.Model):
    """Model for individual donations"""
    CURRENCY_CHOICES = [
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('GBP', 'British Pound'),
    ]

    STATUS_CHOICES = [
        ('pending', _('Pending')),
        ('completed', _('Completed')),
        ('failed', _('Failed')),
        ('refunded', _('Refunded')),
    ]

    cause = models.ForeignKey(
        DonationCause,
        on_delete=models.SET_NULL,
        null=True,
        related_name='donations'
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(1)]
    )
    currency = models.CharField(
        max_length=3,
        choices=CURRENCY_CHOICES,
        default='USD'
    )
    donor_name = models.CharField(max_length=200)
    donor_email = models.EmailField()
    message = models.TextField(blank=True)
    is_anonymous = models.BooleanField(default=False)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )
    stripe_payment_intent_id = models.CharField(max_length=100, blank=True)
    stripe_customer_id = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.donor_name} - {self.amount} {self.currency}"

    def save(self, *args, **kwargs):
        # Update cause's current amount if donation is completed
        if self.status == 'completed' and self.cause:
            self.cause.current_amount = models.F('current_amount') + self.amount
            self.cause.save()
        super().save(*args, **kwargs)
