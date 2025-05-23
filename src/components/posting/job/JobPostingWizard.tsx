
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import JobTemplates from './JobTemplates';
import JobDetailsSection from './JobDetailsSection';
import JobRequirementsSection from './JobRequirementsSection';
import JobDescriptionSection from './JobDescriptionSection';
import JobContactSection from './JobContactSection';
import JobPricingStep from './JobPricingStep';

const JobPostingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPricing, setSelectedPricing] = useState<any>(null);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      salonName: '',
      location: '',
      jobType: 'full-time',
      compensation_type: 'hourly',
      compensation_min: 0,
      compensation_max: 0,
      description: '',
      vietnameseDescription: '',
      requirements: [],
      contactEmail: '',
      contactPhone: '',
      applicationInstructions: '',
    },
  });

  const steps = [
    { title: 'Template Selection', component: 'template' },
    { title: 'Job Details', component: 'details' },
    { title: 'Requirements', component: 'requirements' },
    { title: 'Description', component: 'description' },
    { title: 'Contact Info', component: 'contact' },
    { title: 'Pricing', component: 'pricing' },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTemplateSelect = (template: any) => {
    form.reset({
      ...form.getValues(),
      title: template.title,
      description: template.description,
      vietnameseDescription: template.vietnameseDescription,
      requirements: template.requirements || [],
    });
    handleNext();
  };

  const handlePricingSelect = (pricing: any) => {
    setSelectedPricing(pricing);
    // Here you would typically proceed to payment
    console.log('Selected pricing:', pricing);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.component) {
      case 'template':
        return <JobTemplates onTemplateSelect={handleTemplateSelect} />;
      
      case 'details':
        return <JobDetailsSection control={form.control} />;
      
      case 'requirements':
        return <JobRequirementsSection control={form.control} />;
      
      case 'description':
        return <JobDescriptionSection control={form.control} />;
      
      case 'contact':
        return <JobContactSection control={form.control} />;
      
      case 'pricing':
        return (
          <JobPricingStep
            formData={form.getValues()}
            onPricingSelect={handlePricingSelect}
            isLoading={false}
          />
        );
      
      default:
        return <div>Step content not found</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Post a Job</CardTitle>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {renderStepContent()}
              
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                    disabled={!selectedPricing}
                  >
                    Complete Posting
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostingWizard;
