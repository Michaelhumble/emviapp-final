
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Users, 
  Share2, 
  Gift,
  ArrowRight, 
  Copy, 
  CheckCircle, 
  Edit3, 
  Instagram,
  Globe,
  PlusCircle,
  Clock,
  Eye,
  MousePointer,
  Award,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Loader
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import { getInitials } from "@/utils/userUtils";
import { UserProfile } from "@/context/auth/types";

// Custom components for the dashboard sections
import ArtistWelcomeBanner from "./ArtistWelcomeBanner";
import ArtistDashboardHeader from "./ArtistDashboardHeader";
import ArtistBoostTracker from "./ArtistBoostTracker";
import ArtistToolkit from "./ArtistToolkit";
import ArtistDashboardWidgets from "./ArtistDashboardWidgets";
import ArtistMetricsSection from "./ArtistMetricsSection";
import ArtistPortfolioSection from "./ArtistPortfolioSection";
import ArtistServicesSection from "./ArtistServicesSection";
import ArtistReferralCenter from "./ArtistReferralCenter";
import ArtistBookingCalendar from "./ArtistBookingCalendar";
import ArtistUpgradeSection from "./ArtistUpgradeSection";

// Type for welcome banner messages
interface WelcomeBannerMessage {
  id: number;
  text: string;
}

// Type for portfolio item
interface PortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
}

// Type for service item
interface ServiceItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  description?: string;
}

const ArtistDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artistProfile, setArtistProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [activeMessage, setActiveMessage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [profileCompletionPercentage, setProfileCompletionPercentage] = useState(0);
  
  // Sample portfolio items - would come from API/database in production
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Summer Collection"
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1632344551739-ac0d8213c593?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Winter Elegance"
    },
    {
      id: "3",
      imageUrl: "https://images.unsplash.com/photo-1612228250798-5b6b40c41b75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Bridal Special"
    },
    {
      id: "4",
      imageUrl: "https://images.unsplash.com/photo-1579591216956-bca09967818d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Luxury Designs"
    }
  ]);
  
  // Sample services - would come from API/database in production
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: "1",
      name: "Basic Manicure",
      price: "$35",
      duration: "30 min",
      description: "Nail shaping, cuticle care, hand massage, and polish."
    },
    {
      id: "2",
      name: "Gel Polish Application",
      price: "$45",
      duration: "45 min",
      description: "Long-lasting gel polish application with curing."
    },
    {
      id: "3",
      name: "Full Set Acrylic",
      price: "$65",
      duration: "60 min",
      description: "Full set of acrylic nails with polish or gel color."
    },
    {
      id: "4",
      name: "Nail Art Design",
      price: "$15+",
      duration: "15+ min",
      description: "Custom nail art designs per nail."
    }
  ]);
  
  // Motivational messages for the welcome banner
  const welcomeMessages: WelcomeBannerMessage[] = [
    { id: 1, text: "Behind every beautiful nail set is a dream. Let's build yours." },
    { id: 2, text: "You're not alone. EmviApp is your business partner." },
    { id: 3, text: "The hustle is real—but you've got support now." }
  ];
  
  // Fetch user profile data from Supabase
  useEffect(() => {
    const fetchArtistProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching artist profile:', error);
          setError('Failed to load your profile data. Please try again later.');
          toast.error('Could not load profile data');
        } else if (data) {
          setArtistProfile(data as UserProfile);
          setBio(data.bio || '');
          setInstagram(data.instagram || '');
          setWebsite(data.website || '');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again later.');
        toast.error('Could not load profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtistProfile();
  }, [user]);
  
  // Calculate profile completion percentage
  useEffect(() => {
    if (artistProfile) {
      let completedFields = 0;
      let totalFields = 6; // Adjust based on your profile fields
      
      if (artistProfile.full_name) completedFields++;
      if (artistProfile.avatar_url) completedFields++;
      if (artistProfile.bio) completedFields++;
      if (artistProfile.instagram) completedFields++;
      if (artistProfile.website) completedFields++;
      if (artistProfile.location) completedFields++;
      
      setProfileCompletionPercentage(Math.round((completedFields / totalFields) * 100));
    }
  }, [artistProfile]);
  
  // Rotate welcome messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessage(prev => (prev + 1) % welcomeMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [welcomeMessages.length]);
  
  // Save profile changes
  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('users')
        .update({
          bio,
          instagram,
          website,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      } else {
        if (artistProfile) {
          setArtistProfile({
            ...artistProfile,
            bio,
            instagram,
            website,
            updated_at: new Date().toISOString()
          });
        }
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  // Copy referral link
  const handleCopyReferralLink = () => {
    const referralCode = artistProfile?.affiliate_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
    const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
    
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  // Add new portfolio item
  const handleAddPortfolioItem = () => {
    // In production, this would open an upload dialog/form
    toast.info("Portfolio upload feature coming soon!");
  };
  
  // Add new service
  const handleAddService = () => {
    // In production, this would open a service form
    toast.info("Service creation feature coming soon!");
  };
  
  // Format first name for greeting
  const firstName = artistProfile?.full_name ? artistProfile.full_name.split(' ')[0] : "Artist";
  
  // Show loading state
  if (loading && !artistProfile) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error && !artistProfile) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Couldn't Load Your Dashboard</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pb-20">
      {/* 1. Welcome Banner */}
      <section className="mb-8">
        <Card className="border-none bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-purple-900">
                  Welcome back, {firstName}!
                </h1>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={activeMessage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.5 }}
                    className="text-purple-700 mt-2"
                  >
                    {welcomeMessages[activeMessage].text}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-purple-700">
                  <Clock className="h-4 w-4 inline mr-1" /> 
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* 2. Profile Header */}
      <section className="mb-8">
        <Card className="overflow-hidden border border-gray-100">
          <div className="h-32 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"></div>
          <CardContent className="relative p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 -mt-16">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  {artistProfile?.avatar_url ? (
                    <AvatarImage src={artistProfile.avatar_url} alt={artistProfile.full_name || "Artist"} />
                  ) : (
                    <AvatarFallback className="text-2xl bg-purple-100 text-purple-600">
                      {getInitials(artistProfile?.full_name || "Nail Artist")}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-serif font-semibold">
                      {artistProfile?.full_name || "Nail Artist"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {artistProfile?.specialty || (
                        <span className="text-gray-400 italic">Add your specialty to complete your profile</span>
                      )}
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-1"
                    disabled={loading}
                  >
                    {isEditing ? "Cancel" : <><Edit3 className="h-3 w-3" /> Edit Profile</>}
                  </Button>
                </div>
                
                {isEditing ? (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <Input
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself and your work..."
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Instagram className="h-4 w-4 text-gray-400" />
                          </span>
                          <Input
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            placeholder="Your Instagram handle"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Globe className="h-4 w-4 text-gray-400" />
                          </span>
                          <Input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Your website URL"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-gray-700 text-sm">
                      {artistProfile?.bio || bio || (
                        <span className="text-gray-400 italic">No bio added yet. Click Edit Profile to add one!</span>
                      )}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-3">
                      {(artistProfile?.instagram || instagram) ? (
                        <a 
                          href={`https://instagram.com/${(artistProfile?.instagram || instagram).replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                        >
                          <Instagram className="h-4 w-4" />
                          @{(artistProfile?.instagram || instagram).replace('@', '')}
                        </a>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-gray-400 italic">
                          <Instagram className="h-4 w-4" />
                          Add Instagram profile
                        </span>
                      )}
                      
                      {(artistProfile?.website || website) ? (
                        <a 
                          href={(artistProfile?.website || website).startsWith('http') ? (artistProfile?.website || website) : `https://${artistProfile?.website || website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                        >
                          <Globe className="h-4 w-4" />
                          {(artistProfile?.website || website).replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-gray-400 italic">
                          <Globe className="h-4 w-4" />
                          Add your website
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm text-gray-500">{profileCompletionPercentage}%</span>
                  </div>
                  <Progress value={profileCompletionPercentage} className="h-2" />
                  
                  {profileCompletionPercentage < 100 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Complete your profile to attract more clients!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* 3. Boost Tracker */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold mb-4">Profile Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-100 p-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  +12% ↑
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-bold">{artistProfile?.profile_views || 245}</h3>
              <p className="text-sm text-gray-600">Profile Views</p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-pink-100 p-2">
                  <MousePointer className="h-5 w-5 text-pink-600" />
                </div>
                <span className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                  +8% ↑
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-bold">87</h3>
              <p className="text-sm text-gray-600">Link Clicks</p>
              <p className="text-xs text-gray-500 mt-1">Instagram & Website</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-purple-100 p-2">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  New
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-bold">16</h3>
              <p className="text-sm text-gray-600">Saved Portfolios</p>
              <p className="text-xs text-gray-500 mt-1">Potential clients</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Remaining sections */}
      {/* 4. Artist Toolkit */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold mb-4">Artist Toolkit</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow"
            onClick={() => toast.info("Portfolio upload feature coming soon!")}
          >
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Upload Portfolio</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow"
            onClick={handleAddService}
          >
            <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-3">
              <ShoppingBag className="h-6 w-6 text-pink-600" />
            </div>
            <span className="text-sm font-medium">Add Services</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow"
            onClick={() => toast.info("Booking calendar coming soon!")}
          >
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium">View Bookings</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow"
            onClick={handleCopyReferralLink}
          >
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium">Invite Others</span>
          </Button>
        </div>
      </section>
      
      {/* 5. Dashboard Widgets */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-gray-500">No appointments scheduled today</p>
                <Button variant="link" size="sm" className="mt-2" asChild>
                  <a href="#calendar">Check Calendar</a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-pink-500" />
                Unread Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="inline-flex h-8 w-8 rounded-full bg-pink-100 items-center justify-center mb-2">
                  <span className="font-semibold text-pink-600">3</span>
                </div>
                <p className="text-gray-500">New message requests</p>
                <Button variant="link" size="sm" className="mt-2">
                  View Inbox
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-500" />
                Profile Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="inline-flex h-8 w-8 rounded-full bg-green-100 items-center justify-center mb-2">
                  <span className="text-green-600 text-xs font-semibold">LIVE</span>
                </div>
                <p className="text-gray-500">Your profile is visible to clients</p>
                <Button variant="link" size="sm" className="mt-2">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* 6. Portfolio Section */}
      <section className="mb-8" id="portfolio">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-semibold">Portfolio</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleAddPortfolioItem}
          >
            <PlusCircle className="h-4 w-4" />
            Add More
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-md transition duration-200">
              <div className="relative">
                <AspectRatio ratio={1}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-3 w-full">
                    <p className="text-white font-medium text-sm">{item.title}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          <Button 
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 aspect-square"
            onClick={handleAddPortfolioItem}
          >
            <PlusCircle className="h-6 w-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Add New</span>
          </Button>
        </div>
      </section>
      
      {/* 7. Services Section */}
      <section className="mb-8" id="services">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-semibold">Services</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleAddService}
          >
            <PlusCircle className="h-4 w-4" />
            Add Service
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-600">{service.price}</p>
                    <p className="text-xs text-gray-500">{service.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="h-full w-full p-6 flex flex-col items-center justify-center"
                onClick={handleAddService}
              >
                <PlusCircle className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add New Service</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* 8. Referral Center */}
      <section className="mb-8" id="referrals">
        <h2 className="text-xl font-serif font-semibold mb-4">Referral Center</h2>
        <Card className="border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Invite artists, earn rewards</h3>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">
                  {userProfile?.referral_count || 0}
                </div>
                <div className="text-xs text-gray-500">Artists joined</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Your Referral Link
              </label>
              <div className="flex">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {`https://emviapp.com/join?ref=${userProfile?.affiliate_code || 'EMVI1234'}`}
                </div>
                <Button 
                  variant="outline"
                  className="rounded-l-none" 
                  onClick={handleCopyReferralLink}
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="justify-between bg-white"
                onClick={() => toast.info("Sharing via SMS coming soon!")}
              >
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-purple-500" /> 
                  Share via SMS
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-between bg-white"
                onClick={() => toast.info("Instagram sharing coming soon!")}
              >
                <div className="flex items-center">
                  <Instagram className="h-4 w-4 mr-2 text-purple-500" /> 
                  Post on Instagram
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* 9. Booking Calendar */}
      <section className="mb-8" id="calendar">
        <h2 className="text-xl font-serif font-semibold mb-4">Booking Calendar</h2>
        <Card className="border-blue-100">
          <CardContent className="p-6">
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-blue-100 p-4 mb-4">
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Calendar Loading...</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                Your booking calendar is coming soon! You'll be able to manage your appointments and accept online bookings.
              </p>
              <Button variant="outline">
                Get Early Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* 10. Upgrade Section */}
      <section id="upgrade">
        <h2 className="text-xl font-serif font-semibold mb-4">Unlock Premium Features</h2>
        <Card className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full opacity-20 -mt-10 -mr-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full opacity-20 -mb-10 -ml-10"></div>
          
          <CardContent className="relative p-6 z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-amber-300" />
              <h3 className="font-bold text-lg">Upgrade to EmviApp Premium</h3>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-400 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span>Priority placement in search results</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-400 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span>Online booking with built-in calendar</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-400 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span>Unlimited portfolio uploads</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-400 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span>Client management tools</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-400 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span>Advanced analytics and insights</span>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div>
                <div className="text-3xl font-bold flex items-center">
                  $9.99 <span className="text-sm ml-1 font-normal">/month</span>
                </div>
                <p className="text-purple-200 text-sm">Billed monthly, cancel anytime</p>
              </div>
              
              <Button size="lg" className="w-full sm:w-auto bg-white text-purple-900 hover:bg-gray-100">
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ArtistDashboard;
