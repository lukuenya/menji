from django.shortcuts import render
from django.utils import timezone
from django.contrib.gis.geos import Point, Polygon, LineString
from django.contrib.gis.measure import D
from django.db.models import Q
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import Location, Event, Area, Movement
from .serializers import (
    LocationSerializer,
    EventSerializer,
    AreaSerializer,
    MovementSerializer
)

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name']
    search_fields = ['name', 'description']

    @action(detail=False, methods=['get'])
    def nearby(self, request):
        """Get locations within a specified radius of a point."""
        try:
            lat = float(request.query_params.get('lat', 0))
            lng = float(request.query_params.get('lng', 0))
            radius = float(request.query_params.get('radius', 10))  # in kilometers
            
            point = Point(lng, lat, srid=4326)
            locations = Location.objects.filter(
                point__distance_lte=(point, D(km=radius))
            )
            
            serializer = self.get_serializer(locations, many=True)
            return Response(serializer.data)
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid parameters'},
                status=status.HTTP_400_BAD_REQUEST
            )

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['event_type', 'severity', 'verified']
    search_fields = ['title', 'description']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent events within a specified time period."""
        days = int(request.query_params.get('days', 7))
        cutoff = timezone.now() - timezone.timedelta(days=days)
        
        events = self.get_queryset().filter(
            start_date__gte=cutoff
        ).order_by('-start_date')
        
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_location(self, request):
        """Get events within a specified area."""
        try:
            bounds = request.query_params.get('bounds', '').split(',')
            if len(bounds) != 4:
                raise ValueError
                
            min_lng, min_lat, max_lng, max_lat = map(float, bounds)
            bbox = Polygon.from_bbox((min_lng, min_lat, max_lng, max_lat))
            
            events = self.get_queryset().filter(
                location__point__contained=bbox
            )
            
            serializer = self.get_serializer(events, many=True)
            return Response(serializer.data)
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid bounds parameter'},
                status=status.HTTP_400_BAD_REQUEST
            )

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status', 'name']
    search_fields = ['name', 'description']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def current_status(self, request):
        """Get the current status of all zones."""
        date = request.query_params.get('date', timezone.now().date())
        if isinstance(date, str):
            try:
                date = timezone.datetime.strptime(date, '%Y-%m-%d').date()
            except ValueError:
                return Response(
                    {'error': 'Invalid date format. Use YYYY-MM-DD'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Get the latest status for each zone up to the specified date
        latest_areas = Area.objects.raw('''
            WITH RankedAreas AS (
                SELECT *,
                    ROW_NUMBER() OVER (
                        PARTITION BY name 
                        ORDER BY date DESC
                    ) as rn
                FROM warmap_area
                WHERE date <= %s
            )
            SELECT * FROM RankedAreas WHERE rn = 1
        ''', [date])

        serializer = self.get_serializer(latest_areas, many=True)
        # Format response as GeoJSON FeatureCollection
        return Response({
            "type": "FeatureCollection",
            "features": serializer.data["features"] if "features" in serializer.data else []
        })

    @action(detail=False, methods=['get'])
    def status_changes(self, request):
        """Get zones that changed status between two dates."""
        try:
            start_date = timezone.datetime.strptime(
                request.query_params.get('start_date'),
                '%Y-%m-%d'
            ).date()
            end_date = timezone.datetime.strptime(
                request.query_params.get('end_date'),
                '%Y-%m-%d'
            ).date()
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid date format. Use YYYY-MM-DD for both start_date and end_date'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Find zones that changed status between the dates
        changed_zones = Area.objects.raw('''
            WITH StartStatus AS (
                SELECT DISTINCT ON (name) *
                FROM warmap_area
                WHERE date <= %s
                ORDER BY name, date DESC
            ),
            EndStatus AS (
                SELECT DISTINCT ON (name) *
                FROM warmap_area
                WHERE date <= %s
                ORDER BY name, date DESC
            )
            SELECT e.* 
            FROM EndStatus e
            JOIN StartStatus s ON e.name = s.name
            WHERE e.status != s.status
        ''', [start_date, end_date])

        serializer = self.get_serializer(changed_zones, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def zone_history(self, request):
        """Get the complete history of a specific zone."""
        zone_name = request.query_params.get('name')
        if not zone_name:
            return Response(
                {'error': 'Zone name is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        history = Area.objects.filter(name=zone_name).order_by('date')
        serializer = self.get_serializer(history, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get statistics about zone control."""
        date = request.query_params.get('date', timezone.now().date())
        if isinstance(date, str):
            try:
                date = timezone.datetime.strptime(date, '%Y-%m-%d').date()
            except ValueError:
                return Response(
                    {'error': 'Invalid date format. Use YYYY-MM-DD'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Get latest status of all zones up to the specified date
        latest_areas = Area.objects.raw('''
            WITH RankedAreas AS (
                SELECT *,
                    ROW_NUMBER() OVER (
                        PARTITION BY name 
                        ORDER BY date DESC
                    ) as rn
                FROM warmap_area
                WHERE date <= %s
            )
            SELECT * FROM RankedAreas WHERE rn = 1
        ''', [date])

        # Calculate statistics
        stats = {
            'total_zones': len(list(latest_areas)),
            'status_counts': {},
            'total_population': 0,
            'population_by_status': {},
            'strategic_value_by_status': {}
        }

        for area in latest_areas:
            # Count zones by status
            stats['status_counts'][area.status] = stats['status_counts'].get(area.status, 0) + 1
            
            # Sum population by status
            if area.population:
                stats['total_population'] += area.population
                stats['population_by_status'][area.status] = (
                    stats['population_by_status'].get(area.status, 0) + area.population
                )
            
            # Sum strategic value by status
            stats['strategic_value_by_status'][area.status] = (
                stats['strategic_value_by_status'].get(area.status, 0) + area.strategic_value
            )

        return Response(stats)

class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['movement_type']
    search_fields = ['name', 'description']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get currently active movements."""
        now = timezone.now()
        movements = self.get_queryset().filter(
            Q(end_date__isnull=True) |
            Q(start_date__lte=now, end_date__gte=now)
        )
        serializer = self.get_serializer(movements, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_period(self, request):
        """Get movements within a specific time period."""
        try:
            start_str = request.query_params.get('start')
            end_str = request.query_params.get('end')
            
            start_date = timezone.datetime.strptime(start_str, '%Y-%m-%d')
            end_date = timezone.datetime.strptime(end_str, '%Y-%m-%d')
            
            movements = self.get_queryset().filter(
                Q(start_date__range=(start_date, end_date)) |
                Q(end_date__range=(start_date, end_date)) |
                Q(start_date__lte=start_date, end_date__gte=end_date)
            )
            
            serializer = self.get_serializer(movements, many=True)
            return Response(serializer.data)
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid date parameters (use YYYY-MM-DD)'},
                status=status.HTTP_400_BAD_REQUEST
            )
