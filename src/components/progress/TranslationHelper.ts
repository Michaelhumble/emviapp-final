
import { TranslationText } from "@/hooks/useTranslation";

// Helper function to create translation objects
export const createTranslation = (english: string, vietnamese: string): TranslationText => {
  return { english, vietnamese };
};

// Create translation object with the same text for both languages
export const createBilingualText = (text: string): TranslationText => {
  return { english: text, vietnamese: text };
};
