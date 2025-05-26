
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import PremiumSalonWizard from '@/components/posting/salon/PremiumSalonWizard';
import { EnhancedSalonFormValues } from '@/components/posting/salon/enhancedSalonFormSchema';

const PostSalon = () => {
  const { initiatePayment, isLoading } = usePostPayment();
  
  const handleSubmit = async (data: EnhancedSalonFormValues) => {
    try {
      // Convert salon listing data to the expected format for the API
      const salonDetails = {
        title: data.salonName || 'Salon For Sale',
        description: data.description || '',
        location: `${data.city || ''}, ${data.state || ''}`,
        price: data.askingPrice || '',
        business_type: data.businessType || 'salon',
        contact_info: {
          owner_name: "Salon Owner",
          phone: "(555) 123-4567",
          email: "owner@salon.com",
        },
        post_type: 'salon',
        metadata: {
          salonListingData: data,
          photos: data.photos || [],
          performanceData: {
            annualRevenue: data.annualRevenue,
            monthlyRent: data.monthlyRent,
            averageClients: data.averageClients,
            hideFinancialInfo: data.hideFinancialInfo,
            growthTrend: data.growthTrend,
          },
          assets: {
            equipment: data.equipment,
            equipmentValue: data.equipmentValue,
            staffCount: data.staffCount,
            staffIncluded: data.staffIncluded,
            leaseDetails: data.leaseDetails,
          },
          promotion: {
            promotionTier: data.promotionTier,
            urgentListing: data.urgentListing,
            highlightColor: data.highlightColor,
          },
        }
      };
      
      // Define pricing options based on selected promotion tier
      const pricingOptions: PricingOptions = {
        selectedPricingTier: (data.promotionTier as JobPricingTier) || 'premium',
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
      console.error('Error submitting salon listing:', error);
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
