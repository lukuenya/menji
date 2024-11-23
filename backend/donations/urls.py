from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'causes', views.DonationCauseViewSet)
router.register(r'donations', views.DonationViewSet)

app_name = 'donations'

urlpatterns = [
    path('', include(router.urls)),
    path('webhook/', views.DonationViewSet.as_view({'post': 'webhook'}), name='stripe-webhook'),
]
