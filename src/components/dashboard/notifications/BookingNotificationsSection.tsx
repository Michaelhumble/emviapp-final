
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bell, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface BookingNotification {
  id: string;
  createdAt: string;
  message: string;
  isRead: boolean;
  type: 'booking_created' | 'booking_updated' | 'booking_cancelled' | 'info';
  booking?: {
    id: string;
    clientName?: string;
    service?: string;
    date?: string;
    time?: string;
    status?: string;
  };
}

const BookingNotificationsSection = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<BookingNotification[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch notifications from Supabase
  useEffect(() => {
    if (!user) return;
    
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_read', false)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        
        const formattedNotifications: BookingNotification[] = (data || []).map(notif => {
          // Safely access metadata properties with type checking
          const metadata = notif.metadata as Record<string, any> || {};
          
          return {
            id: notif.id,
            createdAt: notif.created_at,
            message: notif.message,
            isRead: notif.is_read,
            type: (metadata.type as any) || 'info',
            booking: metadata.booking_id ? {
              id: metadata.booking_id,
              clientName: metadata.client_name,
              service: metadata.service_name,
              date: metadata.date,
              time: metadata.time,
              status: metadata.status
            } : undefined
          };
        });
        
        setNotifications(formattedNotifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
    
    // Subscribe to new notifications
    const channel = supabase
      .channel('notifications-channel')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          const newNotif = payload.new as any;
          const metadata = newNotif.metadata as Record<string, any> || {};
          
          // Add new notification to state
          setNotifications(prev => [{
            id: newNotif.id,
            createdAt: newNotif.created_at,
            message: newNotif.message,
            isRead: newNotif.is_read,
            type: (metadata.type as any) || 'info',
            booking: metadata.booking_id ? {
              id: metadata.booking_id,
              clientName: metadata.client_name,
              service: metadata.service_name,
              date: metadata.date,
              time: metadata.time,
              status: metadata.status
            } : undefined
          }, ...prev]);
          
          // Show toast notification
          toast(newNotif.message, {
            duration: 5000,
            icon: getNotificationIcon(metadata.type || 'info'),
            action: {
              label: "View",
              onClick: () => {
                // Mark as read
                markAsRead(newNotif.id);
              }
            }
          });
        })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_created':
        return <Calendar className="h-5 w-5 text-green-500" />;
      case 'booking_updated':
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
      case 'booking_cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const markAsRead = async (notificationId: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);
      
      // Update state
      setNotifications(prev => 
        prev.filter(n => n.id !== notificationId)
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };
  
  const markAllAsRead = async () => {
    if (!user || notifications.length === 0) return;
    
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('id', notifications.map(n => n.id));
      
      // Update state
      setNotifications([]);
      
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };
  
  if (loading) {
    return (
      <div className="w-full">
        <div className="h-16 bg-muted animate-pulse rounded-md mb-2"></div>
        <div className="h-16 bg-muted animate-pulse rounded-md mb-2"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full space-y-2">
      {notifications.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium flex items-center">
              <Bell className="mr-1 h-4 w-4" />
              Recent Notifications
            </h3>
            {notifications.length > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary/80"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className="p-3 bg-muted/40 hover:bg-muted/60 rounded-md flex items-start gap-2 transition-colors"
            >
              {getNotificationIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm">{notification.message}</p>
                <div className="mt-1 flex justify-between items-center">
                  {notification.booking?.status && (
                    <Badge variant="outline" className="text-xs">
                      {notification.booking.status}
                    </Badge>
                  )}
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Mark as read
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center py-6 bg-muted/30 rounded-md">
          <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
          <p className="text-sm text-muted-foreground">No new notifications</p>
        </div>
      )}
    </div>
  );
};

export default BookingNotificationsSection;
