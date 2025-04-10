
/**
 * Formats field name for display
 */
export const formatFieldName = (field: string): string => {
  switch (field) {
    case 'full_name': return 'Business Name';
    case 'salon_name': return 'Salon Name';
    case 'avatar_url': return 'Logo/Photo';
    default:
      return field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');
  }
};

/**
 * Calculates profile completion percentage and incomplete fields
 */
export const calculateProfileCompletion = (profile: any) => {
  // Required and optional profile fields
  const requiredFields = [
    'full_name',
    'salon_name', 
    'location', 
    'bio', 
    'phone',
    'avatar_url'
  ];
  
  const optionalFields = [
    'instagram',
    'website'
  ];
  
  const missingRequiredFields = requiredFields.filter(
    field => !profile || !profile[field]
  );
  
  const missingOptionalFields = optionalFields.filter(
    field => !profile || !profile[field]
  );
  
  // Calculate weighted completion percentage (required fields count more)
  const requiredFieldsCompleted = requiredFields.length - missingRequiredFields.length;
  const optionalFieldsCompleted = optionalFields.length - missingOptionalFields.length;
  
  // Required fields are 80% of the weight, optional are 20%
  const requiredWeight = 0.8;
  const optionalWeight = 0.2;
  
  const requiredCompletion = requiredFields.length > 0 
    ? (requiredFieldsCompleted / requiredFields.length) * requiredWeight 
    : 0;
    
  const optionalCompletion = optionalFields.length > 0 
    ? (optionalFieldsCompleted / optionalFields.length) * optionalWeight 
    : 0;
    
  const completionPercentage = Math.round((requiredCompletion + optionalCompletion) * 100);
  console.log(`Profile completion: ${completionPercentage}%`);
  
  // Format and return incomplete fields
  const incompleteFields = [
    ...missingRequiredFields.map(formatFieldName),
    ...missingOptionalFields.map(formatFieldName)
  ];
  
  return { completionPercentage, incompleteFields };
};
