
import { useCallback, useState } from "react";

export interface LocalBooking {
  id: string;
  clientName: string;
  service: string;
  date: string; // date string (e.g. 2025-05-10)
  time: string; // time string (e.g. 2:00 PM)
  note?: string;
  status: "Pending Confirmation";
  createdAt: Date;
}

export function useLocalBookings() {
  const [bookings, setBookings] = useState<LocalBooking[]>([]);

  const addBooking = useCallback((booking: Omit<LocalBooking, "id" | "status" | "createdAt">) => {
    setBookings((prev) => [
      ...prev,
      {
        ...booking,
        id: Math.random().toString(36).substr(2, 9),
        status: "Pending Confirmation",
        createdAt: new Date(),
      },
    ]);
  }, []);

  return {
    bookings,
    addBooking,
  };
}
