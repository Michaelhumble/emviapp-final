
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export interface BookingCounts {
  pending: number;
  accepted: number;
  completed: number;
  declined: number;
  cancelled: number;
  total: number;
}

export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  client_name?: string;
  client_avatar?: string;
  service_id?: string;
  service_name?: string;
  date_requested?: string;
  time_requested?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  note?: string;
  created_at: string;
}

export const useArtistBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // For now, return mock data as we don't have a bookings table yet
        // This will be replaced with actual database queries once the table is set up
        const mockBookings: Booking[] = [
          {
            id: '1',
            sender_id: 'client1',
            recipient_id: user.id,
            client_name: 'Jane Smith',
            client_avatar: '',
            service_name: 'Manicure',
            date_requested: '2025-05-01',
            time_requested: '10:00 AM',
            status: 'pending',
            created_at: '2025-04-20T10:00:00Z'
          },
          {
            id: '2',
            sender_id: 'client2',
            recipient_id: user.id,
            client_name: 'Mike Johnson',
            client_avatar: '',
            service_name: 'Pedicure',
            date_requested: '2025-05-02',
            time_requested: '2:00 PM',
            status: 'accepted',
            created_at: '2025-04-19T14:30:00Z'
          },
          {
            id: '3',
            sender_id: 'client3',
            recipient_id: user.id,
            client_name: 'Sarah Williams',
            client_avatar: '',
            service_name: 'Nail Art',
            date_requested: '2025-05-03',
            time_requested: '11:30 AM',
            status: 'completed',
            created_at: '2025-04-18T09:15:00Z'
          }
        ];
        
        setBookings(mockBookings);
        
        // Extract unique service types
        const uniqueServiceTypes = Array.from(
          new Set(
            mockBookings
              .filter(booking => booking.service_name)
              .map(booking => booking.service_name as string)
          )
        );
        
        setServiceTypes(uniqueServiceTypes);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);
  
  const handleAccept = async (bookingId: string) => {
    // Mock implementation - will be replaced with actual database update
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'accepted' } 
        : booking
    ));
    
    toast.success('Booking accepted successfully');
  };
  
  const handleDecline = async (bookingId: string) => {
    // Mock implementation - will be replaced with actual database update
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'declined' } 
        : booking
    ));
    
    toast.success('Booking declined');
  };
  
  // Calculate booking counts
  const calculateCounts = (): BookingCounts => {
    const pending = bookings.filter(b => b.status === 'pending').length;
    const accepted = bookings.filter(b => b.status === 'accepted').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const declined = bookings.filter(b => b.status === 'declined').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const total = bookings.length;
    
    return {
      pending,
      accepted,
      completed,
      declined,
      cancelled,
      total
    };
  };
  
  return {
    bookings,
    loading,
    handleAccept,
    handleDecline,
    serviceTypes,
    counts: calculateCounts()
  };
};
