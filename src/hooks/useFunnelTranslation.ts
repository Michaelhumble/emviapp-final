import { useMemo } from 'react';
import { getLanguagePreference } from '@/utils/languagePreference';
import { funnelTranslations, FunnelTranslations } from '@/types/funnelTranslations';

export const useFunnelTranslation = () => {
  const currentLanguage = getLanguagePreference();
  
  const translations = useMemo(() => {
    return funnelTranslations[currentLanguage] || funnelTranslations.en;
  }, [currentLanguage]);
  
  const isVietnamese = currentLanguage === 'vi';
  
  return {
    t: translations,
    isVietnamese,
    currentLanguage
  };
};

// Auto-detect language from browser and referral
export const detectUserLanguage = (): 'en' | 'vi' => {
  // Check URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam === 'vi' || langParam === 'en') {
    return langParam;
  }
  
  // Check referrer for Vietnamese sites
  const referrer = document.referrer.toLowerCase();
  const vietnameseReferrers = [
    'facebook.com/groups',
    'vietnam',
    'vn',
    'nail',
    'tiktok.com/@nail'
  ];
  
  if (vietnameseReferrers.some(ref => referrer.includes(ref))) {
    return 'vi';
  }
  
  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('vi')) {
    return 'vi';
  }
  
  return 'en';
};