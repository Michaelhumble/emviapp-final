
import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  type: z.string().optional(), // Job type field
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  salary: z.string().optional(),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
