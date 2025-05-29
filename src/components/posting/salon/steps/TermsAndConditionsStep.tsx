
import React from 'react';

interface StepProps {
  form: any;
}

const TermsAndConditionsStep: React.FC<StepProps> = ({ form }) => {
  return (
    <div className="p-6 text-center">
      <h3 className="text-lg font-medium mb-2">Terms and Conditions</h3>
      <p className="text-gray-600">Step Coming Soon</p>
    </div>
  );
};

export default TermsAndConditionsStep;
