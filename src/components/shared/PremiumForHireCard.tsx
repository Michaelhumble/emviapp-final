import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Star, 
  Briefcase, 
  Share2, 
  Edit, 
  Camera, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle,
  Sparkles,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { cn } from '@/lib/utils';

interface PremiumForHireCardProps {
  mode: 'artist' | 'freelancer';
  className?: string;
  onEditProfile?: () => void;
  onShareProfile?: () => void;
}

const PremiumForHireCard = ({ 
  mode, 
  className,
  onEditProfile,
  onShareProfile 
}: PremiumForHireCardProps) => {
  const { userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    cities: '',
    rates: '',
    shifts: '',
    experience: '',
    specialties: '',
    availability: '',
    description: ''
  });

  const isArtist = mode === 'artist';
  const roleTitle = isArtist ? 'Artist For Hire' : 'Freelancer For Hire';
  const roleSubtitle = isArtist ? 'Available for on-demand nail services' : 'Available for on-demand work at salons';
  const roleBadge = isArtist ? '🎨 AVAILABLE' : '🚀 FREELANCER';
  const roleEmoji = isArtist ? '✨' : '💼';

  // Load profile data from localStorage
  useEffect(() => {
    const storageKey = `${mode}Profile`;
    const photoKey = `${mode}Photo`;
    
    const savedProfile = localStorage.getItem(storageKey);
    const savedPhoto = localStorage.getItem(photoKey);
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(prev => ({
        ...prev,
        fullName: userProfile?.full_name || '',
        specialties: userProfile?.specialty || ''
      }));
    }
    
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, [userProfile, mode]);

  const handleSave = () => {
    const storageKey = `${mode}Profile`;
    const photoKey = `${mode}Photo`;
    
    localStorage.setItem(storageKey, JSON.stringify(profile));
    if (profilePhoto) {
      localStorage.setItem(photoKey, profilePhoto);
    }
    
    toast.success(`Your ${mode} profile is now live! ${roleEmoji}`, {
      description: `Clients can now discover and hire you for on-demand work.`
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    if (onEditProfile) {
      onEditProfile();
    } else {
      setIsEditing(true);
    }
  };

  const handleShare = async () => {
    if (onShareProfile) {
      onShareProfile();
      return;
    }

    try {
      const profileUrl = `${window.location.origin}/${mode}/${profile.fullName?.toLowerCase().replace(/\s+/g, '-') || 'demo'}`;
      
      if (navigator.share) {
        await navigator.share({
          title: `${profile.fullName || roleTitle} - For Hire`,
          text: `Check out my professional services! ${profile.specialties || `Professional ${mode}`}`,
          url: profileUrl,
        });
      } else {
        await navigator.clipboard.writeText(profileUrl);
        toast.success("Profile link copied to clipboard! 🔗", {
          description: "Share your profile link with potential clients."
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Unable to share profile. Please try again.");
    }
  };

  const gradientClasses = isArtist 
    ? "from-purple-600 via-pink-600 to-orange-500"
    : "from-blue-600 via-indigo-600 to-purple-600";

  const cardGradientClasses = isArtist
    ? "from-purple-50 via-pink-50 to-orange-50"
    : "from-blue-50 via-indigo-50 to-purple-50";

  const accentColor = isArtist ? "purple" : "blue";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative group", className)}
    >
      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl",
          isArtist 
            ? "bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
            : "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
        )}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <Card className={cn(
        "relative overflow-hidden border-0 backdrop-blur-sm transition-all duration-300",
        "shadow-[var(--shadow-luxury)] hover:shadow-[var(--shadow-floating)]",
        `bg-gradient-to-br ${cardGradientClasses}`
      )}>
        {/* Animated header with glassmorphism */}
        <CardHeader className={cn(
          "relative overflow-hidden text-white pb-6",
          `bg-gradient-to-r ${gradientClasses}`
        )}>
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
                <CardTitle className="text-2xl font-bold tracking-tight">{roleTitle}</CardTitle>
                <p className="text-white/90 mt-1 font-medium">{roleSubtitle}</p>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 font-semibold">
                {roleBadge}
              </Badge>
            </motion.div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-6">
          {!isEditing ? (
            // Display Mode - Enhanced
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
                  <div className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
                    isArtist 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  )}>
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
                    <div className={cn(
                      "absolute -inset-1 rounded-full opacity-75 blur-lg transition-opacity",
                      isArtist 
                        ? "bg-gradient-to-r from-purple-400 to-pink-400"
                        : "bg-gradient-to-r from-blue-400 to-indigo-400"
                    )} />
                    <Avatar className="relative h-24 w-24 border-4 border-white shadow-[var(--shadow-medium)]">
                      <AvatarImage 
                        src={profilePhoto || userProfile?.avatar_url} 
                        alt={profile.fullName || 'Profile'} 
                        className="object-cover"
                      />
                      <AvatarFallback className={cn(
                        "text-2xl font-bold text-white",
                        isArtist 
                          ? "bg-gradient-to-br from-purple-500 to-pink-500"
                          : "bg-gradient-to-br from-blue-500 to-indigo-500"
                      )}>
                        {(profile.fullName || userProfile?.full_name || 'P').charAt(0)}
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
                      {profile.fullName || userProfile?.full_name || `Professional ${isArtist ? 'Nail Artist' : 'Freelancer'}`}
                    </h3>
                    <p className={cn(
                      "font-semibold mb-3 text-lg",
                      isArtist ? "text-purple-600" : "text-blue-600"
                    )}>
                      {profile.specialties?.split(',')[0]?.trim() || userProfile?.specialty || `${isArtist ? 'Nail Artist' : 'Nail Technician'}`} for Hire
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
                        <MapPin className={cn("h-4 w-4", isArtist ? "text-purple-500" : "text-blue-500")} />
                        <span>{profile.cities || 'New York, NY'}</span>
                      </div>
                      <div className={cn("font-semibold", isArtist ? "text-purple-600" : "text-blue-600")}>
                        {profile.experience || '3+ years'}
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
                    <DollarSign className={cn("h-5 w-5", isArtist ? "text-purple-600" : "text-blue-600")} />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Hourly Rate</p>
                      <p className="font-semibold text-gray-800">{profile.rates || '$75-100'}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Clock className={cn("h-5 w-5", isArtist ? "text-purple-600" : "text-blue-600")} />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Availability</p>
                      <p className="font-semibold text-gray-800">{profile.shifts || 'Flexible'}</p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Enhanced specialties */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className={cn("h-4 w-4", isArtist ? "text-purple-600" : "text-blue-600")} />
                    <h5 className="font-semibold text-gray-700">Specialties & Services</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties ? (
                      profile.specialties.split(',').map((specialty, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "font-medium shadow-sm hover:shadow-md transition-all",
                              isArtist 
                                ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                                : "border-blue-300 text-blue-700 hover:bg-blue-50"
                            )}
                          >
                            {specialty.trim()}
                          </Badge>
                        </motion.div>
                      ))
                    ) : (
                      <>
                        <Badge variant="outline" className={cn("font-medium", isArtist ? "border-purple-300 text-purple-700" : "border-blue-300 text-blue-700")}>Gel Manicures</Badge>
                        <Badge variant="outline" className={cn("font-medium", isArtist ? "border-purple-300 text-purple-700" : "border-blue-300 text-blue-700")}>Nail Art</Badge>
                        <Badge variant="outline" className={cn("font-medium", isArtist ? "border-purple-300 text-purple-700" : "border-blue-300 text-blue-700")}>Acrylics</Badge>
                        <Badge variant="outline" className={cn("font-medium", isArtist ? "border-purple-300 text-purple-700" : "border-blue-300 text-blue-700")}>Pedicures</Badge>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Enhanced description */}
                <div className="pt-4 border-t border-gray-200/60">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {profile.description || 
                      `Professional ${mode} available for salon partnerships, special events, and on-demand services. Bringing creativity, expertise, and reliability to every appointment.`
                    }
                  </p>
                </div>

                {/* Availability status */}
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
              </div>

              {/* Enhanced action buttons */}
              <motion.div 
                className="flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={handleShare}
                    className={cn(
                      "w-full text-white font-semibold py-3 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all",
                      isArtist 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    )}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share My Profile
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={handleEdit}
                    variant="outline" 
                    className={cn(
                      "font-semibold py-3 shadow-sm hover:shadow-md transition-all",
                      isArtist 
                        ? "border-purple-300 text-purple-600 hover:bg-purple-50"
                        : "border-blue-300 text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // Edit Mode - Keep existing edit functionality
            <div className="space-y-6">
              {/* Photo Upload */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-gray-200">
                    <AvatarImage src={profilePhoto || userProfile?.avatar_url} alt="Profile" />
                    <AvatarFallback className={cn(
                      "text-xl font-semibold text-white",
                      isArtist 
                        ? "bg-gradient-to-br from-purple-500 to-pink-500"
                        : "bg-gradient-to-br from-blue-500 to-indigo-500"
                    )}>
                      {(profile.fullName || 'P').charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="photo-upload" className={cn(
                    "absolute -bottom-1 -right-1 text-white rounded-full p-2 cursor-pointer transition-colors",
                    isArtist 
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  )}>
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                  <Input 
                    placeholder="Your full name"
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  />
                </div>
              </div>

              {/* Form fields - keep existing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Cities Willing to Work</label>
                  <Input 
                    placeholder="e.g., San Francisco, Oakland, San Jose"
                    value={profile.cities}
                    onChange={(e) => setProfile({...profile, cities: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Hourly Rates</label>
                  <Input 
                    placeholder="e.g., $75-100/hour"
                    value={profile.rates}
                    onChange={(e) => setProfile({...profile, rates: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Preferred Shifts</label>
                  <Input 
                    placeholder="e.g., Days, Evenings, Weekends"
                    value={profile.shifts}
                    onChange={(e) => setProfile({...profile, shifts: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Years of Experience</label>
                  <Input 
                    placeholder="e.g., 5+ years"
                    value={profile.experience}
                    onChange={(e) => setProfile({...profile, experience: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Specialties & Services</label>
                <Input 
                  placeholder="e.g., Gel manicures, Nail art, Pedicures, Acrylics (separated by commas)"
                  value={profile.specialties}
                  onChange={(e) => setProfile({...profile, specialties: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Availability</label>
                <Input 
                  placeholder="e.g., Available immediately, 2-week notice"
                  value={profile.availability}
                  onChange={(e) => setProfile({...profile, availability: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Professional Description</label>
                <Textarea 
                  placeholder="Describe your experience, work style, and what makes you a great professional..."
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={handleSave}
                  className={cn(
                    "flex-1 text-white font-semibold",
                    isArtist 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  )}
                >
                  Save & Go Live
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumForHireCard;
