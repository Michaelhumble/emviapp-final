
export type JobType = 
  | 'nail-technician'
  | 'hair-stylist'
  | 'esthetician'
  | 'lash-tech'
  | 'massage-therapist'
  | 'salon-receptionist'
  | 'salon-manager'
  | 'other';

export interface JobTemplate {
  id: string;
  title: string;
  type: string;
  description: string;
}
