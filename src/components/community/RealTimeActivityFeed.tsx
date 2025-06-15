
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Users, Star, TrendingUp, Camera, Award } from 'lucide-react';

interface Activity {
  id: string;
  type: 'join' | 'post' | 'achievement' | 'comment' | 'like' | 'milestone';
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: Date;
  community?: string;
  achievement?: string;
  image?: string;
}

const RealTimeActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLive, setIsLive] = useState(true);

  // Sample activities that simulate real-time updates
  const sampleActivities: Activity[] = [
    {
      id: '1',
      type: 'join',
      user: {
        name: 'Sarah Kim',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c11c?q=80&w=100&auto=format&fit=crop',
        role: 'Nail Artist'
      },
      content: 'joined Nail Artists United',
      timestamp: new Date(Date.now() - 2000),
      community: 'Nail Artists United'
    },
    {
      id: '2',
      type: 'achievement',
      user: {
        name: 'Maya Patel',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        role: 'Makeup Artist'
      },
      content: 'earned the "Trending Creator" badge',
      timestamp: new Date(Date.now() - 15000),
      achievement: 'Trending Creator'
    },
    {
      id: '3',
      type: 'post',
      user: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
        role: 'Hair Colorist'
      },
      content: 'shared a stunning balayage transformation',
      timestamp: new Date(Date.now() - 30000),
      community: 'Hair Colorists Elite',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: '4',
      type: 'milestone',
      user: {
        name: 'Jessica Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
        role: 'Salon Owner'
      },
      content: 'reached 1,000 community followers',
      timestamp: new Date(Date.now() - 45000),
      community: 'Salon Owners Hub'
    },
    {
      id: '5',
      type: 'comment',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=100&auto=format&fit=crop',
        role: 'Lash Artist'
      },
      content: 'commented on "Advanced Lash Mapping Techniques"',
      timestamp: new Date(Date.now() - 60000),
      community: 'Lash Extension Pros'
    }
  ];

  // Simulate real-time activity updates
  useEffect(() => {
    if (!isLive) return;

    // Initialize with sample activities
    setActivities(sampleActivities);

    const interval = setInterval(() => {
      // Add new random activity
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: ['join', 'post', 'achievement', 'comment', 'like'][Math.floor(Math.random() * 5)] as any,
        user: {
          name: ['Lisa Park', 'Jordan Smith', 'Maria Garcia', 'David Kim', 'Amy Johnson'][Math.floor(Math.random() * 5)],
          avatar: `https://images.unsplash.com/photo-${1494790108755 + Math.floor(Math.random() * 1000)}-2616b332c11c?q=80&w=100&auto=format&fit=crop`,
          role: ['Nail Artist', 'Makeup Artist', 'Hair Stylist', 'Salon Owner'][Math.floor(Math.random() * 4)]
        },
        content: [
          'shared an amazing transformation',
          'joined Beauty Entrepreneurs',
          'earned a new achievement',
          'started following you',
          'liked your latest post'
        ][Math.floor(Math.random() * 5)],
        timestamp: new Date(),
        community: ['Nail Artists United', 'Makeup Masters NYC', 'Hair Colorists Elite'][Math.floor(Math.random() * 3)]
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 latest
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'join':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'post':
        return <Camera className="h-4 w-4 text-green-500" />;
      case 'achievement':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-purple-500" />;
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'milestone':
        return <TrendingUp className="h-4 w-4 text-indigo-500" />;
      default:
        return <Star className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              The Community
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}Never Sleeps
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              See what's happening right now across all communities
            </motion.p>
            
            {/* Live Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">LIVE ACTIVITY</span>
              <button
                onClick={() => setIsLive(!isLive)}
                className="text-sm text-purple-600 hover:text-purple-800 ml-4"
              >
                {isLive ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <AnimatePresence>
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* User Avatar */}
                      <img
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      
                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getActivityIcon(activity.type)}
                          <span className="font-semibold text-gray-900">
                            {activity.user.name}
                          </span>
                          <span className="text-gray-600">
                            {activity.content}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{activity.user.role}</span>
                          {activity.community && (
                            <>
                              <span>•</span>
                              <span className="text-purple-600">{activity.community}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{formatTimeAgo(activity.timestamp)}</span>
                        </div>
                        
                        {/* Achievement Badge */}
                        {activity.achievement && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              <Award className="h-3 w-3 mr-1" />
                              {activity.achievement}
                            </span>
                          </div>
                        )}
                        
                        {/* Activity Image */}
                        {activity.image && (
                          <div className="mt-2">
                            <img
                              src={activity.image}
                              alt="Activity"
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Timestamp */}
                      <div className="text-xs text-gray-400">
                        {formatTimeAgo(activity.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* View More */}
            <div className="p-4 text-center border-t border-gray-100">
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                View All Activity →
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Active Now', value: '1,247', icon: Users, color: 'text-green-500' },
              { label: 'Posts Today', value: '892', icon: Camera, color: 'text-blue-500' },
              { label: 'New Members', value: '156', icon: TrendingUp, color: 'text-purple-500' },
              { label: 'Communities', value: '47', icon: Star, color: 'text-yellow-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeActivityFeed;
