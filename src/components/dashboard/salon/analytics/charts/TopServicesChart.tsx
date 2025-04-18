
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { useSalonServicesStats } from "../hooks/useSalonServicesStats";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

interface TopServicesChartProps {
  timeRange: "30days" | "60days" | "90days";
}

export const TopServicesChart: React.FC<TopServicesChartProps> = ({ timeRange }) => {
  const { data, isLoading, error } = useSalonServicesStats(timeRange);
  const { resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === "dark";
  const axisColor = isDark ? "#888888" : "#666666";
  const gridColor = isDark ? "#333333" : "#e0e0e0";

  if (isLoading) {
    return <Skeleton className="w-full h-[300px] rounded-md" />;
  }

  if (error) {
    return <div className="text-red-500 h-[300px] flex items-center justify-center">Error loading services data</div>;
  }

  if (!data || data.topServices.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No service booking data available
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data.topServices}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            tick={{ fontSize: 12, fill: axisColor }} 
            tickLine={{ stroke: axisColor }} 
            axisLine={{ stroke: axisColor }}
            allowDecimals={false}
          />
          <YAxis 
            type="category"
            dataKey="name" 
            tick={{ fontSize: 12, fill: axisColor }} 
            tickLine={{ stroke: axisColor }} 
            axisLine={{ stroke: axisColor }}
            width={100}
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
            radius={[0, 4, 4, 0]} 
            animationDuration={1500}
          >
            <LabelList dataKey="count" position="right" fill={axisColor} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
