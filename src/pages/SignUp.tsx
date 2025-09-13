
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getAuthCallbackUrl } from '@/utils/auth/getAuthCallbackUrl';
import { Helmet } from 'react-helmet-async';

const ROLE_OPTIONS = [
  { value: 'customer', label: 'Customer', description: 'Book appointments & discover artists' },
  { value: 'artist', label: 'Artist', description: 'Showcase work & get booked' },
  { value: 'salon_owner', label: 'Salon Owner', description: 'Manage team & grow business' },
  { value: 'freelancer', label: 'Freelancer', description: 'Find gigs & build clientele' },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: getAuthCallbackUrl(),
          data: {
            role: selectedRole
          }
        }
      });

      if (error) throw error;

      if (data.user && !data.session) {
        toast.success('Check your email to confirm your account!');
      } else {
        // User is signed up and logged in
        navigate('/auth/callback');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50/50 to-white px-4">
      <Helmet>
        <title>Sign Up | EmviApp</title>
        <meta name="description" content="Create your EmviApp account to connect with beauty professionals or grow your business." />
        <link rel="canonical" href="https://emviapp-final.vercel.app/signup" />
      </Helmet>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">Create Account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Join EmviApp to connect with beauty professionals
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">I am a:</Label>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_OPTIONS.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    selectedRole === role.value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                >
                  <div className="font-medium text-sm">{role.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {role.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create a password"
                minLength={6}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Social Auth */}
          <SocialAuthButtons 
            mode="signup" 
            onPhoneClick={() => {}} 
            selectedRole={selectedRole}
          />

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
