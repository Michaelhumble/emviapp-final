
import React from "react";
import { UserProfile } from "@/context/auth/types";
import { useNavigate } from "react-router-dom";
import { Edit, Calendar, Users, TrendingUp, Star, MapPin, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PremiumSalonProfileProps {
  userProfile: UserProfile;
}

const PremiumSalonProfile: React.FC<PremiumSalonProfileProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  const salonName = userProfile?.salon_name || userProfile?.salonName || userProfile?.full_name;
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Premium Header */}
      <div className="h-56 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/50"
          >
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row p-8 items-center lg:items-start gap-8">
              <div className="relative -mt-16 flex-shrink-0">
                {userProfile?.avatar_url ? (
                  <div className="relative">
                    <img 
                      src={userProfile.avatar_url} 
                      alt={salonName} 
                      className="h-32 w-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Salon
                    </div>
                  </div>
                ) : (
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-xl">
                    {salonName?.charAt(0) || "S"}
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{salonName || "Premium Salon"}</h1>
                <p className="text-gray-600 mb-3">{userProfile?.specialty || "Full-Service Beauty Salon"}</p>
                
                <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                  {userProfile?.location && (
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      <MapPin className="h-3 w-3 mr-1" />
                      {userProfile.location}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <Star className="h-3 w-3 mr-1" />
                    4.9 Rating
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Users className="h-3 w-3 mr-1" />
                    5 Staff Members
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Button onClick={() => navigate('/profile/edit')} variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Salon
                  </Button>
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Bookings
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">127</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">$12.4K</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">18</div>
                    <div className="text-sm text-gray-600">Services Offered</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
          
          {/* Contact & Services Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <Card className="bg-white/80 backdrop-blur-md border-white/50 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-emerald-500" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {userProfile?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{userProfile.phone}</span>
                    </div>
                  )}
                  {userProfile?.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-3 text-gray-400" />
                      <a href={userProfile.website} className="text-emerald-600 hover:underline">
                        {userProfile.website}
                      </a>
                    </div>
                  )}
                  {userProfile?.bio && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">About Our Salon</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{userProfile.bio}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-md border-white/50 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-emerald-500" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Staff
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSalonProfile;
