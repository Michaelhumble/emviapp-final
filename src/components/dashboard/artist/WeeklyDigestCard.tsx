
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useWeeklyDigest } from '@/hooks/useWeeklyDigest';
import { Button } from '@/components/ui/button';
import { BarChart, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function WeeklyDigestCard() {
  const { latestDigest, loading, refreshDigest } = useWeeklyDigest();
  const { t } = useTranslation();
  
  const handleRefresh = () => {
    refreshDigest();
  };
  
  const formattedRevenue = latestDigest?.total_revenue 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(latestDigest.total_revenue)
    : '$0';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-emerald-500" />
          {t({
            english: "Weekly Performance",
            vietnamese: "Hiệu suất Hàng tuần"
          })}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="h-24 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading weekly data...</p>
          </div>
        ) : !latestDigest ? (
          <div className="h-24 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              {t({
                english: "No weekly summary available yet",
                vietnamese: "Chưa có bản tóm tắt hàng tuần"
              })}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {latestDigest.start_date && latestDigest.end_date && (
              <p className="text-xs text-muted-foreground">
                {t({
                  english: `Week of ${latestDigest.start_date} - ${latestDigest.end_date}`,
                  vietnamese: `Tuần từ ${latestDigest.start_date} - ${latestDigest.end_date}`
                })}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold">{formattedRevenue}</span>
                <span className="text-xs text-muted-foreground">
                  {t({
                    english: "Total Revenue",
                    vietnamese: "Tổng Doanh Thu"
                  })}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xl font-bold">{latestDigest.booking_count}</span>
                <span className="text-xs text-muted-foreground">
                  {t({
                    english: "Completed Bookings",
                    vietnamese: "Đặt chỗ Hoàn thành"
                  })}
                </span>
              </div>
            </div>
            
            {latestDigest.most_booked_day && (
              <div className="pt-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {t({
                    english: "Most Popular Day:",
                    vietnamese: "Ngày Phổ biến Nhất:"
                  })}
                </span>
                <span className="text-xs ml-1 text-foreground">{latestDigest.most_booked_day}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
