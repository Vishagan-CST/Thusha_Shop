from django.db import models
from core.models import User
from django.core.files.storage import FileSystemStorage
import os

class FrameType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    frame_type = models.ForeignKey(FrameType, on_delete=models.SET_NULL, null=True, blank=True)
    size = models.CharField(max_length=5)  # S / M / L
    weight = models.FloatField()
    stock = models.IntegerField()
    frame_material = models.CharField(max_length=100, blank=True)

    manufacturer = models.ForeignKey(
        User, on_delete=models.CASCADE, limit_choices_to={'role': 'manufacturer'}, null=True, blank=True
    )

    images = models.JSONField(default=list)
    face_shapes = models.JSONField(default=list, blank=True)
    vision_problems = models.JSONField(default=list, blank=True)
    features = models.JSONField(default=list, blank=True)
    colors = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name