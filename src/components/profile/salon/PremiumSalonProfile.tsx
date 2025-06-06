
import React from "react";
import { motion } from "framer-motion";
import { UserProfile } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Phone, Globe, Instagram, Users, Star, Calendar, TrendingUp } from "lucide-react";

interface PremiumSalonProfileProps {
  userProfile: UserProfile;
}

const PremiumSalonProfile: React.FC<PremiumSalonProfileProps> = ({ userProfile }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <Building2 className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {userProfile.salon_name || userProfile.full_name || "Premium Salon"}
            </h1>
            <p className="text-xl text-purple-100 mb-6">
              Luxury Beauty Experience • Award-Winning Service
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Badge className="bg-yellow-400 text-yellow-900 px-4 py-2">
                ⭐ Premium Partner
              </Badge>
              <Badge className="bg-emerald-400 text-emerald-900 px-4 py-2">
                💎 Verified Salon
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Salon Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">About Our Salon</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {userProfile.bio || "Welcome to our premium beauty destination. We offer world-class services with the finest products and most skilled professionals in the industry."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Services Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Our Services</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Nail Art', 'Manicure', 'Pedicure', 'Gel Polish', 'Extensions', 'Spa Treatment'].map((service, index) => (
                      <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 text-center">
                        <div className="text-sm font-medium text-gray-800">{service}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Our Team</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((member) => (
                      <div key={member} className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                          A{member}
                        </div>
                        <div>
                          <h4 className="font-semibold">Artist {member}</h4>
                          <p className="text-sm text-gray-600">Senior Nail Technician</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">4.9</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Stats & Contact */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Salon Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm">Happy Clients</span>
                      </div>
                      <span className="font-bold text-lg">2,500+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        <span className="text-sm">Rating</span>
                      </div>
                      <span className="font-bold text-lg">4.9</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm">Years in Business</span>
                      </div>
                      <span className="font-bold text-lg">8+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm">Growth Rate</span>
                      </div>
                      <span className="font-bold text-lg">+25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact & Location</h3>
                  <div className="space-y-3">
                    {userProfile.location && (
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-red-500 mr-3" />
                        <span className="text-sm">{userProfile.location}</span>
                      </div>
                    )}
                    {userProfile.phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">{userProfile.phone}</span>
                      </div>
                    )}
                    {userProfile.website && (
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-blue-500 mr-3" />
                        <span className="text-sm">{userProfile.website}</span>
                      </div>
                    )}
                    {userProfile.instagram && (
                      <div className="flex items-center">
                        <Instagram className="h-5 w-5 text-pink-500 mr-3" />
                        <span className="text-sm">@{userProfile.instagram}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Book Now CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="backdrop-blur-sm bg-gradient-to-r from-purple-600 to-blue-600 border-0 shadow-xl text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Book Your Experience</h3>
                  <p className="text-purple-100 mb-4 text-sm">
                    Ready to transform your look? Schedule with our expert team today.
                  </p>
                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSalonProfile;
