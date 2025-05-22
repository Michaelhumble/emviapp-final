
import { toast as sonnerToast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

// This utility wraps the toast function from sonner to ensure consistent usage
// and to avoid TypeScript errors with the ReactNode properties

/**
 * Show a success toast notification
 */
export const showSuccessToast = (
  title: string | { english: string; vietnamese: string },
  description?: string | { english: string; vietnamese: string }
) => {
  if (typeof title === 'object' && ('english' in title || 'vietnamese' in title)) {
    // Get current language preference
    const lang = localStorage.getItem('emvi_language_preference') || 'en';
    const titleText = lang === 'vi' ? title.vietnamese : title.english;
    
    if (description && typeof description === 'object') {
      const descText = lang === 'vi' ? description.vietnamese : description.english;
      return sonnerToast.success(titleText, { description: descText });
    }
    return sonnerToast.success(titleText, description ? { description } : undefined);
  }
  
  return sonnerToast.success(title, description ? { description: description } : undefined);
};

/**
 * Show an error toast notification
 */
export const showErrorToast = (
  title: string | { english: string; vietnamese: string },
  description?: string | { english: string; vietnamese: string }
) => {
  if (typeof title === 'object' && ('english' in title || 'vietnamese' in title)) {
    // Get current language preference
    const lang = localStorage.getItem('emvi_language_preference') || 'en';
    const titleText = lang === 'vi' ? title.vietnamese : title.english;
    
    if (description && typeof description === 'object') {
      const descText = lang === 'vi' ? description.vietnamese : description.english;
      return sonnerToast.error(titleText, { description: descText });
    }
    return sonnerToast.error(titleText, description ? { description } : undefined);
  }
  
  return sonnerToast.error(title, description ? { description: description } : undefined);
};

/**
 * Show a warning toast notification
 */
export const showWarningToast = (
  title: string | { english: string; vietnamese: string },
  description?: string | { english: string; vietnamese: string }
) => {
  if (typeof title === 'object' && ('english' in title || 'vietnamese' in title)) {
    // Get current language preference
    const lang = localStorage.getItem('emvi_language_preference') || 'en';
    const titleText = lang === 'vi' ? title.vietnamese : title.english;
    
    if (description && typeof description === 'object') {
      const descText = lang === 'vi' ? description.vietnamese : description.english;
      return sonnerToast.warning(titleText, { description: descText });
    }
    return sonnerToast.warning(titleText, description ? { description } : undefined);
  }
  
  return sonnerToast.warning(title, description ? { description: description } : undefined);
};

/**
 * Show an info toast notification
 */
export const showInfoToast = (
  title: string | { english: string; vietnamese: string },
  description?: string | { english: string; vietnamese: string }
) => {
  if (typeof title === 'object' && ('english' in title || 'vietnamese' in title)) {
    // Get current language preference
    const lang = localStorage.getItem('emvi_language_preference') || 'en';
    const titleText = lang === 'vi' ? title.vietnamese : title.english;
    
    if (description && typeof description === 'object') {
      const descText = lang === 'vi' ? description.vietnamese : description.english;
      return sonnerToast.info(titleText, { description: descText });
    }
    return sonnerToast.info(titleText, description ? { description } : undefined);
  }
  
  return sonnerToast.info(title, description ? { description: description } : undefined);
};

/**
 * Hook to use toast with translation
 */
export const useToastWithTranslation = () => {
  const { t } = useTranslation();
  
  const showSuccess = (
    title: string | { english: string; vietnamese: string },
    description?: string | { english: string; vietnamese: string }
  ) => showSuccessToast(title, description);
  
  const showError = (
    title: string | { english: string; vietnamese: string },
    description?: string | { english: string; vietnamese: string }
  ) => showErrorToast(title, description);
  
  const showWarning = (
    title: string | { english: string; vietnamese: string },
    description?: string | { english: string; vietnamese: string }
  ) => showWarningToast(title, description);
  
  const showInfo = (
    title: string | { english: string; vietnamese: string },
    description?: string | { english: string; vietnamese: string }
  ) => showInfoToast(title, description);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
