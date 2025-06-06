
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsGridProps {
  stats: any;
  isLoading: boolean;
}

const StatsGrid = ({ stats, isLoading }: StatsGridProps) => {
  const statItems = [
    {
      title: "Total Bookings",
      value: stats?.booking_count || 0,
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      title: "Completed Services",
      value: stats?.completed_services || 0,
      icon: Clock,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      title: "Total Earnings",
      value: `$${stats?.total_earnings || 0}`,
      icon: DollarSign,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      title: "Average Rating",
      value: (stats?.average_rating || 0).toFixed(1),
      icon: Star,
      color: "from-amber-500 to-orange-500",
      bgColor: "from-amber-50 to-orange-50"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <Skeleton className="h-12 w-12 rounded-xl mb-4" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            {/* Premium Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-60`}></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
            
            <CardContent className="relative p-6">
              {/* Icon with Gradient */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              
              {/* Content */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
                <motion.p 
                  className="text-2xl font-bold text-gray-900"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.value}
                </motion.p>
              </div>

              {/* Trend Indicator */}
              <div className="flex items-center mt-3 text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="font-medium">+12%</span>
                <span className="text-gray-500 ml-1">this week</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;
