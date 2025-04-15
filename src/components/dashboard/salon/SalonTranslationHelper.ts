
import { Translation } from "@/hooks/useTranslation";

// Define a type for translatable text
export type TranslatableText = Translation;

// Helper function to create translation objects
export const createTranslation = (english: string, vietnamese: string): Translation => {
  return { english, vietnamese };
};

// Helper function to convert strings to Translation objects
export const toTranslatableText = (text: string): Translation => {
  return { english: text, vietnamese: text };
};
