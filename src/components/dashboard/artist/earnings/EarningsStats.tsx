
import { Card } from "@/components/ui/card";
import { DollarSign, Calendar, CheckCircle, TrendingUp } from "lucide-react";

interface EarningsStatsProps {
  weeklyTotal: number;
  monthlyTotal: number;
  completedBookings: number;
  averagePerBooking: number;
  isLoading?: boolean;
}

export const EarningsStats = ({
  weeklyTotal,
  monthlyTotal,
  completedBookings,
  averagePerBooking,
  isLoading = false
}: EarningsStatsProps) => {
  const stats = [
    {
      label: "This Week",
      value: `$${weeklyTotal.toFixed(2)}`,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      label: "This Month",
      value: `$${monthlyTotal.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Completed Bookings",
      value: completedBookings,
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      label: "Average Per Booking",
      value: `$${averagePerBooking.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-pink-600",
    },
  ];

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {stats.map((stat, index) => (
        <div key={index} className="h-24 bg-gray-100 rounded-lg"></div>
      ))}
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <span className="text-2xl font-semibold">{stat.value}</span>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};
