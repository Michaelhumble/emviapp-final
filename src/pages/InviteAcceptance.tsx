import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, Crown, Camera, Check, AlertCircle, 
  Eye, EyeOff, Upload, Star, Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface InviteData {
  salon_name: string;
  role: string;
  phone_match: boolean;
}

const InviteAcceptance = () => {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const navigate = useNavigate();
  
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileForm, setProfileForm] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    bio: '',
    specialty: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (inviteCode) {
      validateInvite();
    }
  }, [inviteCode]);

  const validateInvite = async () => {
    if (!inviteCode) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('validate_team_invite', {
        p_invite_code: inviteCode,
        p_phone_number: '' // We'll handle this differently
      });

      if (error) throw error;

      const inviteResult = typeof data === 'string' ? JSON.parse(data) : data;
      
      if (inviteResult.valid) {
        setInviteData(inviteResult);
      } else {
        toast.error(inviteResult.message || 'Invalid or expired invite');
        navigate('/');
      }
    } catch (error) {
      console.error('Error validating invite:', error);
      toast.error('Failed to validate invite');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // For demo purposes, we'll use a placeholder URL
      // In production, this would upload to Supabase Storage
      const reader = new FileReader();
      reader.onload = () => {
        setProfileForm(prev => ({
          ...prev,
          avatar_url: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
      
      toast.success('Profile photo uploaded!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload photo');
    }
  };

  const acceptInvite = async () => {
    if (!inviteCode || !profileForm.email || !profileForm.password || !profileForm.full_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      // Step 1: Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: profileForm.email,
        password: profileForm.password,
        options: {
          data: {
            full_name: profileForm.full_name,
            avatar_url: profileForm.avatar_url,
            role: inviteData?.role || 'artist'
          },
          emailRedirectTo: `${window.location.origin}/dashboard/artist`
        }
      });

      if (authError) throw authError;

      // Step 2: Accept the team invite
      if (authData.user) {
        const { error: acceptError } = await supabase.rpc('accept_team_invite', {
          p_invite_code: inviteCode,
          p_user_id: authData.user.id
        });

        if (acceptError) throw acceptError;

        // Step 3: Update user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: profileForm.full_name,
            phone: profileForm.phone,
            bio: profileForm.bio,
            specialty: profileForm.specialty,
            avatar_url: profileForm.avatar_url,
            role: inviteData?.role || 'artist'
          })
          .eq('id', authData.user.id);

        if (profileError) console.error('Error updating profile:', profileError);

        // Celebrate!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        toast.success(`Welcome to ${inviteData?.salon_name}! Your account has been created.`);
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
          navigate(inviteData?.role === 'manager' ? '/dashboard/salon' : '/dashboard/artist');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error accepting invite:', error);
      toast.error(error.message || 'Failed to accept invite');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating your invitation...</p>
        </div>
      </div>
    );
  }

  if (!inviteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Invalid Invitation</h3>
            <p className="text-gray-600 mb-4">This invitation link is invalid or has expired.</p>
            <Button onClick={() => navigate('/')}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join {inviteData.salon_name}
            </h1>
            <p className="text-gray-600">
              You've been invited as a{' '}
              <Badge className="bg-purple-100 text-purple-800">
                {inviteData.role === 'owner' && <Crown className="h-3 w-3 mr-1" />}
                {inviteData.role.charAt(0).toUpperCase() + inviteData.role.slice(1)}
              </Badge>
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Complete Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="text-center">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileForm.avatar_url} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                      {profileForm.full_name.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">Upload your profile photo</p>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    placeholder="Enter your full name"
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a secure password"
                      value={profileForm.password}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  placeholder="e.g., Nail Art, Manicures, Pedicures"
                  value={profileForm.specialty}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, specialty: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself and your experience..."
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={acceptInvite}
                  disabled={submitting || !profileForm.email || !profileForm.password || !profileForm.full_name}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {submitting ? (
                    'Creating Account...'
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Join Team
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InviteAcceptance;