import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Briefcase, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityItem {
  id: string;
  type: 'hiring' | 'booking' | 'match' | 'join';
  message: string;
  count?: number;
  timestamp: Date;
  urgent?: boolean;
}

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'hiring',
      message: 'salons actively hiring',
      count: 23,
      timestamp: new Date(),
      urgent: true
    },
    {
      id: '2',
      type: 'match',
      message: 'jobs matched your profile',
      count: 2,
      timestamp: new Date(Date.now() - 60000),
      urgent: true
    },
    {
      id: '3',
      type: 'booking',
      message: 'new bookings this hour',
      count: 18,
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '4',
      type: 'join',
      message: 'beauty pros online now',
      count: 147,
      timestamp: new Date(Date.now() - 180000)
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => 
        prev.map(activity => ({
          ...activity,
          count: activity.count ? activity.count + Math.floor(Math.random() * 3) : undefined,
          timestamp: new Date()
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'hiring': return Briefcase;
      case 'booking': return Star;
      case 'match': return Users;
      case 'join': return Users;
      default: return Clock;
    }
  };

  const getColor = (type: string, urgent?: boolean) => {
    if (urgent) return 'text-red-500';
    switch (type) {
      case 'hiring': return 'text-green-500';
      case 'booking': return 'text-blue-500';
      case 'match': return 'text-purple-500';
      case 'join': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getBadgeVariant = (urgent?: boolean) => {
    return urgent ? 'destructive' : 'secondary';
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            🔴 Live Activity
          </CardTitle>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <AnimatePresence>
          {activities.map((activity, index) => {
            const Icon = getIcon(activity.type);
            const colorClass = getColor(activity.type, activity.urgent);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  activity.urgent 
                    ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:shadow-lg' 
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={activity.urgent ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Icon className={`h-5 w-5 ${colorClass}`} />
                  </motion.div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      {activity.count && (
                        <motion.span
                          key={activity.count}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="font-bold text-xl text-gray-900"
                        >
                          {activity.count}
                        </motion.span>
                      )}
                      <span className="text-sm text-gray-600">{activity.message}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {activity.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {activity.urgent && (
                        <Badge variant={getBadgeVariant(activity.urgent)} className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {(activity.type === 'hiring' || activity.type === 'match') && (
                  <Button 
                    size="sm"
                    variant={activity.urgent ? 'default' : 'outline'}
                    className={
                      activity.urgent 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white pulse-glow' 
                        : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                    }
                  >
                    {activity.type === 'match' ? 'View Jobs' : 'Apply Now'}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* CTA Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              🚀 Don't miss out on these opportunities!
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
            >
              Get Priority Alerts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;