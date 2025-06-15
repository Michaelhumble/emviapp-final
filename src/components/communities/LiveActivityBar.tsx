
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, Zap } from 'lucide-react';

const LiveActivityBar = () => {
  const activities = [
    { icon: Users, text: "247 members joined today", color: "text-blue-600" },
    { icon: MessageSquare, text: "1,847 posts this week", color: "text-green-600" },
    { icon: TrendingUp, text: "34% growth this month", color: "text-purple-600" },
    { icon: Zap, text: "Live: 2,847 members online", color: "text-orange-600" }
  ];

  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-4">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: [-1000, 1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {[...activities, ...activities, ...activities].map((activity, index) => (
              <div key={index} className="flex items-center gap-2 text-white">
                <activity.icon className={`h-5 w-5 ${activity.color.replace('text-', 'text-white')}`} />
                <span className="font-medium">{activity.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivityBar;
