import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { useSalonDashboard } from '@/hooks/useSalonDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Crown, Sparkles, TrendingUp, Calendar, Users, Star, 
  Zap, Trophy, Target, Clock, DollarSign, Flame as Fire, 
  ArrowUp, BookOpen, Camera, MessageSquare, Settings,
  Award, Gem, Rocket, Zap as Lightning, Heart, Eye, Timer,
  Building2, ChevronRight, Plus, Bell, Gift, Coins, User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { supabaseBypass } from '@/types/supabase-bypass';
// Removed Layout import - using custom full-screen dashboard

// Real-time live activity components
const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'booking', message: '2 new bookings in the last hour!', icon: Calendar, color: 'text-green-500', time: '2m ago' },
    { id: 2, type: 'review', message: 'New 5-star review from Sarah M.', icon: Star, color: 'text-yellow-500', time: '5m ago' },
    { id: 3, type: 'earning', message: '$1,240 earned today', icon: DollarSign, color: 'text-emerald-500', time: '8m ago' },
    { id: 4, type: 'artist', message: 'Maya completed training milestone', icon: Trophy, color: 'text-purple-500', time: '12m ago' },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: ['booking', 'review', 'earning', 'artist'][Math.floor(Math.random() * 4)],
        message: [
          'New booking from premium client!',
          'Another 5-star review received!',
          '$320 payment processed',
          'Staff achievement unlocked!'
        ][Math.floor(Math.random() * 4)],
        icon: [Calendar, Star, DollarSign, Trophy][Math.floor(Math.random() * 4)],
        color: ['text-green-500', 'text-yellow-500', 'text-emerald-500', 'text-purple-500'][Math.floor(Math.random() * 4)],
        time: 'now'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-0 text-white overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Fire className="h-5 w-5 text-orange-400 animate-pulse" />
          Live Activity
          <Badge className="bg-red-500 text-white animate-pulse ml-auto">LIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="flex items-center gap-3 p-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90 truncate">{activity.message}</p>
                <p className="text-xs text-white/60">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// Earnings showcase with real-time updates
