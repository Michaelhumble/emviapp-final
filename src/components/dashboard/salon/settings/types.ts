
export interface SalonPlanType {
  id: string;
  name: string;
  description: string;
  price: number;
  staffLimit: number;
  features: string[];
  hasTrial?: boolean;
}

export interface NotificationSettings {
  id?: string;
  user_id: string;
  email_reminders_enabled: boolean;
  sms_reminders_enabled?: boolean;
  reminder_hours_before?: number;
  created_at?: string;
  updated_at?: string;
}
