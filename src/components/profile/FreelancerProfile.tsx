
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Camera, Edit, MapPin, Phone, Mail, Briefcase, Star, Award, Zap } from 'lucide-react';
import { toast } from 'sonner';

const FreelancerProfile = () => {
  const { userProfile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || '',
    bio: userProfile?.bio || '',
    specialty: userProfile?.specialty || '',
    location: userProfile?.location || '',
    phone: userProfile?.phone || '',
    instagram: userProfile?.instagram || '',
    website: userProfile?.website || '',
    years_experience: userProfile?.years_experience || 0,
    hourly_rate: 75, // Default rate
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Freelancer profile updated successfully!');
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

  const skills = ['Nail Art', 'Gel Extensions', 'Bridal Makeup', 'Color Theory', 'Design', 'Client Relations'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  {userProfile?.full_name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 p-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                onClick={() => setShowAvatarModal(true)}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{userProfile?.full_name || 'Freelancer Name'}</h1>
                <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-1 rounded-full">
                  <Zap className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">Independent Pro</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Briefcase className="h-4 w-4" />
                <span>{userProfile?.specialty || 'Beauty Professional'}</span>
                <span className="text-emerald-600 font-medium">${formData.hourly_rate}/hr</span>
              </div>

              {userProfile?.location && (
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">4.9</span>
                  <span className="text-gray-600">(43 reviews)</span>
                </div>
                <div className="text-sm text-gray-600">
                  {userProfile?.years_experience || 0}+ years experience
                </div>
                <div className="text-sm text-emerald-600 font-medium">
                  Available for booking
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
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
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    placeholder="e.g., Mobile Nail Artist, Makeup Artist"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Service Area</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Cities you serve"
                  />
                </div>
                <div>
                  <Label htmlFor="years_experience">Years of Experience</Label>
                  <Input
                    id="years_experience"
                    name="years_experience"
                    type="number"
                    value={formData.years_experience}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                  <Input
                    id="hourly_rate"
                    name="hourly_rate"
                    type="number"
                    value={formData.hourly_rate}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact & Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Portfolio Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Describe your services and what makes you unique..."
                    rows={3}
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

        {/* Skills & Expertise */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-emerald-100 text-emerald-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services & Pricing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Services & Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: 'Mobile Manicure', duration: '60 min', price: '$60' },
                { service: 'Gel Extensions', duration: '90 min', price: '$85' },
                { service: 'Nail Art Design', duration: '30 min', price: '$25' },
                { service: 'Special Event Makeup', duration: '120 min', price: '$150' },
              ].map((item) => (
                <div key={item.service} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.service}</h3>
                    <p className="text-gray-600">{item.duration}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-600">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600">Portfolio Item {i}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Client Reviews</CardTitle>
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
                  <span className="font-medium">Maria Rodriguez</span>
                  <span className="text-gray-500">3 days ago</span>
                </div>
                <p className="text-gray-700">
                  "Incredible mobile service! Professional, punctual, and the nail art was absolutely stunning. Highly recommend!"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreelancerProfile;
