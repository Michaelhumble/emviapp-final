
import { TranslationText } from "@/hooks/useTranslation";

// Define a type for translatable text
export type TranslatableText = TranslationText;

// Helper function to create translation objects
export const createTranslation = (english: string, vietnamese: string): TranslationText => {
  return { english, vietnamese };
};

// Helper function to convert strings to Translation objects
export const toTranslatableText = (text: string): TranslationText => {
  return { english: text, vietnamese: text };
};
