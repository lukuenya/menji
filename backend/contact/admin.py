from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['ip_address', 'user_agent', 'created_at', 'updated_at']
    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'phone', 'subject', 'message')
        }),
        ('Status', {
            'fields': ('status', 'admin_notes')
        }),
        ('System Information', {
            'fields': ('ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
