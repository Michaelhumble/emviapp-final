import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, Users, Star, MessageCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const FreelancerProfile = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('freelancerProfile');
    const savedPhoto = localStorage.getItem('freelancerPhoto');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, [profileId]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Freelancer Profile</h2>
          <p className="text-gray-600 mb-4">This is a demo profile page. The full profile system is coming soon!</p>
          <Button onClick={() => window.location.href = '/'} className="bg-purple-600 hover:bg-purple-700">
            Back to EmviApp
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Professional freelance nail technician profile - experienced beauty artist available for khách sang salons with tip cao potential" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <Users className="h-16 w-16 text-white/80" />
                  )}
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {profile.fullName || 'Professional Freelancer'}
                  </h1>
                  <p className="text-xl text-blue-100 mb-4">Freelance Nail Technician</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge className="bg-white/20 text-white border-white/30">
                      ⭐ Available for Hire
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30">
                      ✨ Verified Professional
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button className="bg-white text-purple-600 hover:bg-white/90">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Me
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">About Me</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {profile.description || 
                      "Experienced freelance nail technician available for short-term projects, busy periods, and special events. Reliable, professional, and ready to integrate seamlessly with your existing team."
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties ? (
                      profile.specialties.split(',').map((specialty: string, index: number) => (
                        <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                          {specialty.trim()}
                        </Badge>
                      ))
                    ) : (
                      <>
                        <Badge variant="outline" className="border-purple-200 text-purple-700">Gel Manicures</Badge>
                        <Badge variant="outline" className="border-purple-200 text-purple-700">Nail Art</Badge>
                        <Badge variant="outline" className="border-purple-200 text-purple-700">Pedicures</Badge>
                        <Badge variant="outline" className="border-purple-200 text-purple-700">Acrylics</Badge>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{profile.cities || 'San Francisco, Oakland, San Jose'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{profile.rates || '$50-75/hour'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{profile.shifts || 'Days, Evenings, Weekends'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{profile.experience || '5+ years experience'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Reviews</h3>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold text-gray-800">4.9</span>
                    </div>
                    <p className="text-gray-600 text-sm">Based on 24 reviews</p>
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-700">✨ Review system coming soon!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Powered by EmviApp</h3>
                <p className="text-gray-600 text-sm mb-4">Professional freelancer marketplace for beauty services</p>
                <Button 
                  onClick={() => window.location.href = '/'} 
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Join EmviApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FreelancerProfile;