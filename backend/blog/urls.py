from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'posts', views.BlogPostViewSet)
router.register(r'comments', views.CommentViewSet)

app_name = 'blog'

urlpatterns = [
    path('', include(router.urls)),
]
