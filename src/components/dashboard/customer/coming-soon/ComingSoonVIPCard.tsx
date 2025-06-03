
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Lock, Crown, Star, Gift, Mail, Users, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface ComingSoonVIPCardProps {
  title: string;
  description: string;
  features: string[];
  estimatedLaunch?: string;
  type?: 'beta' | 'vip' | 'early-access';
}

const ComingSoonVIPCard: React.FC<ComingSoonVIPCardProps> = ({
  title,
  description,
  features,
  estimatedLaunch = "Coming Soon",
  type = 'vip'
}) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const typeConfig = {
    beta: {
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Beta Access',
      badgeColor: 'bg-blue-100 text-blue-700',
      buttonText: 'Join Beta Waitlist',
      reward: '+50 Credits'
    },
    vip: {
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      badge: 'VIP Only',
      badgeColor: 'bg-purple-100 text-purple-700',
      buttonText: 'Get VIP Access',
      reward: '+100 Credits'
    },
    'early-access': {
      icon: Gift,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Early Access',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      buttonText: 'Request Early Access',
      reward: '+25 Credits'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  const handleJoinWaitlist = () => {
    if (!email.trim()) return;
    
    setJoined(true);
    toast.success(`You're on the ${config.badge} list! ${config.reward} earned! 🎉`);
    
    setTimeout(() => {
      setJoined(false);
      setEmail('');
    }, 3000);
  };

  if (joined) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-gradient-to-r ${config.color} rounded-xl p-6 text-white text-center`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Gift className="h-12 w-12 mx-auto mb-3" />
        </motion.div>
        <h3 className="text-xl font-bold mb-2">You're In! 🎉</h3>
        <p className="text-white/90 mb-2">Welcome to the exclusive club!</p>
        <Badge className="bg-white/20 text-white">
          {config.reward} Added to Your Account
        </Badge>
        <p className="text-sm text-white/75 mt-3">
          We'll notify you the moment this launches!
        </p>
      </motion.div>
    );
  }

  return (
    <Card className="relative overflow-hidden border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-5`} />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <Badge className={config.badgeColor}>
            {config.badge}
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            {config.reward}
          </Badge>
        </div>
        
        <CardTitle className="flex items-center gap-3">
          <div className={`p-3 rounded-full bg-gradient-to-r ${config.color}`}>
            <Lock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 font-normal">{estimatedLaunch}</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <p className="text-gray-600">{description}</p>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-800 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            What's Inside:
          </h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                <Star className="h-3 w-3 text-amber-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-purple-800">Limited Spots Available</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-purple-200 focus:border-purple-400"
              />
              <Button
                onClick={handleJoinWaitlist}
                disabled={!email.trim()}
                className={`bg-gradient-to-r ${config.color} hover:opacity-90 whitespace-nowrap`}
              >
                <Mail className="h-4 w-4 mr-2" />
                {config.buttonText}
              </Button>
            </div>
            
            <p className="text-xs text-purple-600 text-center">
              Join now and earn {config.reward} when this launches! 🚀
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            <Crown className="h-3 w-3 mr-1" />
            VIP members get first access to everything
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComingSoonVIPCard;
