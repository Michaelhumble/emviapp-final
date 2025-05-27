
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  title,
  message,
  type,
  isRead,
  createdAt,
  onMarkAsRead,
}) => {
  const { t } = useTranslation();
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
        !isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
      }`}
      onClick={() => !isRead && onMarkAsRead(id)}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`text-sm font-medium ${!isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                {title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {message}
              </p>
            </div>
            {!isRead && (
              <div className="flex-shrink-0 ml-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">{timeAgo}</span>
            {!isRead && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(id);
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                {t({ english: "Mark as read", vietnamese: "Đánh dấu đã đọc" })}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
