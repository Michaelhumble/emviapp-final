
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MessageCircle,
  Settings,
  Star,
  Users,
  Calendar,
  CreditCard,
  Crown,
  Bot,
  Zap,
  TrendingUp,
  Bell,
  Sparkles,
  BarChart3,
  CalendarDays,
  Target
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const SalonDashboardContent = () => {
  const { user, userProfile } = useAuth();
  
  // Dynamic salon name with fallback order
  const salonName = userProfile?.salon_name ?? userProfile?.company_name ?? userProfile?.full_name ?? "Salon Owner";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Dynamic Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {salonName}!</h1>
          <p className="text-purple-100 text-lg">Let's make today amazing for your clients</p>
        </div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Advanced Communication Hub */}
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Advanced Communication Hub</CardTitle>
                  <p className="text-sm text-gray-600">AI-powered messaging</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Conversations</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="text-sm font-semibold text-green-600">98%</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Open Messages
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Advanced Service Management */}
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-emerald-50 to-green-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <Settings className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Advanced Service Management</CardTitle>
                  <p className="text-sm text-gray-600">Optimize your offerings</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Services</span>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">24</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">4.9</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                  Manage Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Premium Smart Review AI Card */}
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Smart Review AI ✨
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">PREMIUM</Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">AI-powered review insights</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-red-200 text-red-700">Google</Badge>
                  <Badge variant="outline" className="border-yellow-200 text-yellow-700">Yelp</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">Facebook</Badge>
                  <Badge variant="outline" className="border-pink-200 text-pink-700">TikTok</Badge>
                </div>
                <div className="bg-white/70 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm text-gray-700 italic">"Amazing service! The AI suggests the perfect treatments..." - AI Summary</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 group-hover:shadow-lg transition-all duration-300">
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credit Balance */}
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Credit Balance</CardTitle>
                  <p className="text-sm text-gray-600">Available credits</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-3xl font-bold text-green-600">$247</span>
                  <p className="text-sm text-gray-600">Available to spend</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  Use Credits
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upgrade to Pro */}
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Upgrade to Pro</CardTitle>
                  <p className="text-sm text-gray-600">Unlock premium features</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Features unlocked</span>
                    <span>3/10</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Analytics Pro - Coming Soon */}
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">COMING SOON</Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Analytics Pro</CardTitle>
                  <p className="text-sm text-gray-600">Advanced business insights</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Get deep insights into your salon's performance with AI-powered analytics.</p>
                <Button disabled className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white opacity-70">
                  <Bell className="h-4 w-4 mr-2" />
                  Notify When Ready
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Smart Scheduling - Coming Soon */}
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-green-50 to-teal-50 relative overflow-hidden">
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">COMING SOON</Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-teal-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Smart Scheduling</CardTitle>
                  <p className="text-sm text-gray-600">AI-optimized appointments</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Let AI optimize your appointment scheduling for maximum efficiency and revenue.</p>
                <Button disabled className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white opacity-70">
                  <Bell className="h-4 w-4 mr-2" />
                  Notify When Ready
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Marketing Autopilot - Coming Soon */}
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-purple-50 to-violet-50 relative overflow-hidden">
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">COMING SOON</Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-violet-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Marketing Autopilot</CardTitle>
                  <p className="text-sm text-gray-600">Automated marketing campaigns</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Automate your marketing campaigns with AI-driven strategies that convert.</p>
                <Button disabled className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white opacity-70">
                  <Bell className="h-4 w-4 mr-2" />
                  Notify When Ready
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Team & Recognition Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold">Team & Recognition</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", role: "Senior Stylist", rating: 4.9, avatar: "SJ" },
                  { name: "Mike Chen", role: "Color Specialist", rating: 4.8, avatar: "MC" },
                  { name: "Emma Davis", role: "Nail Technician", rating: 4.9, avatar: "ED" }
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{member.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "9:00 AM", service: "Hair Cut & Style", client: "Jessica M." },
                  { time: "11:30 AM", service: "Color Treatment", client: "David R." },
                  { time: "2:00 PM", service: "Manicure", client: "Anna K." },
                  { time: "4:30 PM", service: "Facial", client: "Tom L." }
                ].map((appointment, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-sm">{appointment.time}</p>
                      <p className="text-xs text-gray-600">{appointment.service}</p>
                    </div>
                    <p className="text-sm text-gray-700">{appointment.client}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Revolutionary Features Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Revolutionary Features Coming Soon</h2>
          <p className="text-gray-600">The future of salon management is here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Bot, title: "AI Assistant", desc: "24/7 intelligent support" },
            { icon: Zap, title: "VR Consultations", desc: "Virtual reality previews" },
            { icon: TrendingUp, title: "Predictive Analytics", desc: "Forecast trends & demand" },
            { icon: Star, title: "Smart Recommendations", desc: "Personalized client suggestions" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="pt-6">
                  <div className="mb-4 mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
