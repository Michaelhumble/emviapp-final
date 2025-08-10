
/** PROTECTED: Do not modify without explicit approval. */
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';

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

  // New: Dedicated Salon Checkout initiator used by CTA and debug button
  const initiateSalonCheckout = async (payload: any) => {
    setIsLoading(true);
    try {
      const origin = window.location.origin;
      const body = {
        // Preserve new lightweight fields
        ...payload,
        // Back-compat for existing function signature
        pricingOptions: payload?.tier ? { selectedPricingTier: payload.tier } : payload?.pricingOptions,
        formData: payload?.formData ?? {
          title: payload?.title,
          listingId: payload?.listingId,
          photos: payload?.photoRefs || [],
          successUrl: payload?.successUrl || `${origin}/post-success?kind=salon`,
          cancelUrl: payload?.cancelUrl || `${origin}/pricing?cancel=1`
        }
      };

      const tier = payload?.tier || body?.pricingOptions?.selectedPricingTier;
      const listingId = payload?.listingId || body?.formData?.listingId;
      // Non-blocking analytics: CTA click
      try {
        analytics.trackEvent({
          action: 'salon_checkout_started',
          category: 'checkout',
          custom_parameters: { tier, listingId }
        });
      } catch (_) {}

      const { data, error } = await supabase.functions.invoke('create-salon-checkout', { body });
      console.log('[salon-checkout] response', { data, error });
      if (error) {
        console.error(error);
        try {
          analytics.trackEvent({
            action: 'salon_checkout_failed',
            category: 'checkout',
            custom_parameters: { tier, listingId, error: error.message }
          });
        } catch (_) {}
        toast.error('Salon checkout error', { description: error.message || 'Unknown error' });
        return false;
      }
      if (data?.url) {
        try {
          analytics.trackEvent({
            action: 'salon_checkout_succeeded',
            category: 'checkout',
            custom_parameters: { tier, listingId }
          });
        } catch (_) {}
        toast.message('Opening Stripe Checkout…');
        window.open(data.url, '_blank');
        return true;
      }
      try {
        analytics.trackEvent({
          action: 'salon_checkout_failed',
          category: 'checkout',
          custom_parameters: { tier, listingId, error: 'no_url' }
        });
      } catch (_) {}
      toast.error('No checkout URL returned');
      return false;
    } catch (e: any) {
      console.error('[salon-checkout] exception', e);
      try {
        analytics.trackEvent({
          action: 'salon_checkout_failed',
          category: 'checkout',
          custom_parameters: { tier: (payload?.tier || payload?.pricingOptions?.selectedPricingTier), listingId: payload?.listingId || payload?.formData?.listingId, error: e?.message }
        });
      } catch (_) {}
      toast.error('Salon checkout failed', { description: e?.message });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    initiatePayment,
    initiateSalonCheckout
  };
}
