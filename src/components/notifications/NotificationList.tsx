
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NotificationItem from './NotificationItem';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
        </CardTitle>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Mark all as read
          </button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationList;
