
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function NotificationEmptyState() {
  const { t } = useTranslation();
  
  return (
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
}
