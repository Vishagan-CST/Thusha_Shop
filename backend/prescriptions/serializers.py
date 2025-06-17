from rest_framework import serializers
from core.models import User
from .models import Prescription
from django.utils import timezone

class PrescriptionSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    patient_name = serializers.CharField()
    patient_display_name = serializers.CharField(source='patient.name', read_only=True)

    class Meta:
        model = Prescription
        fields = [
            'id',
            'prescription_id',
            'doctor',
            'doctor_name',
            'patient',
            'patient_name',
            'patient_display_name',
            'right_sphere',
            'right_cylinder',
            'right_axis',
            'left_sphere',
            'left_cylinder',
            'left_axis',
            'pupillary_distance',
            'additional_notes',
            'date_issued',
            'expiry_date',
            'status',
        ]
        read_only_fields = [
            'prescription_id',
            'doctor',
            'doctor_name',
            'patient',
            'patient_display_name',
            'date_issued',
            'expiry_date',
            'status',
        ]

    def validate_patient_name(self, value):
        if not User.objects.filter(name=value, role='customer').exists():
            raise serializers.ValidationError("Patient with this name does not exist.")
        return value

    def create(self, validated_data):
        patient_name = validated_data['patient_name']
        patient_user = User.objects.get(name=patient_name, role='customer')

        # Expire previous active prescriptions for this patient
        Prescription.objects.filter(
            patient=patient_user,
            status='active',
            expiry_date__gt=timezone.now()
        ).update(status='expired', expiry_date=timezone.now())

        validated_data['patient'] = patient_user
        validated_data['status'] = 'active'

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'patient_name' in validated_data:
            patient_name = validated_data['patient_name']
            patient_user = User.objects.get(name=patient_name, role='customer')
            validated_data['patient'] = patient_user
        return super().update(instance, validated_data)
