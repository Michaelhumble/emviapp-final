
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from './salonFormSchema';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonPaymentOptionsProps {
  form: UseFormReturn<SalonFormValues>;
  selectedOptions: SalonPricingOptions;
  onPayment: () => void;
  onBack: () => void;
}

const SalonPaymentOptions: React.FC<SalonPaymentOptionsProps> = ({
  form,
  selectedOptions,
  onPayment,
  onBack
}) => {
  const formData = form.getValues();
  
  return (
    <SalonPaymentFeatures
      formData={formData}
      selectedOptions={selectedOptions}
      onPayment={onPayment}
      onBack={onBack}
    />
  );
};

export default SalonPaymentOptions;
