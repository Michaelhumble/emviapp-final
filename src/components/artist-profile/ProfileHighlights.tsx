
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Calendar, Users, Award, TrendingUp, Clock, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileHighlightsProps {
  stats: {
    rating: number;
    reviewCount: number;
    bookingsCount: number;
    completionRate: number;
    responseTime: string;
    repeatClients: number;
    experience: string;
  };
}

const ProfileHighlights: React.FC<ProfileHighlightsProps> = ({ 
  stats = {
    rating: 4.9,
    reviewCount: 87,
    bookingsCount: 156,
    completionRate: 98,
    responseTime: "2 hrs",
    repeatClients: 42,
    experience: "5 years"
  }
}) => {
  const isMobile = useIsMobile();
  
  const statItems = [
    {
      icon: Star,
      label: "Rating",
      value: stats.rating,
      suffix: ` (${stats.reviewCount})`,
      color: "text-amber-500"
    },
    {
      icon: Calendar,
      label: "Bookings",
      value: stats.bookingsCount,
      color: "text-blue-500"
    },
    {
      icon: TrendingUp,
      label: "Completion",
      value: `${stats.completionRate}%`,
      color: "text-green-500"
    },
    {
      icon: Clock,
      label: "Response Time",
      value: stats.responseTime,
      color: "text-purple-500"
    },
    {
      icon: Heart,
      label: "Repeat Clients",
      value: stats.repeatClients,
      color: "text-pink-500"
    },
    {
      icon: Award,
      label: "Experience",
      value: stats.experience,
      color: "text-teal-500"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-gray-100 overflow-hidden">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5 text-purple-500" /> 
            Profile Highlights
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {statItems.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-center mb-1">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="font-bold text-lg">{stat.value}{stat.suffix}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileHighlights;
