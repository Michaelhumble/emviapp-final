
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Edit, MapPin, Phone, Mail, Clock, Users, Star, Building2 } from 'lucide-react';
import { toast } from 'sonner';

const SalonProfile = () => {
  const { userProfile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [formData, setFormData] = useState({
    salon_name: userProfile?.salon_name || userProfile?.company_name || '',
    bio: userProfile?.bio || '',
    address: userProfile?.address || userProfile?.location || '',
    phone: userProfile?.phone || '',
    website: userProfile?.website || '',
    instagram: userProfile?.instagram || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile({
        ...formData,
        company_name: formData.salon_name,
        location: formData.address,
      });
      setIsEditing(false);
      toast.success('Salon profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Logo Section */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg rounded-2xl">
                <AvatarImage src={userProfile?.avatar_url} alt={formData.salon_name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl">
                  {formData.salon_name?.split(' ').map(n => n[0]).join('') || 'SL'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setShowLogoModal(true)}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Salon Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{formData.salon_name || 'Salon Name'}</h1>
                <div className="flex items-center gap-1 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Premium Salon</span>
                </div>
              </div>

              {formData.address && (
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{formData.address}</span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-600">(89 reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">12 artists</span>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Salon Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="salon_name">Salon Name</Label>
                  <Input
                    id="salon_name"
                    name="salon_name"
                    value={formData.salon_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street, City, State, ZIP"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">About</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell customers about your salon..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Online Presence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yoursalon.com"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="@yoursalon"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-2">
              <Button onClick={handleSave} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Save Changes
              </Button>
            </div>
          </motion.div>
        )}

        {/* Operating Hours */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{day}</span>
                  <span className="text-gray-600">9:00 AM - 7:00 PM</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Haircuts & Styling', price: '$45-85' },
                { name: 'Hair Coloring', price: '$80-150' },
                { name: 'Manicure & Pedicure', price: '$35-55' },
                { name: 'Facial Treatments', price: '$60-120' },
              ].map((service) => (
                <div key={service.name} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-blue-600 font-bold">{service.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Our Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-2">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      T{i}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">Team Member {i}</h3>
                  <p className="text-sm text-gray-600">Specialist</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-medium">Emily Chen</span>
                  <span className="text-gray-500">1 week ago</span>
                </div>
                <p className="text-gray-700">
                  "Excellent service and professional staff. The salon is clean and modern with a relaxing atmosphere."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonProfile;
