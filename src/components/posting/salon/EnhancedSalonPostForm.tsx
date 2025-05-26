
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, Zap, Crown, Shield, CheckCircle } from "lucide-react";
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from "./enhancedSalonFormSchema";
import SalonIdentitySection from "./sections/SalonIdentitySection";
import SalonLocationSection from "./sections/SalonLocationSection";
import SalonPhotosSection from "./sections/SalonPhotosSection";
import SalonAboutSection from "./sections/SalonAboutSection";
import SalonPerformanceSection from "./sections/SalonPerformanceSection";
import SalonAssetsSection from "./sections/SalonAssetsSection";
import SalonPromotionSection from "./sections/SalonPromotionSection";
import SalonContactSection from "./sections/SalonContactSection";
import SalonConfirmationSection from "./sections/SalonConfirmationSection";

interface EnhancedSalonPostFormProps {
  onSubmit: (values: EnhancedSalonFormValues) => Promise<boolean>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  onPromotionChange: (upgrades: any) => void;
}

const sections = [
  { id: 'identity', title: 'Salon Identity', icon: '🏪' },
  { id: 'location', title: 'Location', icon: '📍' },
  { id: 'photos', title: 'Photos & Video', icon: '📸' },
  { id: 'about', title: 'Your Story', icon: '💝' },
  { id: 'performance', title: 'Performance', icon: '📊' },
  { id: 'assets', title: 'Assets & Team', icon: '👥' },
  { id: 'promotion', title: 'Boost Your Sale', icon: '🚀' },
  { id: 'contact', title: 'Contact & Privacy', icon: '🔒' },
  { id: 'confirmation', title: 'Go Live!', icon: '✨' }
];

export const EnhancedSalonPostForm = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads,
  onPromotionChange
}: EnhancedSalonPostFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<EnhancedSalonFormValues>({
    resolver: zodResolver(enhancedSalonFormSchema),
    defaultValues: {
      salonName: "",
      businessType: "",
      salonSize: "",
      city: "",
      state: "",
      neighborhood: "",
      hideAddress: false,
      coverPhotoIndex: 0,
      videoUrl: "",
      salonStory: "",
      ownerMessage: "",
      reasonForSelling: "",
      showRevenue: true,
      showProfit: true,
      showClients: true,
      revenue: "",
      profit: "",
      monthlyClients: "",
      yearsInOperation: "",
      leaseTerms: "",
      askingPrice: "",
      hidePrice: false,
      includedEquipment: [],
      teamSize: "",
      teamStays: false,
      staffBios: "",
      urgentSale: false,
      featuredListing: false,
      diamondListing: false,
      requireNDA: false,
      messagingOnly: true,
    },
  });

  const progress = ((currentStep + 1) / sections.length) * 100;

  const handleNext = async () => {
    if (currentStep === sections.length - 1) {
      setIsSubmitting(true);
      try {
        const result = await onSubmit(form.getValues());
        if (result) {
          setIsComplete(true);
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep(prev => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderCurrentSection = () => {
    switch (sections[currentStep].id) {
      case 'identity':
        return <SalonIdentitySection form={form} />;
      case 'location':
        return <SalonLocationSection form={form} />;
      case 'photos':
        return <SalonPhotosSection form={form} photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} />;
      case 'about':
        return <SalonAboutSection form={form} />;
      case 'performance':
        return <SalonPerformanceSection form={form} />;
      case 'assets':
        return <SalonAssetsSection form={form} />;
      case 'promotion':
        return <SalonPromotionSection form={form} onPromotionChange={onPromotionChange} />;
      case 'contact':
        return <SalonContactSection form={form} />;
      case 'confirmation':
        return <SalonConfirmationSection form={form} isComplete={isComplete} />;
      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
      >
        <Card className="max-w-2xl mx-auto p-8 text-center bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Your Salon is Live!</h1>
          <p className="text-xl text-gray-600 mb-8">Congratulations! Your salon listing is now visible to thousands of potential buyers.</p>
          <div className="space-y-4">
            <Button size="lg" className="w-full">View My Listing</Button>
            <Button variant="outline" size="lg" className="w-full">Share with Friends</Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header with Progress */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">List Your Salon for Sale</h1>
              <p className="text-gray-600">Step {currentStep + 1} of {sections.length}</p>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-4 py-2">
              <Crown className="h-4 w-4 mr-2" />
              Premium Experience
            </Badge>
          </div>
          <Progress value={progress} className="h-2 bg-purple-100" />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="container max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center mb-8 overflow-x-auto">
          <div className="flex items-center space-x-2">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                className={`flex items-center ${index < sections.length - 1 ? 'mr-4' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index === currentStep
                      ? 'bg-purple-600 text-white shadow-lg'
                      : index < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>{section.icon}</span>
                  )}
                </div>
                {index < sections.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Section Title */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {sections[currentStep].icon} {sections[currentStep].title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        {/* Form Content */}
        <Form {...form}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl p-8">
              {renderCurrentSection()}
            </Card>
          </motion.div>
        </Form>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            {currentStep === sections.length - 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 text-amber-600"
              >
                <Zap className="h-5 w-5" />
                <span className="font-medium">Almost there!</span>
              </motion.div>
            )}
            
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <span>
                {currentStep === sections.length - 1 
                  ? isSubmitting ? 'Publishing...' : 'Publish Listing'
                  : 'Continue'
                }
              </span>
              {currentStep !== sections.length - 1 && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Trusted by 10,000+ Salon Owners</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Average Sale in 30 Days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
