
import { Card } from "@/components/ui/card";
import { Calendar, Users, Star, Paintbrush } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { motion } from "framer-motion";

interface ArtistDashboardStatsProps {
  profileData?: UserProfile;
}

const ArtistDashboardStats = ({ profileData }: ArtistDashboardStatsProps) => {
  // Sample stats for UI mockup - in a real app these would come from the backend
  const stats = [
    {
      label: "Appointments",
      value: "3",
      icon: Calendar,
      trend: "+2 this week",
      color: "text-blue-500 bg-blue-50",
    },
    {
      label: "Clients",
      value: "28",
      icon: Users,
      trend: "+5 this month",
      color: "text-violet-500 bg-violet-50",
    },
    {
      label: "Portfolio Views",
      value: profileData?.profile_views?.toString() || "124",
      icon: Paintbrush,
      trend: "+18% vs. last week",
      color: "text-pink-500 bg-pink-50",
    },
    {
      label: "Rating",
      value: "4.8",
      icon: Star,
      trend: "from 16 reviews",
      color: "text-amber-500 bg-amber-50",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <motion.div key={index} variants={item}>
            <Card className="border-purple-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
                  <p className="text-xs text-gray-400">{stat.trend}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ArtistDashboardStats;
