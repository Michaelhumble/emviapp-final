
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from "@/context/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart,
  Calendar,
  Users,
  Star,
  DollarSign,
  Sparkles,
  Briefcase,
  Image,
  MessageSquare,
  ArrowRight,
  Zap,
  Lightbulb,
  Link,
  Clipboard,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import ProfileCompletionWarning from "../overview/ProfileCompletionWarning";
import StatCard from "../StatCard";
import ReferralWidget from "../ReferralWidget";

// Animations
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Motivational quotes
const motivationalQuotes = [
  "Your talent is your empire. Let's grow it together 💪",
  "The beauty you create today becomes tomorrow's inspiration ✨",
  "Every client is a canvas for your artistry 🎨",
  "Success is measured in smiles, not just dollars 😊",
  "Your hands create confidence that lasts beyond the salon 💅"
];

const OverviewTab = () => {
  const { user, userProfile } = useAuth();
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  
  // Get a random motivational quote
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);
  
  // Fetch stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['artist-dashboard-stats'],
    queryFn: async () => {
      // In a real app this would fetch from Supabase
      return {
        bookings: 24,
        profileViews: 156,
        rating: 4.8,
        revenue: 1850,
        repeatClients: 72
      };
    }
  });
  
  // Fetch upcoming bookings
  const { data: upcomingBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ['upcoming-bookings'],
    queryFn: async () => {
      // In a real app, we would fetch from Supabase
      const { data, error } = await supabase
        .from('bookings')
        .select('*, services:service_id(*)')
        .eq('artist_id', user?.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });
  
  // Fetch services
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['artist-services'],
    queryFn: async () => {
      // In a real app, we would fetch from Supabase
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });
  
  // Fetch portfolio
  const { data: portfolio, isLoading: portfolioLoading } = useQuery({
    queryKey: ['artist-portfolio'],
    queryFn: async () => {
      // In a real app, we would fetch from Supabase
      return [
        { id: '1', image_url: 'https://placehold.co/300x300/F5F5F5/A076F9?text=Nail+Art', created_at: new Date().toISOString() },
        { id: '2', image_url: 'https://placehold.co/300x300/F5F5F5/A076F9?text=Manicure', created_at: new Date().toISOString() }
      ];
    }
  });
  
  // Fetch messages
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['recent-messages'],
    queryFn: async () => {
      // In a real app, we would fetch from Supabase
      return [
        { id: '1', sender_name: 'Emma Johnson', message: 'Hi, I would like to book an appointment for next week...', created_at: new Date().toISOString() },
        { id: '2', sender_name: 'Michael Smith', message: 'Thank you for the amazing service yesterday!', created_at: new Date().toISOString() }
      ];
    }
  });
  
  // Profile health score calculation
  const calculateProfileHealth = () => {
    let score = 80; // Start with a baseline
    const profile = userProfile;
    
    if (!profile) return 50;
    
    if (!profile.bio || profile.bio.length < 50) score -= 10;
    if (!profile.avatar_url) score -= 15;
    if (!portfolio || portfolio.length < 3) score -= 10;
    if (!services || services.length < 3) score -= 10;
    
    return Math.max(Math.min(score, 100), 0); // Ensure between 0-100
  };
  
  const profileHealth = calculateProfileHealth();
  
  // Handle referral link copy
  const handleCopyReferral = () => {
    const referralLink = `https://emvi.app/?ref=${userProfile?.referral_code || 'EMVI123'}`;
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => {
      setCopiedReferral(false);
    }, 2000);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Completion Warning */}
      <ProfileCompletionWarning />
      
      {/* Dashboard Metrics Grid */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          <StatCard
            title="Total Bookings"
            value={statsLoading ? "—" : stats.bookings}
            loading={statsLoading}
            icon={<Calendar className="h-4 w-4 text-purple-500" />}
          />
          <StatCard
            title="Profile Views"
            value={statsLoading ? "—" : stats.profileViews}
            loading={statsLoading}
            icon={<Users className="h-4 w-4 text-blue-500" />}
          />
          <StatCard
            title="Avg. Rating"
            value={statsLoading ? "—" : stats.rating}
            precision={1}
            suffix=" ★"
            loading={statsLoading}
            icon={<Star className="h-4 w-4 text-amber-500" />}
          />
          <StatCard
            title="Revenue"
            value={statsLoading ? "—" : formatCurrency(stats.revenue)}
            loading={statsLoading}
            icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
          />
          <StatCard
            title="Repeat Clients"
            value={statsLoading ? "—" : stats.repeatClients}
            suffix="%"
            loading={statsLoading}
            icon={<Users className="h-4 w-4 text-rose-500" />}
          />
        </div>
      </motion.section>
      
      {/* My Bookings Preview */}
      <motion.section variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            {bookingsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>
                ))}
              </div>
            ) : upcomingBookings && upcomingBookings.length > 0 ? (
              <div className="space-y-3">
                {upcomingBookings.map(booking => (
                  <div key={booking.id} className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:border-primary/20 transition-colors group">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{booking.customer_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">{booking.services?.title || "Custom Service"}</p>
                        <div className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800 border-green-200' :
                              booking.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                              'bg-red-100 text-red-800 border-red-200'
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No upcoming bookings</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="link" className="ml-auto gap-1 group" onClick={() => document.getElementById('Calendar')?.click()}>
              <span>View All</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </motion.section>
      
      {/* Services Manager Preview */}
      <motion.section variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Briefcase className="h-5 w-5 mr-2 text-primary" />
              My Services
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            {servicesLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>
                ))}
              </div>
            ) : services && services.length > 0 ? (
              <div className="space-y-3">
                {services.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:border-primary/20 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium">{service.title}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm font-medium text-primary">{formatCurrency(service.price)}</p>
                        <p className="text-xs text-gray-500">{service.duration_minutes} min</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No services added yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="link" className="ml-auto gap-1 group" onClick={() => document.getElementById('Services')?.click()}>
              <span>Manage My Services</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </motion.section>
      
      {/* Portfolio Gallery Snapshot */}
      <motion.section variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-teal-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Image className="h-5 w-5 mr-2 text-primary" />
              Portfolio Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            {portfolioLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="aspect-square rounded-md" />
                ))}
              </div>
            ) : portfolio && portfolio.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {portfolio.map(item => (
                  <div key={item.id} className="relative group overflow-hidden rounded-md aspect-square">
                    <img 
                      src={item.image_url} 
                      alt="Portfolio item" 
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm" className="text-xs">View</Button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center aspect-square rounded-md border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-full w-full rounded-md text-xs flex flex-col items-center justify-center gap-2"
                    onClick={() => document.getElementById('Portfolio')?.click()}
                  >
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Add New Work</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-2">No portfolio items yet</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById('Portfolio')?.click()}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Add Your First Work
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.section>
      
      {/* Referral System Block */}
      <motion.section variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-yellow-300" />
                <h3 className="text-xl font-medium">Refer & Earn</h3>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-none">
                {userProfile?.credits || 15} credits
              </Badge>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Share your link with friends and earn credits for each signup!
            </p>
            <div className="mt-4 relative">
              <div className="flex">
                <div className="bg-white/10 rounded-l-md p-3 flex-1 truncate border border-white/20 text-sm">
                  {`emvi.app/?ref=${userProfile?.referral_code || 'EMVI123'}`}
                </div>
                <Button 
                  variant="secondary" 
                  className="rounded-l-none bg-white hover:bg-white/90 text-purple-600"
                  onClick={handleCopyReferral}
                >
                  {copiedReferral ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>
      
      {/* Insights + Profile Health */}
      <motion.section variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Lightbulb className="h-5 w-5 mr-2 text-primary" />
              Profile Health & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Your Profile Health</h4>
                <span className="text-sm font-bold">{profileHealth}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    profileHealth > 80 ? 'bg-emerald-500' :
                    profileHealth > 60 ? 'bg-amber-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${profileHealth}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium">Tips to improve:</h4>
              <ul className="space-y-1.5 text-sm">
                {(!userProfile?.bio || userProfile?.bio.length < 50) && (
                  <li className="flex items-start">
                    <ArrowRight className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary" />
                    <span>Complete your About section</span>
                  </li>
                )}
                {(!portfolio || portfolio.length < 3) && (
                  <li className="flex items-start">
                    <ArrowRight className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary" />
                    <span>Add more portfolio images</span>
                  </li>
                )}
                {(!services || services.length < 3) && (
                  <li className="flex items-start">
                    <ArrowRight className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary" />
                    <span>Add more services you offer</span>
                  </li>
                )}
                {(!userProfile?.avatar_url) && (
                  <li className="flex items-start">
                    <ArrowRight className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary" />
                    <span>Upload a profile photo</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
              <blockquote className="text-sm italic text-gray-700">
                "{randomQuote}"
              </blockquote>
            </div>
          </CardContent>
        </Card>
      </motion.section>
      
      {/* Messages Snapshot */}
      <motion.section variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-pink-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            {messagesLoading ? (
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : messages && messages.length > 0 ? (
              <div className="space-y-3">
                {messages.map(message => (
                  <div key={message.id} className="p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:border-primary/20 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{message.sender_name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{message.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="link" className="ml-auto gap-1 group" onClick={() => document.getElementById('Messages')?.click()}>
              <span>Go to Inbox</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </motion.section>
    </motion.div>
  );
};

export default OverviewTab;
