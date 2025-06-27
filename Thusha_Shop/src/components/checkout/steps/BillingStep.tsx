
import React from 'react';
import BillingInformation from '../BillingInformation';

interface BillingStepProps {
  billingInfo: {
<<<<<<< HEAD
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
=======
    Name: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
>>>>>>> upstream/main
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  sameAsBilling: boolean;
  onBillingInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSameAsBillingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BillingStep: React.FC<BillingStepProps> = ({
  billingInfo,
  sameAsBilling,
  onBillingInfoChange,
  onSameAsBillingChange,
}) => {
  return (
    <BillingInformation
      billingInfo={billingInfo}
      sameAsBilling={sameAsBilling}
      onBillingInfoChange={onBillingInfoChange}
      onSameAsBillingChange={onSameAsBillingChange}
    />
  );
};

export default BillingStep;
