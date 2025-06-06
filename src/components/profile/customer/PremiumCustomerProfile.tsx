
import React from "react";
import { UserProfile } from "@/context/auth/types";
import { useNavigate } from "react-router-dom";
import { Edit, Heart, Calendar, Star, Award, Gift, User, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PremiumCustomerProfileProps {
  userProfile: UserProfile;
}

const PremiumCustomerProfile: React.FC<PremiumCustomerProfileProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Premium Header */}
      <div className="h-56 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 relative overflow-hidden">
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
                      alt={userProfile.full_name} 
                      className="h-32 w-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      VIP
                    </div>
                  </div>
                ) : (
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-xl">
                    {userProfile?.full_name?.charAt(0) || "V"}
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile?.full_name || "Beauty Enthusiast"}</h1>
                <p className="text-gray-600 mb-3">VIP Beauty Member</p>
                
                <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                  <Badge variant="secondary" className="bg-pink-50 text-pink-700 border-pink-200">
                    <Star className="h-3 w-3 mr-1" />
                    Gold Member
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Award className="h-3 w-3 mr-1" />
                    15 Day Streak
                  </Badge>
                  <Badge variant="secondary" className="bg-rose-50 text-rose-700 border-rose-200">
                    <Gift className="h-3 w-3 mr-1" />
                    2,450 Points
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Button onClick={() => navigate('/profile/edit')} variant="outline" className="border-pink-200 text-pink-700 hover:bg-pink-50">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Beauty Journey Stats */}
            <div className="px-8 pb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-pink-500" />
                Your Beauty Journey
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-pink-600 mb-2">23</div>
                    <div className="text-sm text-gray-600">Appointments</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                    <div className="text-sm text-gray-600">Favorite Artists</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-rose-600 mb-2">$1.2K</div>
                    <div className="text-sm text-gray-600">Money Saved</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-2">4.9</div>
                    <div className="text-sm text-gray-600">Avg Rating Given</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
          
          {/* Features & Rewards Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <Card className="bg-white/80 backdrop-blur-md border-white/50 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-500" />
                  Your Favorites
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <div>
                      <p className="font-medium">Nail Art Studio</p>
                      <p className="text-sm text-gray-500">Manhattan, NY</p>
                    </div>
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">Beauty Lounge</p>
                      <p className="text-sm text-gray-500">Brooklyn, NY</p>
                    </div>
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  <Button variant="outline" className="w-full">
                    View All Favorites
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-md border-white/50 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-purple-500" />
                  Rewards & Perks
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <p className="font-medium text-purple-700">Free Manicure Reward</p>
                    <p className="text-sm text-purple-600">Available to redeem</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
                    <p className="font-medium text-amber-700">20% Off Next Service</p>
                    <p className="text-sm text-amber-600">Expires in 7 days</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                    View All Rewards
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

export default PremiumCustomerProfile;
