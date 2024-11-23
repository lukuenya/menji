from rest_framework import serializers
from .models import DonationCause, Donation

class DonationCauseSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.FloatField(read_only=True)
    
    class Meta:
        model = DonationCause
        fields = [
            'id', 'title', 'description', 'target_amount',
            'current_amount', 'image', 'is_active', 'end_date',
            'progress_percentage', 'created_at'
        ]
        read_only_fields = ['current_amount']

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'id', 'cause', 'amount', 'currency', 'donor_name',
            'donor_email', 'message', 'is_anonymous', 'status',
            'created_at'
        ]
        read_only_fields = ['status']

    def validate_amount(self, value):
        """Validate minimum donation amount"""
        min_amount = 1
        if value < min_amount:
            raise serializers.ValidationError(
                f'Donation amount must be at least {min_amount} {self.initial_data.get("currency", "USD")}'
            )
        return value

class DonationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'cause', 'amount', 'currency', 'donor_name',
            'donor_email', 'message', 'is_anonymous'
        ]

    def validate_cause(self, value):
        """Validate that the cause is active"""
        if not value.is_active:
            raise serializers.ValidationError("This cause is no longer accepting donations")
        return value
