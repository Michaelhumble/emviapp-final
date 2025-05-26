
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import PremiumSalonWizard from '@/components/posting/salon/PremiumSalonWizard';

const PostSalon = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  
  const handleSubmit = async (data: any) => {
    try {
      // Convert enhanced form data to the expected format for the API
      const salonDetails = {
        title: data.identity?.salonName || 'Salon For Sale',
        description: data.about?.description || '',
        location: `${data.location?.city || ''}, ${data.location?.state || ''}`,
        price: data.askingPrice || '',
        business_type: data.identity?.businessType || 'salon',
        contact_info: {
          owner_name: "Salon Owner",
          phone: "(555) 123-4567",
          email: "owner@salon.com",
        },
        post_type: 'salon',
        metadata: {
          enhancedFormData: data,
          photos: data.photos?.photos || [],
          performanceData: data.performance || {},
          assets: data.assets || {},
          promotion: data.promotion || {},
        }
      };
      
      // Define pricing options based on selected promotion tier
      const pricingOptions: PricingOptions = {
        selectedPricingTier: (data.promotion?.promotionTier as JobPricingTier) || 'premium',
        durationMonths: 1,
        autoRenew: true,
        isFirstPost: true,
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('salon', salonDetails, pricingOptions);
      
      if (result.success) {
        toast.success('Premium salon listing created successfully!');
        return true;
      } else {
        toast.error('Error processing your salon listing. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error submitting enhanced salon form:', error);
      toast.error('Error creating salon listing');
      return false;
    }
  };

  return (
    <>
      <Helmet>
        <title>Premium Salon Listing | EmviApp Luxury Marketplace</title>
        <meta 
          name="description" 
          content="Create a premium salon listing on EmviApp's exclusive luxury marketplace. Reach verified buyers and maximize your salon's value with our billion-dollar listing experience."
        />
      </Helmet>
      
      <PremiumSalonWizard
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </>
  );
};

export default PostSalon;
