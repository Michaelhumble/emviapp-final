import { z } from 'zod';

export const singlePageJobFormSchema = z.object({
  profession: z.string().min(1, 'Please select a profession'),
  salonName: z.string().min(2, 'Salon name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary'], {
    required_error: 'Please select an employment type',
  }),
  compensationType: z.enum(['hourly', 'commission', 'salary', 'per_service'], {
    required_error: 'Please select a compensation type',
  }),
  compensationDetails: z.string().min(1, 'Please provide compensation details'),
  jobDescriptionEnglish: z.string().min(10, 'English job description must be at least 10 characters'),
  jobDescriptionVietnamese: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  contactName: z.string().min(2, 'Contact name is required'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),
  contactEmail: z.string().email('Valid email is required'),
}).refine((data) => {
  // Require Vietnamese description for nail technician positions
  if (data.profession === 'nail-tech') {
    return data.jobDescriptionVietnamese && data.jobDescriptionVietnamese.length >= 10;
  }
  return true;
}, {
  message: 'Vietnamese job description is required for nail technician positions',
  path: ['jobDescriptionVietnamese'],
});

export type SinglePageJobFormData = z.infer<typeof singlePageJobFormSchema>;

// Keep the original schema for backward compatibility
export const billionDollarJobFormSchema = z.object({
  salonName: z.string().min(2, 'Salon name must be at least 2 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  jobDescription: z.string().min(10, 'English job description must be at least 10 characters'),
  vietnameseDescription: z.string().optional(),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary'], {
    required_error: 'Please select an employment type',
  }),
});

export type BillionDollarJobFormData = z.infer<typeof billionDollarJobFormSchema>;
