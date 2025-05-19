
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SalonPostingProvider } from '@/context/SalonPostingContext';
import { logSalonPostingEvent } from '@/utils/telemetry/salonPostingEvents';
import EnhancedSalonForm from '@/components/posting/salon/EnhancedSalonForm';

const SalonPost: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: any, photoUploads: File[], pricingOptions: any) => {
    setIsSubmitting(true);
    
    try {
      // Log the submission attempt
      logSalonPostingEvent('SUBMIT', 'Salon post submission', { formData });
      
      // Default pricing options for salon posts
      const defaultPricingOptions = {
        selectedPricingTier: 'standard',
        durationMonths: 1,
        autoRenew: false, // Added the required property
        isFirstPost: true
      };
      
      // Mock submission success
      toast.success('Salon post created successfully!', {
        description: 'Your salon post has been published.'
      });
      
      // Redirect to success page or dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error submitting salon post:', error);
      
      toast.error('Failed to create salon post', {
        description: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create Salon Listing</h1>
      
      <SalonPostingProvider>
        <EnhancedSalonForm
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </SalonPostingProvider>
    </div>
  );
};

export default SalonPost;
