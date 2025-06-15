
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, Share2, Sparkles, Star, TrendingUp, Users } from 'lucide-react';

const LiveMemberActivity = () => {
  const [currentActivity, setCurrentActivity] = useState(0);

  const activities = [
    {
      type: 'success',
      user: 'Maria S.',
      role: 'Nail Artist',
      location: 'Chicago',
      content: 'Just hit $50K monthly! Thank you EmviApp family for believing in me 💕',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
      likes: 847,
      comments: 92,
      timeAgo: '2m ago',
      verified: true
    },
    {
      type: 'milestone',
      user: 'Ashley Chen',
      role: 'Lash Artist',
      location: 'San Francisco',
      content: 'Opened my 2nd studio today! From bedroom lashes to this... I\'m crying happy tears',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?q=80&w=100',
      likes: 1203,
      comments: 156,
      timeAgo: '5m ago',
      verified: true
    },
    {
      type: 'viral',
      user: 'Jasmine W.',
      role: 'Hair Stylist',
      location: 'Atlanta',
      content: 'My color transformation just got reposted by @therock! EmviApp taught me everything 🔥',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=100',
      likes: 3847,
      comments: 428,
      timeAgo: '8m ago',
      verified: true
    },
    {
      type: 'booking',
      user: 'Sophia R.',
      role: 'Makeup Artist',
      location: 'Miami',
      content: 'Booked for Coachella! The networking in this community is INSANE ✨',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100',
      likes: 524,
      comments: 67,
      timeAgo: '12m ago',
      verified: true
    },
    {
      type: 'collaboration',
      user: 'Chloe M.',
      role: 'Brow Artist',
      location: 'NYC',
      content: 'Just signed with MAC Cosmetics! Dreams really do come true here 💄',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=100',
      likes: 932,
      comments: 134,
      timeAgo: '15m ago',
      verified: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return TrendingUp;
      case 'milestone': return Star;
      case 'viral': return Sparkles;
      case 'booking': return Users;
      case 'collaboration': return Heart;
      default: return MessageSquare;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'from-green-500 to-emerald-600';
      case 'milestone': return 'from-yellow-500 to-orange-600';
      case 'viral': return 'from-pink-500 to-red-600';
      case 'booking': return 'from-blue-500 to-cyan-600';
      case 'collaboration': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-6 py-3 rounded-full mb-6"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">Live Member Activity</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair"
          >
            Success Happening Right Now
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Watch as our community celebrates wins, shares breakthroughs, and supports each other in real-time
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Live Activity Feed */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-gray-700">Live Activity Feed</span>
              <span className="text-sm text-gray-500">({activities.length} active now)</span>
            </div>

            <div className="space-y-6 max-h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                {activities.map((activity, index) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: index === currentActivity ? 1 : 0.3,
                        y: 0,
                        scale: index === currentActivity ? 1 : 0.95
                      }}
                      transition={{ duration: 0.5 }}
                      className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 border-l-purple-500 ${
                        index === currentActivity ? 'ring-2 ring-purple-200' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={activity.image}
                          alt={activity.user}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-gray-900">{activity.user}</h4>
                            {activity.verified && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Star className="w-3 h-3 text-white fill-current" />
                              </div>
                            )}
                            <span className="text-purple-600 font-medium">{activity.role}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 text-sm">{activity.location}</span>
                            <span className="text-gray-400 text-sm ml-auto">{activity.timeAgo}</span>
                          </div>
                          
                          <p className="text-gray-700 mb-4 leading-relaxed">{activity.content}</p>
                          
                          <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                              <Heart className="w-5 h-5" />
                              <span className="font-medium">{activity.likes}</span>
                            </button>
                            
                            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                              <MessageSquare className="w-5 h-5" />
                              <span className="font-medium">{activity.comments}</span>
                            </button>
                            
                            <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                              <Share2 className="w-5 h-5" />
                              <span className="font-medium">Share</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getActivityColor(activity.type)} flex items-center justify-center`}>
                          <ActivityIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Activity Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {activities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentActivity(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentActivity ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMemberActivity;
