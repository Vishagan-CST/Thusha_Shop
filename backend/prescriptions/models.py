# Create your models here.
from django.db import models
from django.utils import timezone
from core.models import User

class Prescription(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
    ]

    prescription_id = models.CharField(max_length=10, unique=True, editable=False)

    doctor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='issued_prescriptions',
        limit_choices_to={'role': 'doctor'}
    )

    patient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_prescriptions',
        limit_choices_to={'role': 'customer'}
    )

    patient_name = models.CharField(max_length=255, null=True, blank=True)

    right_sphere = models.FloatField(default=0.0)
    right_cylinder = models.FloatField(default=0.0)
    right_axis = models.IntegerField(default=0)
    left_sphere = models.FloatField(default=0.0)
    left_cylinder = models.FloatField(default=0.0)
    left_axis = models.IntegerField(default=0)

    pupillary_distance = models.IntegerField()
    additional_notes = models.TextField(blank=True, null=True)

    date_issued = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField(blank=True, null=True)

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')

    def save(self, *args, **kwargs):
        if not self.prescription_id:
            last = Prescription.objects.order_by('-id').first()
            next_id = (int(last.prescription_id.split("-")[1]) + 1) if last else 1
            self.prescription_id = f"PC-{next_id:03d}"

        if not self.expiry_date:
            self.expiry_date = timezone.now() + timezone.timedelta(days=365)

        if not self.patient_name and self.patient:
            self.patient_name = self.patient.name

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.prescription_id} - {self.patient_name}"
