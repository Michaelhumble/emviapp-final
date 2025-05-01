
import React from 'react';
import { Clock } from 'lucide-react';
import { Notification } from '@/types/notification';
import { useTranslation } from '@/hooks/useTranslation';

interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const { t } = useTranslation();

  // Format notification timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return t('Just now');
    if (diffInMinutes < 60) return `${diffInMinutes}m ${t('ago')}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ${t('ago')}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ${t('ago')}`;
    
    return date.toLocaleDateString();
  };

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <span className="text-green-500 text-lg">✓</span>;
      case 'warning':
        return <span className="text-amber-500 text-lg">⚠</span>;
      case 'error':
        return <span className="text-red-500 text-lg">⚠</span>;
      case 'info':
      default:
        return <span className="text-blue-500 text-lg">ℹ</span>;
    }
  };

  return (
    <div 
      className={`mb-2 p-3 rounded-md cursor-pointer transition-colors ${
        notification.isRead ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'
      }`}
      onClick={() => onClick(notification)}
    >
      <div className="flex items-start">
        <div className="mr-2 mt-0.5">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{notification.message}</div>
          <div className="text-xs text-gray-500 mt-1">
            {formatTime(notification.createdAt)}
          </div>
        </div>
        {!notification.isRead && (
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        )}
      </div>
    </div>
  );
}
