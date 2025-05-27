
import type { Translation } from "@/hooks/useTranslation";

export const wrapTranslation = (english: string, vietnamese?: string): Translation => {
  return {
    english,
    vietnamese: vietnamese || english
  };
};

export const simpleTranslation = (text: string): Translation => {
  return wrapTranslation(text);
};
