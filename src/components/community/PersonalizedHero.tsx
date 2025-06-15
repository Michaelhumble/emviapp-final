
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, Star, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

const PersonalizedHero = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: "Active Members", value: "47K+", icon: Users },
    { label: "Success Stories", value: "2.8K", icon: Star },
    { label: "Monthly Growth", value: "+340%", icon: TrendingUp },
    { label: "Love Score", value: "98%", icon: Heart }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 py-20 lg:py-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              {user ? `Welcome back, ${user.user_metadata?.full_name || 'Beauty Pro'}!` : 'Join the Movement'}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Where Beauty
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Dreams{" "}
            </span>
            Come True
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join 47,000+ beauty professionals building careers, sharing success stories, 
            and creating the future of our industry together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Join Your Tribe
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              <Users className="mr-2 h-5 w-5" />
              Explore Communities
            </Button>
          </motion.div>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-3 backdrop-blur-sm">
                  <stat.icon className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-purple-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedHero;
