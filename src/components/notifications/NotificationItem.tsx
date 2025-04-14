
import React from 'react';
import { Notification } from '@/types/notification';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { WeeklyDigestContent } from './WeeklyDigestContent';

// Import various icons for different notification types
import { 
  Calendar, 
  MessageSquare, 
  CheckSquare, 
  AlertCircle,
  CreditCard,
  BarChart,
  UserCheck
} from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

export function NotificationItem({ 
  notification, 
  onClick 
}: NotificationItemProps) {
  const handleClick = () => {
    onClick(notification);
  };
  
  // Function to get appropriate icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'booking_created':
      case 'booking_reminder':
      case 'booking_pending':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'booking_updated':
      case 'booking_accepted':
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case 'booking_cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'message_received':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'credits_low':
        return <CreditCard className="h-5 w-5 text-amber-500" />;
      case 'weekly_summary':
        return <BarChart className="h-5 w-5 text-emerald-500" />;
      case 'profile_incomplete':
        return <UserCheck className="h-5 w-5 text-orange-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Format the time (e.g., "2 hours ago" or date if older)
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  return (
    <div 
      className={cn(
        "flex items-start p-3 hover:bg-muted cursor-pointer border-b border-gray-100 transition-colors",
        !notification.isRead && "bg-muted/50"
      )}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 mr-3 mt-1">
        {getIcon()}
      </div>
      
      <div className="flex-grow">
        {notification.type === 'weekly_summary' ? (
          <WeeklyDigestContent notification={notification} />
        ) : (
          <p className={cn(
            "text-sm",
            !notification.isRead && "font-medium"
          )}>
            {notification.message}
          </p>
        )}
        
        <p className="text-xs text-gray-500 mt-1">
          {formatTime(notification.createdAt)}
        </p>
      </div>
    </div>
  );
}
