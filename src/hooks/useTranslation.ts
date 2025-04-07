
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { TranslationString } from '@/components/referral/types';

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
            if (typeof item === 'object' && 'key' in item && 'english' in item && 'vietnamese' in item) {
              return {
                key: String(item.key),
                english: String(item.english),
                vietnamese: String(item.vietnamese)
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
  const t = (key: string, params?: Record<string, string | number>) => {
    const isVietnamese = userProfile?.preferred_language?.toLowerCase() === 'vietnamese' || 
                          userProfile?.preferred_language?.toLowerCase() === 'tiếng việt';
    
    const translation = translations.find(t => t.key === key);
    if (!translation) return key; // Return key if translation not found
    
    let text = isVietnamese ? translation.vietnamese : translation.english;
    
    // Replace params in string if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value));
      });
    }
    
    return text;
  };
  
  return { t, loading };
};
