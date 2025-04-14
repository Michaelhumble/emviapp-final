
import React from 'react';
import { Notification } from '@/types/notification';
import { NotificationItem } from './NotificationItem';
import { NotificationEmptyState } from './NotificationEmptyState';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardContent } from '@/components/ui/card';

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  maxHeight?: string;
  variant?: 'icon' | 'card';
}

export function NotificationList({ 
  notifications, 
  onNotificationClick, 
  maxHeight = '300px',
  variant = 'icon'
}: NotificationListProps) {
  if (!notifications || notifications.length === 0) {
    return <NotificationEmptyState />;
  }

  return (
    <ScrollArea className={`${variant === 'icon' ? 'h-[300px]' : 'h-[400px]'} ${variant === 'card' ? 'pr-4' : ''}`}>
      <CardContent className={variant === 'icon' ? 'p-2' : undefined}>
        {notifications.map(notification => (
          <NotificationItem 
            key={notification.id} 
            notification={notification} 
            onClick={onNotificationClick} 
          />
        ))}
      </CardContent>
    </ScrollArea>
  );
}
