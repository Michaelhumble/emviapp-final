
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSalonViewsStats } from "../hooks/useSalonViewsStats";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

interface ProfileViewsChartProps {
  timeRange: "30days" | "60days" | "90days";
}

export const ProfileViewsChart: React.FC<ProfileViewsChartProps> = ({ timeRange }) => {
  const { data, isLoading, error } = useSalonViewsStats(timeRange);
  const { resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === "dark";
  const axisColor = isDark ? "#888888" : "#666666";
  const gridColor = isDark ? "#333333" : "#e0e0e0";

  if (isLoading) {
    return <Skeleton className="w-full h-[300px] rounded-md" />;
  }

  if (error) {
    return <div className="text-red-500 h-[300px] flex items-center justify-center">Error loading view data</div>;
  }

  if (!data || data.viewsByDay.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No profile view data available for this period
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data.viewsByDay}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="date" 
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
          />
          <Line 
            type="monotone" 
            dataKey="views" 
            name="Profile Views" 
            stroke="#9b87f5" 
            strokeWidth={2}
            dot={{ fill: '#9b87f5', r: 4, strokeWidth: 1, stroke: isDark ? "#1f2937" : "#ffffff" }}
            activeDot={{ r: 6, fill: '#9b87f5', stroke: isDark ? "#1f2937" : "#ffffff", strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
