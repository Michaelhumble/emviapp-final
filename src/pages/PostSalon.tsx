
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import SalonPostForm from '@/components/posting/salon/SalonPostForm';

const PostSalon = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  const handleSubmit = async (data: any) => {
    try {
      // Convert form data to the expected format for the API
      const salonDetails = {
        title: data.salonName,
        description: data.description,
        location: `${data.location}`,
        price: data.askingPrice,
        business_type: data.businessType,
        contact_info: {
          owner_name: "Salon Owner",
          phone: "(555) 123-4567",
          email: "owner@salon.com",
        },
        post_type: 'salon',
        metadata: {
          photoUploads
        }
      };
      
      // Define basic pricing options
      const pricingOptions: PricingOptions = {
        selectedPricingTier: 'premium' as JobPricingTier,
        durationMonths: 1,
        autoRenew: true,
        isFirstPost: true,
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('salon', salonDetails, pricingOptions);
      
      if (result.success) {
        toast.success('Salon listing created successfully!');
        return true;
      } else {
        toast.error('Error processing your salon listing. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating salon listing');
      return false;
    }
  };

  return (
    <>
      <Helmet>
        <title>List Your Salon for Sale | EmviApp Premium Marketplace</title>
        <meta 
          name="description" 
          content="List your salon for sale on EmviApp's exclusive premium marketplace. Reach verified buyers and get maximum value for your business with our billion-dollar listing experience."
        />
      </Helmet>
      
      <SalonPostForm
        onSubmit={handleSubmit}
        photoUploads={photoUploads}
        setPhotoUploads={setPhotoUploads}
        isSubmitting={isLoading}
      />
    </>
  );
};

export default PostSalon;
