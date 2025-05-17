
import React, { useState, useEffect } from 'react';
import { JobForm } from './JobForm';
import { PricingStep } from '../PricingStep';
import { Steps } from '@/components/ui/steps';
import { JobFormValues } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/utils/posting/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Users, Timer, Check, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface EnhancedJobFormProps {
  onSubmit: (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => boolean | Promise<boolean>;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium', // Default to premium for better conversion
    durationMonths: 1,
    autoRenew: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentHires, setRecentHires] = useState(0);
  const [remainingDiamondSpots, setRemainingDiamondSpots] = useState(3);

  // Set up social proof counter for recent hires
  useEffect(() => {
    // Set initial random number between 25-40
    const initialHires = Math.floor(Math.random() * 16) + 25;
    setRecentHires(initialHires);
    
    // Update counter periodically
    const timer = setInterval(() => {
      setRecentHires(prev => prev + 1);
    }, 40000); // Every 40 seconds
    
    return () => clearInterval(timer);
  }, []);
  
  // Set up FOMO trigger for premium spots
  useEffect(() => {
    // Randomly decrease remaining spots
    const decreaseTimer = setInterval(() => {
      setRemainingDiamondSpots(prev => (prev > 1 ? prev - 1 : prev));
    }, 120000); // Every 2 minutes
    
    return () => clearInterval(decreaseTimer);
  }, []);
  
  const handleJobFormSubmit = (formData: any) => {
    setJobFormData(formData);
    setCurrentStep(1);
    
    // Scroll to top for better visibility of the next step
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  };
  
  const handlePricingSubmit = (options: PricingOptions) => {
    if (jobFormData) {
      setIsSubmitting(true);
      setPricingOptions(options);
      
      const result = onSubmit(jobFormData, photoUploads, options);
      
      // Handle both synchronous boolean return and Promise<boolean> return
      if (result instanceof Promise) {
        result
          .then((success) => {
            if (!success) {
              setIsSubmitting(false);
            }
          })
          .catch(() => {
            setIsSubmitting(false);
          });
      } else if (!result) {
        // If it's a synchronous false result
        setIsSubmitting(false);
      }
    }
  };
  
  const handleBackToJobDetails = () => {
    setCurrentStep(0);
  };
  
  const steps = [
    {
      title: t({
        english: 'Job Details',
        vietnamese: 'Chi Tiết Công Việc'
      }),
      description: t({
        english: 'Describe the position',
        vietnamese: 'Mô tả vị trí'
      })
    },
    {
      title: t({
        english: 'Review & Publish',
        vietnamese: 'Xem Lại & Đăng'
      }),
      description: t({
        english: 'Set posting options',
        vietnamese: 'Đặt tùy chọn đăng'
      })
    }
  ];
  
  return (
    <div className="w-full relative">
      {/* Social proof alerts that float at the top */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6"
        >
          <Alert className="border-green-100 bg-green-50 text-green-800 shadow-sm">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="font-medium text-green-800">
              {t({
                english: "You're almost done!",
                vietnamese: "Bạn gần như đã hoàn thành!"
              })}
            </AlertTitle>
            <AlertDescription className="text-green-700 text-sm">
              {t({
                english: `${recentHires} employers recently filled positions using our premium plans.`,
                vietnamese: `${recentHires} nhà tuyển dụng gần đây đã tuyển được vị trí bằng cách sử dụng các gói cao cấp của chúng tôi.`
              })}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {remainingDiamondSpots <= 3 && currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-6"
        >
          <Alert className="border-amber-100 bg-amber-50 text-amber-800 shadow-sm">
            <Timer className="h-4 w-4 text-amber-600" />
            <AlertTitle className="font-medium text-amber-800">
              {t({
                english: "Limited Diamond spots available",
                vietnamese: "Số lượng vị trí Kim cương có hạn"
              })}
            </AlertTitle>
            <AlertDescription className="text-amber-700 text-sm">
              {t({
                english: `Only ${remainingDiamondSpots} Diamond promotion spots left for this week.`,
                vietnamese: `Chỉ còn ${remainingDiamondSpots} vị trí khuyến mãi Kim cương cho tuần này.`
              })}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      {/* Progress steps */}
      <Steps 
        steps={steps} 
        currentStep={currentStep}
        className="mb-8"
      />
      
      {/* Tab content for job details and pricing */}
      <Tabs defaultValue="job-details" value={currentStep === 0 ? "job-details" : "pricing"}>
        <TabsList className="hidden">
          <TabsTrigger value="job-details">Job Details</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>
        
        {/* Job details step */}
        <TabsContent value="job-details" className="m-0 space-y-8">
          {/* Social proof banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Card className="overflow-hidden bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex h-10 w-10 bg-purple-100 rounded-full items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-purple-900">
                      {t({
                        english: "Quick job posting that works",
                        vietnamese: "Đăng việc nhanh chóng hiệu quả"
                      })}
                    </h3>
                    <p className="text-xs text-purple-800">
                      {t({
                        english: `${recentHires}+ successful hires this month. Just select a template to get started!`,
                        vietnamese: `${recentHires}+ tuyển dụng thành công trong tháng này. Chỉ cần chọn một mẫu để bắt đầu!`
                      })}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-purple-600">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {t({
                        english: "New",
                        vietnamese: "Mới"
                      })}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <JobForm 
            onSubmit={handleJobFormSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            isSubmitting={isSubmitting}
            initialValues={jobFormData || undefined}
          />
        </TabsContent>
        
        {/* Pricing step */}
        <TabsContent value="pricing" className="m-0">
          <PricingStep 
            onSubmit={handlePricingSubmit}
            onBack={handleBackToJobDetails}
            isSubmitting={isSubmitting}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedJobForm;
