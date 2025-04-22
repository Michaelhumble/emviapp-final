
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, DollarSign, MessageSquare, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const MetricsPanel = () => {
  // Mock data (would be replaced with real data)
  const metrics = [
    {
      title: "Total Bookings",
      value: "42",
      change: "+8.5%",
      positive: true,
      icon: <CalendarDays className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Total Earnings",
      value: "$4,820",
      change: "+12.3%",
      positive: true,
      icon: <DollarSign className="h-5 w-5 text-green-500" />
    },
    {
      title: "Client Rating",
      value: "4.9",
      change: "Top 5%",
      positive: true,
      icon: <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
    },
    {
      title: "Response Time",
      value: "2h",
      change: "-15min",
      positive: true,
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Performance Metrics</CardTitle>
        <CardDescription>Your current metrics and performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 rounded-lg border border-gray-100 bg-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{metric.value}</h3>
                  <p className={`text-xs mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </p>
                </div>
                <div className="mt-1">{metric.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default MetricsPanel;
