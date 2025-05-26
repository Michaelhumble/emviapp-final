
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Crown, Shield, Star, Upload, MapPin, DollarSign, Users, Building2, Camera, Lock, Eye, EyeOff } from "lucide-react";
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from "./enhancedSalonFormSchema";
import SalonIdentitySection from "./sections/SalonIdentitySection";
import SalonLocationSection from "./sections/SalonLocationSection";
import SalonPhotosSection from "./sections/SalonPhotosSection";
import SalonAboutSection from "./sections/SalonAboutSection";
import SalonPerformanceSection from "./sections/SalonPerformanceSection";
import SalonAssetsSection from "./sections/SalonAssetsSection";
import SalonPromotionSection from "./sections/SalonPromotionSection";
import SalonContactSection from "./sections/SalonContactSection";

interface EnhancedSalonPostFormProps {
  onSubmit: (values: EnhancedSalonFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  onPromotionChange: (upgrades: any) => void;
}

export const EnhancedSalonPostForm = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads,
  onPromotionChange
}: EnhancedSalonPostFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [promotionUpgrades, setPromotionUpgrades] = useState({
    isUrgent: false,
    isFeatured: false,
    isDiamond: false
  });

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
      urgentSale: false,
      featuredListing: false,
      diamondListing: false,
      requireNDA: false,
    },
  });

  const sections = [
    { id: 'identity', title: 'Salon Identity', icon: Building2, component: SalonIdentitySection },
    { id: 'location', title: 'Location', icon: MapPin, component: SalonLocationSection },
    { id: 'photos', title: 'Photos & Video', icon: Camera, component: SalonPhotosSection },
    { id: 'about', title: 'About This Salon', icon: Star, component: SalonAboutSection },
    { id: 'performance', title: 'Business Performance', icon: DollarSign, component: SalonPerformanceSection },
    { id: 'assets', title: 'Assets & Team', icon: Users, component: SalonAssetsSection },
    { id: 'promotion', title: 'Promotion Options', icon: Crown, component: SalonPromotionSection },
    { id: 'contact', title: 'Contact & Privacy', icon: Shield, component: SalonContactSection },
  ];

  const CurrentSectionComponent = sections[currentSection].component;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleFormSubmit = (values: EnhancedSalonFormValues) => {
    onSubmit(values);
  };

  const handlePromotionUpdate = (upgrades: any) => {
    setPromotionUpgrades(upgrades);
    onPromotionChange(upgrades);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium mb-4">
            <Crown className="h-4 w-4" />
            Premium Salon Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-4">
            List Your Salon for Sale
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the most exclusive salon marketplace. Your business deserves buyers who understand its true value.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= currentSection 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <section.icon className="h-5 w-5" />
                </div>
                {index < sections.length - 1 && (
                  <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                    index < currentSection ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Step {currentSection + 1} of {sections.length}: {sections[currentSection].title}
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Section Card */}
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/70 backdrop-blur-lg border-0 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-serif">
                    <sections[currentSection].icon className="h-6 w-6 text-purple-600" />
                    {sections[currentSection].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CurrentSectionComponent 
                    form={form} 
                    photoUploads={photoUploads}
                    setPhotoUploads={setPhotoUploads}
                    onPromotionChange={handlePromotionUpdate}
                    promotionUpgrades={promotionUpgrades}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="min-w-[120px]"
              >
                Previous
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                Your information is secure and encrypted
              </div>

              {currentSection < sections.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="min-w-[120px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="min-w-[160px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-xl"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  List My Salon
                </Button>
              )}
            </div>
          </form>
        </Form>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white/50 backdrop-blur rounded-2xl">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Verified Buyers Only</h3>
            <p className="text-sm text-gray-600">All inquiries are pre-screened for serious intent</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur rounded-2xl">
            <Lock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Complete Privacy</h3>
            <p className="text-sm text-gray-600">Your contact info stays private until you choose to share</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur rounded-2xl">
            <Star className="h-8 w-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Premium Exposure</h3>
            <p className="text-sm text-gray-600">Reach qualified buyers actively seeking salon investments</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
