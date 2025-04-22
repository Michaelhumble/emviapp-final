
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Users, CheckCircle, Clock, Repeat, Calendar } from "lucide-react";
import { HighlightStat, ProfileHighlightProps } from "@/types/artist";

const ProfileHighlights = ({ stats }: ProfileHighlightProps) => {
  // Prepare stats with icons
  const highlightStats: HighlightStat[] = [
    {
      label: "Rating",
      value: stats.rating ? `${stats.rating.toFixed(1)}/5` : "New",
      icon: <Star className="h-4 w-4 text-amber-500" />
    },
    {
      label: "Clients",
      value: stats.clients || 0,
      icon: <Users className="h-4 w-4 text-blue-500" />
    },
    {
      label: "Completion Rate",
      value: stats.completionRate ? `${stats.completionRate}%` : "100%",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    },
    {
      label: "Response Time",
      value: stats.responseTime || "< 24 hrs",
      icon: <Clock className="h-4 w-4 text-purple-500" />
    },
    {
      label: "Repeat Clients",
      value: stats.repeatClients || 0,
      icon: <Repeat className="h-4 w-4 text-pink-500" />
    },
    {
      label: "Experience",
      value: stats.experience || "1+ years",
      icon: <Calendar className="h-4 w-4 text-indigo-500" />
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Profile Highlights</h3>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {highlightStats.map((stat, index) => (
            <motion.div 
              key={`stat-${index}`}
              className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100"
              variants={itemVariants}
            >
              <div className="mr-3 p-2 rounded-full bg-white border border-gray-100 shadow-sm">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="font-medium">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProfileHighlights;
