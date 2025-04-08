
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, UserPlus, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const ArtistMetricsSection = () => {
  // Mock data for metrics
  const metrics = [
    { label: "Profile Views", value: 246, icon: Eye, color: "text-blue-500", change: "+12% this week" },
    { label: "Referrals", value: 8, icon: UserPlus, color: "text-emerald-500", change: "2 pending" },
    { label: "Bookings", value: 15, icon: Calendar, color: "text-purple-500", change: "3 this week" },
    { label: "Engagement", value: "High", icon: TrendingUp, color: "text-amber-500", change: "Above average" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="bg-white p-4 rounded-lg border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{metric.change}</p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color} opacity-80`} />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistMetricsSection;
