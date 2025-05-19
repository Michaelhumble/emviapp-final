
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';

export interface JobDetailsSectionProps {
  form: UseFormReturn<any>;
  onNext?: () => void;
  onBack?: () => void; // Added onBack prop
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ form, onNext, onBack }) => {
  // Make sure we have a valid form context
  if (!form) {
    console.error("JobDetailsSection requires a valid form from react-hook-form");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Tell candidates about this position</p>
      </div>
      
      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Job Title *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Nail Technician, Salon Manager" 
                  {...field}
                  className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Job Type *</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="rounded-xl h-12 border-gray-300 bg-white">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                  <SelectItem value="commission">Commission-based</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Location *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="City, State (e.g., Houston, TX)" 
                  {...field}
                  className="rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
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
              <FormLabel className="text-gray-900 font-medium">Job Description (English) *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the position, requirements, and benefits..." 
                  rows={6}
                  {...field}
                  className="rounded-xl border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Vietnamese Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả công việc bằng tiếng Việt..." 
                  rows={6}
                  {...field}
                  className="rounded-xl border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-between pt-4">
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
          >
            Back
          </Button>
        )}
        
        {onNext && (
          <Button 
            type="button" 
            onClick={onNext}
            className="ml-auto"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobDetailsSection;
