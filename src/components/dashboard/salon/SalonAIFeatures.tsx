import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Brain, 
  Zap, 
  TrendingUp, 
  Clock, 
  Megaphone, 
  Bell,
  BarChart3,
  Target,
  Shield,
  Gift,
  Crown,
  Vote,
  Users,
  Rocket
} from "lucide-react";
import { toast } from "sonner";

const SalonAIFeatures = () => {
  const [votes, setVotes] = useState({
    'ai-analytics': 1456,
    'smart-scheduling': 892,
    'marketing-autopilot': 743,
    'dynamic-pricing': 667,
    'style-generator': 934,
    'security-suite': 512,
    'time-master': 876,
    'loyalty-engine': 1023
  });

  const handleVote = (featureId: string) => {
    setVotes(prev => ({
      ...prev,
      [featureId]: prev[featureId] + 1
    }));
    toast.success("Vote recorded! You'll be notified when this feature launches.");
  };

  const handleNotifyMe = (feature: string) => {
    toast.success(`You'll be notified when ${feature} is available!`, {
      description: "We'll send you an email as soon as this feature launches."
    });
  };

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
    visible: { y: 0, opacity: 1 }
  };

  const premiumFeatures = [
    {
      id: 'ai-analytics',
      title: 'AI Analytics Pro',
      description: 'Advanced business intelligence with predictive insights',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      features: ['Revenue forecasting', 'Customer behavior analysis', 'Peak time optimization']
    },
    {
      id: 'smart-scheduling',
      title: 'Smart Scheduling',
      description: 'AI-powered appointment optimization',
      icon: Clock,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      features: ['Auto-fill cancellations', 'Smart reminders', 'Capacity planning']
    },
    {
      id: 'marketing-autopilot',
      title: 'Marketing Autopilot',
      description: 'Automated marketing campaigns and social media',
      icon: Megaphone,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      features: ['Auto social posts', 'Email campaigns', 'Customer retention']
    },
    {
      id: 'dynamic-pricing',
      title: 'Dynamic Pricing',
      description: 'Revenue optimization with intelligent pricing',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      features: ['Demand-based pricing', 'Competitor analysis', 'Profit optimization']
    },
    {
      id: 'style-generator',
      title: 'Style Generator',
      description: 'AI trend predictions and style recommendations',
      icon: Sparkles,
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
      borderColor: 'border-pink-200',
      features: ['Trend forecasting', 'Style matching', 'Color predictions']
    },
    {
      id: 'security-suite',
      title: 'Security Suite',
      description: 'Advanced protection and data security',
      icon: Shield,
      gradient: 'from-gray-500 to-slate-500',
      bgGradient: 'from-gray-50 to-slate-50',
      borderColor: 'border-gray-200',
      features: ['Data encryption', 'Fraud detection', 'Access control']
    },
    {
      id: 'time-master',
      title: 'Time Master',
      description: 'Smart scheduling with employee optimization',
      icon: Target,
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200',
      features: ['Staff scheduling', 'Break optimization', 'Productivity tracking']
    },
    {
      id: 'loyalty-engine',
      title: 'Loyalty Engine',
      description: 'Customer retention with personalized rewards',
      icon: Gift,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      features: ['Reward programs', 'Personalization', 'Retention analytics']
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10" />
              AI Labs & Future Features
            </h1>
            <p className="text-purple-100 text-lg mb-6">
              Vote for your favorites and be the first to experience the future of salon management
            </p>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">
              🚀 Revolutionary Features Coming Soon
            </Badge>
          </div>
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
      </motion.div>

      {/* Current Beta Features */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
          <CardHeader className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Smart Review AI</CardTitle>
                  <p className="text-amber-100 mt-1">Currently in BETA - AI-powered review management</p>
                </div>
              </div>
              <Badge className="bg-green-500 text-white border-0 px-3 py-1 animate-pulse">
                🔥 LIVE BETA
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  What's Working Now
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Cross-platform review monitoring
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Sentiment analysis & alerts
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Weekly performance reports
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-orange-500" />
                  Coming This Month
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Auto-response suggestions
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Review request automation
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Competitor benchmarking
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">Join the Beta Program</p>
                  <p className="text-sm text-gray-600">Get early access to new AI features</p>
                </div>
                <Button 
                  onClick={() => handleNotifyMe("Smart Review AI Beta")}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Join Beta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feature Voting Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={`overflow-hidden border-2 ${feature.borderColor} bg-gradient-to-br ${feature.bgGradient} hover:shadow-xl transition-all duration-300 group h-full`}>
                <CardHeader className={`bg-gradient-to-r ${feature.gradient} text-white pb-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <feature.icon className="h-5 w-5" />
                      <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">
                      VOTE
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex flex-col h-full">
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mt-auto">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Votes: {votes[feature.id]}</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {Math.floor(votes[feature.id] / 10)} supporters
                      </span>
                    </div>
                    
                    <Progress 
                      value={(votes[feature.id] / 1500) * 100} 
                      className="h-2"
                    />
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleVote(feature.id)}
                        size="sm"
                        className="flex-1"
                        variant="outline"
                      >
                        <Vote className="h-3 w-3 mr-1" />
                        Vote ({votes[feature.id]})
                      </Button>
                      <Button 
                        onClick={() => handleNotifyMe(feature.title)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        Notify Me
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Stats */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <BarChart3 className="h-6 w-6" />
              Salon Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">+12%</div>
                <div className="text-sm text-gray-300">Monthly Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">+23%</div>
                <div className="text-sm text-gray-300">Booking Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">4.9</div>
                <div className="text-sm text-gray-300">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">92%</div>
                <div className="text-sm text-gray-300">Team Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SalonAIFeatures;