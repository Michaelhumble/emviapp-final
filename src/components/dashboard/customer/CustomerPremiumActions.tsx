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
  Star
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
    
    // For now, navigate to search with a filter intent
    navigate('/search?section=favorites');
    toast.info('Here are artists you might love!');
  };

  const handleMyJourney = () => {
    if (!user) {
      toast.info('Please sign in to view your beauty journey');
      navigate('/signup');
      return;
    }
    
    // Navigate to customer profile page 
    navigate('/pages/customer/profile');
    toast.success('Your beauty journey awaits!');
  };

  const handleCustomizeProfile = () => {
    if (!user) {
      toast.info('Please sign in to customize your profile');
      navigate('/signup');
      return;
    }
    
    // Navigate to profile edit page
    navigate('/profile/edit');
    toast.success('Make your profile shine!');
  };

  const actionCards = [
    {
      icon: Calendar,
      title: "Book New Service",
      description: "Discover and book amazing beauty services near you",
      gradient: "from-purple-500 to-pink-500",
      action: handleBookNewService,
      cta: "Book Now",
      premium: false
    },
    {
      icon: Heart,
      title: "Explore Favorites",
      description: "Browse your saved artists and discover new ones",
      gradient: "from-rose-500 to-pink-500",
      action: handleExploreFavorites,
      cta: "View Favorites",
      premium: false
    },
    {
      icon: Star,
      title: "My Journey",
      description: "Track your beauty appointments and progress",
      gradient: "from-amber-500 to-orange-500",
      action: handleMyJourney,
      cta: "View Journey",
      premium: true
    },
    {
      icon: User,
      title: "Customize Profile",
      description: "Personalize your profile and preferences",
      gradient: "from-emerald-500 to-teal-500",
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {actionCards.map((card, index) => (
        <motion.div key={card.title} variants={itemVariants}>
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6 relative">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Premium Badge */}
              {card.premium && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-0">
                    <Crown className="h-3 w-3 mr-1" />
                    VIP
                  </Badge>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* CTA Button */}
              <Button
                onClick={card.action}
                className={`w-full bg-gradient-to-r ${card.gradient} hover:shadow-lg hover:scale-105 transition-all duration-200 border-0 rounded-xl font-semibold`}
              >
                {card.cta}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>

              {/* Decorative Element */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-100 to-transparent rounded-full -translate-y-10 translate-x-10 opacity-30" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CustomerPremiumActions;
