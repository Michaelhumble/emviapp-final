
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Crown, Shield, ArrowRight } from 'lucide-react';
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from './enhancedSalonFormSchema';
import SalonIdentitySection from './sections/SalonIdentitySection';
import SalonLocationSection from './sections/SalonLocationSection';
import SalonAboutSection from './sections/SalonAboutSection';
import { motion } from 'framer-motion';

interface EnhancedSalonPostFormProps {
  onSubmit: (values: EnhancedSalonFormValues) => Promise<boolean>;
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
  const [currentStep, setCurrentStep] = useState(0);
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

  const steps = [
    { id: 'identity', title: 'Salon Identity', description: 'Basic salon information' },
    { id: 'location', title: 'Location', description: 'Where is your salon located?' },
    { id: 'about', title: 'About', description: 'Tell your story' },
    { id: 'performance', title: 'Performance', description: 'Business metrics' },
    { id: 'assets', title: 'Assets & Team', description: 'What\'s included?' },
    { id: 'promotion', title: 'Promotion', description: 'Boost your listing' },
    { id: 'review', title: 'Review & Submit', description: 'Final review' }
  ];

  const handleFormSubmit = async (values: EnhancedSalonFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(values);
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Crown className="h-4 w-4" />
            Premium Salon Listing
          </motion.div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            List Your Salon for Sale
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create a stunning listing that attracts serious buyers and maximizes your salon's value
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center text-xs ${
                  index <= currentStep ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index < currentStep 
                    ? 'bg-purple-600 text-white' 
                    : index === currentStep 
                      ? 'bg-purple-100 text-purple-600 border-2 border-purple-600' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className="text-center max-w-16">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center border-b bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-2xl">
                  {steps[currentStep].title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {steps[currentStep].description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                {currentStep === 0 && <SalonIdentitySection form={form} />}
                {currentStep === 1 && <SalonLocationSection form={form} />}
                {currentStep === 2 && <SalonAboutSection form={form} />}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Business Performance</h3>
                    <p className="text-gray-600">Share key metrics to attract qualified buyers</p>
                    {/* Business Performance fields would go here */}
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Assets & Team</h3>
                    <p className="text-gray-600">What's included with the sale?</p>
                    {/* Assets & Team fields would go here */}
                  </div>
                )}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Promotion Options</h3>
                    <p className="text-gray-600">Boost your listing's visibility</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Standard Listing */}
                      <div className="border rounded-xl p-6 bg-gray-50">
                        <h4 className="font-semibold mb-2">Standard Listing</h4>
                        <p className="text-gray-600 text-sm mb-4">Basic listing in search results</p>
                        <div className="text-2xl font-bold text-green-600 mb-2">FREE</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Listed for 60 days</li>
                          <li>• Basic search visibility</li>
                          <li>• In-app messaging</li>
                        </ul>
                      </div>

                      {/* Featured Listing */}
                      <div className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50 relative">
                        <Badge className="absolute -top-2 left-4 bg-purple-600">Most Popular</Badge>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold">Featured Listing</h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Premium placement and visibility</p>
                        <div className="text-2xl font-bold text-purple-600 mb-2">$199</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Top search placement</li>
                          <li>• Featured badge</li>
                          <li>• 3x more views</li>
                          <li>• Priority support</li>
                        </ul>
                      </div>

                      {/* Diamond Listing */}
                      <div className="border-2 border-yellow-200 rounded-xl p-6 bg-gradient-to-br from-yellow-50 to-orange-50 relative">
                        <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Crown className="h-3 w-3 mr-1" />
                          Luxury
                        </Badge>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-5 w-5 text-yellow-600" />
                          <h4 className="font-semibold">Diamond Listing</h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">Ultra-premium confidential listing</p>
                        <div className="text-2xl font-bold text-yellow-600 mb-2">$499</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Confidential details</li>
                          <li>• Verified buyers only</li>
                          <li>• White-glove service</li>
                          <li>• NDA protection</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Review & Submit</h3>
                    <p className="text-gray-600">Review your listing before submitting</p>
                    {/* Review summary would go here */}
                  </div>
                )}
              </CardContent>
              
              {/* Navigation */}
              <div className="flex justify-between items-center p-6 border-t bg-gray-50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  Previous
                </Button>
                
                <div className="flex gap-3">
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Next Step
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4" />
                          Publish Listing
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};
