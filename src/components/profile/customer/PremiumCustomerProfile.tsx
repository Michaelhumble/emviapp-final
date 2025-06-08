import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Edit, Save, User, Heart, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/context/auth/types";
import { useAuth } from "@/context/auth";

interface PremiumCustomerProfileProps {
  userProfile: UserProfile;
}

const PremiumCustomerProfile = ({ userProfile }: PremiumCustomerProfileProps) => {
  // Force log component load
  console.log('👤 CUSTOMER PROFILE COMPONENT LOADED');
  console.log('👤 Customer userProfile:', userProfile);

  const { userRole } = useAuth();
  console.log("👑 Customer Profile - Detected Role:", userRole);
  console.log("👑 Customer Profile - User Profile:", userProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* GIANT DEBUG BANNER */}
      <div className="w-full py-12 px-8 mb-8 bg-pink-600 border-4 border-pink-800 rounded-lg shadow-2xl">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">👤 CUSTOMER PROFILE LOADED 👤</h1>
          <p className="text-2xl font-bold text-pink-100">This is the PremiumCustomerProfile.tsx component</p>
          <p className="text-xl font-semibold text-pink-200 mt-2">If you see this, Customer routing worked!</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-rose-100"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Customer Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-16 h-16" />
                )}
              </div>
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-2 -right-2 bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userProfile?.full_name || 'Valued Customer'}
                </h1>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Save' : 'Edit Profile'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Membership</label>
                  {isEditing ? (
                    <Input 
                      defaultValue="Premium Member"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">Premium Member</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  {isEditing ? (
                    <Input 
                      defaultValue="2023"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">2023</p>
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
                <label className="text-sm font-medium text-gray-600">Preferences</label>
                {isEditing ? (
                  <Textarea 
                    defaultValue={userProfile?.bio || "I love trying new nail art designs and enjoy relaxing spa treatments. Looking for talented artists and premium salons."}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{userProfile?.bio || "I love trying new nail art designs and enjoy relaxing spa treatments. Looking for talented artists and premium salons."}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customer Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-rose-100">
            <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Favorites</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-rose-100">
            <Gift className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Rewards Points</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-rose-100">
            <Star className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">47</div>
            <div className="text-sm text-gray-600">Bookings</div>
          </div>
        </motion.div>

        {/* Beauty Journey Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Beauty Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Recent Manicure at Elite Salon',
              'Nail Art Session with Top Artist',
              'Spa Day at Luxury Resort',
              'Pedicure with Gel Polish',
              'Custom Design Consultation',
              'Seasonal Color Update'
            ].map((activity) => (
              <div key={activity} className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                <span className="font-medium text-gray-900">{activity}</span>
              </div>
            ))}
          </div>
          <Button className="mt-6 bg-rose-600 hover:bg-rose-700 text-white">
            <Heart className="w-4 h-4 mr-2" />
            Book New Appointment
          </Button>
        </motion.div>
      </div>

      {/* Avatar Upload Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Upload Profile Photo</h3>
            <div className="border-2 border-dashed border-rose-300 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-rose-400 mx-auto mb-2" />
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
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
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

export default PremiumCustomerProfile;
