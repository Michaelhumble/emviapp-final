
export interface CreditHistoryItem {
  id: string;
  user_id: string;
  action_type: string;
  value: number;
  description?: string;
  created_at: string;
}

export interface CreditStats {
  earned: number;
  spent: number;
  supported: number;
}
