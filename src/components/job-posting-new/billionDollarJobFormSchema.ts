
import { z } from 'zod';

export const billionDollarJobFormSchema = z.object({
  salonName: z.string().min(2, 'Salon name must be at least 2 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  jobDescription: z.string().min(2, 'Job description must be at least 2 characters'),
  vietnameseDescription: z.string().min(2, 'Vietnamese description must be at least 2 characters'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary'], {
    required_error: 'Please select an employment type',
  }),
});

export type BillionDollarJobFormData = z.infer<typeof billionDollarJobFormSchema>;
