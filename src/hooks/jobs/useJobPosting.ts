
import { useState } from 'react';

// DEPRECATED: This hook is disabled to prevent conflicts
// All job posting now goes through FreeJobPostingForm.tsx
export interface JobFormData {
  title: string;
  category: string;
  location: string;
  description: string;
  compensation_type: string;
  compensation_details: string;
  requirements: string;
  contact_info: {
    owner_name?: string;
    phone?: string;
    email?: string;
    notes?: string;
  };
}

export const useJobPosting = () => {
  const [isSubmitting] = useState(false);
  const [error] = useState<string | null>('This hook is deprecated. Use FreeJobPostingForm component instead.');

  const submitJob = async () => {
    console.warn('❌ [DEPRECATED] useJobPosting hook is disabled. Use FreeJobPostingForm component instead.');
    return false;
  };

  return {
    submitJob,
    isSubmitting,
    error,
    clearError: () => console.warn('❌ [DEPRECATED] useJobPosting hook is disabled.')
  };
};
