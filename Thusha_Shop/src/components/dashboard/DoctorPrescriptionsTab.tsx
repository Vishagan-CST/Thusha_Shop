<<<<<<< HEAD

=======
>>>>>>> upstream/main
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PrescriptionDisplay from '@/components/PrescriptionDisplay';

interface DoctorPrescriptionsTabProps {
  prescriptions: any[];
  onCreatePrescription: () => void;
<<<<<<< HEAD
}

const DoctorPrescriptionsTab = ({ prescriptions, onCreatePrescription }: DoctorPrescriptionsTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Prescription Management</CardTitle>
=======
  onRefreshPrescriptions?: () => void; // add this
}

const DoctorPrescriptionsTab = ({
  prescriptions,
  onCreatePrescription,
  onRefreshPrescriptions,
}: DoctorPrescriptionsTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl font-semibold">Prescription Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            View, manage, and create prescriptions.
          </p>
        </div>
>>>>>>> upstream/main
        <Button onClick={onCreatePrescription} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Prescription
        </Button>
      </CardHeader>
<<<<<<< HEAD
      <CardContent>
        <PrescriptionDisplay 
          prescriptions={prescriptions} 
          title="Issued Prescriptions" 
=======

      <CardContent>
        <PrescriptionDisplay
          prescriptions={prescriptions}
          title="Issued Prescriptions"
          onRefreshPrescriptions={onRefreshPrescriptions} // pass it down
>>>>>>> upstream/main
        />
      </CardContent>
    </Card>
  );
};

<<<<<<< HEAD
export default DoctorPrescriptionsTab;
=======
export default DoctorPrescriptionsTab;
>>>>>>> upstream/main
