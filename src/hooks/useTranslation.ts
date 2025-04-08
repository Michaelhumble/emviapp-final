
// Fix for the TypeScript error - we need to add proper null checks
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

// Define types for translation strings
interface TranslationString {
  key: string;
  english: string;
  vietnamese: string;
  context?: string;
}

export const useTranslation = (preferredLanguage: string = 'English') => {
  const [translations, setTranslations] = useState<TranslationString[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('translation_strings')
          .select('*');

        if (error) {
          console.error('Error fetching translations:', error);
        } else {
          setTranslations(data || []);
        }
      } catch (err) {
        console.error('Exception in fetchTranslations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  // Fixed translation function with proper null checks
  const t = (key: string, defaultText?: string): string => {
    // Use optional chaining and nullish coalescing for safety
    const item = translations.find(t => t?.key === key);
    
    // Add null check before accessing properties
    if (!item) {
      return defaultText || key;
    }
    
    if (preferredLanguage.toLowerCase() === 'vietnamese' || 
        preferredLanguage.toLowerCase() === 'tiếng việt') {
      return item.vietnamese || item.english || defaultText || key;
    }
    
    return item.english || defaultText || key;
  };

  return { t, loading };
};

export default useTranslation;
