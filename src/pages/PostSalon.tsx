
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { EnhancedSalonPostForm } from '@/components/posting/salon/EnhancedSalonPostForm';
import { type EnhancedSalonFormValues } from '@/components/posting/salon/enhancedSalonFormSchema';

const PostSalon = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [promotionUpgrades, setPromotionUpgrades] = useState({
    isUrgent: false,
    isFeatured: false,
    isDiamond: false
  });
  
  const handleSubmit = async (data: EnhancedSalonFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Convert form data to the expected format for the API
      const salonDetails = {
        title: data.salonName,
        description: data.salonStory,
        location: `${data.city}, ${data.state}`,
        price: data.askingPrice,
        business_type: data.businessType,
        salon_size: data.salonSize,
        contact_info: {
          owner_name: "Salon Owner", // This would come from auth context
          phone: "(555) 123-4567", // This would come from user profile
          email: "owner@salon.com", // This would come from auth context
        },
        post_type: 'salon',
        metadata: {
          neighborhood: data.neighborhood,
          yearsInOperation: data.yearsInOperation,
          leaseTerms: data.leaseTerms,
          includedEquipment: data.includedEquipment,
          teamSize: data.teamSize,
          teamStays: data.teamStays,
          hideAddress: data.hideAddress,
          hidePrice: data.hidePrice,
          requireNDA: data.requireNDA,
          promotionUpgrades
        }
      };
      
      // Define pricing options based on selected upgrades - use correct tier values
      let baseTier: JobPricingTier = 'premium'; // Changed from 'standard' to 'premium'
      if (promotionUpgrades.isDiamond) {
        baseTier = 'diamond';
      } else if (promotionUpgrades.isFeatured) {
        baseTier = 'premium';
      }
      
      const pricingOptions: PricingOptions = {
        selectedPricingTier: baseTier,
        durationMonths: 1,
        autoRenew: true,
        isFirstPost: true,
        // Add salon-specific promotion options
        urgentSale: promotionUpgrades.isUrgent,
        featuredListing: promotionUpgrades.isFeatured,
        diamondListing: promotionUpgrades.isDiamond,
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('salon', salonDetails, pricingOptions);
      
      if (result.success) {
        toast.success('Salon listing created successfully!');
        navigate('/dashboard');
        return true;
      } else {
        toast.error('Error processing your salon listing. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating salon listing');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePromotionChange = (upgrades: any) => {
    setPromotionUpgrades(upgrades);
  };

  return (
    <Layout>
      <Helmet>
        <title>List Your Salon for Sale | EmviApp</title>
        <meta 
          name="description" 
          content="List your salon for sale on EmviApp's exclusive marketplace. Reach verified buyers and get maximum value for your business."
        />
      </Helmet>
      
      <EnhancedSalonPostForm
        onSubmit={handleSubmit}
        photoUploads={photoUploads}
        setPhotoUploads={setPhotoUploads}
        onPromotionChange={handlePromotionChange}
      />
    </Layout>
  );
};

export default PostSalon;
