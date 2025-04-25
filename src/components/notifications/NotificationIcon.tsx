
import React, { forwardRef } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NotificationIconProps {
  unreadCount: number;
  onClick: () => void;
  className?: string;
}

export const NotificationIcon = forwardRef<HTMLButtonElement, NotificationIconProps>(
  ({ unreadCount, onClick, className = '' }, ref) => {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className={`relative ${className}`}
        onClick={onClick}
        ref={ref}
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
    );
  }
);

NotificationIcon.displayName = 'NotificationIcon';
