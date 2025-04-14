
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'booking_created' | 'booking_reminder' | 
         'booking_pending' | 'booking_updated' | 'booking_accepted' | 'booking_cancelled' | 
         'message_received' | 'credits_low' | 'weekly_summary' | 'profile_incomplete';
  createdAt: string;
  isRead: boolean;
  link?: string;
  metadata?: Record<string, any>;
}

export interface NotificationResponse {
  notifications: Notification[];
  unreadCount: number;
}
