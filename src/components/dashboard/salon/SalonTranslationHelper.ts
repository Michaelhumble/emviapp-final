
import type { Translation } from "@/hooks/useTranslation";

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

// Helper function to safely handle both string and Translation inputs
export const safeTranslation = (input: string | Translation): Translation => {
  if (typeof input === 'string') {
    return { english: input, vietnamese: input };
  }
  return input;
};
