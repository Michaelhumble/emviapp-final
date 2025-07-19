import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Clock, DollarSign, Star, Users, Briefcase, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

const FreelancerForHire = () => {
  const { userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    fullName: '',
    cities: '',
    rates: '',
    shifts: '',
    experience: '',
    specialties: '',
    availability: '',
    description: ''
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('freelancerProfile');
    const savedPhoto = localStorage.getItem('freelancerPhoto');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Initialize with user profile data if available
      setProfile(prev => ({
        ...prev,
        fullName: userProfile?.full_name || '',
        specialties: userProfile?.specialty || ''
      }));
    }
    
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, [userProfile]);

  const handleSave = () => {
    // Save to localStorage for MVP
    localStorage.setItem('freelancerProfile', JSON.stringify(profile));
    if (profilePhoto) {
      localStorage.setItem('freelancerPhoto', profilePhoto);
    }
    
    toast.success("Your freelancer profile is now live!", {
      description: "Salons can now discover and hire you for on-demand work."
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 mb-6">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Freelancer For Hire</CardTitle>
              <p className="text-blue-100 mt-1">Available for on-demand work at salons</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
            🚀 FREELANCER
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {!isEditing ? (
          // Display Mode
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-blue-500" />
                Your Freelancer Profile
              </h4>
              
              {/* Profile Photo and Name */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="h-8 w-8 text-blue-600" />
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {profile.fullName || userProfile?.full_name || 'Your Name'}
                  </h3>
                  <p className="text-blue-600 font-medium">Freelance Nail Technician</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">{profile.cities || 'San Francisco, Oakland, San Jose'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">{profile.rates || '$50-75/hour'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">{profile.shifts || 'Days, Evenings, Weekends'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">{profile.experience || '5+ years experience'}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Specialties</h5>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties ? (
                    profile.specialties.split(',').map((specialty, index) => (
                      <Badge key={index} variant="outline">{specialty.trim()}</Badge>
                    ))
                  ) : (
                    <>
                      <Badge variant="outline">Gel Manicures</Badge>
                      <Badge variant="outline">Nail Art</Badge>
                      <Badge variant="outline">Pedicures</Badge>
                      <Badge variant="outline">Acrylics</Badge>
                    </>
                  )}
                </div>
              </div>
              
              <div className="pt-3 border-t border-blue-100">
                <p className="text-sm text-gray-600">
                  {profile.description || 
                    "Experienced freelance nail technician available for short-term projects, busy periods, and special events. Reliable, professional, and ready to integrate seamlessly with your existing team."
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleEdit}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              >
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                View Public Profile
              </Button>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="space-y-6">
            {/* Photo Upload */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Users className="h-8 w-8 text-blue-600" />
                  )}
                </div>
                <label htmlFor="photo-upload" className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1.5 cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="h-3 w-3" />
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                <Input 
                  placeholder="Your full name"
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Cities Willing to Work</label>
                <Input 
                  placeholder="e.g., San Francisco, Oakland, San Jose"
                  value={profile.cities}
                  onChange={(e) => setProfile({...profile, cities: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Hourly Rates</label>
                <Input 
                  placeholder="e.g., $50-75/hour"
                  value={profile.rates}
                  onChange={(e) => setProfile({...profile, rates: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Preferred Shifts</label>
                <Input 
                  placeholder="e.g., Days, Evenings, Weekends"
                  value={profile.shifts}
                  onChange={(e) => setProfile({...profile, shifts: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Years of Experience</label>
                <Input 
                  placeholder="e.g., 5+ years"
                  value={profile.experience}
                  onChange={(e) => setProfile({...profile, experience: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Specialties & Services</label>
              <Input 
                placeholder="e.g., Gel manicures, Nail art, Pedicures, Acrylics (separated by commas)"
                value={profile.specialties}
                onChange={(e) => setProfile({...profile, specialties: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Availability</label>
              <Input 
                placeholder="e.g., Available immediately, 2-week notice"
                value={profile.availability}
                onChange={(e) => setProfile({...profile, availability: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Professional Description</label>
              <Textarea 
                placeholder="Describe your experience, work style, and what makes you a great freelancer..."
                value={profile.description}
                onChange={(e) => setProfile({...profile, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              >
                Save & Go Live
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="border-gray-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FreelancerForHire;