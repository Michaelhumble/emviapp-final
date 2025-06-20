
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Zap, 
  Calendar, 
  Users, 
  BarChart3, 
  CreditCard, 
  UserCheck, 
  Wifi,
  CheckCircle2,
  Vote,
  Bell,
  MessageSquare,
  Clock,
  TrendingUp,
  Award,
  MapPin,
  Camera,
  Settings,
  Heart,
  Target,
  Shield,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const RoleDashboardLayout: React.FC = () => {
  const { userProfile } = useAuth();
  const [votedFeatures, setVotedFeatures] = useState<Set<number>>(new Set());

  const handleVote = (featureId: number) => {
    setVotedFeatures(prev => new Set([...prev, featureId]));
    toast.success("Thank you for your vote! 🚀");
  };

  const handleNotifyMe = () => {
    toast.success("You'll be the first to know! 🔔");
  };

  const getSalonName = () => {
    if (userProfile?.business_name) return userProfile.business_name;
    if (userProfile?.full_name) return `${userProfile.full_name}'s Salon`;
    return "Salon Owner";
  };

  // Billion-Dollar Live Features
  const liveFeatures = [
    {
      icon: Calendar,
      title: "Instant Bookings",
      description: "Real-time appointment scheduling with zero friction",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Sparkles,
      title: "AI-Optimized Scheduling",
      description: "Smart time slots that maximize your revenue potential",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Team Leaderboard",
      description: "Gamified performance tracking for motivated staff",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: BarChart3,
      title: "Pro Analytics",
      description: "Million-dollar insights at your fingertips",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: CreditCard,
      title: "Instant Payouts",
      description: "Get paid the moment your service is complete",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: UserCheck,
      title: "VIP Client Profiles",
      description: "Luxury treatment tracking for premium customers",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: Wifi,
      title: "Live Availability Sync",
      description: "Real-time updates across all platforms instantly",
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  // Coming Soon Features for FOMO
  const comingSoonFeatures = [
    {
      icon: Star,
      title: "AI Business Coach",
      description: "Personal AI mentor for salon growth",
      votes: 1247
    },
    {
      icon: Zap,
      title: "Smart Revenue Optimization",
      description: "AI-powered pricing and scheduling",
      votes: 982
    },
    {
      icon: Award,
      title: "Client Lifetime Value Tracking",
      description: "Know your most valuable customers",
      votes: 856
    },
    {
      icon: MapPin,
      title: "Multi-Location Management",
      description: "Manage all salons from one dashboard",
      votes: 743
    },
    {
      icon: Camera,
      title: "Before/After AI Gallery",
      description: "Automated portfolio generation",
      votes: 691
    },
    {
      icon: Shield,
      title: "Premium Insurance Portal",
      description: "Integrated coverage and claims",
      votes: 634
    },
    {
      icon: Target,
      title: "Predictive Booking AI",
      description: "Forecast demand and optimize staff",
      votes: 587
    },
    {
      icon: Heart,
      title: "Client Wellness Tracking",
      description: "Holistic beauty journey monitoring",
      votes: 523
    },
    {
      icon: Settings,
      title: "Advanced Automation Suite",
      description: "Set it and forget it operations",
      votes: 467
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence Hub",
      description: "Competitive analysis and trends",
      votes: 412
    }
  ];

  const quickStats = [
    { label: "Active Applicants", value: "24", trend: "+12%", icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Profile Views", value: "1,847", trend: "+23%", icon: BarChart3, color: "from-purple-500 to-purple-600" },
    { label: "This Week's Bookings", value: "43", trend: "+8%", icon: Calendar, color: "from-green-500 to-green-600" },
    { label: "Growth Score", value: "94%", trend: "+5%", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
    { label: "Credit Balance", value: "127", trend: "New!", icon: Star, color: "from-pink-500 to-pink-600" },
    { label: "Team Rating", value: "4.9★", trend: "Perfect", icon: Award, color: "from-indigo-500 to-indigo-600" }
  ];

  const demoBookings = [
    { client: "Sarah Chen", service: "Luxury Manicure", time: "2:00 PM", status: "confirmed" },
    { client: "Maria Rodriguez", service: "Full Set Acrylics", time: "3:30 PM", status: "pending" },
    { client: "Ashley Kim", service: "Gel Polish", time: "4:45 PM", status: "confirmed" },
    { client: "Jennifer Liu", service: "Nail Art Design", time: "6:00 PM", status: "waiting" }
  ];

  const teamMembers = [
    { name: "Anna", role: "Lead Technician", avatar: "🌟", badge: "Employee of the Month" },
    { name: "Sophie", role: "Nail Artist", avatar: "💎", badge: "Rising Star" },
    { name: "Maya", role: "Specialist", avatar: "✨", badge: "Client Favorite" },
    { name: "Lisa", role: "Technician", avatar: "🎨", badge: "Team Player" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Premium Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-10 blur-3xl rounded-full"></div>
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4 relative"
          >
            Welcome back, {getSalonName()}! ✨
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium"
          >
            Your billion-dollar future starts here. 🚀
          </motion.p>
        </motion.div>

        {/* Billion-Dollar Dashboard Feature Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl rounded-3xl"></div>
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Billion-Dollar Features
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  World-class tools that are live and ready for you right now
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="group relative"
                  >
                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-emerald-300/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 transition-colors">
                              {feature.title}
                            </h3>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.2 * index }}
                              className="flex-shrink-0"
                            >
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </motion.div>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Revolutionary Features Coming Soon FOMO Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Revolutionary Features Coming Soon 🔥
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Vote for your favorites and be the first to access game-changing tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-300/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      COMING SOON
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {feature.votes} votes
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVote(index)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                          votedFeatures.has(index)
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800'
                        }`}
                        disabled={votedFeatures.has(index)}
                      >
                        {votedFeatures.has(index) ? '✓ Voted' : '👍 Vote'}
                      </button>
                      <button
                        onClick={handleNotifyMe}
                        className="px-3 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 rounded-full text-xs font-medium hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors duration-200"
                      >
                        🔔 Notify
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white mb-6">
            Your Success Metrics ✨
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative"
              >
                <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {stat.trend}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bookings & Calendar Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">
                Today's Bookings 📅
              </h2>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105">
                + Add Booking
              </button>
            </div>
            
            <div className="space-y-4">
              {demoBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/40 dark:bg-slate-700/40 rounded-xl border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {booking.client.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{booking.client}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{booking.service}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900 dark:text-white">{booking.time}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {booking.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* My Team & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-12"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">
                My Dream Team 👥
              </h2>
              <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-200 hover:scale-105">
                + Invite Team
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center p-4 bg-white/40 dark:bg-slate-700/40 rounded-xl border border-white/20">
                  <div className="text-3xl mb-2">{member.avatar}</div>
                  <div className="font-medium text-slate-900 dark:text-white mb-1">{member.name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-2">{member.role}</div>
                  <div className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded-full">
                    {member.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Service Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-12"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">
                Service Management 💅
              </h2>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
                Coming Soon
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/40 dark:bg-slate-700/40 rounded-xl border border-white/20">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Service Catalog</h3>
                <input 
                  type="text" 
                  placeholder="Add new service..."
                  disabled
                  className="w-full p-3 bg-slate-100 dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg opacity-50 cursor-not-allowed"
                />
              </div>
              <div className="p-6 bg-white/40 dark:bg-slate-700/40 rounded-xl border border-white/20">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Pricing Optimizer</h3>
                <button 
                  onClick={() => toast.success("Thank you for your interest! 🚀")}
                  className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Vote for This Feature
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Credit Balance & Pro Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-3xl p-8 border border-yellow-300/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white mb-2">
                  Credit Balance: 127 Credits ⭐
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Unlock premium features and boost your salon's visibility
                </p>
              </div>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 hover:scale-105 shadow-lg">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </motion.div>

        {/* Messages & Internal Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mb-12"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">
                Messages & Team Chat 💬
              </h2>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
                Coming Soon
              </span>
            </div>
            
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Internal Communication Hub
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Real-time chat, client messages, and team coordination - all in one place
              </p>
              <button 
                onClick={() => toast.success("Thank you for your vote! 🚀")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
              >
                Vote for Priority Access
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleDashboardLayout;
