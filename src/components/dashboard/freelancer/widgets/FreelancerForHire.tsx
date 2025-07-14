import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Clock, DollarSign, Star, Users, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const FreelancerForHire = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    cities: '',
    rates: '',
    shifts: '',
    experience: '',
    specialties: '',
    availability: '',
    description: ''
  });

  const handleSave = () => {
    toast.success("Your freelancer profile is now live!", {
      description: "Salons can now discover and hire you for on-demand work."
    });
    setIsEditing(false);
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
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-blue-500" />
                Your Freelancer Profile
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">San Francisco, Oakland, San Jose</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">$50-75/hour</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Days, Evenings, Weekends</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">5+ years experience</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Specialties</h5>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Gel Manicures</Badge>
                  <Badge variant="outline">Nail Art</Badge>
                  <Badge variant="outline">Pedicures</Badge>
                  <Badge variant="outline">Acrylics</Badge>
                </div>
              </div>
              
              <div className="pt-3 border-t border-blue-100">
                <p className="text-sm text-gray-600">
                  "Experienced freelance nail technician available for short-term projects, busy periods, and special events. 
                  Reliable, professional, and ready to integrate seamlessly with your existing team."
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
          <div className="space-y-4">
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred shifts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mornings">Morning shifts</SelectItem>
                    <SelectItem value="afternoons">Afternoon shifts</SelectItem>
                    <SelectItem value="evenings">Evening shifts</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Years of Experience</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Specialties & Services</label>
              <Input 
                placeholder="e.g., Gel manicures, Nail art, Pedicures, Acrylics"
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