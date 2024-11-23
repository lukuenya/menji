from django.contrib.gis.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.utils import timezone

class Location(models.Model):
    name = models.CharField(_('Name'), max_length=255)
    description = models.TextField(_('Description'), blank=True)
    point = models.PointField(_('Location'))
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Location')
        verbose_name_plural = _('Locations')

class Event(models.Model):
    EVENT_TYPES = [
        ('battle', _('Battle')),
        ('siege', _('Siege')),
        ('movement', _('Troop Movement')),
        ('supply', _('Supply Line')),
        ('other', _('Other')),
    ]

    SEVERITY_LEVELS = [
        ('low', _('Low')),
        ('medium', _('Medium')),
        ('high', _('High')),
        ('critical', _('Critical')),
    ]

    title = models.CharField(_('Title'), max_length=255)
    description = models.TextField(_('Description'))
    event_type = models.CharField(_('Event Type'), max_length=20, choices=EVENT_TYPES)
    severity = models.CharField(_('Severity'), max_length=20, choices=SEVERITY_LEVELS)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='events')
    start_date = models.DateTimeField(_('Start Date'))
    end_date = models.DateTimeField(_('End Date'), null=True, blank=True)
    casualties = models.IntegerField(_('Casualties'), default=0)
    source = models.URLField(_('Source URL'), blank=True)
    verified = models.BooleanField(_('Verified'), default=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_events'
    )
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Event')
        verbose_name_plural = _('Events')
        ordering = ['-start_date']

class Area(models.Model):
    ZONE_STATUS_CHOICES = [
        ('occupied', 'Occupied Territory'),
        ('liberated', 'Liberated Zone'),
        ('contested', 'Contested Area'),
        ('government', 'Under Government Control')
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    polygon = models.MultiPolygonField(srid=4326)
    status = models.CharField(max_length=20, choices=ZONE_STATUS_CHOICES)
    date = models.DateField(default=timezone.now)
    population = models.IntegerField(null=True, blank=True)
    strategic_value = models.IntegerField(
        choices=[(1, 'Low'), (2, 'Medium'), (3, 'High')],
        default=1
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_areas'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Areas'
        ordering = ['-date', 'name']
        # Ensure we don't have duplicate zone statuses for the same date
        unique_together = ['name', 'date']

    def __str__(self):
        return f"{self.name} - {self.status} ({self.date})"

    def save(self, *args, **kwargs):
        # Create a history entry before saving
        if self.pk:
            AreaHistory.objects.create(
                area=self,
                name=self.name,
                polygon=self.polygon,
                status=self.status,
                date=self.date,
                population=self.population,
                strategic_value=self.strategic_value
            )
        super().save(*args, **kwargs)

class AreaHistory(models.Model):
    """Keeps track of historical changes to areas"""
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='history')
    name = models.CharField(max_length=255)
    polygon = models.MultiPolygonField(srid=4326)
    status = models.CharField(max_length=20, choices=Area.ZONE_STATUS_CHOICES)
    date = models.DateField()
    population = models.IntegerField(null=True, blank=True)
    strategic_value = models.IntegerField(choices=[(1, 'Low'), (2, 'Medium'), (3, 'High')])
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-recorded_at']
        verbose_name_plural = 'Area histories'

    def __str__(self):
        return f"{self.name} - {self.status} ({self.date}) [History]"

class Movement(models.Model):
    MOVEMENT_TYPES = [
        ('troops', _('Troop Movement')),
        ('supplies', _('Supply Movement')),
        ('refugees', _('Refugee Movement')),
    ]

    name = models.CharField(_('Name'), max_length=255)
    description = models.TextField(_('Description'), blank=True)
    movement_type = models.CharField(_('Movement Type'), max_length=20, choices=MOVEMENT_TYPES)
    line = models.LineStringField(_('Movement Path'))
    start_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='movements_from'
    )
    end_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='movements_to'
    )
    start_date = models.DateTimeField(_('Start Date'))
    end_date = models.DateTimeField(_('End Date'), null=True, blank=True)
    size = models.IntegerField(_('Size/Number'), help_text=_('Number of troops/supplies/people'))
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_movements'
    )
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Movement')
        verbose_name_plural = _('Movements')
        ordering = ['-start_date']
