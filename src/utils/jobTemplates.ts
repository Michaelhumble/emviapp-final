import { JobFormValues } from "@/components/posting/job/jobFormSchema";

// This file is not needed anymore as we've moved the templates to jobFormConstants.ts
// We're keeping it here as a stub in case it's referenced elsewhere

// Export a simple function to convert old template format to new schema
export function applyTemplate(templateId: string): Partial<JobFormValues> {
  // Just return minimal values, actual templates are in jobFormConstants.ts
  return {
    title: "",
    type: "",
    description: "",
    summary: ""
  };
}
