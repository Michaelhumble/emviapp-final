
export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  date: Date | null;
  time: string;
  status: string;
  notes: string;
  createdAt: string;
}

export type BookingStatus = "all" | "pending" | "accepted" | "completed" | "cancelled" | "declined";
