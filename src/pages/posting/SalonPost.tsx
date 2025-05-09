
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import Layout from '@/components/layout/Layout';
// Remove yup import and use zod which is already in the project
import { z } from "zod";
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useAuth } from "@/context/auth";
import { supabase } from '@/integrations/supabase/client';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions } from '@/types/job';
import { calculateSalonPostPrice, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { SalonPostForm } from "@/components/posting/salon/SalonPostForm";
import SalonPostOptions from "@/components/posting/salon/SalonPostOptions";
import { SalonFormValues } from "@/components/posting/salon/salonFormSchema";

// Replace missing imports with existing components or functionality
// Use Input component instead of InputCurrency
// Remove Icons import
// Use simple file input instead of ImageUploader

const SalonPost = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    isFirstPost: true,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    selectedPricingTier: 'standard',
    autoRenew: false
  });
  
  const handleNationwideChange = (checked: boolean) => {
    setPricingOptions(prev => ({ ...prev, isNationwide: checked }));
  };
  
  const handleFastSaleChange = (checked: boolean) => {
    setPricingOptions(prev => ({ ...prev, fastSalePackage: checked }));
  };

  const handleSalonFormSubmit = async (data: SalonFormValues) => {
    if (!user) {
      toast.error(t("You must be logged in to post a salon listing", "Bạn phải đăng nhập để đăng tin tiệm"));
      navigate("/login");
      return;
    }
    
    setFormSubmitted(true);
    
    try {
      // 1. Upload photos
      let photoUrls: string[] = [];
      
      if (photoUploads.length > 0) {
        setUploadingImages(true);
        
        for (const file of photoUploads) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('salon-sale-photos')
            .upload(fileName, file);
            
          if (uploadError) {
            throw new Error(t("Error uploading images", "Lỗi khi tải lên hình ảnh"));
          }
          
          if (uploadData) {
            const { data: urlData } = supabase.storage
              .from('salon-sale-photos')
              .getPublicUrl(uploadData.path);
              
            photoUrls.push(urlData.publicUrl);
          }
        }
        
        setUploadingImages(false);
      }
      
      // 2. Prepare salon data
      const salonData = {
        salonName: data.salonName,
        city: data.city,
        state: data.state,
        askingPrice: data.askingPrice,
        monthlyRent: data.monthlyRent || '',
        numberOfStaff: data.numberOfStaff || '',
        squareFeet: data.squareFeet || '',
        revenue: data.revenue || '',
        reasonForSelling: data.reasonForSelling || '',
        vietnameseDescription: data.vietnameseDescription || '',
        englishDescription: data.englishDescription || '',
        willTrain: data.willTrain,
        isNationwide: data.isNationwide,
        hasHousing: data.hasHousing,
        hasWaxRoom: data.hasWaxRoom,
        hasDiningRoom: data.hasDiningRoom,
        hasLaundry: data.hasLaundry,
        photos: photoUrls,
        user_id: user.id,
      };
      
      // 3. Calculate pricing
      const pricingTier = pricingOptions.selectedPricingTier || 'standard';
      const totalPrice = calculateSalonPostPrice(pricingOptions);
      
      // 4. Free tier or initiate payment
      if (pricingTier === 'free' || totalPrice === 0) {
        pricingOptions.selectedPricingTier = 'free';
      }
      
      // 5. Process payment or free post
      const result = await initiatePayment('salon', salonData, pricingOptions);
      
      if (result.success && result.redirect) {
        // For paid posts, redirect to Stripe
        if (pricingOptions.selectedPricingTier !== 'free') {
          window.location.href = result.redirect;
        } else {
          // For free posts, redirect to success page
          if (result.data && result.data.payment_log_id) {
            navigate(`/post-success?payment_log_id=${result.data.payment_log_id}&free=true`);
          } else {
            navigate('/post-success?free=true');
          }
        }
      } else {
        toast.error(t("Error processing payment", "Lỗi xử lý thanh toán"));
      }
    } catch (error: any) {
      toast.error(error.message || t("An error occurred", "Đã xảy ra lỗi"));
      setFormSubmitted(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {t("List Your Salon For Sale", "Đăng bán tiệm của bạn")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t(
              "Create a listing to sell your salon business. Vietnamese nail salons are in high demand.",
              "Tạo tin rao bán tiệm của bạn. Tiệm nail Việt Nam đang có nhu cầu cao."
            )}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <SalonPostForm 
                onSubmit={handleSalonFormSubmit}
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
                onNationwideChange={handleNationwideChange}
                onFastSaleChange={handleFastSaleChange}
              />
            </div>
            
            <div>
              <div className="sticky top-24">
                <SalonPostOptions 
                  pricingOptions={pricingOptions}
                  setPricingOptions={setPricingOptions}
                />
                
                <Card className="mt-6 p-4">
                  <h3 className="font-semibold mb-3">{t("Price Summary", "Tóm tắt giá")}</h3>
                  <ul className="space-y-2 text-sm">
                    {getSalonPostPricingSummary(pricingOptions).map((line, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{line.split(":")[0]}</span>
                        <span className="font-medium">{line.split(":")[1]}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full mt-4"
                    disabled={formSubmitted || isLoading || uploadingImages}
                    onClick={() => {
                      // Use form submission instead of direct payment
                      document.querySelector('form')?.dispatchEvent(
                        new Event('submit', { cancelable: true, bubbles: true })
                      );
                    }}
                  >
                    {isLoading || uploadingImages ? t("Processing...", "Đang xử lý...") : t("Proceed to Payment", "Tiến hành thanh toán")}
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonPost;
