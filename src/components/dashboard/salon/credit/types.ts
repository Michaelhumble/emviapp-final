
import { TranslationText } from "@/hooks/useTranslation";

// Credit-related types and interfaces
export interface CreditOption {
  id: string;
  name: TranslationText;
  description: TranslationText;
  credits: number;
  cost: number;
  popular?: boolean;
  features?: TranslationText[];
}

export interface CreditTransaction {
  id: string;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
  date: string;
}

export interface CreditUsage {
  id: string;
  feature: string;
  credits: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}
