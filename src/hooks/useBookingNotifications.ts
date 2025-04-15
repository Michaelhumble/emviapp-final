
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { useCustomerNotifications } from "./notifications/useCustomerNotifications";
import { useArtistNotifications } from "./notifications/useArtistNotifications";

export const useBookingNotifications = () => {
  const { user, userProfile } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { handleBookingStatusChange: customerStatusChange } = useCustomerNotifications();
  const { handleBookingStatusChange: artistStatusChange } = useArtistNotifications();

  useEffect(() => {
    if (!user || !userProfile) return;
    
    console.log("Setting up booking notifications for user:", user.id, "with role:", userProfile.role);
    
    // Subscribe to booking changes
    const channel = supabase.channel('booking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: userProfile?.role === 'artist' || userProfile?.role === 'owner' 
            ? `recipient_id=eq.${user.id}` 
            : `sender_id=eq.${user.id}`
        },
        (payload) => {
          console.log("Booking update received:", payload);
          const newBooking = payload.new as any;
          const oldBooking = payload.old as any;
          
          if (newBooking.status !== oldBooking.status) {
            console.log(`Booking status changed from ${oldBooking.status} to ${newBooking.status}`);
            // Handle status change based on user role
            if (userProfile?.role === 'artist' || userProfile?.role === 'owner') {
              artistStatusChange(newBooking, oldBooking.status);
            } else {
              customerStatusChange(newBooking, oldBooking.status);
            }
          }
        }
      )
      .subscribe((status) => {
        console.log("Booking notification subscription status:", status);
        setIsSubscribed(status === 'SUBSCRIBED');
      });
    
    // Also subscribe to new bookings if this is an artist/owner
    let newBookingsChannel;
    if (userProfile?.role === 'artist' || userProfile?.role === 'owner') {
      newBookingsChannel = supabase.channel('new-booking-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'bookings',
            filter: `recipient_id=eq.${user.id}`
          },
          (payload) => {
            console.log("New booking received:", payload);
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
        .subscribe((status) => {
          console.log("New booking notification subscription status:", status);
        });
    }
    
    return () => {
      console.log("Cleaning up booking notification channels");
      supabase.removeChannel(channel);
      if (newBookingsChannel) {
        supabase.removeChannel(newBookingsChannel);
      }
    };
  }, [user, userProfile, artistStatusChange, customerStatusChange]);

  return { subscribed: isSubscribed };
};
