
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndustryType } from '@/components/posting/job/jobFormSchema';
import { useForm, UseFormReturn } from 'react-hook-form';

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

  // Generate placeholder text based on selected industry
  const getPlaceholder = () => {
    switch(industryType) {
      case 'nails':
        return "e.g., Experienced Nail Technician for busy salon";
      case 'hair':
        return "e.g., Hair Stylist with color expertise";
      case 'lashes':
        return "e.g., Lash Technician - Classic & Volume";
      case 'barber':
        return "e.g., Skilled Barber for upscale shop";
      case 'skincare':
        return "e.g., Licensed Esthetician for med spa";
      default:
        return "e.g., Beauty Professional";
    }
  };

  // Generate description placeholder based on industry
  const getDescriptionPlaceholder = () => {
    switch(industryType) {
      case 'nails':
        return "Describe the job requirements, skills needed, and what makes your salon a great place to work";
      case 'hair':
        return "Describe the position, required experience, and what makes your salon special";
      case 'lashes':
        return "Describe the position, certification requirements, and why someone should join your team";
      case 'barber':
        return "Describe the position, clientele, and what sets your barbershop apart";
      case 'skincare':
        return "Describe the role, required certifications, and your spa environment";
      default:
        return "Describe the job requirements and responsibilities";
    }
  };

  // Show Vietnamese description by default for nail industry
  const showVietnamese = showVietnameseByDefault || industryType === 'nails';

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input placeholder={getPlaceholder()} {...field} />
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder={getDescriptionPlaceholder()} className="resize-none min-h-[150px]" {...field} />
            </FormControl>
            <FormDescription>
              Include details about the role, responsibilities, and what makes it a great opportunity.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {showVietnamese && (
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
      )}

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
