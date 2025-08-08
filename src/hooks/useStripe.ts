
/** PROTECTED: Do not modify without explicit approval. */
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  
  const initiatePayment = async (pricingOptions: any, formData?: any, photoUploads?: File[]) => {
    setIsLoading(true);
    
    try {
      console.log('🔥 [SALON-PAYMENT] === PAYMENT INITIATION STARTED ===');
      console.log('🔥 [SALON-PAYMENT] Pricing options:', pricingOptions);
      console.log('🔥 [SALON-PAYMENT] Form data keys:', Object.keys(formData || {}));
      console.log('🔥 [SALON-PAYMENT] Photo uploads:', photoUploads?.length || 0, 'files');
      console.log('🔥 [SALON-PAYMENT] Timestamp:', new Date().toISOString());
      
      // Upload photos first if they exist
      let uploadedPhotoUrls: string[] = [];
      if (photoUploads && photoUploads.length > 0) {
        toast.info(`Uploading ${photoUploads.length} photos...`);
        
        try {
          const uploadPromises = photoUploads.map(async (file, index) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `salon-${Date.now()}-${index}.${fileExt}`;
            
            console.log('📸 [SALON-PHOTO-UPLOAD] Uploading:', fileName);
            
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('salon_sale_photos')
              .upload(fileName, file);

            if (uploadError) {
              console.error('❌ [SALON-PHOTO-UPLOAD] Error:', uploadError);
              throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
              .from('salon_sale_photos')
              .getPublicUrl(fileName);

            console.log('✅ [SALON-PHOTO-UPLOAD] Success:', publicUrl);
            return publicUrl;
          });

          uploadedPhotoUrls = await Promise.all(uploadPromises);
          console.log('🔍 [SALON-PHOTO-UPLOAD] All photos uploaded:', uploadedPhotoUrls);
          toast.success(`All ${uploadedPhotoUrls.length} photos uploaded successfully!`);
        } catch (uploadError) {
          console.error('❌ [SALON-PHOTO-UPLOAD] Failed to upload photos:', uploadError);
          toast.error('Failed to upload photos. Please try again.');
          return false;
        }
      }
      
      // Add uploaded photo URLs to form data
      const formDataWithPhotos = {
        ...formData,
        photoUrls: uploadedPhotoUrls,
        photos: uploadedPhotoUrls
      };
      
      console.log('🚀 [SALON-PAYMENT] Calling create-salon-checkout edge function...');
      console.log('🚀 [SALON-PAYMENT] Payload:', {
        pricingOptions,
        formDataKeys: Object.keys(formDataWithPhotos || {}),
        photoCount: uploadedPhotoUrls.length
      });
      
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: { 
          pricingOptions,
          formData: formDataWithPhotos
        }
      });
      
      console.log('📋 [SALON-PAYMENT] Edge function response:', { data, error });
      
      if (error) {
        console.error('Error creating checkout session:', error);
        toast.error("Payment Error", {
          description: "Unable to process payment. Please try again."
        });
        return false;
      }
      
      if (data?.url) {
        console.log('✅ [PAYMENT] Stripe checkout URL received:', data.url);
        toast.info("Redirecting to Stripe checkout...");
        
        // Enhanced redirect with debugging
        try {
          console.log('🌐 [PAYMENT] Opening Stripe checkout in new tab...');
          window.open(data.url, '_blank');
          console.log('✅ [PAYMENT] Stripe checkout opened successfully');
          toast.success("Stripe checkout opened in new tab");
          return true;
        } catch (redirectError) {
          console.error('❌ [PAYMENT] Failed to open Stripe checkout:', redirectError);
          // Fallback to same window redirect
          console.log('🔄 [PAYMENT] Fallback: redirecting in same window...');
          window.location.href = data.url;
          return true;
        }
      } else {
        console.error('No checkout URL received:', data);
        toast.error("Payment Error", {
          description: "No checkout URL received. Please try again."
        });
        return false;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error("Payment Error", {
        description: "Failed to initialize payment. Please try again."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    initiatePayment
  };
}
