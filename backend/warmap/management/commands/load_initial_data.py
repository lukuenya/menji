from django.core.management.base import BaseCommand
from django.contrib.gis.geos import MultiPolygon, Polygon, Point
from warmap.models import Area, Location
from django.utils import timezone

class Command(BaseCommand):
    help = 'Load initial warmap data'

    def create_territory(self, name, center_lat, center_lon, status, population, description):
        """Helper function to create a territory with its center point"""
        offset = 0.2  # roughly 20km at the equator
        
        # Create a polygon around the center point
        polygon_coords = [[
            (center_lon - offset, center_lat - offset),  # bottom left
            (center_lon + offset, center_lat - offset),  # bottom right
            (center_lon + offset, center_lat + offset),  # top right
            (center_lon - offset, center_lat + offset),  # top left
            (center_lon - offset, center_lat - offset),  # close the polygon
        ]]
        
        # Create the polygon object
        polygon = Polygon(*polygon_coords)
        multi_polygon = MultiPolygon(polygon)
        
        # Delete any existing areas with the same name to avoid duplicates
        Area.objects.filter(name=name).delete()
        
        # Create the Area object
        area = Area.objects.create(
            name=name,
            description=description,
            polygon=multi_polygon,
            status=status,
            date=timezone.now().date(),
            population=population,
            strategic_value=3,  # High strategic value for all these territories
        )
        
        # Create a location for the center point
        Location.objects.filter(name=f'{name} Center').delete()
        location = Location.objects.create(
            name=f'{name} Center',
            description=f'Central reference point in {name} territory',
            point=Point(center_lon, center_lat)
        )
        
        return area, location

    def handle(self, *args, **kwargs):
        # Territory definitions
        territories = [
            {
                'name': 'Rutshuru',
                'center': (-1.187265, 29.446004),
                'status': 'occupied',
                'population': 500000,
                'description': 'Territory under occupation in Nord-Kivu region, including Rutshuru town'
            },
            {
                'name': 'Masisi',
                'center': (-1.4001, 29.0468),
                'status': 'occupied',
                'population': 450000,
                'description': 'Masisi territory, strategic location with significant mineral resources'
            },
            {
                'name': 'Nyiragongo',
                'center': (-1.5207, 29.2494),
                'status': 'contested',
                'population': 150000,
                'description': 'Territory including the active Nyiragongo volcano, strategic due to proximity to Goma'
            }
        ]

        # Create all territories
        for territory in territories:
            area, location = self.create_territory(
                name=territory['name'],
                center_lat=territory['center'][0],
                center_lon=territory['center'][1],
                status=territory['status'],
                population=territory['population'],
                description=territory['description']
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created {territory["status"]} area "{area.name}" and location "{location.name}"'
                )
            )
