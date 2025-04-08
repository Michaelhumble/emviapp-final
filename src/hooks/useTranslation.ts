
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { TranslationString } from '@/components/referral/types';

type TranslationParam = 
  | string 
  | { english: string; vietnamese: string }
  | { defaultValue: string }
  | { count: number };

export const useTranslation = () => {
  const { userProfile } = useAuth();
  const [translations, setTranslations] = useState<TranslationString[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch translations from the database
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        // Use a type assertion here since the Supabase TypeScript definitions
        // might not be updated with the new tables yet
        const { data, error } = await supabase
          .from('translation_strings' as any)
          .select('key, english, vietnamese');
          
        if (error) {
          console.error('Error fetching translations:', error);
          return;
        }
        
        // Make sure the data is in the correct format and handle potential errors
        if (data && Array.isArray(data)) {
          const typedData = data.map(item => {
            // First check if item is null or undefined
            if (!item) {
              return {
                key: 'error',
                english: 'Translation error',
                vietnamese: 'Lỗi dịch'
              };
            }
            
            // Check if item is an object and has required properties
            if (typeof item === 'object' && item !== null) {
              return {
                key: String(item.key || ''),
                english: String(item.english || ''),
                vietnamese: String(item.vietnamese || '')
              };
            }
            
            // Default values if data is malformed
            return {
              key: 'error',
              english: 'Translation error',
              vietnamese: 'Lỗi dịch'
            };
          });
          
          setTranslations(typedData);
        } else {
          // Set empty array if data is not as expected
          setTranslations([]);
        }
      } catch (err) {
        console.error('Exception fetching translations:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTranslations();
  }, []);
  
  // Get translation for a specific key
  const t = (key: string, params?: TranslationParam) => {
    const isVietnamese = userProfile?.preferred_language?.toLowerCase() === 'vietnamese' || 
                          userProfile?.preferred_language?.toLowerCase() === 'tiếng việt';
    
    // If params is an object with english/vietnamese keys, use those directly
    if (params && typeof params === 'object' && 'english' in params && 'vietnamese' in params) {
      return isVietnamese ? params.vietnamese : params.english;
    }
    
    // If params is an object with defaultValue key, use that
    if (params && typeof params === 'object' && 'defaultValue' in params) {
      return params.defaultValue;
    }
    
    // If params is an object with count, use that for pluralization
    if (params && typeof params === 'object' && 'count' in params) {
      // Simple pluralization logic
      const count = params.count;
      const translation = translations.find(t => t.key === key);
      if (!translation) return `${count} ${key}`; // Return count + key if translation not found
      
      let text = isVietnamese ? translation.vietnamese : translation.english;
      return text.replace('{count}', String(count));
    }
    
    // Original behavior for database lookup
    const translation = translations.find(t => t.key === key);
    if (!translation) return key; // Return key if translation not found
    
    let text = isVietnamese ? translation.vietnamese : translation.english;
    
    // Replace params in string if provided and is a record
    if (params && typeof params === 'object' && !('english' in params) && !('vietnamese' in params) && !('defaultValue' in params) && !('count' in params)) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, String(value));
      });
    }
    
    return text;
  };
  
  return { t, loading };
};
