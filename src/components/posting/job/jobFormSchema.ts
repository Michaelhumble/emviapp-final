
export interface JobFormValues {
  title: string;
  description?: string;
  location: string;
  compensation_details?: string;
  salary_range?: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'temporary' | 'commission';
  experience_level: 'entry' | 'intermediate' | 'experienced' | 'senior';
  contactEmail: string;
  requirements?: string[];
}

export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare';
