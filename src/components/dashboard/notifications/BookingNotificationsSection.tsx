
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotificationContext } from '@/context/notification';
import { Notification } from '@/types/notification';
import { useAuth } from '@/context/auth';
import { Calendar, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const BookingNotificationsSection = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotificationContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Filter only booking-related notifications
  const bookingNotifications = notifications.filter(
    notification => 
      notification.message.includes('booking') || 
      notification.message.includes('appointment') ||
      notification.message.includes('lịch hẹn')
  );
  
  const unreadCount = bookingNotifications.filter(n => !n.isRead).length;

  // Handle click on a notification
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    // Navigate if there's a link
    if (notification.link) {
      navigate(notification.link);
    }
  };

  // Format time since notification was created
  const formatTimeSince = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return t({ english: 'Just now', vietnamese: 'Vừa xong' });
    if (diffInMinutes < 60) return `${diffInMinutes}${t({ english: 'm ago', vietnamese: ' phút trước' })}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}${t({ english: 'h ago', vietnamese: ' giờ trước' })}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}${t({ english: 'd ago', vietnamese: ' ngày trước' })}`;
    
    return date.toLocaleDateString();
  };

  // Get icon for notification status
  const getNotificationIcon = (message: string) => {
    if (message.includes('confirmed') || message.includes('accepted') || message.includes('xác nhận')) {
      return <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />;
    } else if (message.includes('declined') || message.includes('cancelled') || message.includes('hủy') || message.includes('từ chối')) {
      return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
    } else if (message.includes('new') || message.includes('mới')) {
      return <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0" />;
    } else {
      return <AlertCircle className="h-5 w-5 text-gray-500 flex-shrink-0" />;
    }
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="py-8 px-4 text-center">
      <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
      <p className="text-gray-500 mb-2">
        {t({
          english: "No booking notifications yet",
          vietnamese: "Chưa có thông báo lịch hẹn nào"
        })}
      </p>
      <p className="text-xs text-gray-400">
        {t({
          english: "We'll notify you about your appointments here",
          vietnamese: "Chúng tôi sẽ thông báo cho bạn về các lịch hẹn ở đây"
        })}
      </p>
    </div>
  );

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          {t({
            english: "Booking Notifications",
            vietnamese: "Thông báo lịch hẹn"
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
        <ScrollArea className="h-[300px] pr-4">
          {bookingNotifications.length > 0 ? (
            <div className="space-y-3">
              {bookingNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-start ${
                    notification.isRead ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="mr-3 mt-0.5">
                    {getNotificationIcon(notification.message)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 mb-1">{notification.message}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeSince(notification.createdAt)}
                    </div>
                  </div>
                  
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            renderEmptyState()
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BookingNotificationsSection;
