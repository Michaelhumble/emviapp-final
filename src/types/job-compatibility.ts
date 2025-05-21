
/**
 * This file provides type compatibility layers for job types without modifying
 * the original job schema or form types.
 * 
 * It helps align the various job-related types used throughout the app.
 */

import { Job, JobDetailsSubmission } from '@/types/job';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';

/**
 * Converts JobFormValues to a compatible JobDetailsSubmission
 * This function adapts between the two formats without changing their definitions
 */
export const adaptJobFormToSubmission = (formData: JobFormValues): JobDetailsSubmission => {
  return {
    title: formData.title,
    description: formData.description,
    vietnamese_description: formData.vietnameseDescription,
    location: formData.location,
    employment_type: formData.jobType,
    compensation_type: formData.compensation_type,
    compensation_details: formData.compensation_details,
    weekly_pay: formData.weekly_pay,
    has_housing: formData.has_housing,
    has_wax_room: formData.has_wax_room,
    owner_will_train: formData.owner_will_train,
    no_supply_deduction: formData.no_supply_deduction,
    contact_info: {
      owner_name: formData.contactName,
      phone: formData.contactPhone,
      email: formData.contactEmail,
    },
    specialties: formData.specialties || [],
    requirements: formData.requirements || [],
    post_type: 'job'
  };
};

// Type guard to check if a value is a string array
export const isStringArray = (value: any): value is string[] => {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
};

// Helper function to normalize requirements to string array
export const normalizeRequirements = (requirements?: string[] | string): string[] => {
  if (!requirements) return [];
  if (typeof requirements === 'string') {
    return requirements.split(',').map(r => r.trim());
  }
  return requirements;
};

// More compatibility helpers can be added here as needed
