
import { z } from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  description: z.string().optional(),
  compensation_type: z.enum(['hourly', 'salary', 'commission', 'contract']).optional(),
  compensation_details: z.string().optional(),
  employment_type: z.enum(['full-time', 'part-time', 'contract', 'temporary']).optional(),
  contact_info: z.object({
    owner_name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    notes: z.string().optional(),
    zalo: z.string().optional(),
  }).optional(),
});

export type JobFormSchema = z.infer<typeof jobFormSchema>;

export const useJobValidation = () => {
  const validateJobForm = (data: any) => {
    try {
      return jobFormSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0].message);
      }
      throw error;
    }
  };

  return { validateJobForm };
};
