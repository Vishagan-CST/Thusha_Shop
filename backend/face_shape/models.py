from django.db import models

# Create your models here.
from django.db import models

class FaceShapeResult(models.Model):
    image = models.ImageField(upload_to='uploads/')
    face_shape = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)

    
# contact/models.py
from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"
