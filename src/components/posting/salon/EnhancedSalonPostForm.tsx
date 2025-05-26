
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from "./enhancedSalonFormSchema";
import { Sparkles, Crown, Zap, Eye, Lock, TrendingUp } from "lucide-react";

// Import section components
import SalonIdentitySection from "./sections/SalonIdentitySection";
import SalonLocationSection from "./sections/SalonLocationSection";
import SalonPhotosSection from "./sections/SalonPhotosSection";
import SalonAboutSection from "./sections/SalonAboutSection";
import SalonPerformanceSection from "./sections/SalonPerformanceSection";
import SalonAssetsSection from "./sections/SalonAssetsSection";
import SalonPromotionSection from "./sections/SalonPromotionSection";
import SalonContactSection from "./sections/SalonContactSection";

interface EnhancedSalonPostFormProps {
  onSubmit: (values: EnhancedSalonFormValues) => Promise<boolean>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  onPromotionChange: (upgrades: any) => void;
}

const sections = [
  { id: 'identity', title: 'Salon Identity', icon: Sparkles, description: 'Name, type & branding' },
  { id: 'location', title: 'Location', icon: Eye, description: 'Address & neighborhood' },
  { id: 'photos', title: 'Photos & Videos', icon: TrendingUp, description: 'Visual showcase' },
  { id: 'about', title: 'Your Story', icon: Crown, description: 'What makes you special' },
  { id: 'performance', title: 'Business Performance', icon: Zap, description: 'Revenue & metrics' },
  { id: 'assets', title: 'Assets & Team', icon: Lock, description: 'Equipment & staff' },
  { id: 'promotion', title: 'Promotion Options', icon: Crown, description: 'Boost visibility' },
  { id: 'contact', title: 'Contact & Privacy', icon: Lock, description: 'How buyers reach you' }
];

export const EnhancedSalonPostForm = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads,
  onPromotionChange 
}: EnhancedSalonPostFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

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

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleNext = async () => {
    const currentSectionId = sections[currentSection].id;
    const isValid = await form.trigger();
    
    if (isValid) {
      setCompletedSections(prev => new Set([...prev, currentSection]));
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleFormSubmit = async (values: EnhancedSalonFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(values);
      if (success) {
        // Handle success - maybe show confetti or redirect
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentSection = () => {
    const sectionId = sections[currentSection].id;
    
    switch (sectionId) {
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* FOMO Header */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-center py-3">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <Crown className="h-4 w-4" />
          <span>Only 3 Diamond slots left this month • 127 salons upgraded this week</span>
          <Crown className="h-4 w-4" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            List Your Salon for Sale
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Join 500+ successful salon owners who sold with EmviApp
          </p>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Step {currentSection + 1} of {sections.length}</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isCompleted = completedSections.has(index);
              const isCurrent = index === currentSection;
              
              return (
                <Badge
                  key={section.id}
                  variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                  className={`cursor-pointer transition-all ${
                    isCurrent ? "bg-purple-600 text-white" : 
                    isCompleted ? "bg-green-100 text-green-700" : 
                    "hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentSection(index)}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {section.title}
                </Badge>
              );
            })}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Current Section Card */}
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    {React.createElement(sections[currentSection].icon, { 
                      className: "h-6 w-6 text-purple-600" 
                    })}
                    <h2 className="text-2xl font-bold text-gray-900">
                      {sections[currentSection].title}
                    </h2>
                  </div>
                  <p className="text-gray-600">{sections[currentSection].description}</p>
                </div>

                <Separator className="mb-8" />

                {/* Render Current Section */}
                <AnimatePresence mode="wait">
                  {renderCurrentSection()}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="px-8"
              >
                Previous
              </Button>

              <div className="flex gap-4">
                {currentSection < sections.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {isSubmitting ? "Creating Listing..." : "Launch Your Listing"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Secure & Confidential</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Crown className="h-4 w-4" />
              <span className="text-sm">Premium Marketplace</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Avg. Sale Time: 45 Days</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            Trusted by 500+ salon owners • $50M+ in successful sales
          </p>
        </div>
      </div>
    </div>
  );
};
