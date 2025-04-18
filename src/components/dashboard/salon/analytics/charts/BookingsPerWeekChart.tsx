
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSalonBookingsStats } from "../hooks/useSalonBookingsStats";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

interface BookingsPerWeekChartProps {
  timeRange?: "30days" | "60days" | "90days";
}

export const BookingsPerWeekChart: React.FC<BookingsPerWeekChartProps> = ({ timeRange = "30days" }) => {
  const { stats, isLoading, error } = useSalonBookingsStats();
  const { resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === "dark";
  const axisColor = isDark ? "#888888" : "#666666";
  const gridColor = isDark ? "#333333" : "#e0e0e0";

  if (isLoading) {
    return <Skeleton className="w-full h-[300px] rounded-md" />;
  }

  if (error) {
    return <div className="text-red-500 h-[300px] flex items-center justify-center">Error loading booking data</div>;
  }

  if (!stats || stats.chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No booking data available for this period
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={stats.chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="weekLabel" 
            tick={{ fontSize: 12, fill: axisColor }} 
            tickLine={{ stroke: axisColor }} 
            axisLine={{ stroke: axisColor }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: axisColor }} 
            tickLine={{ stroke: axisColor }} 
            axisLine={{ stroke: axisColor }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
              borderRadius: "6px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
            cursor={{ fill: "rgba(155, 135, 245, 0.1)" }}
          />
          <Bar 
            dataKey="count" 
            name="Bookings" 
            fill="#9b87f5" 
            radius={[4, 4, 0, 0]} 
            barSize={30}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
