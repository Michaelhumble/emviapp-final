
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
  variant?: 'icon' | 'card';
}

export function NotificationHeader({ unreadCount, onMarkAllAsRead, variant = 'icon' }: NotificationHeaderProps) {
  const { t } = useTranslation();

  if (variant === 'icon') {
    return (
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
            onClick={onMarkAllAsRead}
          >
            {t({
              english: "Mark all as read",
              vietnamese: "Đánh dấu tất cả đã đọc"
            })}
          </Button>
        )}
      </CardHeader>
    );
  }

  return (
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
          onClick={onMarkAllAsRead}
        >
          {t({
            english: "Mark all as read",
            vietnamese: "Đánh dấu tất cả đã đọc"
          })}
        </Button>
      )}
    </CardHeader>
  );
}
