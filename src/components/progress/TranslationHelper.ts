
import { TranslatableText } from '@/hooks/useTranslation';

// Helper function to convert strings to TranslatableText objects
export function toTranslatableText(english: string, vietnamese?: string): TranslatableText {
  return {
    english,
    vietnamese: vietnamese || english
  };
}
