
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit, Save, User, DollarSign, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth';

const FreelancerProfile = () => {
  console.log("💼 FREELANCER PROFILE COMPONENT LOADED");
  console.log("💼 Component: FreelancerProfile.tsx");
  
  const { userProfile, userRole } = useAuth();
  console.log("💼 Freelancer Profile - Detected Role:", userRole);
  console.log("💼 Freelancer Profile - User Profile:", userProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* DEBUG BANNER - FREELANCER */}
      <div className="w-full py-4 px-6 mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">💼 DEBUG: FREELANCER PROFILE LOADED</h1>
          <p className="text-lg">Component: FreelancerProfile.tsx | Detected Role: "{userRole}" | User ID: {userProfile?.id}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-teal-100"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Freelancer Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-16 h-16" />
                )}
              </div>
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-2 -right-2 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userProfile?.full_name || 'Independent Beauty Professional'}
                </h1>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Save' : 'Edit Profile'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Skills</label>
                  {isEditing ? (
                    <Input 
                      defaultValue={userProfile?.specialty || "Nail Art, Manicures, Pedicures"}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userProfile?.specialty || "Nail Art, Manicures, Pedicures"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Hourly Rate</label>
                  {isEditing ? (
                    <Input 
                      defaultValue="$75/hour"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">$75/hour</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  {isEditing ? (
                    <Input 
                      defaultValue={userProfile?.location || "Mobile Service Area"}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userProfile?.location || "Mobile Service Area"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Availability</label>
                  {isEditing ? (
                    <Input 
                      defaultValue="Mon-Fri: 9AM-6PM"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">Mon-Fri: 9AM-6PM</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-600">About</label>
                {isEditing ? (
                  <Textarea 
                    defaultValue={userProfile?.bio || "Independent beauty professional offering personalized nail services with 5+ years of experience. Specializing in custom nail art and premium treatments."}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{userProfile?.bio || "Independent beauty professional offering personalized nail services with 5+ years of experience. Specializing in custom nail art and premium treatments."}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Freelancer Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-teal-100">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.9</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-teal-100">
            <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">$3.2k</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-teal-100">
            <Clock className="w-8 h-8 text-teal-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">89</div>
            <div className="text-sm text-gray-600">Hours Booked</div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-teal-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { service: 'Custom Nail Art', price: '$45-85' },
              { service: 'Classic Manicure', price: '$35' },
              { service: 'Gel Manicure', price: '$50' },
              { service: 'Pedicure', price: '$40' },
              { service: 'Nail Extensions', price: '$65' },
              { service: 'Nail Repair', price: '$25' }
            ].map((item) => (
              <div key={item.service} className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100 flex justify-between items-center">
                <span className="font-medium text-gray-900">{item.service}</span>
                <span className="text-teal-600 font-bold">{item.price}</span>
              </div>
            ))}
          </div>
          <Button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white">
            <Edit className="w-4 h-4 mr-2" />
            Manage Services
          </Button>
        </motion.div>
      </div>

      {/* Avatar Upload Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Upload Profile Photo</h3>
            <div className="border-2 border-dashed border-teal-300 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-teal-400 mx-auto mb-2" />
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
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
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

export default FreelancerProfile;
