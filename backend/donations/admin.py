from django.contrib import admin
from .models import DonationCause, Donation

@admin.register(DonationCause)
class DonationCauseAdmin(admin.ModelAdmin):
    list_display = ('title', 'target_amount', 'current_amount', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'description')
    readonly_fields = ('current_amount',)
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return self.readonly_fields + ('target_amount',)
        return self.readonly_fields

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donor_name', 'amount', 'currency', 'cause', 'status', 'created_at')
    list_filter = ('status', 'currency', 'created_at', 'is_anonymous')
    search_fields = ('donor_name', 'donor_email', 'message')
    readonly_fields = ('stripe_payment_intent_id', 'stripe_customer_id')
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return self.readonly_fields + ('amount', 'currency', 'cause')
        return self.readonly_fields
