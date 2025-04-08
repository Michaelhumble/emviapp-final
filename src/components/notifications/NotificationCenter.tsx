
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from '@/hooks/useTranslation';
import { useNotificationContext } from '@/context/notification';
import { Notification } from '@/types/notification';

interface NotificationCenterProps {
  className?: string;
  variant?: 'icon' | 'card';
}

export function NotificationCenter({ 
  className = '', 
  variant = 'icon' 
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationContext();

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
    
    // Set up interval to periodically fetch notifications
    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, [fetchNotifications]);

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

  // Render notification item
  const renderNotificationItem = (notification: Notification) => (
    <div 
      key={notification.id}
      className={`mb-2 p-3 rounded-md cursor-pointer transition-colors ${
        notification.isRead ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'
      }`}
      onClick={() => handleNotificationClick(notification)}
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

  // Render empty state
  const renderEmptyState = () => (
    <div className="py-8 px-4 text-center">
      <p className="text-gray-500 mb-2">
        {t({
          english: "No notifications yet",
          vietnamese: "Chưa có thông báo nào"
        })}
      </p>
      <p className="text-xs text-gray-400">
        {t({
          english: "We'll notify you of important updates",
          vietnamese: "Chúng tôi sẽ thông báo cho bạn về các cập nhật quan trọng"
        })}
      </p>
    </div>
  );

  // Icon variant
  if (variant === 'icon') {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`relative ${className}`}
            onClick={() => fetchNotifications()}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center"
                variant="destructive"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <CardHeader className="px-4 py-3 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              {t({
                english: "Notifications",
                vietnamese: "Thông báo"
              })}
            </CardTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs"
                onClick={() => markAllAsRead()}
              >
                {t({
                  english: "Mark all as read",
                  vietnamese: "Đánh dấu tất cả đã đọc"
                })}
              </Button>
            )}
          </CardHeader>
          <ScrollArea className="h-[300px]">
            <CardContent className="p-2">
              {notifications.length > 0 
                ? notifications.map(renderNotificationItem)
                : renderEmptyState()
              }
            </CardContent>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  }

  // Card variant
  return (
    <Card className={className}>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          {t({
            english: "Notifications",
            vietnamese: "Thông báo"
          })}
          {unreadCount > 0 && (
            <Badge className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => markAllAsRead()}
          >
            {t({
              english: "Mark all as read",
              vietnamese: "Đánh dấu tất cả đã đọc"
            })}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {notifications.length > 0 
            ? notifications.map(renderNotificationItem)
            : renderEmptyState()
          }
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
