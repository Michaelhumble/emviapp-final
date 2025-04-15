
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Award, TrendingUp, Clock, Heart, Eye, DollarSign } from 'lucide-react';

interface ProfileHighlightsProps {
  stats: {
    rating: number;
    clients: number;
    completionRate: number;
    responseTime: string;
    repeatClients: number;
    experience: string;
  };
}

const ProfileHighlights: React.FC<ProfileHighlightsProps> = ({ stats }) => {
  const metrics = [
    {
      icon: Star,
      label: "Rating",
      value: stats.rating,
      color: "text-amber-500"
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: stats.clients,
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
      color: "text-indigo-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-serif font-semibold mb-4 flex items-center">
        <Award className="mr-2 h-5 w-5 text-purple-500" />
        Artist Performance
      </h2>
      
      <Card className="border-gray-100 overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="transition-all duration-200"
              >
                <div className="text-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100 h-full flex flex-col justify-center items-center">
                  <metric.icon className={`h-6 w-6 mb-2 ${metric.color}`} />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
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
