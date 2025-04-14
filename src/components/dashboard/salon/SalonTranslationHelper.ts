
import { TranslatableText } from '@/hooks/useTranslation';

// Helper function to convert strings to TranslatableText objects
export function toTranslatableText(english: string, vietnamese?: string): TranslatableText {
  return {
    english,
    vietnamese: vietnamese || english
  };
}

// Usage in components:
// Replace: t("Some text")
// With: t(toTranslatableText("Some text"))
// 
// Or with Vietnamese translation:
// t(toTranslatableText("English text", "Vietnamese text"))
