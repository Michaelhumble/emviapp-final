
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsConfirmationStepProps {
  form: UseFormReturn<SalonFormValues>;
  onNext: () => void;
  onPrev: () => void;
}

export const TermsConfirmationStep: React.FC<TermsConfirmationStepProps> = ({ form, onNext, onPrev }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Terms & Conditions</h2>
        <p className="text-gray-600 mt-2">
          Please review and accept our terms to continue
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="font-medium">EmviApp Salon Listing Terms</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>• All information provided must be accurate and truthful</p>
          <p>• Salon photos must be recent and representative of the actual property</p>
          <p>• Financial information will be kept confidential</p>
          <p>• Listing fees are non-refundable once submitted</p>
          <p>• EmviApp reserves the right to review and approve all listings</p>
          <p>• You agree to respond to serious inquiries in a timely manner</p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm">
                I agree to the terms and conditions above and confirm that all information provided is accurate *
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
        <strong>Next Step:</strong> Once you submit your listing, our team will review it within 24 hours. 
        You'll receive an email confirmation once your salon is live on EmviApp.
      </div>
    </div>
  );
};
