
import React, { useState } from 'react';
import { useNotificationContext } from '@/context/notification';
import { Notification } from '@/types/notification';
import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { NotificationIcon } from './NotificationIcon';
import { NotificationHeader } from './NotificationHeader';
import { NotificationList } from './NotificationList';

interface NotificationCenterProps {
  className?: string;
  variant?: 'icon' | 'card';
}

export function NotificationCenter({ 
  className = '', 
  variant = 'icon' 
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationContext();

  // Handler for clicking on a notification
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    // Handle navigation if there's a link
    if (notification.link) {
      window.location.href = notification.link;
    }
    
    // Close the popover if it's the icon variant
    if (variant === 'icon') {
      setOpen(false);
    }
  };

  // Icon variant
  if (variant === 'icon') {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <NotificationIcon 
            unreadCount={unreadCount}
            onClick={() => fetchNotifications()}
            className={className}
          />
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <NotificationHeader 
            unreadCount={unreadCount}
            onMarkAllAsRead={markAllAsRead}
            variant="icon"
          />
          <NotificationList 
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            variant="icon"
          />
        </PopoverContent>
      </Popover>
    );
  }

  // Card variant
  return (
    <Card className={className}>
      <NotificationHeader 
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
        variant="card"
      />
      <NotificationList 
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        maxHeight="400px"
        variant="card"
      />
    </Card>
  );
}
