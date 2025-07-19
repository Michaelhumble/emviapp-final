import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  MapPin, 
  Star, 
  Briefcase, 
  Share2, 
  Edit, 
  Clock, 
  DollarSign,
  CheckCircle,
  Sparkles,
  Heart,
  Users
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useArtistForHire } from '@/hooks/artist/useArtistForHire';
import { cn } from '@/lib/utils';

interface ArtistForHireCardProps {
  onShareProfile?: () => void;
  onEditProfile?: () => void;
  isSharing?: boolean;
}

const ArtistForHireCard = ({ 
  onShareProfile,
  onEditProfile,
  isSharing = false
}: ArtistForHireCardProps) => {
  const { userProfile } = useAuth();
  const { profile, isLoading, toggleAvailability } = useArtistForHire();
  const [isHovered, setIsHovered] = useState(false);

  const displayName = userProfile?.full_name || 'Professional Nail Artist';
  const displayHeadline = profile?.headline || `Professional ${userProfile?.specialty || 'Nail Artist'} For Hire`;
  const displayLocation = profile?.location || userProfile?.location || 'Your Location';
  const displayRate = profile?.hourly_rate || '$75-100';
  const displayAvailability = profile?.shifts_available || 'Flexible';
  const displaySpecialties = profile?.specialties || userProfile?.specialty || 'Gel Manicures, Nail Art';
  const displayBio = profile?.bio || `Professional ${userProfile?.specialty || 'nail artist'} available for salon partnerships, special events, and on-demand services. Bringing creativity, expertise, and reliability to every appointment.`;
  const displayAvatar = profile?.avatar_url || userProfile?.avatar_url;
  const isAvailable = profile?.available_for_work ?? true;

  const specialtyList = displaySpecialties.split(',').map(s => s.trim()).filter(s => s);

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-0 backdrop-blur-sm bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <Card className="relative overflow-hidden border-0 backdrop-blur-sm transition-all duration-300 shadow-[var(--shadow-luxury)] hover:shadow-[var(--shadow-floating)] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Animated header with glassmorphism */}
        <CardHeader className="relative overflow-hidden text-white pb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
          </div>
          
          <motion.div 
            className="relative flex items-center justify-between"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Briefcase className="h-6 w-6" />
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">Artist For Hire</CardTitle>
                <p className="text-white/90 mt-1 font-medium">Available for on-demand nail services</p>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 font-semibold">
                🎨 AVAILABLE
              </Badge>
            </motion.div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Display Mode */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Glass card container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-[var(--shadow-glass)]">
              {/* Verified badge */}
              <motion.div 
                className="absolute -top-2 -right-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </div>
              </motion.div>

              {/* Profile header with enhanced avatar */}
              <div className="flex items-center gap-6 mb-6">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -inset-1 rounded-full opacity-75 blur-lg transition-opacity bg-gradient-to-r from-purple-400 to-pink-400" />
                  <Avatar className="relative h-24 w-24 border-4 border-white shadow-[var(--shadow-medium)]">
                    <AvatarImage 
                      src={displayAvatar} 
                      alt={displayName} 
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold text-white bg-gradient-to-br from-purple-500 to-pink-500">
                      {displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Online indicator */}
                  <motion.div 
                    className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="h-2 w-2 bg-white rounded-full" />
                  </motion.div>
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {displayName}
                  </h3>
                  <p className="font-semibold mb-3 text-lg text-purple-600">
                    {displayHeadline}
                  </p>
                  
                  {/* Enhanced stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">4.9</span>
                      <span className="text-gray-400">(127 reviews)</span>
                    </motion.div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span>{displayLocation}</span>
                    </div>
                    <div className="font-semibold text-purple-600">
                      {profile?.years_experience || '3+ years'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced info grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <DollarSign className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Hourly Rate</p>
                    <p className="font-semibold text-gray-800">{displayRate}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Availability</p>
                    <p className="font-semibold text-gray-800">{displayAvailability}</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced specialties */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <h5 className="font-semibold text-gray-700">Specialties & Services</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialtyList.map((specialty, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge 
                        variant="outline" 
                        className="font-medium shadow-sm hover:shadow-md transition-all border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        {specialty}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced description */}
              <div className="pt-4 border-t border-gray-200/60">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {displayBio}
                </p>
              </div>

              {/* Availability toggle */}
              <div className="flex items-center justify-between mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Available for On-Demand Work</p>
                    <p className="text-sm text-gray-600">Let salons know you're open to new opportunities</p>
                  </div>
                </div>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={toggleAvailability}
                />
              </div>

              {/* Availability status */}
              {isAvailable && (
                <motion.div 
                  className="flex items-center justify-center mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 text-sm font-semibold shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mr-2"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </motion.div>
                    Available for On-Demand Work
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Enhanced action buttons */}
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onEditProfile}
                  variant="outline"
                  className="w-full h-12 font-semibold border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit For Hire Profile
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onShareProfile}
                  disabled={isSharing}
                  className="w-full h-12 font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-200"
                >
                  {isSharing ? (
                    <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Share2 className="h-5 w-5 mr-2" />
                  )}
                  {isSharing ? 'Sharing...' : 'Share Profile'}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistForHireCard;