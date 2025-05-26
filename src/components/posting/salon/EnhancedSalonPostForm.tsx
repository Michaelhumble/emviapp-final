import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from './enhancedSalonFormSchema';
import SalonIdentitySection from './sections/SalonIdentitySection';
import SalonLocationSection from './sections/SalonLocationSection';
import SalonPhotosSection from './sections/SalonPhotosSection';
import SalonAboutSection from './sections/SalonAboutSection';
import SalonPerformanceSection from './sections/SalonPerformanceSection';
import SalonAssetsSection from './sections/SalonAssetsSection';
import SalonPromotionSection from './sections/SalonPromotionSection';
import SalonContactPrivacySection from './sections/SalonContactPrivacySection';
import SalonConfirmationSection from './sections/SalonConfirmationSection';

interface EnhancedSalonPostFormProps {
  onSubmit: (data: EnhancedSalonFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const EnhancedSalonPostForm = ({ onSubmit, isSubmitting }: EnhancedSalonPostFormProps) => {
  const [currentSection, setCurrentSection] = useState<
    'identity' | 'location' | 'photos' | 'about' | 'performance' | 'assets' | 'promotion' | 'contact' | 'confirmation'
  >('identity');

  const form = useForm<EnhancedSalonFormValues>({
    resolver: zodResolver(enhancedSalonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      salonSize: '',
      city: '',
      state: '',
      salonStory: '',
      askingPrice: '',
      hideAddress: false,
      hidePrice: false,
      requireNDA: false,
      promotionUpgrades: {
        isUrgent: false,
        isFeatured: false,
        isDiamond: false
      }
    },
  });

  const progress = () => {
    switch (currentSection) {
      case 'identity': return 12.5;
      case 'location': return 25;
      case 'photos': return 37.5;
      case 'about': return 50;
      case 'performance': return 62.5;
      case 'assets': return 75;
      case 'promotion': return 87.5;
      case 'contact': return 93.75
      case 'confirmation': return 100;
      default: return 0;
    }
  };

  const isFormComplete = () => {
    // Implement your form completion logic here
    return true;
  };

  const handleSectionChange = (section: typeof currentSection) => {
    setCurrentSection(section);
  };

  const handleSubmit = async (data: EnhancedSalonFormValues) => {
    await onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                List Your Salon for Sale
              </h1>
              <div className="text-sm text-gray-600">
                Section: {currentSection}
              </div>
            </div>
            <Progress value={progress()} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Complete all sections to unlock premium features</p>
          </div>
        </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {currentSection === 'confirmation' ? (
            <SalonConfirmationSection 
              form={form}
              isComplete={isFormComplete()}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          ) : (
            <>
              {currentSection === 'identity' && (
                <SalonIdentitySection form={form} />
              )}
              {currentSection === 'location' && (
                <SalonLocationSection form={form} />
              )}
              {currentSection === 'photos' && (
                <SalonPhotosSection form={form} photoUploads={[]} setPhotoUploads={() => {}} />
              )}
              {currentSection === 'about' && (
                <SalonAboutSection form={form} />
              )}
              {currentSection === 'performance' && (
                <SalonPerformanceSection form={form} />
              )}
              {currentSection === 'assets' && (
                <SalonAssetsSection form={form} />
              )}
              {currentSection === 'promotion' && (
                <SalonPromotionSection form={form} onPromotionChange={() => {}} />
              )}
              {currentSection === 'contact' && (
                <SalonContactPrivacySection form={form} />
              )}
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                switch (currentSection) {
                  case 'confirmation': handleSectionChange('contact'); break;
                  case 'contact': handleSectionChange('promotion'); break;
                  case 'promotion': handleSectionChange('assets'); break;
                  case 'assets': handleSectionChange('performance'); break;
                  case 'performance': handleSectionChange('about'); break;
                  case 'about': handleSectionChange('photos'); break;
                  case 'photos': handleSectionChange('location'); break;
                  case 'location': handleSectionChange('identity'); break;
                  default: break;
                }
              }}
              disabled={currentSection === 'identity'}
              className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={() => {
                switch (currentSection) {
                  case 'identity': handleSectionChange('location'); break;
                  case 'location': handleSectionChange('photos'); break;
                  case 'photos': handleSectionChange('about'); break;
                  case 'about': handleSectionChange('performance'); break;
                  case 'performance': handleSectionChange('assets'); break;
                  case 'assets': handleSectionChange('promotion'); break;
                  case 'promotion': handleSectionChange('contact'); break;
                  case 'contact': handleSectionChange('confirmation'); break;
                  default: break;
                }
              }}
              disabled={currentSection === 'confirmation'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl p-6 shadow-lg border border-white/20"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EnhancedSalonPostForm;
