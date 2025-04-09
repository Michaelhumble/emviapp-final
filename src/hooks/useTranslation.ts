
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

interface TranslationStrings {
  [key: string]: {
    english: string;
    vietnamese: string;
  };
}

export interface TranslatableText {
  english: string;
  vietnamese: string;
}

export const useTranslation = () => {
  const { userProfile } = useAuth();
  const [strings, setStrings] = useState<TranslationStrings>({});
  const preferredLanguage = userProfile?.preferred_language || 'English';
  const isVietnamese = preferredLanguage === 'vi' || preferredLanguage === 'Vietnamese';
  
  // Fetch translation strings from the database
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const { data, error } = await supabase
          .from('translation_strings')
          .select('key, english, vietnamese');
        
        if (error) throw error;
        
        // Convert array to key-value object
        const translationMap: TranslationStrings = {};
        (data || []).forEach((item: any) => {
          translationMap[item.key] = {
            english: item.english,
            vietnamese: item.vietnamese
          };
        });
        
        setStrings(translationMap);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };
    
    fetchTranslations();
  }, []);
  
  // Translate function for strings
  const translate = (key: string, fallback?: string): string => {
    if (strings[key]) {
      return isVietnamese ? strings[key].vietnamese : strings[key].english;
    }
    return fallback || key;
  };
  
  // Translate function for objects with english/vietnamese properties
  const t = (text: TranslatableText | string): string => {
    if (typeof text === 'string') {
      // For string input, just return the string (no translation)
      return text;
    }
    // For TranslatableText objects, return the appropriate language
    return isVietnamese ? text.vietnamese : text.english;
  };
  
  return {
    translate,
    t,
    isVietnamese,
    preferredLanguage
  };
};
