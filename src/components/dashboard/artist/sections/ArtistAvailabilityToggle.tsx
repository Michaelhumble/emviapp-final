import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';
import { 
  Zap, 
  Clock, 
  Moon, 
  Sun, 
  Calendar,
  MapPin,
  Star,
  Users,
  TrendingUp,
  Sparkles,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';

const ArtistAvailabilityToggle = () => {
  const { userProfile, updateProfile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const isAvailable = userProfile?.available_for_hire || false;
  const isInstantBook = userProfile?.instant_booking || false;
  const isVacationMode = userProfile?.vacation_mode || false;

  // Mock data - replace with real availability data
  const nextAvailableSlot = "Today 2:00 PM";
  const totalSlots = 8;
  const bookedSlots = 3;
  const responseTime = "< 2 hours";

  const handleAvailabilityToggle = async () => {
    setIsUpdating(true);
    try {
      await updateProfile({
        available_for_hire: !isAvailable
      });
      toast.success(
        !isAvailable 
          ? "🚀 You're now LIVE and available for bookings!" 
          : "You're now offline. We'll notify you of new requests."
      );
    } catch (error) {
      toast.error("Failed to update availability");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInstantBookToggle = async () => {
    setIsUpdating(true);
    try {
      await updateProfile({
        instant_booking: !isInstantBook
      });
      toast.success(
        !isInstantBook 
          ? "⚡ Instant booking enabled! Clients can book you immediately." 
          : "Instant booking disabled. You'll review requests first."
      );
    } catch (error) {
      toast.error("Failed to update instant booking");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleVacationToggle = async () => {
    setIsUpdating(true);
    try {
      await updateProfile({
        vacation_mode: !isVacationMode
      });
      toast.success(
        !isVacationMode 
          ? "🏝️ Vacation mode ON. New bookings are paused." 
          : "Welcome back! You're ready to accept bookings."
      );
    } catch (error) {
      toast.error("Failed to update vacation mode");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Main Availability Card */}
      <Card className={`relative overflow-hidden ${isAvailable ? 'ring-2 ring-green-400 shadow-2xl' : ''}`}>
        {isAvailable && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 pointer-events-none" />
        )}
        
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <motion.div 
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isAvailable ? 'bg-green-500 pulse-glow' : 'bg-gray-400'
                }`}
                animate={isAvailable ? { 
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.4)",
                    "0 0 40px rgba(34, 197, 94, 0.8)",
                    "0 0 20px rgba(34, 197, 94, 0.4)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isAvailable ? (
                  <Zap className="w-6 h-6 text-white" />
                ) : (
                  <Moon className="w-6 h-6 text-white" />
                )}
              </motion.div>
              
              <div>
                <h3 className="text-xl font-bold">Available for Hire</h3>
                <p className="text-sm text-muted-foreground">
                  {isAvailable ? "You're LIVE and visible to clients" : "You're offline"}
                </p>
              </div>
            </CardTitle>
            
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {isAvailable && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                  >
                    <Badge className="bg-green-500 text-white border-0 px-3 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      LIVE
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Switch
                checked={isAvailable}
                onCheckedChange={handleAvailabilityToggle}
                disabled={isUpdating}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {isAvailable && (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Next Available
                </span>
                <span className="font-medium text-green-600">{nextAvailableSlot}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Today's Schedule
                </span>
                <span className="font-medium">{bookedSlots}/{totalSlots} slots booked</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  Response Time
                </span>
                <span className="font-medium text-purple-600">{responseTime}</span>
              </div>
            </motion.div>
          )}

          {!isAvailable && (
            <motion.div 
              className="text-center py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Moon className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Turn on availability to start receiving bookings
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Quick Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-yellow-500" />
            Booking Preferences
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Instant Booking */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isInstantBook ? 'bg-purple-500' : 'bg-gray-400'
              }`}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Instant Booking</h4>
                <p className="text-sm text-muted-foreground">
                  Clients can book without approval
                </p>
              </div>
            </div>
            <Switch
              checked={isInstantBook}
              onCheckedChange={handleInstantBookToggle}
              disabled={isUpdating}
            />
          </div>

          {/* Vacation Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isVacationMode ? 'bg-orange-500' : 'bg-gray-400'
              }`}>
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Vacation Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Pause all new bookings
                </p>
              </div>
            </div>
            <Switch
              checked={isVacationMode}
              onCheckedChange={handleVacationToggle}
              disabled={isUpdating}
            />
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Calendar management coming soon!")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Manage Calendar
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Service area settings coming soon!")}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Service Areas
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Pricing management coming soon!")}
            >
              <Star className="w-4 h-4 mr-2" />
              Pricing & Services
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistAvailabilityToggle;