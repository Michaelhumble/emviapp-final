import { validateAllBlogLinks } from '@/utils/blogLinks';

// Development utility to validate blog links
export const runBlogValidation = () => {
  if (process.env.NODE_ENV === 'development') {
    const validation = validateAllBlogLinks();
    if (!validation.valid) {
      console.error('🚨 Blog validation errors found:', validation.errors);
      validation.errors.forEach(error => console.error('❌', error));
    } else {
      console.log('✅ All blog links validated successfully');
    }
    return validation;
  }
  return { valid: true, errors: [] };
};

// Export for debugging in console
if (typeof window !== 'undefined') {
  (window as any).validateBlogLinks = runBlogValidation;
}