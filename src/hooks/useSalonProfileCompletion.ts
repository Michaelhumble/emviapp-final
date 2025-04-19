
import { useMemo } from 'react';
import { useAuth } from '@/context/auth';
import { UserProfile } from '@/types/profile';

interface ProfileField {
  id: string;
  label: string;
  required: boolean;
  property: keyof UserProfile;
}

const SALON_PROFILE_FIELDS: ProfileField[] = [
  { id: 'salon_name', label: 'Salon Name', required: true, property: 'salon_name' },
  { id: 'location', label: 'Location', required: true, property: 'location' },
  { id: 'avatar_url', label: 'Salon Logo', required: true, property: 'avatar_url' },
  { id: 'bio', label: 'Description', required: true, property: 'bio' },
  { id: 'phone', label: 'Phone Number', required: true, property: 'phone' },
  { id: 'instagram', label: 'Instagram', required: false, property: 'instagram' },
  { id: 'website', label: 'Website', required: false, property: 'website' }
];

export const useSalonProfileCompletion = () => {
  const { userProfile } = useAuth();
  
  return useMemo(() => {
    if (!userProfile) {
      return {
        completionPercentage: 0,
        incompleteFields: SALON_PROFILE_FIELDS.map(field => field.label),
        isComplete: false,
        allFields: SALON_PROFILE_FIELDS
      };
    }

    const requiredFields = SALON_PROFILE_FIELDS.filter(field => field.required);
    const optionalFields = SALON_PROFILE_FIELDS.filter(field => !field.required);
    
    // Check for both salon_name and salonName to be backward compatible
    const checkFieldValue = (field: ProfileField) => {
      const value = userProfile[field.property];
      
      // Handle special case for salon_name to also check for full_name if salon_name is empty
      if (field.property === 'salon_name' && (!value || value === '')) {
        const fullNameValue = userProfile.full_name;
        return fullNameValue !== undefined && fullNameValue !== null && fullNameValue !== '';
      }
      
      return value !== undefined && value !== null && value !== '';
    };
    
    const missingRequired = requiredFields.filter(field => !checkFieldValue(field));
    const missingOptional = optionalFields.filter(field => !checkFieldValue(field));

    // Required fields are weighted more heavily (80% of total)
    const requiredWeight = 0.8;
    const optionalWeight = 0.2;
    
    const requiredCompletion = 
      (requiredFields.length - missingRequired.length) / requiredFields.length * requiredWeight;
      
    const optionalCompletion = optionalFields.length > 0
      ? (optionalFields.length - missingOptional.length) / optionalFields.length * optionalWeight
      : 0;
    
    const completionPercentage = Math.round((requiredCompletion + optionalCompletion) * 100);
    
    const incompleteFields = [
      ...missingRequired.map(field => field.label),
      ...missingOptional.map(field => field.label)
    ];
    
    return {
      completionPercentage,
      incompleteFields,
      isComplete: completionPercentage >= 80,
      allFields: SALON_PROFILE_FIELDS
    };
  }, [userProfile]);
};
