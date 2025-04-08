
import { useState, useEffect } from 'react';
import { Bell, CheckCircle, Calendar, AlertTriangle, X, User, CheckCheck } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Notification } from '@/types/notification';
import { useNotifications } from '@/hooks/useNotifications';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

interface NotificationCenterProps {
  variant?: 'popover' | 'card';
  className?: string;
}

export const NotificationCenter = ({ 
  variant = 'popover',
  className = '' 
}: NotificationCenterProps) => {
  const { t } = useTranslation();
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  // Get notification icon based on notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      case 'info':
      default:
        return <User className="h-4 w-4 text-blue-500" />;
    }
  };
  
  // Format creation date
  const formatCreationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} ${t('minute', { 
        english: diffMinutes === 1 ? 'minute' : 'minutes', 
        vietnamese: diffMinutes === 1 ? 'phút' : 'phút' 
      })} ${t('ago', { english: 'ago', vietnamese: 'trước' })}`;
    } else if (diffHours < 24) {
      return `${diffHours} ${t('hour', { 
        english: diffHours === 1 ? 'hour' : 'hours', 
        vietnamese: diffHours === 1 ? 'giờ' : 'giờ' 
      })} ${t('ago', { english: 'ago', vietnamese: 'trước' })}`;
    } else {
      return `${diffDays} ${t('day', { 
        english: diffDays === 1 ? 'day' : 'days', 
        vietnamese: diffDays === 1 ? 'ngày' : 'ngày' 
      })} ${t('ago', { english: 'ago', vietnamese: 'trước' })}`;
    }
  };
  
  // If using card variant, render as a card
  if (variant === 'card') {
    return (
      <Card className={`${className}`}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-500" />
            {t('notification_center', { 
              english: 'Notification Center', 
              vietnamese: 'Trung tâm thông báo' 
            })}
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-blue-500">{unreadCount}</Badge>
            )}
          </CardTitle>
          
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-1" />
              {t('mark_all_read', { 
                english: 'Mark all as read', 
                vietnamese: 'Đánh dấu tất cả là đã đọc' 
              })}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`flex items-start gap-3 pb-2 border-b border-gray-100 last:border-b-0 
                    ${!notification.isRead ? 'bg-blue-50/40 rounded-md p-2' : 'p-2'}`}
                >
                  <div className={`p-2 rounded-full mt-1 ${
                    notification.type === 'warning' 
                      ? 'bg-amber-100' 
                      : notification.type === 'success'
                        ? 'bg-green-100'
                        : notification.type === 'error'
                          ? 'bg-red-100'
                          : 'bg-blue-100'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    {notification.link ? (
                      <Link 
                        to={notification.link} 
                        className="text-sm text-gray-800 hover:text-blue-600"
                        onClick={() => markAsRead(notification.id)}
                      >
                        {notification.message}
                      </Link>
                    ) : (
                      <p className="text-sm text-gray-800">{notification.message}</p>
                    )}
                    <p className="text-xs text-gray-500">{formatCreationDate(notification.createdAt)}</p>
                  </div>
                  {!notification.isRead && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 w-6 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">
                {t('no_notifications', { 
                  english: 'No notifications at this time', 
                  vietnamese: 'Không có thông báo vào lúc này' 
                })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  
  // Default popover variant
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className}`}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">
            {t('notifications', { 
              english: 'Notifications', 
              vietnamese: 'Thông báo' 
            })}
          </h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8">
              <CheckCheck className="h-3 w-3 mr-1" />
              <span className="text-xs">
                {t('mark_all_read', { 
                  english: 'Mark all as read', 
                  vietnamese: 'Đánh dấu tất cả là đã đọc' 
                })}
              </span>
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {loading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            <div>
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`flex items-start gap-3 p-3 border-b border-gray-100 last:border-b-0 
                    ${!notification.isRead ? 'bg-blue-50/40' : ''}`}
                >
                  <div className={`p-1.5 rounded-full ${
                    notification.type === 'warning' 
                      ? 'bg-amber-100' 
                      : notification.type === 'success'
                        ? 'bg-green-100'
                        : notification.type === 'error'
                          ? 'bg-red-100'
                          : 'bg-blue-100'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    {notification.link ? (
                      <Link 
                        to={notification.link} 
                        className="text-sm text-gray-800 hover:text-blue-600"
                        onClick={() => {
                          markAsRead(notification.id);
                          setIsOpen(false);
                        }}
                      >
                        {notification.message}
                      </Link>
                    ) : (
                      <p className="text-sm text-gray-800">{notification.message}</p>
                    )}
                    <p className="text-xs text-gray-500">{formatCreationDate(notification.createdAt)}</p>
                  </div>
                  {!notification.isRead && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 w-6 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8">
              <Bell className="h-8 w-8 text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm">
                {t('no_notifications', { 
                  english: 'No notifications at this time', 
                  vietnamese: 'Không có thông báo vào lúc này' 
                })}
              </p>
            </div>
          )}
        </ScrollArea>
        <div className="p-2 border-t text-center">
          <Button variant="link" asChild className="text-xs h-auto">
            <Link to="/notifications">
              {t('view_all', { 
                english: 'View all notifications', 
                vietnamese: 'Xem tất cả thông báo' 
              })}
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
