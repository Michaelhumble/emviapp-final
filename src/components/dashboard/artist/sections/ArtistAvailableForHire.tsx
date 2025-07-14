import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, Clock, DollarSign, Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const ArtistAvailableForHire = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [availability, setAvailability] = useState({
    location: '',
    dates: '',
    skills: '',
    rates: '',
    description: ''
  });

  const handleSave = () => {
    toast.success("Your availability has been posted! Clients can now find you.", {
      description: "Your 'Available for Hire' listing is now live and visible to potential clients."
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <CardHeader className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Now Available for Hire</CardTitle>
              <p className="text-emerald-100 mt-1">Let clients know you're ready for new bookings</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
            🔥 LIVE
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {!isEditing ? (
          // Display Mode
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 border border-emerald-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-emerald-500" />
                Your Current Availability
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">Available this week</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">Mon-Sat, 9AM-7PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">Starting at $45</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-emerald-100">
                <p className="text-sm text-gray-600">
                  "Specializing in gel manicures, nail art, and luxury spa treatments. 8+ years experience with premium techniques."
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleEdit}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                Edit Availability
              </Button>
              <Button 
                variant="outline" 
                className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
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
                <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
                <Input 
                  placeholder="e.g., San Francisco, CA"
                  value={availability.location}
                  onChange={(e) => setAvailability({...availability, location: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Available Dates</label>
                <Input 
                  placeholder="e.g., This week, March 15-22"
                  value={availability.dates}
                  onChange={(e) => setAvailability({...availability, dates: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Skills & Services</label>
              <Input 
                placeholder="e.g., Gel manicures, Nail art, Spa treatments"
                value={availability.skills}
                onChange={(e) => setAvailability({...availability, skills: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Starting Rates</label>
              <Input 
                placeholder="e.g., Starting at $45"
                value={availability.rates}
                onChange={(e) => setAvailability({...availability, rates: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
              <Textarea 
                placeholder="Tell clients about your experience and specialties..."
                value={availability.description}
                onChange={(e) => setAvailability({...availability, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                Save & Post Availability
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

export default ArtistAvailableForHire;