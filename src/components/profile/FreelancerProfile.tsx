
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Edit, Star, DollarSign, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";

const FreelancerProfile = () => {
  const { userProfile } = useAuth();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* VISUAL CONFIRMATION BANNER */}
      <div className="w-full py-6 px-6 mb-8 bg-teal-100 border-4 border-teal-500 rounded-xl">
        <h2 className="text-center text-2xl font-bold text-teal-800">
          💼 YOU ARE VIEWING: FREELANCER PROFILE VIEW 💼
        </h2>
        <p className="text-center text-teal-600 mt-2">
          This is the Freelancer-specific profile component with unique styling and features
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-teal-200 shadow-lg">
              <CardHeader className="text-center pb-2 bg-gradient-to-r from-teal-100 to-emerald-100">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-32 h-32 border-4 border-teal-300">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-teal-200 text-teal-800 text-2xl">
                      {userProfile?.full_name?.charAt(0) || 'F'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => setIsEditingAvatar(true)}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-2xl text-teal-800">
                  {userProfile?.full_name || 'Independent Freelancer'}
                </CardTitle>
                <p className="text-teal-600 font-medium">Mobile Nail Technician</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-teal-700">
                  <Star className="h-4 w-4" />
                  <span>4.8 Rating • 89 Reviews</span>
                </div>
                <div className="flex items-center gap-2 text-teal-700">
                  <DollarSign className="h-4 w-4" />
                  <span>$50-80/hour</span>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Freelancer Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="border-teal-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-100 to-emerald-100">
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <Clock className="h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Weekdays</span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekends</span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Evenings</span>
                  <span className="font-medium text-orange-600">Limited</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skills & Rates */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-teal-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-100 to-emerald-100">
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <Award className="h-5 w-5" />
                  Skills & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Licensed Nail Tech', 'Gel Specialist', 'Acrylic Expert', 'Nail Art', 'Mobile Service', 'Sanitization Certified'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Skills
                </Button>
              </CardContent>
            </Card>

            <Card className="border-teal-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-100 to-emerald-100">
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <DollarSign className="h-5 w-5" />
                  Service Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { service: 'Basic Manicure', price: '$35' },
                    { service: 'Gel Polish', price: '$45' },
                    { service: 'Nail Art (per nail)', price: '$8' },
                    { service: 'Full Set Acrylics', price: '$65' }
                  ].map((item) => (
                    <div key={item.service} className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                      <span className="font-medium text-teal-800">{item.service}</span>
                      <span className="text-teal-600 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 border-teal-300 text-teal-700 hover:bg-teal-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Rates
                </Button>
              </CardContent>
            </Card>

            <Card className="border-teal-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-100 to-emerald-100">
                <CardTitle className="text-teal-800">About My Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {userProfile?.bio || "I'm a licensed mobile nail technician providing high-quality nail services at your location. Fully equipped with professional-grade tools and products. Available for individual appointments, parties, and events."}
                </p>
                <Button variant="outline" className="mt-4 border-teal-300 text-teal-700 hover:bg-teal-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Description
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
