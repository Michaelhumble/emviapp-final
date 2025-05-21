
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndustryType } from '@/components/posting/job/jobFormSchema';
import { useForm, UseFormReturn } from 'react-hook-form';
import AIPolishButton from '@/components/posting/job/AIPolishButton';

interface JobDetailsSectionProps {
  form: UseFormReturn<any>;
  showVietnameseByDefault?: boolean;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ form, showVietnameseByDefault = false }) => {
  // Make sure we have a valid form context
  if (!form) {
    console.error("JobDetailsSection requires a valid form from react-hook-form");
    return null;
  }
  
  // Get the industry type from the form if available
  const industryType = form.watch('industryType') || 'nails';

  const handlePolishDescription = (polishedText: string, vietnameseText?: string) => {
    form.setValue('description', polishedText, { shouldValidate: true });
    
    if (vietnameseText) {
      form.setValue('vietnameseDescription', vietnameseText, { shouldValidate: true });
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Senior Nail Technician" {...field} />
            </FormControl>
            <FormDescription>
              What is the position you're hiring for?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Description</FormLabel>
              <AIPolishButton 
                onPolish={handlePolishDescription}
                industryType={industryType}
              />
            </div>
            <FormControl>
              <Textarea placeholder="Describe the job requirements and responsibilities" className="resize-none min-h-[150px]" {...field} />
            </FormControl>
            <FormDescription>
              Include details about the role, responsibilities, and what makes it a great opportunity.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vietnameseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vietnamese Description (Optional)</FormLabel>
            <FormControl>
              <Textarea placeholder="Mô tả công việc bằng tiếng Việt" className="resize-none min-h-[150px]" {...field} />
            </FormControl>
            <FormDescription>
              Provide a description in Vietnamese to attract more candidates.
            </FormDescription>
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
              <Input placeholder="e.g., Ho Chi Minh City" {...field} />
            </FormControl>
            <FormDescription>
              Where is the job located?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default JobDetailsSection;
