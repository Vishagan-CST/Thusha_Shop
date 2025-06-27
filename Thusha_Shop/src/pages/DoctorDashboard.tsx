import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PasswordChangeForm from '@/components/account/PasswordChangeForm';
import DoctorOverview from '@/components/dashboard/DoctorOverview';
import DoctorAppointmentsTab from '@/components/dashboard/DoctorAppointmentsTab';
import DoctorPrescriptionsTab from '@/components/dashboard/DoctorPrescriptionsTab';
import DoctorProfileTab from '@/components/dashboard/DoctorProfileTab';
import PrescriptionForm from '@/components/dashboard/PrescriptionForm';
<<<<<<< HEAD

const API_BASE_URL = 'http://localhost:8000/api/doctors'; // Adjust as needed
=======
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const API_BASE_URL = 'http://localhost:8000/api/doctors';
const APPOINTMENTS_API_URL = 'http://localhost:8000/api/appointments/';
const PRESCRIPTIONS_API_URL = 'http://localhost:8000/api/prescriptions/';
>>>>>>> upstream/main

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const DoctorDashboard = () => {
  const { toast } = useToast();

<<<<<<< HEAD
  // ----- Demo States for Non-Profile Tabs -----
  const [appointments, setAppointments] = useState([
    { id: 'APT-001', patientName: 'Michael Brown', date: '2024-07-10', time: '11:00 AM', type: 'Check-up', status: 'scheduled' },
    { id: 'APT-002', patientName: 'Emma Wilson', date: '2024-07-11', time: '02:30 PM', type: 'Consultation', status: 'scheduled' },
    { id: 'APT-003', patientName: 'Daniel Lee', date: '2024-07-12', time: '09:00 AM', type: 'Follow-up', status: 'completed' }
  ]);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'RX-001',
      patientName: 'Michael Brown',
      date: '2024-07-05',
      details: 'Nearsightedness correction',
      rightEye: { sphere: -2.5, cylinder: -0.5, axis: 90 },
      leftEye: { sphere: -2.25, cylinder: -0.25, axis: 85 },
      pupillaryDistance: 64,
      doctorName: 'Dr. Smith',
      dateIssued: '2024-07-05',
      expiryDate: '2025-07-05',
    },
    {
      id: 'RX-002',
      patientName: 'Emma Wilson',
      date: '2024-07-06',
      details: 'Astigmatism management',
      rightEye: { sphere: -1.0, cylinder: -1.5, axis: 180 },
      leftEye: { sphere: -1.25, cylinder: -1.0, axis: 175 },
      pupillaryDistance: 62,
      doctorName: 'Dr. Smith',
      dateIssued: '2024-07-06',
      expiryDate: '2025-07-06',
    },
  ]);

  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
=======
  // Appointment state
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);
  const [confirmedPatients, setConfirmedPatients] = useState<string[]>([]);

  // For selected appointment detail modal
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);

  // Your existing state
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<any[]>([]);

  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    patientEmail: '',
>>>>>>> upstream/main
    details: '',
    rightEye: { sphere: 0, cylinder: 0, axis: 0 },
    leftEye: { sphere: 0, cylinder: 0, axis: 0 },
    pupillaryDistance: 64,
  });

<<<<<<< HEAD
  // ----- Profile API Integration (Don't Modify) -----
=======
  const [searchText, setSearchText] = useState('');
>>>>>>> upstream/main
  const [doctorProfile, setDoctorProfile] = useState<any>(null);
  const [profileForm, setProfileForm] = useState<any>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

<<<<<<< HEAD
=======
  // Fetch doctor profile and prescriptions on mount
>>>>>>> upstream/main
  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const res = await fetch(`${API_BASE_URL}/profile/`, {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setDoctorProfile(data);
        setProfileForm(data);
      } catch (error) {
        toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
      } finally {
        setLoadingProfile(false);
      }
    };
<<<<<<< HEAD
    fetchProfile();
  }, [toast]);

