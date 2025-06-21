from django.shortcuts import render
from rest_framework import viewsets,parsers,status
from .models import FrameType,Category,Product,Accessory
from rest_framework.permissions import IsAuthenticated
from .serializers import FrameTypeSerializer,CategorySerializer, ProductSerializer,AccessorySerializer
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied


User = get_user_model()

class FrameTypeViewSet(viewsets.ModelViewSet):
    queryset = FrameType.objects.all().order_by('-created_at')
    serializer_class = FrameTypeSerializer
    filter_backends = [SearchFilter]

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    filter_backends = [SearchFilter]