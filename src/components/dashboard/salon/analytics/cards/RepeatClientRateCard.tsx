
import React from "react";
import { useSalonRepeatClientRate } from "../hooks/useSalonRepeatClientRate";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

interface RepeatClientRateCardProps {
  timeRange: "30days" | "60days" | "90days";
}

export const RepeatClientRateCard: React.FC<RepeatClientRateCardProps> = ({ timeRange }) => {
  const { data, isLoading, error } = useSalonRepeatClientRate(timeRange);
  const { resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === "dark";

  if (isLoading) {
    return <Skeleton className="w-full h-[200px] rounded-md" />;
  }

  if (error) {
    return <div className="text-red-500 h-[200px] flex items-center justify-center">Error loading client data</div>;
  }

  if (!data) {
    return (
      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
        No client data available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-32">
        <CircularProgressbar
          value={data.repeatRate}
          text={`${data.repeatRate}%`}
          styles={buildStyles({
            textSize: '22px',
            pathColor: '#9b87f5',
            textColor: isDark ? '#e0e0e0' : '#333333',
            trailColor: isDark ? '#333333' : '#e0e0e0',
          })}
        />
      </div>
      
      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          {data.repeatClientCount} out of {data.totalClientCount} clients have returned
        </div>
        
        {data.repeatRate > 50 ? (
          <div className="text-sm text-green-600 mt-2 font-medium">
            Great job! Your salon has a strong client retention rate.
          </div>
        ) : data.repeatRate > 30 ? (
          <div className="text-sm text-amber-600 mt-2 font-medium">
            Good retention. Consider promotions for returning clients.
          </div>
        ) : (
          <div className="text-sm text-red-500 mt-2 font-medium">
            Work on client retention to increase repeat business.
          </div>
        )}
      </div>
    </div>
  );
};