=======

    const fetchPrescriptions = async () => {
      try {
        const res = await fetch(PRESCRIPTIONS_API_URL, {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        });
        if (!res.ok) throw new Error('Failed to fetch prescriptions');
        const data = await res.json();
        setPrescriptions(data);
        setFilteredPrescriptions(data);
      } catch (error) {
        toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
      }
    };

    fetchProfile();
    fetchPrescriptions();
    fetchAppointments();

    const interval = setInterval(() => {
    fetchAppointments();
  }, 300000); 

  return () => clearInterval(interval);
  }, [toast]);

  // Fetch appointments from API
  const fetchAppointments = async () => {
    setAppointmentsLoading(true);
    setAppointmentsError(null);
    try {
      const res = await fetch(APPOINTMENTS_API_URL, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      setAppointments(data);
       
      const confirmedEmails = data
          .filter((appt: any) => appt.status === 'confirmed')
          .map((appt: any) => appt.patient_email);
        setConfirmedPatients(confirmedEmails);



    } catch (error) {
      setAppointmentsError((error as Error).message);
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // Filter prescriptions by search
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredPrescriptions(prescriptions);
    } else {
      const filtered = prescriptions.filter(prescription =>
        prescription.patient_email_display?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPrescriptions(filtered);
    }
  }, [searchText, prescriptions]);

  // Profile editing handlers
>>>>>>> upstream/main
  const onEditProfile = () => setEditingProfile(true);
  const onCancelEdit = () => {
    setEditingProfile(false);
    setProfileForm(doctorProfile);
  };
  const onProfileChange = (field: string, value: string) => {
    setProfileForm({ ...profileForm, [field]: value });
  };
<<<<<<< HEAD
  const onSaveProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(profileForm),
      });
      if (!res.ok) throw new Error('Failed to update profile');
=======

  const onSaveProfile = async () => {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    };

    if (!headers.Authorization) {
      toast({
        title: 'Authentication Error',
        description: 'No access token found. Please log in again.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/profile/`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(profileForm),
      });

      if (res.status === 401) throw new Error('Unauthorized. Please login again.');
      if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = errorData.detail || 'Failed to update profile.';
        throw new Error(errorMsg);
      }

>>>>>>> upstream/main
      const updated = await res.json();
      setDoctorProfile(updated);
      setProfileForm(updated);
      setEditingProfile(false);
<<<<<<< HEAD
      toast({ title: 'Success', description: 'Profile updated' });
