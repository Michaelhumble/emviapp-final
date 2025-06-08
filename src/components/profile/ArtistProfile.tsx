
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, MapPin, Star, Calendar, Upload, Edit3, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const ArtistProfile = () => {
  const { userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: userProfile?.full_name || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    specialty: userProfile?.specialty || '',
    experience_years: userProfile?.experience_years || '',
    hourly_rate: userProfile?.hourly_rate || '',
    portfolio_url: userProfile?.portfolio_url || '',
    instagram_handle: userProfile?.instagram_handle || '',
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      toast.success('Photo uploaded successfully!');
      setShowUploadModal(false);
    }
  };

  const specialties = [
    'Nail Art', 'Gel Manicure', 'Acrylic Nails', 'Nail Design', 
    'French Manicure', 'Pedicure', 'Nail Extensions', 'Nail Repair'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4">
      {/* Artist Hero Banner */}
      <div className="artist-hero-banner w-full py-8 px-4 mb-8 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 text-white flex flex-col items-center shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">Welcome, Superstar Artist! 🎨</h1>
        <p className="text-xl font-medium opacity-90">This is your artist profile—showcase your creativity, attract salons, and go viral!</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="relative overflow-hidden bg-white/80 backdrop-blur-md border-0 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-rose-600/10"></div>
          <CardContent className="relative p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    {userProfile?.full_name?.split(' ').map(n => n[0]).join('') || 'A'}
                  </AvatarFallback>
                </Avatar>
                <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-purple-600" />
                        Upload Profile Photo
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-700 mb-2">Choose your photo</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                        </label>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    {isEditing ? (
                      <Input
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                        className="text-2xl font-bold mb-2"
                        placeholder="Your name"
                      />
                    ) : (
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {profileData.full_name || 'Artist Name'}
                      </h1>
                    )}
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {isEditing ? (
                          <Input
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            placeholder="Your location"
                            className="h-8"
                          />
                        ) : (
                          <span>{profileData.location || 'Location'}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{profileData.experience_years || '2'} years</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className={`${
                      isEditing 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    } text-white shadow-lg`}
                  >
                    {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                    {isEditing ? 'Save' : 'Edit Profile'}
                  </Button>
                </div>

                <div>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Tell clients about your expertise and style..."
                      className="min-h-[100px]"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {profileData.bio || 'Professional nail artist with a passion for creative designs and exceptional client care.'}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {specialties.slice(0, 4).map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="specialty">Primary Specialty</Label>
                {isEditing ? (
                  <select
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="">Select specialty</option>
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-1 text-gray-700">{profileData.specialty || 'Nail Art'}</p>
                )}
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                {isEditing ? (
                  <Input
                    value={profileData.experience_years}
                    onChange={(e) => setProfileData({...profileData, experience_years: e.target.value})}
                    placeholder="Years of experience"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{profileData.experience_years || '2'} years</p>
                )}
              </div>
              <div>
                <Label htmlFor="rate">Hourly Rate</Label>
                {isEditing ? (
                  <Input
                    value={profileData.hourly_rate}
                    onChange={(e) => setProfileData({...profileData, hourly_rate: e.target.value})}
                    placeholder="e.g., $45/hour"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">${profileData.hourly_rate || '45'}/hour</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Social & Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="portfolio">Portfolio Website</Label>
                {isEditing ? (
                  <Input
                    value={profileData.portfolio_url}
                    onChange={(e) => setProfileData({...profileData, portfolio_url: e.target.value})}
                    placeholder="https://your-portfolio.com"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{profileData.portfolio_url || 'Add your portfolio URL'}</p>
                )}
              </div>
              <div>
                <Label htmlFor="instagram">Instagram Handle</Label>
                {isEditing ? (
                  <Input
                    value={profileData.instagram_handle}
                    onChange={(e) => setProfileData({...profileData, instagram_handle: e.target.value})}
                    placeholder="@yourusername"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">@{profileData.instagram_handle || 'your_instagram'}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">127</div>
                <div className="text-amber-100">Total Bookings</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">4.9</div>
                <div className="text-amber-100">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">89%</div>
                <div className="text-amber-100">Repeat Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">47</div>
                <div className="text-amber-100">Happy Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtistProfile;
