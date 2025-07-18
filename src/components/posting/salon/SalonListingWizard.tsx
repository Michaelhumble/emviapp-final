import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonIdentitySection } from './SalonIdentitySection';
import { SalonLocationSection } from './SalonLocationSection';
import { SalonContactSection } from './SalonContactSection';
import SalonBusinessStep from './steps/SalonBusinessStep';
import { SalonPostDescription } from './SalonPostDescription';
import SalonPhotosStep from './steps/SalonPhotosStep';
import SalonPreviewStep from './steps/SalonPreviewStep';
import SalonPaymentStep from './steps/SalonPaymentStep';
import PostWizardLayout from '../PostWizardLayout';
import { supabaseBypass } from '@/types/supabase-bypass';
import { toast } from 'sonner';

const SalonListingWizard = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditMode = !!editId;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const totalSteps = 8;

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      establishedYear: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      neighborhood: '',
      hideExactAddress: false,
      askingPrice: '',
      monthlyRent: '',
      monthlyRevenue: '',
      monthlyProfit: '',
      numberOfStaff: '',
      numberOfTables: '',
      numberOfChairs: '',
      squareFeet: '',
      vietnameseDescription: '',
      englishDescription: '',
      reasonForSelling: '',
      virtualTourUrl: '',
      otherNotes: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactFacebook: '',
      contactZalo: '',
      contactNotes: '',
      willTrain: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      hasParking: false,
      equipmentIncluded: false,
      leaseTransferable: false,
      sellerFinancing: false,
      helpWithTransition: false,
      selectedPricingTier: 'basic',
      featuredAddon: false,
      termsAccepted: false,
    },
  });

  // Load existing data when in edit mode
  useEffect(() => {
    const loadSalonData = async () => {
      if (!isEditMode || !editId) return;
      
      setLoading(true);
      try {
        const { data: salon, error } = await supabaseBypass
          .from('salon_sales')
          .select('*')
          .eq('id', editId)
          .single();
          
        if (error) throw error;
        
        if (salon) {
          // Pre-fill form with existing data
          form.reset({
            salonName: salon.salon_name || '',
            businessType: salon.business_type || '',
            establishedYear: salon.established_year || '',
            address: salon.address || '',
            city: salon.city || '',
            state: salon.state || '',
            zipCode: salon.zip_code || '',
            neighborhood: salon.neighborhood || '',
            hideExactAddress: salon.hide_exact_address || false,
            askingPrice: salon.asking_price?.toString() || '',
            monthlyRent: salon.monthly_rent?.toString() || '',
            monthlyRevenue: salon.monthly_revenue || '',
            monthlyProfit: salon.monthly_profit || '',
            numberOfStaff: salon.number_of_staff || '',
            numberOfTables: salon.number_of_tables || '',
            numberOfChairs: salon.number_of_chairs || '',
            squareFeet: salon.square_feet || '',
            vietnameseDescription: salon.vietnamese_description || '',
            englishDescription: salon.english_description || '',
            reasonForSelling: salon.reason_for_selling || '',
            virtualTourUrl: salon.virtual_tour_url || '',
            otherNotes: salon.other_notes || '',
            contactName: salon.contact_name || '',
            contactEmail: salon.contact_email || '',
            contactPhone: salon.contact_phone || '',
            contactFacebook: salon.contact_facebook || '',
            contactZalo: salon.contact_zalo || '',
            contactNotes: salon.contact_notes || '',
            willTrain: salon.will_train || false,
            hasHousing: salon.has_housing || false,
            hasWaxRoom: salon.has_wax_room || false,
            hasDiningRoom: salon.has_dining_room || false,
            hasLaundry: salon.has_laundry || false,
            hasParking: salon.has_parking || false,
            equipmentIncluded: salon.equipment_included || false,
            leaseTransferable: salon.lease_transferable || false,
            sellerFinancing: salon.seller_financing || false,
            helpWithTransition: salon.help_with_transition || false,
            selectedPricingTier: (salon.selected_pricing_tier as 'basic' | 'gold' | 'premium' | 'annual') || 'basic',
            featuredAddon: salon.featured_addon || false,
            termsAccepted: true, // Already accepted since it's an existing listing
          });
          
          // Load existing photos
          if (salon.images && salon.images.length > 0) {
            setPhotoUrls(salon.images);
          }
          
          toast.success('Listing data loaded for editing');
        }
      } catch (error) {
        console.error('Error loading salon data:', error);
        toast.error('Failed to load listing data');
      } finally {
        setLoading(false);
      }
    };
    
    loadSalonData();
  }, [isEditMode, editId, form]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentComplete = () => {
    // Payment completed - could redirect or show success
    console.log('Payment completed successfully');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SalonIdentitySection form={form} />;
      case 2:
        return <SalonLocationSection form={form} />;
      case 3:
        return <SalonBusinessStep form={form} />;
      case 4:
        return <SalonContactSection form={form} />;
      case 5:
        return <SalonPostDescription form={form} />;
      case 6:
        return (
          <SalonPhotosStep 
            form={form} 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            photoUrls={photoUrls}
            setPhotoUrls={setPhotoUrls}
          />
        );
      case 7:
        return <SalonPreviewStep form={form} photoUploads={photoUploads} photoUrls={photoUrls} />;
      case 8:
        return <SalonPaymentStep form={form} photoUploads={photoUploads} photoUrls={photoUrls} onPaymentComplete={handlePaymentComplete} isEditMode={isEditMode} editId={editId} />;
      default:
        return <SalonIdentitySection form={form} />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Salon Identity';
      case 2: return 'Location Details';
      case 3: return 'Business Details';
      case 4: return 'Contact Information';
      case 5: return 'Description';
      case 6: return 'Photos';
      case 7: return 'Preview';
      case 8: return 'Pricing & Payment';
      default: return 'Salon Identity';
    }
  };

  const isLastStep = currentStep === totalSteps;
  const isPreviewStep = currentStep === 7;

  return (
    <PostWizardLayout currentStep={currentStep} totalSteps={totalSteps}>
      <Form {...form}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent">
              <h2 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                <Sparkles className="h-8 w-8 text-purple-600" />
                Sell Your Salon Like a Pro
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Join the <span className="font-semibold text-purple-600">most trusted marketplace</span> for salon owners. 
              Your success story starts here.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200 max-w-lg mx-auto">
              <p className="text-purple-700 font-medium">
                {getStepTitle()} - Step {currentStep} of {totalSteps}
              </p>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-10 mb-10">
            {renderStep()}
          </div>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 h-12 px-6 text-base border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Step
            </Button>

            {!isLastStep && (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 h-12 px-8 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isPreviewStep ? (
                  <>
                    Complete Your Listing
                    <Sparkles className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Form>
    </PostWizardLayout>
  );
};

export default SalonListingWizard;
