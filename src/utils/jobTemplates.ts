
// This file is needed for backward compatibility, but we've moved the actual templates to jobFormConstants.ts
import { JobFormValues } from "@/components/posting/job/jobFormSchema";

// Import the templates from our new location
import { JOB_TEMPLATES_EN } from "@/components/posting/job/jobFormConstants";

// Export the templates in the format expected by any existing code
export const jobTemplates: Partial<JobFormValues>[] = JOB_TEMPLATES_EN.map(template => ({
  template: template.id,
  title: template.title,
  type: template.type,
  description: template.description
}));

export default jobTemplates;
