
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

// Define types for translation strings
interface TranslationString {
  key: string;
  english: string;
  vietnamese: string;
  context?: string;
}

export type TranslationValue = string | { english: string; vietnamese: string } | { count: number } | { defaultValue: string };

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

  // Translation function with proper type handling
  const t = (key: string | TranslationValue, defaultText?: string): string => {
    if (!key) return defaultText || "";
    
    // Handle the case where key is an object with english/vietnamese properties
    if (typeof key === 'object' && key !== null) {
      if ('english' in key && 'vietnamese' in key) {
        return preferredLanguage.toLowerCase() === 'vietnamese' || 
               preferredLanguage.toLowerCase() === 'tiếng việt'
               ? key.vietnamese
               : key.english;
      }
      
      // Handle { count: number } format
      if ('count' in key) {
        return key.count.toString();
      }
      
      // Handle { defaultValue: string } format
      if ('defaultValue' in key) {
        return key.defaultValue;
      }
      
      // Fallback for any other object type
      return defaultText || '';
    }
    
    // Use optional chaining and nullish coalescing for safety
    const item = translations.find(t => t?.key === key);
    
    // Add null check before accessing properties
    if (!item) {
      return defaultText || (typeof key === 'string' ? key : '');
    }
    
    if (preferredLanguage.toLowerCase() === 'vietnamese' || 
        preferredLanguage.toLowerCase() === 'tiếng việt') {
      return item.vietnamese || item.english || defaultText || (typeof key === 'string' ? key : '');
    }
    
    return item.english || defaultText || (typeof key === 'string' ? key : '');
  };

  return { t, loading };
};

export default useTranslation;
