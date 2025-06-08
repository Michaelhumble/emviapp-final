
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Edit, Users, Clock, MapPin, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";

const SalonProfile = () => {
  const { userProfile } = useAuth();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* VISUAL CONFIRMATION BANNER */}
      <div className="w-full py-6 px-6 mb-8 bg-blue-100 border-4 border-blue-500 rounded-xl">
        <h2 className="text-center text-2xl font-bold text-blue-800">
          🏢 YOU ARE VIEWING: SALON PROFILE VIEW 🏢
        </h2>
        <p className="text-center text-blue-600 mt-2">
          This is the Salon-specific profile component with unique styling and features
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Salon Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="text-center pb-2 bg-gradient-to-r from-blue-100 to-indigo-100">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-32 h-32 border-4 border-blue-300">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-blue-200 text-blue-800 text-2xl">
                      {userProfile?.full_name?.charAt(0) || 'S'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsEditingAvatar(true)}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-2xl text-blue-800">
                  {userProfile?.full_name || 'Premium Salon'}
                </CardTitle>
                <p className="text-blue-600 font-medium">Beauty Salon & Spa</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile?.location || 'City, State'}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <Users className="h-4 w-4" />
                  <span>12 Team Members</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Salon Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-red-600">Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Services & Team */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Building className="h-5 w-5" />
                  Salon Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Manicure', 'Pedicure', 'Nail Art', 'Gel Polish', 'Acrylic Extensions', 'Spa Treatment'].map((service) => (
                    <div key={service} className="p-4 bg-blue-50 rounded-lg text-center">
                      <div className="w-12 h-12 bg-blue-200 rounded-full mx-auto mb-2"></div>
                      <span className="text-blue-800 font-medium">{service}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Services
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Users className="h-5 w-5" />
                  Our Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1,2,3,4].map((member) => (
                    <div key={member} className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-2 border-2 border-blue-300">
                        <AvatarFallback className="bg-blue-200 text-blue-800">T{member}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-blue-800">Team Member {member}</p>
                      <p className="text-xs text-blue-600">Nail Technician</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonProfile;
