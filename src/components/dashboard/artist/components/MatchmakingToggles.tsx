import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MapPin, Heart, Briefcase, Users, Loader2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const MatchmakingToggles = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showJustMovedDialog, setShowJustMovedDialog] = useState(false);
  const [moveCity, setMoveCity] = useState('');
  const [moveState, setMoveState] = useState('');

  const availableForHire = userProfile?.available_for_hire || false;
  const lookingForWork = userProfile?.looking_for_work || false;
  const justMoved = userProfile?.just_moved || false;

  const updateProfile = async (updates: any) => {
    if (!userProfile?.id) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userProfile.id);

      if (error) throw error;
      
      await refreshUserProfile();
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJustMovedSubmit = async () => {
    if (!moveCity || !moveState) {
      toast.error('Please enter both city and state');
      return;
    }

    await updateProfile({
      just_moved: true,
      moved_to_city: moveCity,
      moved_to_state: moveState,
      moved_date: new Date().toISOString()
    });

    setShowJustMovedDialog(false);
    setMoveCity('');
    setMoveState('');
  };

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <Card className="card-glass border-purple-100/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-pink-500" />
          Matchmaking & Visibility
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Available for Hire Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-medium">Available for Hire</Label>
            <p className="text-sm text-gray-600">Let salons know you're open to new opportunities</p>
          </div>
          <div className="flex items-center gap-3">
            {availableForHire && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="pulse-glow"
              >
                <Badge className="bg-green-500 text-white px-3 py-1">
                  <Users className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              </motion.div>
            )}
            <Switch
              checked={availableForHire}
              onCheckedChange={(checked) => updateProfile({ available_for_hire: checked })}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Looking for Work Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-medium">Looking for Work</Label>
            <p className="text-sm text-gray-600">Show up in job recommendations</p>
          </div>
          <div className="flex items-center gap-3">
            {lookingForWork && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  <Briefcase className="w-3 h-3 mr-1" />
                  Seeking
                </Badge>
              </motion.div>
            )}
            <Switch
              checked={lookingForWork}
              onCheckedChange={(checked) => updateProfile({ looking_for_work: checked })}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Just Moved Feature */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-medium">Just Moved</Label>
            <p className="text-sm text-gray-600">Get priority visibility in your new area</p>
          </div>
          <div className="flex items-center gap-3">
            {justMoved && userProfile?.moved_to_city && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Badge className="bg-purple-500 text-white px-3 py-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  New to {userProfile.moved_to_city}
                </Badge>
              </motion.div>
            )}
            {justMoved ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateProfile({ just_moved: false, moved_to_city: null, moved_to_state: null })}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                Remove
              </Button>
            ) : (
              <Dialog open={showJustMovedDialog} onOpenChange={setShowJustMovedDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={isLoading}>
                    <MapPin className="w-3 h-3 mr-1" />
                    I Just Moved
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-500" />
                      Tell us about your move
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Enter your new city"
                        value={moveCity}
                        onChange={(e) => setMoveCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={moveState} onValueChange={setMoveState}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleJustMovedSubmit}
                      disabled={isLoading || !moveCity || !moveState}
                      className="w-full"
                    >
                      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Set as New Location
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchmakingToggles;