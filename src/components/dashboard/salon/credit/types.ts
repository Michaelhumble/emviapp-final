
import { Translation } from "@/hooks/useTranslation";

export type CreditOption = {
  id: string;
  title: Translation;
  description: Translation;
  credits: number;
  icon: React.ReactNode;
  action: () => Promise<void>;
};

export type CreditPrompt = {
  title: Translation;
  description: Translation;
  actionText: Translation;
};
