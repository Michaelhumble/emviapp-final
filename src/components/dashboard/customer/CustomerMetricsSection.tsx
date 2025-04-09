
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Gift, CalendarDays, Search } from "lucide-react";

const CustomerMetricsSection = () => {
  // Mock data
  const metrics = [
    {
      icon: <Gift className="h-5 w-5 text-rose-500" />,
      name: "Rewards",
      value: "120",
      label: "Points earned",
      trend: "+15%",
      color: "bg-rose-50 text-rose-700",
      trendColor: "text-green-600"
    },
    {
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      name: "Favorites",
      value: "5",
      label: "Saved salons",
      trend: "+2",
      color: "bg-pink-50 text-pink-700",
      trendColor: "text-green-600"
    },
    {
      icon: <CalendarDays className="h-5 w-5 text-amber-500" />,
      name: "Appointments",
      value: "3",
      label: "Scheduled",
      trend: "Upcoming",
      color: "bg-amber-50 text-amber-700",
      trendColor: "text-amber-600"
    },
    {
      icon: <Search className="h-5 w-5 text-purple-500" />,
      name: "Searches",
      value: "24",
      label: "This month",
      trend: "Active",
      color: "bg-purple-50 text-purple-700",
      trendColor: "text-purple-600"
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Beauty Metrics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="rounded-lg p-4 flex flex-col justify-center"
                style={{ backgroundColor: `${metric.color.split(' ')[0]}` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {metric.icon}
                  <span className="text-xs font-medium">{metric.name}</span>
                </div>
                <div className="mt-1">
                  <span className="text-xl font-bold">{metric.value}</span>
                  <span className="ml-2 text-xs font-medium" style={{ color: `${metric.trendColor.split(' ')[0]}` }}>
                    {metric.trend}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1">{metric.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerMetricsSection;
