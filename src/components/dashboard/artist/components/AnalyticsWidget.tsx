
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import { 
  DollarSign, 
  Users, 
  Star, 
  Calendar,
  TrendingUp,
  Activity,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsWidgetProps {
  stats: DashboardStats | null;
  isLoading?: boolean;
}

const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendLabel,
  className
}: { 
  icon: any; 
  label: string; 
  value: string | number; 
  trend?: number;
  trendLabel?: string;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={cn(
      "rounded-xl p-6 bg-gradient-to-br from-white to-gray-50/80 border shadow-md",
      className
    )}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 rounded-lg bg-purple-100">
        <Icon className="h-5 w-5 text-purple-600" />
      </div>
      {trend && (
        <span className={cn(
          "text-xs px-2 py-1 rounded-full",
          trend > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}>
          {trend > 0 ? "+" : ""}{trend}% {trendLabel}
        </span>
      )}
    </div>
    <motion.p 
      className="text-2xl font-bold mb-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 
      }}
    >
      {value}
    </motion.p>
    <p className="text-sm text-gray-600">{label}</p>
  </motion.div>
);

const AnalyticsWidget = ({ stats, isLoading }: AnalyticsWidgetProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className="h-32 rounded-xl bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const metrics = [
    {
      icon: DollarSign,
      label: "Total Earnings",
      value: stats?.total_earnings ? `$${stats.total_earnings.toLocaleString()}` : "$0",
      trend: 12,
      trendLabel: "vs last month",
      className: "from-purple-50 to-purple-100/30"
    },
    {
      icon: Calendar,
      label: "Completed Services",
      value: stats?.completed_services || 0,
      trend: 8,
      trendLabel: "this week",
      className: "from-blue-50 to-blue-100/30"
    },
    {
      icon: Star,
      label: "Average Rating",
      value: stats?.average_rating?.toFixed(1) || "0.0",
      className: "from-amber-50 to-amber-100/30"
    },
    {
      icon: Eye,
      label: "Profile Views",
      value: stats?.profile_views || 0,
      trend: 15,
      trendLabel: "this week",
      className: "from-green-50 to-green-100/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={metric.label}
          {...metric}
        />
      ))}
    </div>
  );
};

export default AnalyticsWidget;
