
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  User, Award, Star, MapPin, Phone, Mail, Globe, Instagram, 
  Calendar, Share2, QrCode, Copy, CheckCircle2, Facebook,
  Twitter, Palette, PenTool, Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { UserProfile, getLocationString } from "@/types/profile";
import { useIsMobile } from "@/hooks/use-mobile";
import ReferralWidget from "@/components/dashboard/artist/components/ReferralWidget";
import ArtistPortfolioSection from "@/components/portfolio/ArtistPortfolioSection";

interface PremiumArtistProfileProps {
  userProfile: UserProfile;
}

const PremiumArtistProfile: React.FC<PremiumArtistProfileProps> = ({ userProfile }) => {
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const [showQrCode, setShowQrCode] = useState(false);

  const locationString = getLocationString(userProfile.location);
  
  const getSpecialties = () => {
    if (userProfile.specialties && Array.isArray(userProfile.specialties)) {
      return userProfile.specialties;
    }
    if (userProfile.specialty) {
      return [userProfile.specialty];
    }
    return [];
  };
  
  const specialties = getSpecialties();
  
  const handleCopyProfileLink = () => {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success("Profile link copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };
  
  const handleShareProfile = async () => {
    const profileUrl = window.location.href;
    
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: `${userProfile.full_name || 'Artist'} - EmviApp Profile`,
          text: `Check out ${userProfile.full_name || 'this artist'}'s profile on EmviApp`,
          url: profileUrl,
        });
        toast.success("Thanks for sharing!");
      } catch (err) {
        console.log("Error sharing:", err);
        handleCopyProfileLink();
      }
    } else {
      handleCopyProfileLink();
    }
  };
  
  // Calculate artist level based on profile completion, reviews, etc.
  const getArtistLevel = () => {
    // This would be more sophisticated in production
    const hasServices = userProfile.services && userProfile.services.length > 0;
    const hasPortfolio = userProfile.gallery && userProfile.gallery.length > 0;
    const hasBio = !!userProfile.bio && userProfile.bio.length > 20;
    const hasSpecialties = specialties.length > 0;
    
    let points = 0;
    if (hasServices) points += 2;
    if (hasPortfolio) points += 3;
    if (hasBio) points += 2;
    if (hasSpecialties) points += 2;
    if (userProfile.instagram) points += 1;
    if (userProfile.website) points += 1;
    
    // Levels: Newcomer (0-3), Emerging (4-6), Established (7-9), Elite (10+)
    if (points >= 10) return { title: "Elite Artist", badge: "👑 Elite" };
    if (points >= 7) return { title: "Established Professional", badge: "⭐ Pro" };
    if (points >= 4) return { title: "Emerging Talent", badge: "✨ Rising" };
    return { title: "Newcomer", badge: "🔍 New" };
  };
  
  const artistLevel = getArtistLevel();
  
  return (
    <div className="relative min-h-screen pb-16">
      {/* Parallax Hero Section */}
      <motion.div 
        className="relative h-[40vh] md:h-[50vh] overflow-hidden"
        style={{ 
          y: parallaxY,
          opacity: opacityTransform
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-70"></div>
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg relative">
              {userProfile.avatar_url ? (
                <AvatarImage src={userProfile.avatar_url} alt={userProfile.full_name || "Artist"} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              )}
            </Avatar>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-center px-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              {userProfile.full_name || "Artist Profile"}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Badge className="bg-white/90 hover:bg-white text-purple-700 shadow-sm">
                {userProfile.role || "Artist"}
              </Badge>
              
              <Badge className="bg-white/90 hover:bg-white text-pink-600 shadow-sm" variant="outline">
                {artistLevel.badge}
              </Badge>
              
              {specialties.length > 0 && (
                <Badge className="bg-white/90 hover:bg-white text-blue-600 shadow-sm">
                  {specialties[0]}
                </Badge>
              )}
            </div>
            
            <p className="mt-3 text-white text-opacity-90 max-w-lg mx-auto drop-shadow-sm">
              {userProfile.professional_name || userProfile.title || (specialties.length > 0 ? `Specialized in ${specialties.join(', ')}` : "Beauty Professional")}
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="container max-w-5xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Contact Card */}
            <Card className="border border-gray-100 shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-xl flex items-center">
                  <User className="mr-2 h-5 w-5 text-purple-500" />
                  Contact
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {locationString && (
                  <motion.div 
                    className="flex items-center text-gray-700"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                    <span>{locationString}</span>
                  </motion.div>
                )}
                
                {userProfile.phone && (
                  <motion.div 
                    className="flex items-center text-gray-700"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Phone className="h-4 w-4 mr-2 text-purple-400" />
                    <a href={`tel:${userProfile.phone}`} className="hover:text-purple-600 transition-colors">
                      {userProfile.phone}
                    </a>
                  </motion.div>
                )}
                
                {userProfile.email && (
                  <motion.div 
                    className="flex items-center text-gray-700"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Mail className="h-4 w-4 mr-2 text-purple-400" />
                    <a href={`mailto:${userProfile.email}`} className="hover:text-purple-600 transition-colors">
                      {userProfile.email}
                    </a>
                  </motion.div>
                )}
                
                {userProfile.website && (
                  <motion.div 
                    className="flex items-center text-gray-700"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Globe className="h-4 w-4 mr-2 text-purple-400" />
                    <a 
                      href={userProfile.website.startsWith('http') ? userProfile.website : `https://${userProfile.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-600 transition-colors"
                    >
                      {userProfile.website.replace(/^https?:\/\//, '')}
                    </a>
                  </motion.div>
                )}
                
                {userProfile.instagram && (
                  <motion.div 
                    className="flex items-center text-gray-700"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Instagram className="h-4 w-4 mr-2 text-purple-400" />
                    <a 
                      href={`https://instagram.com/${userProfile.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-600 transition-colors"
                    >
                      @{userProfile.instagram.replace('@', '')}
                    </a>
                  </motion.div>
                )}
                
                {userProfile.created_at && (
                  <motion.div 
                    className="flex items-center text-gray-700"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    <span>
                      Joined {new Date(userProfile.created_at).toLocaleDateString()}
                    </span>
                  </motion.div>
                )}
                
                <Separator className="my-4" />
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={handleShareProfile} 
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Share"}
                  </Button>
                  
                  <Button variant="outline" onClick={() => setShowQrCode(!showQrCode)} className="w-10 p-0">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
                
                {showQrCode && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 bg-gray-50 rounded-lg p-4 flex flex-col items-center"
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      {/* Placeholder for actual QR code - in production this would be a real QR */}
                      <div className="w-32 h-32 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+window.location.href)] bg-contain bg-no-repeat bg-center"></div>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Scan to view profile
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            
            {/* Artist Referral Widget */}
            <ReferralWidget />
            
            {/* Artist Achievements/Badges */}
            <Card className="border border-gray-100 shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-xl flex items-center">
                  <Award className="mr-2 h-5 w-5 text-purple-500" />
                  Artist Achievements
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <motion.div 
                  className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-2">
                      {artistLevel.badge.split(" ")[0]}
                    </span>
                    <div>
                      <h3 className="font-semibold text-purple-800">{artistLevel.title}</h3>
                      <p className="text-xs text-gray-600">Artist Status Level</p>
                    </div>
                  </div>
                </motion.div>
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.div 
                    className="bg-blue-50 p-3 rounded-lg text-center"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-xs font-medium text-blue-700">Verified Pro</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-pink-50 p-3 rounded-lg text-center"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Sparkles className="h-5 w-5 mx-auto mb-1 text-pink-500" />
                    <p className="text-xs font-medium text-pink-700">Style Maven</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column (Main Content) */}
          <div className="md:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="border border-gray-100 shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-xl flex items-center">
                  <User className="mr-2 h-5 w-5 text-purple-500" />
                  About
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {userProfile.bio ? (
                  <div className="prose prose-purple max-w-none">
                    <p className="whitespace-pre-line">{userProfile.bio}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 italic">
                    <p>This artist hasn't added any bio information yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* My Style & Signature Section */}
            <Card className="border border-gray-100 shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-xl flex items-center">
                  <Palette className="mr-2 h-5 w-5 text-purple-500" />
                  My Style & Signature
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {specialties.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {specialties.map((specialty, index) => (
                        <motion.div
                          key={`specialty-${index}`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center"
                        >
                          <PenTool className="h-4 w-4 mr-2 text-purple-400" />
                          <span className="text-purple-800 font-medium text-sm">
                            {specialty}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <p className="text-gray-600">
                      {userProfile.bio ? (
                        <span>
                          Specializing in {specialties.join(', ')}, creating unique styles tailored to each client's needs.
                        </span>
                      ) : (
                        <span>
                          Specializing in {specialties.join(', ')}
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 italic">
                    <p>No specialties have been added yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Portfolio Section */}
            <ArtistPortfolioSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumArtistProfile;
