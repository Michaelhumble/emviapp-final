
import { useAuth } from '@/context/auth';

export interface TranslatableContent {
  english: string;
  vietnamese: string;
}

export type Translation = TranslatableContent;

export function useTranslation() {
  const { userProfile } = useAuth();
  
  // Get the user's preferred language, defaulting to English
  const preferredLanguage = userProfile?.preferred_language?.toLowerCase() === 'vietnamese'
    ? 'vietnamese'
    : 'english';
  
  const isVietnamese = preferredLanguage === 'vietnamese';
  
  const t = (content: TranslatableContent | string) => {
    if (typeof content === 'string') {
      return content;
    }
    
    return content[preferredLanguage] || content.english;
  };
  
  const toggleLanguage = () => {
    // This would be implemented if needed, for now it's a placeholder
    console.log('Language toggle functionality would go here');
  };
  
  return { t, preferredLanguage, isVietnamese, toggleLanguage };
}
