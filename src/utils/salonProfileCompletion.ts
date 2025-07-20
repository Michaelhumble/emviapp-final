import { Salon } from '@/context/salon/types';
import { UserProfile } from '@/types/profile';

export interface SalonProfileField {
  id: string;
  label: string;
  required: boolean;
  weight: number; // How much this field contributes to completion
  category: 'basic' | 'content' | 'contact' | 'gallery';
}

export const SALON_PROFILE_FIELDS: SalonProfileField[] = [
  // Basic Information (35%)
  { id: 'salon_name', label: 'Salon Name', required: true, weight: 10, category: 'basic' },
  { id: 'logo_url', label: 'Logo/Profile Picture', required: true, weight: 10, category: 'basic' },
  { id: 'location', label: 'Location', required: true, weight: 8, category: 'basic' },
  { id: 'address', label: 'Full Address', required: true, weight: 7, category: 'basic' },

  // Content (25%)
  { id: 'about', label: 'About/Description', required: true, weight: 15, category: 'content' },
  { id: 'services', label: 'Services Offered', required: true, weight: 10, category: 'content' },

  // Contact Information (20%)
  { id: 'phone', label: 'Phone Number', required: true, weight: 10, category: 'contact' },
  { id: 'website', label: 'Website', required: false, weight: 5, category: 'contact' },
  { id: 'instagram', label: 'Instagram', required: false, weight: 5, category: 'contact' },

  // Gallery & Hours (20%)
  { id: 'gallery', label: 'Photo Gallery', required: false, weight: 10, category: 'gallery' },
  { id: 'hours', label: 'Operating Hours', required: false, weight: 10, category: 'gallery' },
];

export interface SalonCompletionStatus {
  completionPercentage: number;
  incompleteFields: SalonProfileField[];
  completedFields: SalonProfileField[];
  categoryProgress: Record<string, { completed: number; total: number; percentage: number }>;
  isComplete: boolean;
  nextSuggestion?: string;
  milestones: { 
    label: string; 
    threshold: number; 
    achieved: boolean; 
    reward?: string; 
  }[];
}

export function calculateSalonProfileCompletion(
  salon: Salon | null, 
  userProfile: UserProfile | null
): SalonCompletionStatus {
  
  const getValue = (fieldId: string): any => {
    // Check salon data first, then fallback to user profile
    const salonValue = salon?.[fieldId as keyof Salon];
    if (salonValue) return salonValue;
    
    // Map salon fields to user profile equivalents
    const userFieldMap: Record<string, string> = {
      'salon_name': 'salon_name',
      'logo_url': 'avatar_url',
      'location': 'location',
      'address': 'address',
      'about': 'bio',
      'phone': 'phone',
      'website': 'website',
      'instagram': 'instagram',
    };
    
    const userField = userFieldMap[fieldId];
    return userField ? userProfile?.[userField as keyof UserProfile] : null;
  };
  
  const completedFields: SalonProfileField[] = [];
  const incompleteFields: SalonProfileField[] = [];
  let totalWeight = 0;
  let completedWeight = 0;
  
  // Category tracking
  const categoryProgress: Record<string, { completed: number; total: number; percentage: number }> = {};
  
  SALON_PROFILE_FIELDS.forEach(field => {
    const value = getValue(field.id);
    const isCompleted = value && 
      (Array.isArray(value) ? value.length > 0 : String(value).trim() !== '');
    
    if (!categoryProgress[field.category]) {
      categoryProgress[field.category] = { completed: 0, total: 0, percentage: 0 };
    }
    
    categoryProgress[field.category].total += field.weight;
    totalWeight += field.weight;
    
    if (isCompleted) {
      completedFields.push(field);
      completedWeight += field.weight;
      categoryProgress[field.category].completed += field.weight;
    } else {
      incompleteFields.push(field);
    }
  });
  
  // Calculate category percentages
  Object.keys(categoryProgress).forEach(category => {
    const cat = categoryProgress[category];
    cat.percentage = cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0;
  });
  
  const completionPercentage = Math.round((completedWeight / totalWeight) * 100);
  
  // Define milestones
  const milestones = [
    { label: 'Basic Setup', threshold: 25, achieved: completionPercentage >= 25, reward: '10 credits' },
    { label: 'Professional Profile', threshold: 50, achieved: completionPercentage >= 50, reward: 'Premium badge' },
    { label: 'Complete Experience', threshold: 75, achieved: completionPercentage >= 75, reward: 'Featured listing' },
    { label: 'Elite Salon', threshold: 100, achieved: completionPercentage >= 100, reward: 'VIP status' },
  ];
  
  // Get next suggestion
  let nextSuggestion: string | undefined;
  if (incompleteFields.length > 0) {
    const requiredIncomplete = incompleteFields.filter(f => f.required);
    if (requiredIncomplete.length > 0) {
      nextSuggestion = `Add ${requiredIncomplete[0].label} to boost your profile`;
    } else {
      nextSuggestion = `Complete ${incompleteFields[0].label} to reach 100%`;
    }
  }
  
  return {
    completionPercentage,
    incompleteFields,
    completedFields,
    categoryProgress,
    isComplete: completionPercentage >= 100,
    nextSuggestion,
    milestones,
  };
}

export function getSalonProfileSuggestions(status: SalonCompletionStatus): string[] {
  const suggestions: string[] = [];
  
  // Priority suggestions based on required fields
  const requiredIncomplete = status.incompleteFields.filter(f => f.required);
  if (requiredIncomplete.length > 0) {
    suggestions.push(`Complete ${requiredIncomplete.length} required field${requiredIncomplete.length > 1 ? 's' : ''}`);
  }
  
  // Category-specific suggestions
  if (status.categoryProgress.basic?.percentage < 100) {
    suggestions.push('Complete your basic salon information');
  }
  if (status.categoryProgress.content?.percentage < 100) {
    suggestions.push('Add your services and description');
  }
  if (status.categoryProgress.contact?.percentage < 80) {
    suggestions.push('Add contact information and social media');
  }
  if (status.categoryProgress.gallery?.percentage < 50) {
    suggestions.push('Upload photos and set operating hours');
  }
  
  return suggestions.slice(0, 3); // Return top 3 suggestions
}