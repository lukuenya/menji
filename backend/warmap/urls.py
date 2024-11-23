from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'locations', views.LocationViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'areas', views.AreaViewSet)
router.register(r'movements', views.MovementViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
