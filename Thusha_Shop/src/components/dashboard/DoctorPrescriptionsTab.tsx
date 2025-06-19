import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PrescriptionDisplay from '@/components/PrescriptionDisplay';

interface DoctorPrescriptionsTabProps {
  prescriptions: any[];
  onCreatePrescription: () => void;
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
        <Button onClick={onCreatePrescription} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Prescription
        </Button>
      </CardHeader>

      <CardContent>
        <PrescriptionDisplay
          prescriptions={prescriptions}
          title="Issued Prescriptions"
          onRefreshPrescriptions={onRefreshPrescriptions} // pass it down
        />
      </CardContent>
    </Card>
  );
};

export default DoctorPrescriptionsTab;
