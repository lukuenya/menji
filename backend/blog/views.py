from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, BlogPost, Comment
from .serializers import (
    CategorySerializer,
    BlogPostListSerializer,
    BlogPostDetailSerializer,
    BlogPostCreateUpdateSerializer,
    CommentSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['title', 'content', 'summary']
    ordering_fields = ['created_at', 'published_at', 'view_count']
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = BlogPost.objects.all()
        if self.action == 'list':
            # For list view, only show published posts to non-staff users
            if not self.request.user.is_staff:
                queryset = queryset.filter(status='published')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return BlogPostCreateUpdateSerializer
        return BlogPostDetailSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.view_count += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured blog posts (most viewed published posts)"""
        posts = self.get_queryset().filter(
            status='published'
        ).order_by('-view_count')[:5]
        serializer = BlogPostListSerializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent blog posts"""
        posts = self.get_queryset().filter(
            status='published'
        ).order_by('-published_at')[:5]
        serializer = BlogPostListSerializer(posts, many=True)
        return Response(serializer.data)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['post', 'is_approved']

    def get_queryset(self):
        return Comment.objects.filter(is_approved=True)

    def perform_create(self, serializer):
        post_slug = self.kwargs.get('post_slug')
        post = BlogPost.objects.get(slug=post_slug)
        serializer.save(post=post)

    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Get pending comments (admin only)"""
        if not request.user.is_staff:
            return Response(status=403)
        comments = Comment.objects.filter(is_approved=False)
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)
