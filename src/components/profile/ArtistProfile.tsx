
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit, Save, User, Star, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth';

const ArtistProfile = () => {
  console.log("🎨 ARTIST PROFILE COMPONENT LOADED");
  console.log("🎨 Component: ArtistProfile.tsx");
  
  const { userProfile, userRole } = useAuth();
  console.log("🎨 Artist Profile - Detected Role:", userRole);
  console.log("🎨 Artist Profile - User Profile:", userProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* DEBUG BANNER - ARTIST */}
      <div className="w-full py-4 px-6 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">🎨 DEBUG: ARTIST PROFILE LOADED</h1>
          <p className="text-lg">Component: ArtistProfile.tsx | Detected Role: "{userRole}" | User ID: {userProfile?.id}</p>
        </div>
      </div>

      {/* Artist Hero Banner */}
      <div className="artist-hero-banner w-full max-w-4xl mx-auto py-8 px-4 mb-8 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 text-white flex flex-col items-center shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">Welcome, Superstar Artist! 🎨</h1>
        <p className="text-xl font-medium opacity-90">This is your artist profile—showcase your creativity, attract salons, and go viral!</p>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-purple-100"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Artist Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-16 h-16" />
                )}
              </div>
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userProfile?.full_name || 'Amazing Artist'}
                </h1>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Save' : 'Edit Profile'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Specialty</label>
                  {isEditing ? (
                    <Input 
                      defaultValue={userProfile?.specialty || "Nail Art & Design"}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userProfile?.specialty || "Nail Art & Design"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Experience</label>
                  {isEditing ? (
                    <Input 
                      defaultValue={userProfile?.years_experience ? `${userProfile.years_experience} years` : "5+ years"}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userProfile?.years_experience ? `${userProfile.years_experience} years` : "5+ years"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  {isEditing ? (
                    <Input 
                      defaultValue={userProfile?.location || "City, State"}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userProfile?.location || "City, State"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Instagram</label>
                  {isEditing ? (
                    <Input 
                      defaultValue={userProfile?.instagram || "@your_handle"}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userProfile?.instagram || "@your_handle"}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-600">Bio</label>
                {isEditing ? (
                  <Textarea 
                    defaultValue={userProfile?.bio || "Passionate nail artist creating stunning designs that make clients feel confident and beautiful."}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{userProfile?.bio || "Passionate nail artist creating stunning designs that make clients feel confident and beautiful."}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Artist Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-purple-100">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.9</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-purple-100">
            <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">127</div>
            <div className="text-sm text-gray-600">Clients</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-purple-100">
            <Briefcase className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">240</div>
            <div className="text-sm text-gray-600">Services</div>
          </div>
        </motion.div>

        {/* Portfolio Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400">Portfolio {item}</span>
              </div>
            ))}
          </div>
          <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white">
            <Camera className="w-4 h-4 mr-2" />
            Add Photos
          </Button>
        </motion.div>
      </div>

      {/* Avatar Upload Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Upload Profile Photo</h3>
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-600">Click to upload or drag and drop</p>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                onClick={() => setShowAvatarModal(false)}
                variant="outline" 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setShowAvatarModal(false)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