const EarningsShowcase = ({ stats }: { stats: any }) => {
  const [todayEarnings, setTodayEarnings] = useState(1240);
  const [weeklyEarnings, setWeeklyEarnings] = useState(8960);
  const [monthlyEarnings, setMonthlyEarnings] = useState(32450);

  useEffect(() => {
    // Simulate real-time earnings updates
    const interval = setInterval(() => {
      setTodayEarnings(prev => prev + Math.floor(Math.random() * 100));
      if (Math.random() > 0.7) {
        setWeeklyEarnings(prev => prev + Math.floor(Math.random() * 200));
        setMonthlyEarnings(prev => prev + Math.floor(Math.random() * 300));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const triggerEarningsCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#8A2BE2']
    });
    toast.success('🎉 Amazing earnings! Keep up the fantastic work!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Today's Earnings */}
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={triggerEarningsCelebration}
        className="cursor-pointer"
      >
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 border-0 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8" />
              <ArrowUp className="h-4 w-4 text-green-200" />
            </div>
            <div className="text-3xl font-bold mb-1">${todayEarnings.toLocaleString()}</div>
            <div className="text-emerald-100 text-sm">Today's Earnings</div>
            <div className="text-xs text-emerald-200 mt-1">+12% vs yesterday</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Earnings */}
      <motion.div whileHover={{ scale: 1.02, y: -2 }}>
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8" />
              <Fire className="h-4 w-4 text-orange-300" />
            </div>
            <div className="text-3xl font-bold mb-1">${weeklyEarnings.toLocaleString()}</div>
            <div className="text-blue-100 text-sm">This Week</div>
            <div className="text-xs text-blue-200 mt-1">Best week this month!</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Earnings */}
      <motion.div whileHover={{ scale: 1.02, y: -2 }}>
        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <Crown className="h-8 w-8" />
              <Trophy className="h-4 w-4 text-yellow-300" />
            </div>
            <div className="text-3xl font-bold mb-1">${monthlyEarnings.toLocaleString()}</div>
            <div className="text-purple-100 text-sm">This Month</div>
            <div className="text-xs text-purple-200 mt-1">Record-breaking!</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// VIP Achievement System
const VIPAchievements = () => {
  const [achievements] = useState([
    { id: 1, title: 'Revenue Rockstar', description: '$50K+ this month', icon: Crown, earned: true, rarity: 'legendary' },
    { id: 2, title: '5-Star Specialist', description: '50+ five-star reviews', icon: Star, earned: true, rarity: 'epic' },
    { id: 3, title: 'Team Builder', description: '10+ staff members', icon: Users, earned: false, rarity: 'rare', progress: 70 },
    { id: 4, title: 'Booking Beast', description: '1000+ bookings', icon: Calendar, earned: false, rarity: 'rare', progress: 85 },
  ]);

  const rarityColors = {
    legendary: 'from-yellow-400 to-orange-500',
    epic: 'from-purple-400 to-pink-500',
    rare: 'from-blue-400 to-cyan-500',
    common: 'from-gray-400 to-gray-500'
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-purple-900 border-0 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          VIP Achievements
          <Badge className="bg-yellow-500 text-black ml-auto">Elite Status</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} bg-opacity-20 border border-white/20`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]}`}>
                <achievement.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  {achievement.earned && <Gem className="h-4 w-4 text-yellow-400" />}
                </div>
                <p className="text-sm text-white/70">{achievement.description}</p>
                {!achievement.earned && achievement.progress && (
                  <div className="mt-2">
                    <Progress value={achievement.progress} className="h-2" />
                    <p className="text-xs text-white/60 mt-1">{achievement.progress}% complete</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

// Unified Profile Settings Modal
const UnifiedProfileModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    salon_name: '',
    location: '',
    bio: '',
    phone: '',
    avatar_url: '',
    business_hours: '',
    specialties: [] as string[],
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        salon_name: userProfile.salon_name || userProfile.company_name || '',
        location: userProfile.location || '',
        bio: userProfile.bio || '',
        phone: userProfile.phone || '',
        avatar_url: userProfile.avatar_url || '',
        business_hours: userProfile.business_hours || '',
        specialties: userProfile.specialties || [],
      });
    }
  }, [userProfile]);

  const handleImageUpload = async (file: File) => {
    if (!userProfile?.id) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userProfile.id}_avatar_${Date.now()}.${fileExt}`;
      const filePath = `salon-avatars/${fileName}`;

      const { error: uploadError } = await (supabaseBypass as any).storage
        .from('salon-photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = (supabaseBypass as any).storage
        .from('salon-photos')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, avatar_url: data.publicUrl }));
      toast.success('Profile photo updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    if (!userProfile?.id) return;

    setLoading(true);
    try {
      const { error } = await (supabaseBypass as any)
        .from('profiles')
        .update({
          salon_name: formData.salon_name,
          company_name: formData.salon_name,
          location: formData.location,
          bio: formData.bio,
          phone: formData.phone,
          avatar_url: formData.avatar_url,
          business_hours: formData.business_hours,
          specialties: formData.specialties,
        })
        .eq('id', userProfile.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Crown className="h-6 w-6 text-purple-600" />
            Profile Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <div 
              className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer group border-4 border-purple-200"
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.avatar_url ? (
                <img 
                  src={formData.avatar_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                  <User className="h-8 w-8" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
              >
                <Camera className="h-4 w-4 mr-2" />
                {imageUploading ? 'Uploading...' : 'Change Photo'}
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Salon Name</Label>
              <Input
                value={formData.salon_name}
                onChange={(e) => setFormData(prev => ({ ...prev, salon_name: e.target.value }))}
                placeholder="Enter salon name"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label>Business Hours</Label>
              <Input
                value={formData.business_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, business_hours: e.target.value }))}
                placeholder="Mon-Fri 9AM-6PM"
              />
            </div>
          </div>

          <div>
            <Label>About Your Salon</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell customers about your salon..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BillionaireClubDashboard = () => {
  const { userProfile } = useAuth();
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id || userProfile?.id;
  const { stats, loading, reviews, offers, todayBookings } = useSalonDashboard(salonId);
  
  // Modal states
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const getSalonName = () => {
    return currentSalon?.salon_name ||
           userProfile?.salon_name || 
           userProfile?.company_name || 
           userProfile?.full_name || 
           "Your Elite Salon";
  };

  const [streakDays] = useState(12);
  const [vipLevel] = useState(3);
  const [todayGoal] = useState(85);

  const handleCreateBooking = () => {
    toast.success('Opening booking system...');
    // In a real implementation, this would open the booking modal or navigate to booking page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden w-full">
      {/* Completely custom dashboard without Layout wrapper */}
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Elite Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative cursor-pointer" onClick={() => setProfileModalOpen(true)}>
                  <Avatar className="h-20 w-20 border-4 border-gradient-to-r from-yellow-400 to-orange-500 hover:scale-105 transition-transform">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                      {getSalonName().charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {getSalonName()}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Billionaire Club
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Level {vipLevel} Elite
                    </Badge>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <Fire className="h-3 w-3 mr-1" />
                      {streakDays} Day Streak
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{stats.totalCredits}</div>
                  <div className="text-sm text-white/70">Elite Credits</div>
                </div>
                <Separator orientation="vertical" className="h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{todayGoal}%</div>
                  <div className="text-sm text-white/70">Today's Goal</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Earnings Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <EarningsShowcase stats={stats} />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Activity Feed */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <LiveActivityFeed />
              </motion.div>

              {/* Today's Performance */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-purple-800 border-0 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-400" />
                      Today's Elite Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{stats.todayBookings}</div>
                        <div className="text-sm text-white/70">Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">{stats.averageRating}</div>
                        <div className="text-sm text-white/70">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{stats.staffCount}</div>
                        <div className="text-sm text-white/70">Team</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">{stats.activeOffers}</div>
                        <div className="text-sm text-white/70">Offers</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white/70">Daily Goal Progress</span>
                        <span className="text-sm text-green-400">{todayGoal}%</span>
                      </div>
                      <Progress value={todayGoal} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* VIP Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <VIPAchievements />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="h-5 w-5" />
                      Elite Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={handleCreateBooking}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Create VIP Booking
                    </Button>
                    <Button 
                      onClick={() => setProfileModalOpen(true)}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Button>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                      <Users className="h-4 w-4 mr-2" />
                      Hire Elite Artist
                    </Button>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Showcase Gallery
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Recent Reviews Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  5-Star Spotlight
                  <Badge className="bg-white/20 text-white ml-auto">Hot 🔥</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.slice(0, 3).map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="mb-4 last:mb-0 p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.customer?.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                          {review.customer?.full_name?.charAt(0) || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{review.customer?.full_name || 'Anonymous'}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-300 fill-current' : 'text-white/30'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-white/90">{review.review_text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Unified Profile Modal */}
        <UnifiedProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />

        {/* NO FOOTERS - Completely removed for clean dashboard experience */}
    </div>
  );
};

export default BillionaireClubDashboard;