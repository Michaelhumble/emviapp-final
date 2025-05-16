
export interface JobDetailsSubmission {
  title: string;
  description: string;
  location: string;
  jobType: string;
  salary?: string;
  contactEmail?: string;
  phoneNumber?: string;
  requirements?: string[];
  jobSummary?: string;
  startDate?: Date;
  language?: string;
}
