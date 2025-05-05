from django.contrib import admin
from django.contrib.gis import admin as gis_admin
from .models import Location, Event, Area, AreaHistory, Movement
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point

@admin.register(Location)
class LocationAdmin(gis_admin.GISModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    default_lon = 29.2494  # Default longitude (around DRC)
    default_lat = -1.5207  # Default latitude (around DRC)
    default_zoom = 6

@admin.register(Event)
class EventAdmin(gis_admin.GISModelAdmin):
    list_display = ('title', 'event_type', 'severity', 'start_date', 'verified')
    list_filter = ('event_type', 'severity', 'verified')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    default_lon = 29.2494  # Default longitude (around DRC)
    default_lat = -1.5207  # Default latitude (around DRC)
    default_zoom = 6

@admin.register(Area)
class AreaAdmin(gis_admin.GISModelAdmin):
    list_display = ('name', 'status', 'date', 'population', 'strategic_value')
    list_filter = ('status', 'strategic_value', 'date')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'date'
    default_lon = 29.2494  # Default longitude (around DRC)
    default_lat = -1.5207  # Default latitude (around DRC)
    default_zoom = 6
    
    def save_model(self, request, obj, form, change):
        if not change:  # If this is a new object
            obj.created_by = request.user
        super().save_model(request, obj, form, change)

@admin.register(AreaHistory)
class AreaHistoryAdmin(gis_admin.GISModelAdmin):
    list_display = ('area', 'status', 'date', 'recorded_at')
    list_filter = ('status', 'date')
    search_fields = ('area__name',)
    readonly_fields = ('recorded_at',)
    date_hierarchy = 'date'
    default_lon = 29.2494  # Default longitude (around DRC)
    default_lat = -1.5207  # Default latitude (around DRC)
    default_zoom = 6

@admin.register(Movement)
class MovementAdmin(gis_admin.GISModelAdmin):
    list_display = ('name', 'movement_type', 'start_date', 'end_date', 'size')
    list_filter = ('movement_type', 'start_date')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'start_date'
    default_lon = 29.2494  # Default longitude (around DRC)
    default_lat = -1.5207  # Default latitude (around DRC)
    default_zoom = 6
