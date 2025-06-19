import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

interface Prescription {
  id: string;
  patient_name: string;
  date?: string;
  date_issued?: string;
  doctor_name?: string;
  right_sphere?: string;
  right_cylinder?: string;
  right_axis?: string;
  left_sphere?: string;
  left_cylinder?: string;
  left_axis?: string;
  pupillary_distance?: number | string;
  details?: string;
}

interface Appointment {
  id: string;
  patient_name: string;
  date: string;
  time: string;
  patient_email: string;
  reason: string;
  type: string;
  status: string;
}

interface DoctorProfile {
  experience_years?: number | string;
  specialization?: string[] | string;
  qualifications?: string;
}

interface DoctorOverviewProps {
  appointments: Appointment[];
  prescriptions: Prescription[];
  doctorProfile: DoctorProfile;
  onViewAppointment: (id: string) => void;
  selectedAppointment: Appointment | null;
  showAppointmentDialog: boolean;
  setShowAppointmentDialog: (open: boolean) => void;
}

const DoctorOverview = ({
  appointments,
  prescriptions,
  doctorProfile,
  onViewAppointment,
  selectedAppointment,
  showAppointmentDialog,
  setShowAppointmentDialog,
}: DoctorOverviewProps) => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false);

  const handleViewPrescriptionDetails = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setPrescriptionDialogOpen(true);
  };

  // Map "confirmed" to "Scheduled"
  const getDisplayStatus = (status: string) =>
    status.toLowerCase() === 'confirmed' ? 'Scheduled' : status.charAt(0).toUpperCase() + status.slice(1);

  
const getStatusColor = (status: string) => {
  const lower = status.toLowerCase();
  if (lower === 'confirmed') return 'text-blue-600 font-semibold';
  if (lower === 'completed') return 'text-green-600 font-semibold';
  if (lower === 'cancelled') return 'text-red-600 font-semibold';
  return 'text-gray-600';
};

  return (
    <>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-sm text-muted-foreground">All scheduled appointments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prescriptions Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptions.length}</div>
            <p className="text-sm text-muted-foreground">Total prescriptions created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctorProfile.experience_years ?? '-'}</div>
            <p className="text-sm text-muted-foreground">Years in practice</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specializations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.isArray(doctorProfile.specialization)
                ? doctorProfile.specialization.join(', ')
                : typeof doctorProfile.specialization === 'string' && doctorProfile.specialization.trim() !== ''
                ? doctorProfile.specialization
                : 'None'}
            </div>
            <p className="text-sm text-muted-foreground">Specialization Areas</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No appointments scheduled</p>
            ) : (
              <ul className="list-none space-y-4">
                {appointments.slice(0, 3).map((appointment) => (
                  <li key={appointment.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{appointment.patient_name}</h3>
                        <p className="text-muted-foreground">
                          {appointment.date} at {appointment.time}
                        </p>
                        <p className={`text-sm ${getStatusColor(appointment.status)}`}>
                          Status: {getDisplayStatus(appointment.status)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => onViewAppointment(appointment.id)}>
                        View Details
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            {prescriptions.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No prescriptions issued</p>
            ) : (
              <ul className="list-none space-y-4">
                {prescriptions.slice(0, 3).map((prescription) => (
                  <li key={prescription.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{prescription.patient_name}</h3>
                        <p className="text-muted-foreground">
                          Issued on{' '}
                          {prescription.date_issued
                            ? new Date(prescription.date_issued).toISOString().split('T')[0]
                            : prescription.date
                            ? new Date(prescription.date).toISOString().split('T')[0]
                            : '-'}
                        </p>
                        <p className="text-sm text-muted-foreground">ID: {prescription.id}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPrescriptionDetails(prescription)}
                      >
                        View Details
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Prescription Details Dialog */}
      <Dialog open={prescriptionDialogOpen} onOpenChange={setPrescriptionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
          </DialogHeader>
          {selectedPrescription && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Prescription ID</h3>
                  <p>{selectedPrescription.id}</p>
                </div>
                <div>
                  <h3 className="font-medium">Patient Name</h3>
                  <p>{selectedPrescription.patient_name}</p>
                </div>
                <div>
                  <h3 className="font-medium">Date Issued</h3>
                  <p>
                    {selectedPrescription.date_issued
                      ? new Date(selectedPrescription.date_issued).toISOString().split('T')[0]
                      : selectedPrescription.date
                      ? new Date(selectedPrescription.date).toISOString().split('T')[0]
                      : '-'}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Doctor</h3>
                  <p>{selectedPrescription.doctor_name ?? '-'}</p>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="font-medium mb-4 text-primary">Prescription Values</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Right Eye (OD)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sphere (SPH):</span>
                        <span className="font-medium">{selectedPrescription.right_sphere ?? '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cylinder (CYL):</span>
                        <span className="font-medium">{selectedPrescription.right_cylinder ?? '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Axis:</span>
                        <span className="font-medium">{selectedPrescription.right_axis ?? '-'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Left Eye (OS)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sphere (SPH):</span>
                        <span className="font-medium">{selectedPrescription.left_sphere ?? '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cylinder (CYL):</span>
                        <span className="font-medium">{selectedPrescription.left_cylinder ?? '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Axis:</span>
                        <span className="font-medium">{selectedPrescription.left_axis ?? '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pupillary Distance (PD):</span>
                    <span className="font-medium">{selectedPrescription.pupillary_distance ?? '-'}mm</span>
                  </div>
                </div>
              </div>

              {selectedPrescription.details && (
                <div className="bg-muted/50 p-3 rounded-md">
                  <h4 className="font-medium mb-2">Additional Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedPrescription.details}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Appointment Details Dialog */}
      <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-center bg-yellow-200 rounded-xl px-4 py-2">
              Appointment Details
            </DialogTitle>

            {selectedAppointment ? (
              <div className="space-y-2 mt-4">
                <p><strong>Appointment ID:</strong> {selectedAppointment.id}</p>
                <p><strong>Patient Name:</strong> {selectedAppointment.patient_name}</p>
                <p><strong>Patient Email:</strong> {selectedAppointment.patient_email}</p>
                <p><strong>Date:</strong> {selectedAppointment.date}</p>
                <p><strong>Time:</strong> {selectedAppointment.time}</p>
               <p>
  <strong>Status:</strong>{' '}
  <span className={getStatusColor(selectedAppointment.status)}>
    {getDisplayStatus(selectedAppointment.status)}
  </span>
</p>

                <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
              </div>
            ) : (
              <p>No appointment selected.</p>
            )}

            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="mt-4">
                Close
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorOverview;
