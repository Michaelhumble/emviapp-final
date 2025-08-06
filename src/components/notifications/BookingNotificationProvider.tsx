import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Bell } from 'lucide-react';

interface BookingNotificationContextType {
  unreadCount: number;
  playNotificationSound: () => void;
  markAsRead: (notificationId: string) => void;
}

const BookingNotificationContext = createContext<BookingNotificationContextType>({
  unreadCount: 0,
  playNotificationSound: () => {},
  markAsRead: () => {}
});

export const useBookingNotifications = () => {
  const context = useContext(BookingNotificationContext);
  if (!context) {
    throw new Error('useBookingNotifications must be used within BookingNotificationProvider');
  }
  return context;
};

interface BookingNotificationProviderProps {
  children: React.ReactNode;
}

export const BookingNotificationProvider: React.FC<BookingNotificationProviderProps> = ({ children }) => {
  const { user, userProfile } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  // Create audio instance for notification sound
  const notificationSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMZBjiR2O/GdSoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmMZBjiR2O/GdSoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmMZ');

  const playNotificationSound = () => {
    try {
      notificationSound.play();
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  };

  const markAsRead = (notificationId: string) => {
    // Implement mark as read functionality
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  useEffect(() => {
    if (!user || !userProfile) return;

    console.log("🔔 Setting up real-time booking notifications for:", userProfile.role);

    // Subscribe to new bookings (for artists/salon owners)
    let newBookingsChannel;
    if (userProfile.role === 'artist' || userProfile.role === 'owner') {
      newBookingsChannel = supabase
        .channel(`new-bookings-${user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'bookings',
            filter: `recipient_id=eq.${user.id}`
          },
          (payload) => {
            console.log("🆕 New booking received:", payload.new);
            const booking = payload.new as any;
            
            // Play notification sound
            playNotificationSound();
            
            // Show FOMO toast notification
            toast.success("🎉 New Booking Request!", {
              description: `${booking.client_name || 'A client'} wants to book ${booking.service_type || 'a service'} with you!`,
              action: {
                label: "View",
                onClick: () => window.location.href = "/dashboard"
              },
              duration: 8000,
              className: "border-green-200 bg-green-50",
              icon: <Bell className="h-5 w-5 text-green-600" />
            });

            // Update unread count
            setUnreadCount(prev => prev + 1);

            // Track conversion analytics
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'booking_received', {
                'custom_map': {'artist_id': user.id}
              });
            }
          }
        )
        .subscribe();
    }

    // Subscribe to booking status changes (for customers)
    const statusChangesChannel = supabase
      .channel(`booking-status-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: userProfile.role === 'artist' || userProfile.role === 'owner' 
            ? `recipient_id=eq.${user.id}` 
            : `sender_id=eq.${user.id}`
        },
        (payload) => {
          console.log("📝 Booking status updated:", payload);
          const newBooking = payload.new as any;
          const oldBooking = payload.old as any;
          
          if (newBooking.status !== oldBooking.status) {
            let toastConfig: any = {};
            
            switch (newBooking.status) {
              case 'accepted':
                toastConfig = {
                  title: "✅ Booking Confirmed!",
                  description: `Your booking with ${newBooking.client_name || 'client'} has been accepted`,
                  className: "border-green-200 bg-green-50"
                };
                break;
              case 'declined':
                toastConfig = {
                  title: "❌ Booking Declined",
                  description: `Your booking request was declined. Try another time slot!`,
                  className: "border-red-200 bg-red-50"
                };
                break;
              case 'completed':
                toastConfig = {
                  title: "🎊 Service Completed!",
                  description: `Thanks for choosing us! Don't forget to leave a review.`,
                  className: "border-blue-200 bg-blue-50"
                };
                break;
            }
            
            if (toastConfig.title) {
              toast.success(toastConfig.title, {
                description: toastConfig.description,
                className: toastConfig.className,
                duration: 6000
              });
              playNotificationSound();
            }
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      console.log("🧹 Cleaning up booking notification channels");
      if (newBookingsChannel) {
        supabase.removeChannel(newBookingsChannel);
      }
      supabase.removeChannel(statusChangesChannel);
    };
  }, [user, userProfile]);

  return (
    <BookingNotificationContext.Provider
      value={{
        unreadCount,
        playNotificationSound,
        markAsRead
      }}
    >
      {children}
    </BookingNotificationContext.Provider>
  );
};