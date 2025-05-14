import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { JobFormValues } from './jobFormSchema';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { usePolishedDescriptions, PolishedDescription } from '@/hooks/usePolishedDescriptions';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
}

const EnhancedJobForm = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting 
}: EnhancedJobFormProps) => {
  const [showPolishModal, setShowPolishModal] = useState(false);
  const [polishedDescriptions, setPolishedDescriptions] = useState<PolishedDescription[]>([]);
  
  const form = useForm<JobFormValues>({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      employment_type: 'full_time',
      compensation_type: 'hourly',
      compensation_details: '',
    },
  });

  const description = form.watch('description');
  const { generatePolishedDescriptions, isLoading, error } = usePolishedDescriptions(description);

  const handleSubmitForm = (values: JobFormValues) => {
    onSubmit(values);
  };

  const handlePolishDescription = async () => {
    if (description.trim().length < 10) {
      form.setError('description', { 
        type: 'manual', 
        message: 'Please enter at least 10 characters for the AI to polish' 
      });
      return;
    }

    try {
      const descriptions = await generatePolishedDescriptions();
      setPolishedDescriptions(descriptions);
      setShowPolishModal(true);
    } catch (err) {
      console.error('Error polishing description:', err);
    }
  };

  const handleSelectPolishedVersion = (text: string) => {
    form.setValue('description', text);
    setShowPolishModal(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
          {/* Job title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Nail Technician, Hair Stylist, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Job description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Job Description</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePolishDescription}
                    disabled={description.length < 10 || isLoading}
                    className="text-xs h-8"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    Polish with AI
                  </Button>
                </div>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the position, responsibilities, and requirements..." 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Employment Type */}
          <FormField
            control={form.control}
            name="employment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full_time">Full Time</SelectItem>
                    <SelectItem value="part_time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Compensation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="commission">Commission</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="compensation_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $20-25/hr, 50% commission, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Photo uploads would go here */}
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Continue to Pricing'}
            </Button>
          </div>
        </form>
      </Form>
      
      <PolishedDescriptionsModal
        isOpen={showPolishModal}
        onClose={() => setShowPolishModal(false)}
        originalDescription={description}
        polishedDescriptions={polishedDescriptions}
        onSelectVersion={handleSelectPolishedVersion}
        isLoading={isLoading}
      />
    </>
  );
};

export default EnhancedJobForm;
