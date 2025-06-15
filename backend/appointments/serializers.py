from rest_framework import serializers
from doctors.serializers import DoctorProfileSerializer
from .models import Appointment
from django.utils import timezone
from datetime import timedelta

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.user.name', read_only=True)
    doctor_specialization = serializers.CharField(source='doctor.specialization', read_only=True)
    doctor_details = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'doctor', 'doctor_name', 'doctor_specialization', 'doctor_details',
            'date', 'time', 'reason', 'phone', 'status', 'created_at'
        ]
        extra_kwargs = {
            'doctor': {'write_only': True},
            'status': {'read_only': True},
        }

    def get_doctor_details(self, obj):
        """Custom method to serialize doctor details"""
        return {
            'id': obj.doctor.id,
            'name': obj.doctor.user.name,
            'email': obj.doctor.user.email,
            'specialization': obj.doctor.specialization,
            'experience': obj.doctor.experience_years,
            'qualifications': obj.doctor.qualifications,
            'availability': obj.doctor.availability
        }
    
    def validate(self, data):
        """Validate appointment data"""
        # Clean time format if provided
        if 'time' in data:
            data['time'] = data['time'].replace(' AM', '').replace(' PM', '').strip()

        # Validate date is not in the past
        if 'date' in data and data['date'] < timezone.now().date():
            raise serializers.ValidationError("Appointment date cannot be in the past.")

        # Check for existing appointments
        if all(key in data for key in ['doctor', 'date', 'time']):
            conflicting_appointments = Appointment.objects.filter(
                doctor=data['doctor'],
                date=data['date'],
                time=data['time'],
                status__in=['confirmed', 'pending']
            )
            if self.instance:  # If updating an existing appointment
                conflicting_appointments = conflicting_appointments.exclude(pk=self.instance.pk)
            if conflicting_appointments.exists():
                raise serializers.ValidationError("This time slot is already booked.")

        return data