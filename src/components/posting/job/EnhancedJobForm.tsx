import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import PhotoUploader from '../PhotoUploader';
import { PricingSection, PricingSectionProps } from '../PricingSection';
import { getJobPrice, jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingOption, JobPricingTier, PricingOptions } from '@/utils/posting/types';
import PaymentSummary from '../PaymentSummary';
import { usePricing } from '@/context/pricing/PricingContext';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  initialValues?: JobFormValues;
  isLoading?: boolean;
}

export const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  initialValues,
  isLoading = false
}) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const { pricingOptions, setPricingOptions } = usePricing();

  // Create default values with proper types
  const defaultValues: JobFormValues = {
    title: "",
    description: "",
    location: "",
    jobType: "",
    compensation_type: "",
    compensation_details: "",
    salary_range: "",
    experience_level: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    contactZalo: "",
    salonName: "",
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    vietnameseDescription: "",
    specialties: [],
    requirements: [],
    templateType: "",
    image: "",
    ...initialValues
  };
  
  // Ensure requirements is always an array
  if (initialValues && typeof initialValues.requirements === 'string') {
    defaultValues.requirements = initialValues.requirements ? [initialValues.requirements] : [];
  }
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });
  
  const handleSubmit = async (data: JobFormValues) => {
    const success = await onSubmit(data, photoUploads, pricingOptions);
    if (success) {
      form.reset();
      setPhotoUploads([]);
    }
  };
  
  const handleTierSelect = (tier: string) => {
    setPricingOptions({
      ...pricingOptions,
      selectedPricingTier: tier as JobPricingTier
    });
  };
  
  const availableTiers = jobPricingOptions.filter(option => !option.hidden);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Basic info section */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nail Technician" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the job responsibilities and requirements" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., San Jose, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="compensation_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compensation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Commission">Commission</SelectItem>
                        <SelectItem value="Salary">Salary</SelectItem>
                        <SelectItem value="Hourly + Commission">Hourly + Commission</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="compensation_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $20-25/hr or 60% commission" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your salon name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Benefits</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="weekly_pay"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Weekly Pay</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="has_housing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Housing Available</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="has_wax_room"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Wax Room Available</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="owner_will_train"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Owner Will Train</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="no_supply_deduction"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No Supply Deduction</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
        
        {/* Photos */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Photos (Optional)</h2>
          <PhotoUploader 
            maxPhotos={5} 
            onUploadsChange={setPhotoUploads} 
            uploads={photoUploads}
          />
        </Card>
        
        {/* Pricing */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Pricing & Visibility</h2>
          <PricingSection 
            pricingOptions={availableTiers}
            selectedTier={pricingOptions.selectedPricingTier}
            onSelectTier={handleTierSelect}
          />
          
          <div className="mt-6">
            <PaymentSummary
              pricingOptions={pricingOptions}
              setPricingOptions={setPricingOptions}
              basePrice={getJobPrice(pricingOptions.selectedPricingTier, pricingOptions)}
              postType="job"
            />
          </div>
        </Card>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || form.formState.isSubmitting}
        >
          {isLoading || form.formState.isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
        </Button>
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
