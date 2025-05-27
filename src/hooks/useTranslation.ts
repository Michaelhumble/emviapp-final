
interface TranslationOptions {
  english: string;
  vietnamese: string;
}

export type Translation = TranslationOptions;

export const useTranslation = () => {
  const t = (options: TranslationOptions) => {
    // For now, always return English
    return options.english;
  };

  return { t };
};
