
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Star } from "lucide-react";
import { useArtistData } from '../context/ArtistDataContext';
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

const ArtistMetrics = () => {
  const { bookingCount, reviewCount, averageRating } = useArtistData();
  
  const metrics = [
    {
      title: "Total Bookings",
      value: bookingCount.toString(),
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      change: "+12% from last month",
      color: "bg-blue-50 border-blue-100",
      tooltip: "Track your growing client base and booking momentum"
    },
    {
      title: "Active Clients",
      value: "32",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      change: "+4 new clients",
      color: "bg-purple-50 border-purple-100",
      tooltip: "Number of unique clients who've booked with you"
    },
    {
      title: "Average Rating",
      value: averageRating.toString(),
      icon: <Star className="h-5 w-5 text-amber-600" />,
      change: `from ${reviewCount} reviews`,
      color: "bg-amber-50 border-amber-100",
      tooltip: "Your overall rating shows client satisfaction level"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <TooltipProvider>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-900">
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <Tooltip key={metric.title}>
                  <TooltipTrigger asChild>
                    <motion.div 
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.045 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`${metric.color} rounded-lg p-4 border transition-all cursor-help`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-600">{metric.title}</p>
                          <h3 className="text-2xl font-semibold mt-1">{metric.value}</h3>
                          <p className="text-xs text-gray-500 mt-1">{metric.change}</p>
                        </div>
                        <div className="p-2 rounded-full bg-white/80">
                          {metric.icon}
                        </div>
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white p-2 text-sm max-w-[200px] text-center">
                    {metric.tooltip}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    </motion.div>
  );
};

export default ArtistMetrics;
