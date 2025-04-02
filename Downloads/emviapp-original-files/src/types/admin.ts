
export interface User {
  id: string;
  email: string;
  full_name: string;
  role?: string;
  created_at?: string;
  [key: string]: any;
}

export interface SupportQuestion {
  id: string;
  user_id: string;
  question: string;
  timestamp: string;
  resolved: boolean;
  user_email?: string;
}

export interface AdminMetrics {
  userSignups: {
    labels: string[];
    data: number[];
  };
  supportTickets: {
    labels: string[];
    data: number[];
  };
  bookingRequests: {
    labels: string[];
    data: number[];
  };
}

export interface MetricCard {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}
