
import React from 'react';
import { Notification } from '@/types/notification';
import { Card, CardContent } from '@/components/ui/card';
import { WeeklyDigestStats } from '@/hooks/useWeeklyDigest';

interface WeeklyDigestContentProps {
  notification: Notification;
}

export function WeeklyDigestContent({ notification }: WeeklyDigestContentProps) {
  // Safe check if metadata and stats exist
  if (!notification.metadata || !notification.metadata.stats) {
    return <p>{notification.message}</p>;
  }
  
  const stats = notification.metadata.stats as WeeklyDigestStats;
  const startDate = notification.metadata.start_date as string;
  const endDate = notification.metadata.end_date as string;
  
  const formattedRevenue = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(stats.total_revenue);
  
  return (
    <div className="space-y-2">
      <p className="font-medium">{notification.message}</p>
      
      {startDate && endDate && (
        <p className="text-xs text-muted-foreground">
          Week of {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
        </p>
      )}
      
      <Card className="bg-muted/50">
        <CardContent className="p-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Bookings:</span>
            <span className="text-sm font-semibold">{stats.booking_count}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Revenue:</span>
            <span className="text-sm font-semibold">{formattedRevenue}</span>
          </div>
          {stats.most_booked_day && (
            <div className="flex justify-between">
              <span className="text-sm">Most Booked:</span>
              <span className="text-sm font-semibold">{stats.most_booked_day}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
