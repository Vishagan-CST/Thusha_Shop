from rest_framework import serializers
from core.models import User
from .models import Prescription
from django.utils import timezone

class PrescriptionSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    patient_name = serializers.CharField(source='patient.name', read_only=True)  # renamed from patient_display_name
    patient_email = serializers.EmailField(write_only=True)  # input only (write-only)
    patient_email_display = serializers.EmailField(source='patient.email', read_only=True)  # output only (read-only)

    class Meta:
        model = Prescription
        fields = [
            'id',
            'prescription_id',
            'doctor',
            'doctor_name',
            'patient',
            'patient_email',           # write-only input (email to lookup patient)
            'patient_email_display',   # read-only output (patient's actual email)
            'patient_name',            # read-only output (renamed for clarity)
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
            'patient_name',
            'patient_email_display',
            'date_issued',
            'expiry_date',
            'status',
        ]

    def validate_patient_email(self, value):
        if not User.objects.filter(email=value, role='customer').exists():
            raise serializers.ValidationError("Patient with this email does not exist.")
        return value

    def create(self, validated_data):
        patient_email = validated_data.pop('patient_email')
        patient_user = User.objects.get(email=patient_email, role='customer')

        # Expire previous active prescriptions for this patient
        Prescription.objects.filter(
            patient=patient_user,
            status='active',
            expiry_date__gt=timezone.now()
        ).update(status='expired', expiry_date=timezone.now())

        validated_data['patient'] = patient_user
        validated_data['status'] = 'active'

        if 'date_issued' not in validated_data:
            validated_data['date_issued'] = timezone.now()
        if 'expiry_date' not in validated_data:
            validated_data['expiry_date'] = timezone.now() + timezone.timedelta(days=365)

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'patient_email' in validated_data:
            patient_email = validated_data.pop('patient_email')
            patient_user = User.objects.get(email=patient_email, role='customer')
            validated_data['patient'] = patient_user
        return super().update(instance, validated_data)
