
import { toast as sonnerToast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import React from 'react';

// This utility wraps the toast function from sonner to ensure consistent usage
// and to avoid TypeScript errors with the ReactNode properties

/**
 * Convert localized content to string based on current language preference
 */
const getLocalizedText = (
  content: string | { english: string; vietnamese: string }
): string => {
  if (typeof content === 'string') return content;
  
  // Get current language preference
  const lang = localStorage.getItem('emvi_language_preference') || 'en';
  return lang === 'vi' ? content.vietnamese : content.english;
};

/**
 * Show a success toast notification
 */
export const showSuccessToast = (
  title: string | { english: string; vietnamese: string },
  description?: string | { english: string; vietnamese: string }
) => {
  const titleText = getLocalizedText(title);
  
  if (description) {
    const descriptionText = getLocalizedText(description);
    return sonnerToast.success(titleText, { description: descriptionText });
  }
  
  return sonnerToast.success(titleText);
};

/**
 * Show an error toast notification
 */
export const showErrorToast = (
  title: string | { english: string; vietnamese: string },
  description?: string | { english: string; vietnamese: string }
) => {
  const titleText = getLocalizedText(title);
  
  if (description) {
    const descriptionText = getLocalizedText(description);
    return sonnerToast.error(titleText, { description: descriptionText });
  }
  
  return sonnerToast.error(titleText);
};

/**
 * Show a warning toast notification
 */
export const showWarningToast = (
  title: string | { english: string; vietnamese: string },
  description?: string | { english: string; vietnamese: string }
) => {
  const titleText = getLocalizedText(title);
  
  if (description) {
    const descriptionText = getLocalizedText(description);
    return sonnerToast.warning(titleText, { description: descriptionText });
  }
  
  return sonnerToast.warning(titleText);
};

/**
 * Show an info toast notification
 */
export const showInfoToast = (
  title: string | { english: string; vietnamese: string },
  description?: string | { english: string; vietnamese: string }
) => {
  const titleText = getLocalizedText(title);
  
  if (description) {
    const descriptionText = getLocalizedText(description);
    return sonnerToast.info(titleText, { description: descriptionText });
  }
  
  return sonnerToast.info(titleText);
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
