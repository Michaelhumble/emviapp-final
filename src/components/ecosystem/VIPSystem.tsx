import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Sparkles, 
  Star, 
  Zap, 
  Award,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  Shield,
  Gift,
  Infinity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface VIPSystemProps {
  variant?: 'card' | 'banner' | 'button' | 'status';
  showFeatures?: boolean;
  className?: string;
}

const VIPSystem: React.FC<VIPSystemProps> = ({ 
  variant = 'card',
  showFeatures = true,
  className = ''
}) => {
  const { user, userProfile } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  // Check if user has VIP access (simulate for now)
  const isVIP = userProfile?.subscription_tier === 'vip' || userProfile?.credits >= 1000;

  const vipFeatures = [
    {
      icon: Crown,
      title: 'Priority Bookings',
      description: 'Jump the queue with priority booking access',
      color: 'text-amber-600'
    },
    {
      icon: Star,
      title: 'Premium Profile Badge',
      description: 'Stand out with exclusive VIP badge on your profile',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      title: 'Advanced Analytics',
      description: 'Deep insights into your business performance',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'VIP Community Access',
      description: 'Exclusive networking events and groups',
      color: 'text-green-600'
    },
    {
      icon: MessageSquare,
      title: 'Direct Artist Contact',
      description: 'Send unlimited messages to artists',
      color: 'text-pink-600'
    },
    {
      icon: Shield,
      title: 'Premium Support',
      description: '24/7 priority customer support',
      color: 'text-indigo-600'
    },
    {
      icon: Gift,
      title: 'Exclusive Offers',
      description: 'Early access to deals and promotions',
      color: 'text-rose-600'
    },
    {
      icon: Infinity,
      title: 'Lifetime Access',
      description: 'One-time payment, lifetime benefits',
      color: 'text-emerald-600'
    }
  ];

  if (variant === 'status' && isVIP) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Crown className="h-5 w-5 text-amber-500" />
        <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">
          VIP Member
        </Badge>
        <Sparkles className="h-4 w-4 text-amber-400" />
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <Link to="/pricing">
        <Button 
          className={`bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Crown className="h-4 w-4 mr-2" />
          {isVIP ? 'VIP Member' : 'Upgrade to VIP'}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-4 w-4 ml-2" />
          </motion.div>
        </Button>
      </Link>
    );
  }

  if (variant === 'banner') {
    return (
      <motion.div
        className={`bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white p-4 rounded-lg ${className}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8" />
            <div>
              <h3 className="font-bold text-lg">
                {isVIP ? 'Welcome VIP Member!' : 'Unlock VIP Access'}
              </h3>
              <p className="text-sm opacity-90">
                {isVIP 
                  ? 'Enjoy your exclusive benefits and premium features'
                  : 'Get lifetime access to premium features for just $10'
                }
              </p>
            </div>
          </div>
          {!isVIP && (
            <Link to="/pricing">
              <Button className="bg-white text-orange-600 hover:bg-gray-50">
                Upgrade Now
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    );
  }

  // Default card variant
  return (
    <Card className={`p-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isVIP ? 'VIP Member Benefits' : 'Upgrade to VIP'}
            </h2>
            <p className="text-gray-600">
              {isVIP 
                ? 'You have access to all premium features'
                : 'Unlock premium features for just $10 lifetime'
              }
            </p>
          </div>
        </div>
        
        {!isVIP && (
          <div className="text-right">
            <div className="text-3xl font-bold text-amber-600">$10</div>
            <div className="text-sm text-gray-500">lifetime access</div>
          </div>
        )}
      </div>

      {showFeatures && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {vipFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg bg-white/50"
            >
              <feature.icon className={`h-6 w-6 ${feature.color} mt-1`} />
              <div>
                <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        {isVIP ? (
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">
              VIP Active
            </Badge>
            <Sparkles className="h-5 w-5 text-amber-500" />
          </div>
        ) : (
          <Link to="/pricing" className="w-full">
            <Button 
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold py-3 text-lg"
              size="lg"
            >
              <Crown className="h-5 w-5 mr-2" />
              Upgrade to VIP - $10 Lifetime
              <Sparkles className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        )}
      </div>

      {!isVIP && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            ⚡ Limited time offer • 🔒 Secure payment • ✅ Instant activation
          </p>
        </div>
      )}
    </Card>
  );
};

export default VIPSystem;