=======

      const doctorName = updated?.user?.name || updated?.name || 'Doctor';

      setPrescriptions(prev =>
        prev.map(prescription => ({
          ...prescription,
          doctor_name: doctorName,
        }))
      );
      setFilteredPrescriptions(prev =>
        prev.map(prescription => ({
          ...prescription,
          doctor_name: doctorName,
        }))
      );

      toast({ title: 'Success', description: 'Profile updated successfully.' });
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  // Prescription handlers (same as your current ones)
  const fetchPrescriptions = async () => {
    try {
      const res = await fetch(PRESCRIPTIONS_API_URL, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
      if (!res.ok) throw new Error('Failed to fetch prescriptions');
      const data = await res.json();
      setPrescriptions(data);
      setFilteredPrescriptions(data);
>>>>>>> upstream/main
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };

<<<<<<< HEAD
  // ----- Handlers for Demo Tabs -----
  const handleViewAppointment = (id: string) => {
    toast({ title: 'View Appointment', description: `Viewing appointment ${id}` });
  };
  const handleUpdateAppointmentStatus = (id: string, status: string) => {
    setAppointments(appointments.map(appt => appt.id === id ? { ...appt, status } : appt));
    toast({ title: 'Appointment Updated', description: `Appointment ${id} marked ${status}` });
  };

  const handleCreatePrescription = () => setShowPrescriptionForm(true);
  const handleSavePrescription = () => {
    const newRx = {
      id: `RX-${Date.now()}`,
      ...newPrescription,
      doctorName: doctorProfile?.name || 'Unknown',
      date: new Date().toISOString().split('T')[0],
      dateIssued: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
    };
    setPrescriptions([...prescriptions, newRx]);
    setNewPrescription({
      patientName: '',
      details: '',
      rightEye: { sphere: 0, cylinder: 0, axis: 0 },
      leftEye: { sphere: 0, cylinder: 0, axis: 0 },
      pupillaryDistance: 64,
    });
    setShowPrescriptionForm(false);
    toast({ title: 'Prescription Created', description: `For ${newRx.patientName}` });
  };
  const handleCancelPrescription = () => setShowPrescriptionForm(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setNewPrescription({ ...newPrescription, [e.target.name]: e.target.value });
  const handleEyeValueChange = (eye: 'rightEye' | 'leftEye', field: string, value: number) =>
    setNewPrescription({ ...newPrescription, [eye]: { ...newPrescription[eye], [field]: value } });
  const handlePupillaryDistanceChange = (value: number) =>
    setNewPrescription({ ...newPrescription, pupillaryDistance: value });

=======
  const handleSavePrescription = async () => {
    const payload = {
      patient_email: newPrescription.patientEmail,
      right_sphere: newPrescription.rightEye.sphere,
      right_cylinder: newPrescription.rightEye.cylinder,
      right_axis: newPrescription.rightEye.axis,
      left_sphere: newPrescription.leftEye.sphere,
      left_cylinder: newPrescription.leftEye.cylinder,
      left_axis: newPrescription.leftEye.axis,
      pupillary_distance: newPrescription.pupillaryDistance,
      additional_notes: newPrescription.details,
    };

    try {
      const res = await fetch(PRESCRIPTIONS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = errorData.detail || JSON.stringify(errorData);
        throw new Error(errorMsg);
      }

      const createdRx = await res.json();
      await fetchPrescriptions();

      setNewPrescription({
        patientEmail: '',
        details: '',
        rightEye: { sphere: 0, cylinder: 0, axis: 0 },
        leftEye: { sphere: 0, cylinder: 0, axis: 0 },
        pupillaryDistance: 64,
      });

      setShowPrescriptionForm(false);
      toast({ title: 'Prescription Created', description: `For ${createdRx.patient_email_display || createdRx.patient_name}` });
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };

  const handleCancelPrescription = () => setShowPrescriptionForm(false);

  const handleSelectPatientEmail = (email: string) => {
  setNewPrescription((prev) => ({ ...prev, patientEmail: email })); 
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setNewPrescription({ ...newPrescription, [e.target.name]: e.target.value });

  const handleEyeValueChange = (eye: 'rightEye' | 'leftEye', field: string, value: number) =>
    setNewPrescription({ ...newPrescription, [eye]: { ...newPrescription[eye], [field]: value } });

  const handlePupillaryDistanceChange = (value: number) =>
    setNewPrescription({ ...newPrescription, pupillaryDistance: value });

  // Handle View Details clicked from DoctorAppointmentsTab
  const handleViewAppointmentDetails = (appointmentId: string) => {
    const appt = appointments.find(a => a.id === appointmentId);
    if (appt) {
      setSelectedAppointment(appt);
      setShowAppointmentDialog(true);
    } else {
      toast({ title: 'Error', description: 'Appointment not found', variant: 'destructive' });
    }
  };

  const handleUpdateAppointmentStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${APPOINTMENTS_API_URL}${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Failed to update appointment status');

      setAppointments(prev =>
        prev.map(appt => (appt.id === id ? { ...appt, status } : appt))
      );

      toast({ title: 'Success', description: `Appointment marked as ${status}` });
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  }; 

  

>>>>>>> upstream/main
  if (loadingProfile || !doctorProfile) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DoctorOverview
            appointments={appointments}
            prescriptions={prescriptions}
            doctorProfile={doctorProfile}
<<<<<<< HEAD
            onViewAppointment={handleViewAppointment}
=======
            onViewAppointment={handleViewAppointmentDetails}
            selectedAppointment={selectedAppointment}
            showAppointmentDialog={showAppointmentDialog}
            setShowAppointmentDialog={setShowAppointmentDialog}
>>>>>>> upstream/main
          />
        </TabsContent>

        <TabsContent value="appointments">
<<<<<<< HEAD
          <DoctorAppointmentsTab
            appointments={appointments}
            onViewAppointment={handleViewAppointment}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
          />
        </TabsContent>

        <TabsContent value="prescriptions">
          <DoctorPrescriptionsTab
            prescriptions={prescriptions}
            onCreatePrescription={handleCreatePrescription}
=======
          {appointmentsLoading && <p>Loading appointments...</p>}
          {appointmentsError && <p className="text-red-500">{appointmentsError}</p>}
          {!appointmentsLoading && !appointmentsError && (
            <DoctorAppointmentsTab
              appointments={appointments}
              onViewAppointment={handleViewAppointmentDetails}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            />
          )}
        </TabsContent>

        <TabsContent value="prescriptions">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by patient email..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <DoctorPrescriptionsTab
            prescriptions={filteredPrescriptions}
            onCreatePrescription={() => setShowPrescriptionForm(true)}
            onRefreshPrescriptions={fetchPrescriptions}
>>>>>>> upstream/main
          />
        </TabsContent>

        <TabsContent value="profile">
          <DoctorProfileTab
            doctorProfile={doctorProfile}
            editingProfile={editingProfile}
            profileForm={profileForm}
            onEditProfile={onEditProfile}
            onSaveProfile={onSaveProfile}
            onProfileChange={onProfileChange}
            onCancelEdit={onCancelEdit}
          />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PasswordChangeForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

<<<<<<< HEAD
=======
      {/* Prescription form modal */}
>>>>>>> upstream/main
      {showPrescriptionForm && (
        <PrescriptionForm
          newPrescription={newPrescription}
          onInputChange={handleInputChange}
          onEyeValueChange={handleEyeValueChange}
          onSave={handleSavePrescription}
          onCancel={handleCancelPrescription}
          onPupillaryDistanceChange={handlePupillaryDistanceChange}
<<<<<<< HEAD
        />
      )}
=======
          confirmedPatients={confirmedPatients}
          onSelectPatientEmail={handleSelectPatientEmail}
        />
      )}

>>>>>>> upstream/main
    </div>
  );
};

export default DoctorDashboard;
