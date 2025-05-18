
export interface JobFormValues {
  title: string;
  description?: string;
  vietnameseDescription?: string;
  location: string;
  compensation_details?: string;
  salary_range?: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'temporary' | 'commission';
  experience_level: 'entry' | 'intermediate' | 'experienced' | 'senior';
  contactEmail: string;
  contactName?: string;
  contactPhone?: string;
  requirements?: string[];
  specialties?: string[];
  templateType?: string;
}

export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare' | 'barber' | 'makeup';
