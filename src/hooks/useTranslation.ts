
import { useAuth } from '@/context/auth';
import { TranslatableContent } from '@/types/translation';

export function useTranslation() {
  const { userProfile } = useAuth();
  
  // Get the user's preferred language, defaulting to English
  const preferredLanguage = userProfile?.preferred_language?.toLowerCase() === 'vietnamese'
    ? 'vietnamese'
    : 'english';
  
  const t = (content: TranslatableContent) => {
    if (typeof content === 'string') {
      return content;
    }
    
    return content[preferredLanguage] || content.english;
  };
  
  return { t, preferredLanguage };
}
