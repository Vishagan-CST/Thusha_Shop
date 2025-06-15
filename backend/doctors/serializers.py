from rest_framework import serializers
from .models import DoctorProfile

class DoctorProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'name', 'email',  # from User model
            'id',
            'specialization',
            'experience_years',
            'qualifications',
            'biography',
            'availability',  # new field
        ]
        depth = 1  
    def get_name(self, obj):
        return obj.user.name 