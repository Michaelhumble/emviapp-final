
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Award, TrendingUp, Clock, Heart } from 'lucide-react';

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
    <Card className="border-gray-100">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <metric.icon className={`h-6 w-6 mx-auto mb-2 ${metric.color}`} />
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHighlights;
