
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReviewAndPaymentSectionProps {
  formData: any;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({ 
  formData, 
  onSubmit, 
  isSubmitting = false 
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Review & Payment</h2>
        <p className="text-sm text-muted-foreground mt-1">Review your job posting and complete payment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Posting Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{formData?.title || 'Job Title'}</h3>
              <p className="text-gray-600">{formData?.salonName || 'Salon Name'}</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>{formData?.location || 'Location'}</p>
              <p>{formData?.employmentType || 'Employment Type'}</p>
              <p>{formData?.compensationType || 'Compensation Type'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={onSubmit} 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Processing...' : 'Submit Job Posting'}
      </Button>
    </div>
  );
};

export default ReviewAndPaymentSection;
