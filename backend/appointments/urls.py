from django.urls import path
from .views import DoctorListView,AvailableDoctorsView, AvailableSlotsView, AppointmentCreateView,AppointmentDetailView,AppointmentListView

urlpatterns = [
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('doctors/<int:doctor_id>/slots/', AvailableSlotsView.as_view(), name='available-slots'),
    path('appointments/', AppointmentCreateView.as_view(), name='appointment-create'),
    path('doctors/available/', AvailableDoctorsView.as_view(), name='available-doctors'),
    path('', AppointmentListView.as_view(), name='appointment-list'),
    path('<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
]