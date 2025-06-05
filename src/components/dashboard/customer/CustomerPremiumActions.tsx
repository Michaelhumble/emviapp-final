
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Heart, 
  User, 
  Sparkles, 
  Crown, 
  Gift,
  Search,
  MessageCircle,
  Star,
  ArrowRight,
  Zap,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const CustomerPremiumActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBookNewService = () => {
    navigate('/search');
    toast.success('Find your perfect beauty service!');
  };

  const handleExploreFavorites = () => {
    if (!user) {
      toast.info('Please sign in to view your favorites');
      navigate('/signup');
      return;
    }
    
    navigate('/search?section=favorites');
    toast.info('Here are artists you might love!');
  };

  const handleMyJourney = () => {
    if (!user) {
      toast.info('Please sign in to view your beauty journey');
      navigate('/signup');
      return;
    }
    
    navigate('/pages/customer/profile');
    toast.success('Your beauty journey awaits!');
  };

  const handleCustomizeProfile = () => {
    if (!user) {
      toast.info('Please sign in to customize your profile');
      navigate('/signup');
      return;
    }
    
    navigate('/profile/edit');
    toast.success('Make your profile shine!');
  };

  const actionCards = [
    {
      icon: Calendar,
      title: "Book New Service",
      description: "Discover and book amazing beauty services with top-rated artists near you",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      action: handleBookNewService,
      cta: "Book Now",
      premium: false,
      featured: true
    },
    {
      icon: Heart,
      title: "Explore Favorites",
      description: "Browse your curated collection of saved artists and discover new talent",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50",
      action: handleExploreFavorites,
      cta: "View Favorites",
      premium: false
    },
    {
      icon: Star,
      title: "My Journey",
      description: "Track your beauty appointments, progress, and exclusive member rewards",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      action: handleMyJourney,
      cta: "View Journey",
      premium: true
    },
    {
      icon: User,
      title: "Customize Profile",
      description: "Personalize your experience with custom preferences and style settings",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      action: handleCustomizeProfile,
      cta: "Customize",
      premium: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {actionCards.map((card, index) => (
        <motion.div key={card.title} variants={itemVariants}>
          <Card className={`border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden group hover:shadow-3xl transition-all duration-500 cursor-pointer ${card.featured ? 'ring-2 ring-purple-200' : ''}`}>
            <CardContent className="p-8 relative">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
              
              {/* Premium/Featured Badges */}
              <div className="absolute top-6 right-6 flex gap-2">
                {card.featured && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0 shadow-lg">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </motion.div>
                )}
                {card.premium && (
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-0 shadow-lg">
                      <Crown className="h-3 w-3 mr-1" />
                      VIP
                    </Badge>
                  </motion.div>
                )}
              </div>

              {/* Icon with enhanced animation */}
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-r ${card.gradient} rounded-3xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-all duration-500`}
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  scale: 1.15
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <card.icon className="h-10 w-10 text-white" />
                
                {/* Sparkle effect */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="mb-8 relative z-10">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {card.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {card.description}
                </motion.p>
              </div>

              {/* Enhanced CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={card.action}
                  className={`w-full bg-gradient-to-r ${card.gradient} hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 rounded-2xl font-bold text-lg py-6 group`}
                >
                  <span className="flex items-center justify-center gap-3">
                    {card.cta}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-100/50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              
              {/* Premium glow effect */}
              {card.premium && (
                <motion.div
                  className="absolute top-4 left-4 opacity-40"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="h-6 w-6 text-amber-600" />
                </motion.div>
              )}
              
              {/* Featured lightning effect */}
              {card.featured && (
                <motion.div
                  className="absolute bottom-4 left-4 opacity-30"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap className="h-6 w-6 text-purple-600" />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CustomerPremiumActions;
