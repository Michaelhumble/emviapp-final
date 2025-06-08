
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Edit, Portfolio, Star, Upload, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";

const ArtistProfile = () => {
  const { userProfile } = useAuth();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* UNIQUE ARTIST HERO BANNER */}
      <div className="artist-hero-banner w-full py-8 px-4 mb-8 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 text-white flex flex-col items-center shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">Welcome, Superstar Artist! 🎨</h1>
        <p className="text-xl font-medium opacity-90">This is your artist profile—showcase your creativity, attract salons, and go viral!</p>
      </div>

      {/* VISUAL CONFIRMATION BANNER */}
      <div className="w-full py-6 px-6 mb-8 bg-purple-100 border-4 border-purple-500 rounded-xl">
        <h2 className="text-center text-2xl font-bold text-purple-800">
          🎨 YOU ARE VIEWING: ARTIST PROFILE VIEW 🎨
        </h2>
        <p className="text-center text-purple-600 mt-2">
          This is the Artist-specific profile component with unique styling and features
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="text-center pb-2 bg-gradient-to-r from-purple-100 to-pink-100">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-32 h-32 border-4 border-purple-300">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-purple-200 text-purple-800 text-2xl">
                      {userProfile?.full_name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => setIsEditingAvatar(true)}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-2xl text-purple-800">
                  {userProfile?.full_name || 'Creative Artist'}
                </CardTitle>
                <p className="text-purple-600 font-medium">Professional Nail Artist</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-purple-700">
                  <Star className="h-4 w-4" />
                  <span>4.9 Rating • 127 Reviews</span>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Artist Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Palette className="h-5 w-5" />
                  Artist Specialties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {['Nail Art', 'Gel Manicures', 'Acrylic Extensions', 'Custom Designs'].map((specialty) => (
                    <span key={specialty} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Portfolio & Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Portfolio className="h-5 w-5" />
                  Artist Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Your Portfolio Awaits</h3>
                  <p className="text-purple-600 mb-4">Showcase your best work to attract more clients</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your First Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="text-purple-800">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {userProfile?.bio || "Share your story, experience, and what makes your nail art unique. This helps clients understand your style and expertise."}
                </p>
                <Button variant="outline" className="mt-4 border-purple-300 text-purple-700 hover:bg-purple-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Bio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
