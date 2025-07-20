
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Settings, 
  CreditCard, 
  Users, 
  Calendar,
  Sparkles,
  TrendingUp,
  Clock,
  Megaphone,
  Star,
  Brain,
  BarChart3,
  Zap,
  Crown,
  Camera,
  Edit,
  CheckCircle,
  Target,
  Award,
  Plus,
  ArrowRight,
  MapPin,
  Phone,
  Instagram,
  Globe,
  Upload,
  UserPlus,
  Briefcase
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { useSalon } from '@/context/salon';
import { calculateSalonProfileCompletion, getSalonProfileSuggestions } from '@/utils/salonProfileCompletion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const SalonDashboardContent = () => {
  const { userProfile } = useAuth();
  const { currentSalon } = useSalon();
  const navigate = useNavigate();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  
  // Calculate profile completion
  const completionStatus = calculateSalonProfileCompletion(currentSalon, userProfile);
  const suggestions = getSalonProfileSuggestions(completionStatus);
  
  // Dynamic salon name with proper fallback chain
  const salonName = currentSalon?.salon_name ?? userProfile?.salon_name ?? userProfile?.company_name ?? userProfile?.full_name ?? "Your Salon";
  const salonLogo = currentSalon?.logo_url ?? userProfile?.avatar_url;
  
  // Mock achievements and milestones
  const achievements = [
    { id: 'first_booking', label: 'First Booking', achieved: true, icon: '🎉' },
    { id: 'top_rated', label: 'Top Rated Salon', achieved: completionStatus.completionPercentage >= 75, icon: '⭐' },
    { id: 'team_builder', label: 'Team Builder', achieved: false, icon: '👥' },
    { id: 'social_star', label: 'Social Media Star', achieved: !!(currentSalon?.instagram || userProfile?.instagram), icon: '📱' },
  ];

  const handleEditProfile = () => {
    navigate('/salon/profile/edit');
  };

  const triggerCelebration = () => {
    toast.success('🎉 Keep building your amazing salon profile!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="space-y-6 p-6 max-w-7xl mx-auto">
        
        {/* Premium Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-white/10">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm animate-pulse"></div>
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10 flex items-center gap-6">
              {/* Salon Logo with Edit Overlay */}
              <motion.div 
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={handleEditProfile}
              >
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white/20 transition-all duration-300 group-hover:border-white/40">
                    <AvatarImage src={salonLogo} alt={salonName} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-2xl font-bold">
                      {salonName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {/* Profile completion ring */}
                  <svg className="absolute inset-0 w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray={`${completionStatus.completionPercentage}, 100`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <motion.div
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <Edit className="h-4 w-4 text-white" />
                </motion.div>
              </motion.div>
              
              {/* Welcome Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Crown className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-2xl">
                      Welcome back, {salonName}! ☀️
                    </h1>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-3 py-1">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Premium Salon
                    </Badge>
                    <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30">
                      {completionStatus.completionPercentage}% Complete
                    </Badge>
                  </div>
                  
                  <p className="text-lg text-purple-100 leading-relaxed">
                    Your salon is live. Let's keep building something beautiful together.
                  </p>
                </motion.div>
              </div>
              
              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3"
              >
                <Button 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-xl shadow-2xl"
                  onClick={() => window.open('https://buy.stripe.com/test_28o00geHp0XJaOQcMN', '_blank')}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Upgrade Pro
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl"
                  onClick={handleEditProfile}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Profile Completion Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-purple-600" />
                  <span>Profile Completion</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">
                  {completionStatus.completionPercentage}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Progress 
                  value={completionStatus.completionPercentage} 
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground">
                  Complete your profile to attract more customers and unlock premium features
                </p>
              </div>

              {/* Completion Checklist */}
              {completionStatus.incompleteFields.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Quick Wins:</h4>
                  <div className="space-y-1">
                    {completionStatus.incompleteFields.slice(0, 3).map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-400" />
                        <span className="text-muted-foreground">{field.label}</span>
                        {field.required && (
                          <Badge variant="outline" className="text-xs">Required</Badge>
                        )}
                      </div>
                    ))}
                    {completionStatus.incompleteFields.length > 3 && (
                      <p className="text-xs text-muted-foreground pl-4">
                        +{completionStatus.incompleteFields.length - 3} more items...
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Milestones */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Milestones:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {completionStatus.milestones.map((milestone) => (
                    <div 
                      key={milestone.label}
                      className={`p-2 rounded-lg text-xs text-center ${
                        milestone.achieved 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {milestone.achieved ? (
                        <CheckCircle className="h-3 w-3 mx-auto mb-1" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border-2 border-gray-300 mx-auto mb-1" />
                      )}
                      {milestone.label}
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleEditProfile}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Complete Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievement Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`text-center cursor-pointer transition-all duration-300 ${
                achievement.achieved 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              onClick={triggerCelebration}
              >
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <div className="text-sm font-medium">{achievement.label}</div>
                  {achievement.achieved && (
                    <Badge className="bg-white/20 text-white mt-2 text-xs">
                      Achieved!
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Calendar & Bookings */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-3 relative">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-6 w-6" />
                  Calendar & Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-blue-100 mb-4 text-sm">
                  Manage appointments and view your schedule
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-xs text-blue-200">Today</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-xs text-blue-200">This Week</div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                  onClick={() => navigate('/salon/calendar')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Open Calendar
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-3 relative">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Camera className="h-6 w-6" />
                  Photo Gallery
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-purple-100 mb-4 text-sm">
                  Showcase your work and attract customers
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-purple-200">Photos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">8.2k</div>
                    <div className="text-xs text-purple-200">Views</div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                  onClick={() => navigate('/salon/photos')}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Manage Photos
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Management */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-3 relative">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-6 w-6" />
                  Team Management
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-green-100 mb-4 text-sm">
                  Manage staff, performance, and schedules
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-xs text-green-200">Active Staff</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-xs text-green-200">Performance</div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                  onClick={() => navigate('/salon/team')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Job Listings */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-3 relative">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-6 w-6" />
                  Job Listings
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-orange-100 mb-4 text-sm">
                  Find talented artists and grow your team
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-orange-200">Active Jobs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">17</div>
                    <div className="text-xs text-orange-200">Applications</div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                  onClick={() => navigate('/salon/jobs')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Labs */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-violet-200 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-400/20 to-indigo-400/20 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-violet-600" />
                  AI Labs ✨
                  <Badge variant="secondary" className="ml-auto bg-violet-100 text-violet-700 text-xs">
                    Premium
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    AI-powered insights and automation tools
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Smart Review Management</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Predictive Booking Analytics</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full border-2 border-gray-300" />
                      <span>Auto Social Media Posts</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-md">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Explore AI Labs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-6 w-6 text-gray-600" />
                  Settings & Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Customize your salon profile and business settings
                </p>
                <div className="space-y-2 mb-4">
                  {suggestions.slice(0, 2).map((suggestion, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-orange-600">
                      <ArrowRight className="h-3 w-3" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-gray-50 border-gray-200"
                  onClick={() => navigate('/salon/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Open Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
                Quick Stats Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">24</div>
                  <div className="text-sm text-blue-700">This Month</div>
                  <div className="text-xs text-blue-500">Bookings</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">4.8</div>
                  <div className="text-sm text-green-700">Average</div>
                  <div className="text-xs text-green-500">Rating</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">89%</div>
                  <div className="text-sm text-purple-700">Completion</div>
                  <div className="text-xs text-purple-500">Rate</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">156</div>
                  <div className="text-sm text-orange-700">Total</div>
                  <div className="text-xs text-orange-500">Credits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SalonDashboardContent;
