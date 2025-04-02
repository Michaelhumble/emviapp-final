
export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  sender_name?: string; // Name of the sender (for display)
  recipient_name?: string; // Name of the recipient (for display)
  date_requested: string;
  time_requested: string;
  note: string;
  status: "pending" | "accepted" | "declined" | "completed";
  created_at: string;
}

export interface BookingFormData {
  recipientId: string;
  date: string;
  time: string;
  note: string;
}
