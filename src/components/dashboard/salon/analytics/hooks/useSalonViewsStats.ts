
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { useSalonContext } from "@/context/salon";
import { format, subDays, eachDayOfInterval } from "date-fns";

export interface DailyViewData {
  date: string;
  views: number;
}

export interface ViewsStatsData {
  totalViews: number;
  viewsByDay: DailyViewData[];
}

export function useSalonViewsStats(timeRange: "30days" | "60days" | "90days") {
  const { currentSalonId } = useSalonContext();
  const daysToGoBack = timeRange === "30days" ? 30 : timeRange === "60days" ? 60 : 90;

  const fetchViewStats = async (): Promise<ViewsStatsData> => {
    if (!currentSalonId) {
      throw new Error("No salon selected");
    }

    const today = new Date();
    const startDate = subDays(today, daysToGoBack);
    
    // Get total views for the period
    const { data: totalData, error: totalError } = await supabase
      .from('salon_views')
      .select('id', { count: 'exact' })
      .eq('salon_id', currentSalonId)
      .gte('viewed_at', startDate.toISOString());
      
    if (totalError) throw totalError;
    
    // Get daily data - we'll group by day in the JavaScript code
    const { data: viewsData, error: viewsError } = await supabase
      .from('salon_views')
      .select('viewed_at')
      .eq('salon_id', currentSalonId)
      .gte('viewed_at', startDate.toISOString())
      .order('viewed_at', { ascending: true });
      
    if (viewsError) throw viewsError;
    
    // Group views by day
    const viewsByDayMap = new Map<string, number>();
    
    // Initialize all days with 0 views
    const days = eachDayOfInterval({ start: startDate, end: today });
    days.forEach(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      viewsByDayMap.set(dayKey, 0);
    });
    
    // Count views for each day
    viewsData?.forEach(view => {
      const dayKey = format(new Date(view.viewed_at), 'yyyy-MM-dd');
      const currentCount = viewsByDayMap.get(dayKey) || 0;
      viewsByDayMap.set(dayKey, currentCount + 1);
    });
    
    // Convert map to array for the chart
    const viewsByDay: DailyViewData[] = Array.from(viewsByDayMap.entries())
      .map(([date, count]) => ({
        date: format(new Date(date), 'MMM d'),
        views: count
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    
    return {
      totalViews: totalData?.length || 0,
      viewsByDay
    };
  };

  return useSafeQuery<ViewsStatsData>({
    queryKey: ['salon-views-stats', currentSalonId, timeRange],
    queryFn: fetchViewStats,
    enabled: !!currentSalonId,
    fallbackData: { totalViews: 0, viewsByDay: [] },
    context: 'salon-views-stats',
  });
}
