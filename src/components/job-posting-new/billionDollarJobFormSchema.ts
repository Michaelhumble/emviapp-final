
import { z } from 'zod';

export const billionDollarJobFormSchema = z.object({
  salonName: z.string().min(2, 'Salon name must be at least 2 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  jobDescription: z.string().min(10, 'English job description must be at least 10 characters'),
  vietnameseDescription: z.string().min(2, 'Vietnamese description is required'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary'], {
    required_error: 'Please select an employment type',
  }),
});

export type BillionDollarJobFormData = z.infer<typeof billionDollarJobFormSchema>;
