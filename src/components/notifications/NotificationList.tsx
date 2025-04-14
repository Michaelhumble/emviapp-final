import React from 'react';
import { Notification } from '@/types/notification';
import { NotificationItem } from './NotificationItem';
import { NotificationEmptyState } from './NotificationEmptyState';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardContent } from '@/components/ui/card';
import { format, isToday, isYesterday } from 'date-fns';

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

  // Filter weekly summaries for special handling
  const weeklySummaries = notifications.filter(n => n.type === 'weekly_summary');
  const latestWeeklySummary = weeklySummaries.length > 0 
    ? weeklySummaries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;
  
  // Other notifications
  const otherNotifications = notifications.filter(n => n.type !== 'weekly_summary');

  // Group other notifications by date
  const groupedNotifications = otherNotifications.reduce((groups, notification) => {
    const date = new Date(notification.createdAt);
    let groupKey = 'older';
    
    if (isToday(date)) {
      groupKey = 'today';
    } else if (isYesterday(date)) {
      groupKey = 'yesterday';
    }
    
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    
    groups[groupKey].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  return (
    <ScrollArea className={`${variant === 'icon' ? 'h-[300px]' : 'h-[400px]'} ${variant === 'card' ? 'pr-4' : ''}`}>
      <CardContent className={variant === 'icon' ? 'p-2' : undefined}>
        {/* Display latest weekly summary at the top if available */}
        {latestWeeklySummary && (
          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase px-2">
              Weekly Summary
            </h3>
            <NotificationItem 
              key={latestWeeklySummary.id} 
              notification={latestWeeklySummary} 
              onClick={onNotificationClick} 
            />
          </div>
        )}
        
        {/* Display other notifications grouped by date */}
        {Object.entries(groupedNotifications).map(([group, items]) => (
          <div key={group} className="mb-4">
            <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase px-2">
              {group === 'today' 
                ? 'Today' 
                : group === 'yesterday' 
                  ? 'Yesterday' 
                  : 'Older'}
            </h3>
            {items.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onClick={onNotificationClick} 
              />
            ))}
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
