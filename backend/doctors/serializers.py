from rest_framework import serializers
from .models import DoctorProfile

class DoctorProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'name', 'email',  # from User model
            'specialization',
            'experience_years',
            'qualifications',
            'biography',
            'availability',  # new field
        ]

    def get_name(self, obj):
        return obj.user.name
