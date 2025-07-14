
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import SalonPricingPlans from "../SalonPricingPlans";
import { SalonPricingTier, SalonPricingOptions } from "@/utils/posting/salonPricing";
import { Button } from "@/components/ui/button";
import { useStripe } from "@/hooks/useStripe";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface SalonPaymentStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads?: File[];
  photoUrls?: string[];
  onPaymentComplete?: () => void;
  isEditMode?: boolean;
  editId?: string | null;
}

export const SalonPaymentStep = ({ form, photoUploads = [], photoUrls = [], onPaymentComplete, isEditMode = false, editId }: SalonPaymentStepProps) => {
  const { isLoading, initiatePayment } = useStripe();
  const navigate = useNavigate();
  
  const selectedOptions: SalonPricingOptions = {
    selectedPricingTier: form.watch("selectedPricingTier"),
    featuredAddon: form.watch("featuredAddon")
  };

  const handlePlanSelect = (tier: SalonPricingTier) => {
    form.setValue("selectedPricingTier", tier);
  };

  const handleFeaturedAddonChange = (featured: boolean) => {
    form.setValue("featuredAddon", featured);
  };

  const handleUpdateListing = async () => {
    const formData = form.getValues();
    
    try {
      // Upload new photos if any
      let uploadedPhotoUrls: string[] = [];
      if (photoUploads && photoUploads.length > 0) {
        toast.info(`Uploading ${photoUploads.length} new photos...`);
        
        try {
          const uploadPromises = photoUploads.map(async (file, index) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `salon-edit-${Date.now()}-${index}.${fileExt}`;
            
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('salon_sale_photos')
              .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('salon_sale_photos')
              .getPublicUrl(fileName);

            return publicUrl;
          });

          uploadedPhotoUrls = await Promise.all(uploadPromises);
          toast.success(`${uploadedPhotoUrls.length} new photos uploaded successfully!`);
        } catch (uploadError) {
          console.error('Failed to upload photos:', uploadError);
          toast.error('Failed to upload photos. Please try again.');
          return;
        }
      }

      // Combine existing and new photo URLs
      const allPhotoUrls = [...photoUrls, ...uploadedPhotoUrls];

      const { error } = await supabase
        .from('salon_sales')
        .update({
          salon_name: formData.salonName,
          business_type: formData.businessType,
          established_year: formData.establishedYear,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          neighborhood: formData.neighborhood,
          hide_exact_address: formData.hideExactAddress,
          asking_price: parseInt(formData.askingPrice),
          monthly_rent: parseInt(formData.monthlyRent || '0'),
          monthly_revenue: formData.monthlyRevenue,
          monthly_profit: formData.monthlyProfit,
          number_of_staff: formData.numberOfStaff,
          number_of_tables: formData.numberOfTables,
          number_of_chairs: formData.numberOfChairs,
          square_feet: formData.squareFeet,
          vietnamese_description: formData.vietnameseDescription,
          english_description: formData.englishDescription,
          reason_for_selling: formData.reasonForSelling,
          virtual_tour_url: formData.virtualTourUrl,
          other_notes: formData.otherNotes,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          contact_facebook: formData.contactFacebook,
          contact_zalo: formData.contactZalo,
          contact_notes: formData.contactNotes,
          will_train: formData.willTrain,
          has_housing: formData.hasHousing,
          has_wax_room: formData.hasWaxRoom,
          has_dining_room: formData.hasDiningRoom,
          has_laundry: formData.hasLaundry,
          has_parking: formData.hasParking,
          equipment_included: formData.equipmentIncluded,
          lease_transferable: formData.leaseTransferable,
          seller_financing: formData.sellerFinancing,
          help_with_transition: formData.helpWithTransition,
          selected_pricing_tier: formData.selectedPricingTier,
          featured_addon: formData.featuredAddon,
          images: allPhotoUrls, // Include updated photo URLs
          updated_at: new Date().toISOString()
        })
        .eq('id', editId);

      if (error) throw error;

      toast.success('Listing updated successfully!');
      navigate('/salons');
    } catch (error) {
      console.error('Error updating listing:', error);
      toast.error('Failed to update listing');
    }
  };

  const handleContinueToPayment = async () => {
    if (!selectedOptions.selectedPricingTier) {
      toast.error("Please select a pricing plan first");
      return;
    }

    const formData = form.getValues();
    
    // Validate required fields
    const requiredFields = ['salonName', 'city', 'state', 'askingPrice', 'contactName', 'contactEmail', 'contactPhone'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      console.log('🔥 Starting payment with data:', { selectedOptions, formData: Object.keys(formData), photoCount: photoUploads.length });
      
      const success = await initiatePayment(selectedOptions, formData, photoUploads);
      if (success && onPaymentComplete) {
        onPaymentComplete();
      }
    } catch (error) {
      console.error('❌ Payment initiation failed:', error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const isValidSelection = Boolean(selectedOptions.selectedPricingTier);

  return (
    <div className="space-y-8">
      <SalonPricingPlans 
        selectedOptions={selectedOptions}
        onPlanSelect={handlePlanSelect}
        onFeaturedAddonChange={handleFeaturedAddonChange}
      />
      
      <div className="flex justify-center pt-6">
        <Button
          onClick={isEditMode ? handleUpdateListing : handleContinueToPayment}
          disabled={!isValidSelection || isLoading}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              {isEditMode ? 'Update Listing' : 'Pay & Publish Listing'}
            </>
          )}
        </Button>
      </div>
      
      {!isValidSelection && (
        <p className="text-center text-gray-500 text-sm">
          Please select a pricing plan to continue
        </p>
      )}
    </div>
  );
};

export default SalonPaymentStep;
