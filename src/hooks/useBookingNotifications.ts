
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { useCustomerNotifications } from "./notifications/useCustomerNotifications";
import { useArtistNotifications } from "./notifications/useArtistNotifications";

export const useBookingNotifications = () => {
  const { user, userProfile } = useAuth();
  const { handleBookingStatusChange: customerStatusChange } = useCustomerNotifications();
  const { handleBookingStatusChange: artistStatusChange } = useArtistNotifications();

  useEffect(() => {
    if (!user) return;
    
    // Subscribe to booking changes
    const channel = supabase.channel('booking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: userProfile?.role === 'artist' || userProfile?.role === 'owner' 
            ? `provider_id=eq.${user.id}` 
            : `customer_id=eq.${user.id}`
        },
        (payload) => {
          const newBooking = payload.new as any;
          const oldBooking = payload.old as any;
          
          if (newBooking.status !== oldBooking.status) {
            // Handle status change based on user role
            if (userProfile?.role === 'artist' || userProfile?.role === 'owner') {
              artistStatusChange(newBooking, oldBooking.status);
            } else {
              customerStatusChange(newBooking, oldBooking.status);
            }
          }
        }
      )
      .subscribe();
    
    // Also subscribe to new bookings if this is an artist/owner
    if (userProfile?.role === 'artist' || userProfile?.role === 'owner') {
      const newBookingsChannel = supabase.channel('new-booking-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'bookings',
            filter: `provider_id=eq.${user.id}`
          },
          (payload) => {
            toast.info("New booking request received!", {
              description: "You have a new booking request waiting for your confirmation",
              action: {
                label: "View",
                onClick: () => window.location.href = "/dashboard"
              },
              duration: 5000,
            });
          }
        )
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
        supabase.removeChannel(newBookingsChannel);
      };
    }
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, userProfile]);

  return { subscribed: !!user };
};
