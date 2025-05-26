
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from "./enhancedSalonFormSchema";
import SalonIdentitySection from "./sections/SalonIdentitySection";
import SalonLocationSection from "./sections/SalonLocationSection";
import SalonAboutSection from "./sections/SalonAboutSection";
import { Sparkles, TrendingUp, Eye, Users, DollarSign, Star, Crown, Shield } from "lucide-react";

interface EnhancedSalonPostFormProps {
  onSubmit: (data: EnhancedSalonFormValues) => Promise<boolean>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  onPromotionChange?: (upgrades: any) => void;
}

export const EnhancedSalonPostForm = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads,
  onPromotionChange 
}: EnhancedSalonPostFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      staffBios: "",
      urgentSale: false,
      featuredListing: false,
      diamondListing: false,
      requireNDA: false,
      messagingOnly: true,
    },
  });

  const sections = [
    { title: "Salon Identity", icon: Sparkles },
    { title: "Location", icon: Eye },
    { title: "About Your Salon", icon: Users },
    { title: "Business Performance", icon: TrendingUp },
    { title: "Assets & Team", icon: Star },
    { title: "Promotion Options", icon: Crown },
    { title: "Review & Submit", icon: Shield },
  ];

  const handleSubmit = async (data: EnhancedSalonFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            List Your Salon for Sale
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful salon sales on EmviApp's exclusive marketplace
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentSection + 1} of {sections.length}
              </span>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <sections[currentSection].icon className="h-4 w-4" />
              {sections[currentSection].title}
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Main Content Card */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <sections[currentSection].icon className="h-6 w-6" />
                  {sections[currentSection].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {currentSection === 0 && <SalonIdentitySection form={form} />}
                {currentSection === 1 && <SalonLocationSection form={form} />}
                {currentSection === 2 && <SalonAboutSection form={form} />}
                {currentSection === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Business Performance & Financials</h3>
                    <p className="text-gray-600">Share your salon's success metrics to attract serious buyers</p>
                    {/* Business Performance fields would go here */}
                  </div>
                )}
                {currentSection === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Assets & Team</h3>
                    <p className="text-gray-600">Highlight what makes your salon valuable</p>
                    {/* Assets & Team fields would go here */}
                  </div>
                )}
                {currentSection === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Promotion Options</h3>
                    <p className="text-gray-600">Boost your listing's visibility and attract more buyers</p>
                    {/* Promotion options would go here */}
                  </div>
                )}
                {currentSection === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Review & Submit</h3>
                    <p className="text-gray-600">Final review of your salon listing</p>
                    {/* Review section would go here */}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={prevSection}
                disabled={currentSection === 0}
                className="px-8"
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= currentSection ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {currentSection === sections.length - 1 ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isSubmitting ? "Publishing..." : "Publish Salon"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextSection}
                  className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
