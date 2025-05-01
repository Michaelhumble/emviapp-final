
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function NotificationEmptyState() {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <div className="py-8 px-4 text-center">
      <p className="text-gray-500 mb-2">
        {isVietnamese ? "Chưa có thông báo nào" : "No notifications yet"}
      </p>
      <p className="text-xs text-gray-400">
        {isVietnamese ? "Chúng tôi sẽ thông báo cho bạn về các cập nhật quan trọng" : "We'll notify you of important updates"}
      </p>
    </div>
  );
}
