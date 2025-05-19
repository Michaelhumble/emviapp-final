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

interface JobDetailsSectionProps {
  form: any;
  showVietnameseByDefault?: boolean;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ form, showVietnameseByDefault = false }) => {
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe the job requirements and responsibilities" className="resize-none" {...field} />
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
              <Textarea placeholder="Mô tả công việc bằng tiếng Việt" className="resize-none" {...field} />
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
