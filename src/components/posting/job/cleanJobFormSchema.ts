
import { z } from 'zod';

export const cleanJobFormSchema = z.object({
  salonName: z.string().min(2, 'Salon name must be at least 2 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'temporary'], {
    required_error: 'Please select an employment type',
  }),
  compensationType: z.enum(['hourly', 'commission', 'salary'], {
    required_error: 'Please select a compensation type',
  }),
  compensationDetails: z.string().optional(),
});

export type CleanJobFormData = z.infer<typeof cleanJobFormSchema>;
