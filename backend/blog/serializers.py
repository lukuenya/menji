from rest_framework import serializers
from .models import Category, BlogPost, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']
        read_only_fields = ['slug']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author_name', 'author_email', 'content', 'created_at', 'is_approved']
        read_only_fields = ['is_approved']

class BlogPostListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'author', 'category',
            'summary', 'featured_image', 'status',
            'created_at', 'published_at', 'view_count'
        ]
        read_only_fields = ['slug', 'view_count']

class BlogPostDetailSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'author', 'category',
            'content', 'summary', 'featured_image', 'status',
            'meta_description', 'meta_keywords',
            'created_at', 'updated_at', 'published_at',
            'view_count', 'comments'
        ]
        read_only_fields = ['slug', 'view_count']

    def create(self, validated_data):
        # Set the author to the current user
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)

class BlogPostCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'title', 'category', 'content', 'summary',
            'featured_image', 'status', 'meta_description',
            'meta_keywords'
        ]

    def create(self, validated_data):
        # Set the author to the current user
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
