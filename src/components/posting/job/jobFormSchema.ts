
import { z } from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(2, { message: 'Title is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  location: z.string().min(2, { message: 'Location is required' }),
  type: z.string().optional(),
  compensation: z.string().optional(),
  contactEmail: z.string().email({ message: 'Please enter a valid email address' }),
  contactPhone: z.string().min(7, { message: 'Please enter a valid phone number' }),
  isUrgent: z.boolean().default(false),
  template: z.string().optional(),
  perks: z.array(z.string()).optional(),
  summary: z.string().optional()
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
