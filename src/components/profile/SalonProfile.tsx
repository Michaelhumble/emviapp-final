
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit, Save, Building, Clock, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth';

const SalonProfile = () => {
  console.log("🏢 SALON PROFILE COMPONENT LOADED");
  console.log("🏢 Component: SalonProfile.tsx");
  
  const { userProfile, userRole } = useAuth();
  console.log("🏢 Salon Profile - Detected Role:", userRole);
  console.log("🏢 Salon Profile - User Profile:", userProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* DEBUG BANNER - SALON */}
      <div className="w-full py-4 px-6 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">🏢 DEBUG: SALON PROFILE LOADED</h1>
          <p className="text-lg">Component: SalonProfile.tsx | Detected Role: "{userRole}" | User ID: {userProfile?.id}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-blue-100"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Salon Logo" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <Building className="w-16 h-16" />
                )}
              </div>
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userProfile?.salon_name || userProfile?.full_name || 'Elite Beauty Salon'}
                </h1>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Save' : 'Edit Profile'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Salon Type</label>
                  {isEditing ? (
                    <Input 
                      defaultValue="Full Service Salon"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">Full Service Salon</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Established</label>
                  {isEditing ? (
                    <Input 
                      defaultValue="2018"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">2018</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  {isEditing ? (
                    <Input 
                      defaultValue={userProfile?.address || "123 Beauty Ave, City, State"}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userProfile?.address || "123 Beauty Ave, City, State"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  {isEditing ? (
                    <Input 
                      defaultValue={userProfile?.phone || "(555) 123-4567"}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userProfile?.phone || "(555) 123-4567"}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-600">About</label>
                {isEditing ? (
                  <Textarea 
                    defaultValue={userProfile?.bio || "Premier beauty destination offering exceptional nail, hair, and spa services in a luxurious environment."}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{userProfile?.bio || "Premier beauty destination offering exceptional nail, hair, and spa services in a luxurious environment."}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Salon Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100">
            <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">Open</div>
            <div className="text-sm text-gray-600">Today</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100">
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Manicure & Pedicure', 'Nail Art', 'Hair Styling', 'Facials', 'Massage Therapy', 'Waxing'].map((service) => (
              <div key={service} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <span className="font-medium text-gray-900">{service}</span>
              </div>
            ))}
          </div>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
            <Edit className="w-4 h-4 mr-2" />
            Manage Services
          </Button>
        </motion.div>
      </div>

      {/* Avatar Upload Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Upload Salon Logo</h3>
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-blue-400 mx-auto mb-2" />
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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

export default SalonProfile;
