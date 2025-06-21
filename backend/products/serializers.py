from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FrameType ,Category, Accessory, Product 
from django.conf import settings
from django.core.files.storage import default_storage
import os

User = get_user_model()

class FrameTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrameType
        fields = ['id', 'name', 'description' ,'created_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description' ,'created_at']        