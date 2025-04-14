
import React, { useState } from 'react';
import { useNotificationContext } from '@/context/notification';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { NotificationList } from './NotificationList';
import { useTranslation } from '@/hooks/useTranslation';

interface NotificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationDrawer({ open, onOpenChange }: NotificationDrawerProps) {
  const { notifications, unreadCount, markAllAsRead } = useNotificationContext();
  const { t } = useTranslation();

  const handleNotificationClick = (notification: any) => {
    // Handle clicking on a notification (mark as read, navigate, etc.)
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[80vh] sm:h-[60vh]">
        <DrawerHeader className="border-b flex flex-row items-center justify-between">
          <DrawerTitle className="flex items-center text-lg">
            <Bell className="mr-2 h-5 w-5" />
            {t({
              english: "Notifications",
              vietnamese: "Thông báo"
            })}
            {unreadCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                {unreadCount}
              </span>
            )}
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="flex-1 overflow-auto">
          <NotificationList 
            notifications={notifications} 
            onNotificationClick={handleNotificationClick}
            variant="card"
          />
        </div>
        
        <DrawerFooter className="border-t pt-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              className="w-full"
            >
              {t({
                english: "Mark all as read",
                vietnamese: "Đánh dấu tất cả đã đọc"
              })}
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
