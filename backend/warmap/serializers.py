from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Location, Event, Area, Movement, AreaHistory

class LocationSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Location
        geo_field = 'point'
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    location_data = LocationSerializer(source='location', read_only=True)

    class Meta:
        model = Event
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_by'] = instance.created_by.username if instance.created_by else None
        return representation

class AreaHistorySerializer(GeoFeatureModelSerializer):
    class Meta:
        model = AreaHistory
        geo_field = "polygon"
        fields = ['id', 'name', 'status', 'date', 'population', 'strategic_value', 'recorded_at']

class AreaSerializer(GeoFeatureModelSerializer):
    history = AreaHistorySerializer(many=True, read_only=True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Area
        geo_field = "polygon"
        fields = ['id', 'name', 'description', 'polygon', 'status', 'date', 
                 'population', 'strategic_value', 'created_by', 'created_at', 
                 'updated_at', 'history']
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Ensure all properties are nested under 'properties' in each feature
        if 'features' in data:
            for feature in data['features']:
                feature['properties'] = {
                    'id': feature.get('id'),
                    'name': feature.get('name'),
                    'description': feature.get('description'),
                    'status': feature.get('status'),
                    'date': feature.get('date'),
                    'population': feature.get('population'),
                    'strategic_value': feature.get('strategic_value'),
                    'created_by': str(feature.get('created_by')),
                    'created_at': feature.get('created_at'),
                    'updated_at': feature.get('updated_at')
                }
                # Remove top-level properties that are now nested
                for key in list(feature.keys()):
                    if key not in ['type', 'geometry', 'properties']:
                        del feature[key]
        return data
        
    def validate(self, data):
        # Check if there's already an entry for this zone on this date
        if self.instance is None:  # Only for creation
            if Area.objects.filter(name=data['name'], date=data['date']).exists():
                raise serializers.ValidationError(
                    f"An entry for zone '{data['name']}' on date {data['date']} already exists."
                )
        return data

class MovementSerializer(GeoFeatureModelSerializer):
    start_location_data = LocationSerializer(source='start_location', read_only=True)
    end_location_data = LocationSerializer(source='end_location', read_only=True)

    class Meta:
        model = Movement
        geo_field = 'line'
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_by'] = instance.created_by.username if instance.created_by else None
        return representation
