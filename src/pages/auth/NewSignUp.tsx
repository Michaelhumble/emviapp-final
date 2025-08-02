
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '@/components/ui/Logo';
import { markUserSignedUp } from '@/utils/signupFunnelTracking';

const NewSignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('=== SIGN UP ATTEMPT ===');
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Role:', role);
    console.log('Password length:', password.length);

    // Validate all fields
    if (!fullName.trim()) {
      toast.error('Full name is required');
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!role) {
      toast.error('Please select a role');
      setLoading(false);
      return;
    }

    // Prepare the exact payload
    const signUpPayload = {
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          role: role
        }
      }
    };

    console.log('=== SUPABASE SIGNUP PAYLOAD ===');
    console.log(JSON.stringify(signUpPayload, null, 2));

    try {
      const { data, error } = await supabase.auth.signUp(signUpPayload);

      console.log('=== SUPABASE RESPONSE ===');
      console.log('Data:', data);
      console.log('Error:', error);

      if (error) {
        console.error('=== SUPABASE ERROR DETAILS ===');
        console.error('Message:', error.message);
        console.error('Status:', error.status);
        console.error('Error object:', error);
        
        toast.error(`Sign up failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data?.user) {
        console.log('=== USER CREATED SUCCESSFULLY ===');
        console.log('User ID:', data.user.id);
        console.log('User email:', data.user.email);
        console.log('User metadata:', data.user.user_metadata);
        
        // Mark user as signed up in tracking system
        markUserSignedUp();
        
        toast.success('Account created successfully! Redirecting...');
        
        // Define protected routes that are safe to redirect to after signup
        const protectedRoutes = [
          '/dashboard', '/profile', '/onboarding', '/settings',
          '/dashboard/artist', '/dashboard/salon', '/dashboard/customer', 
          '/dashboard/manager', '/dashboard/admin', '/dashboard/freelancer',
          '/dashboard/supplier', '/dashboard/renter', '/dashboard/other',
          '/my-bookings', '/messaging', '/checkout', '/invite'
        ];
        
        let targetUrl = '/dashboard'; // Default to dashboard
        
        // First, check for role-based redirect
        switch (role) {
          case 'artist':
          case 'nail technician/artist':
            targetUrl = '/dashboard/artist';
            break;
          case 'salon':
          case 'owner':
            targetUrl = '/dashboard/salon';
            break;
          case 'customer':
            targetUrl = '/dashboard/customer';
            break;
          case 'freelancer':
            targetUrl = '/dashboard/freelancer';
            break;
          default:
            // Check if redirect URL is a protected route
            if (redirectUrl) {
              const decodedRedirect = decodeURIComponent(redirectUrl);
              if (protectedRoutes.some(route => decodedRedirect.startsWith(route))) {
                targetUrl = decodedRedirect;
              }
            }
            break;
        }
        
        setTimeout(() => {
          console.log('🔄 [SIGN UP] Navigating to:', targetUrl);
          navigate(targetUrl, { replace: true });
        }, 1500);
      } else {
        console.error('=== NO USER RETURNED ===');
        toast.error('Account creation failed - no user returned');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('=== CATCH BLOCK ERROR ===');
      console.error('Error:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      
      toast.error(`Unexpected error: ${err.message || 'Unknown error'}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        
        <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden max-w-lg w-full mx-auto">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
              Create an Account
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-600">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                  className="py-3 px-4"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="py-3 px-4"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-600">
                  Password *
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="py-3 px-4"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-600">
                  I am a *
                </Label>
                <Select value={role} onValueChange={setRole} disabled={loading}>
                  <SelectTrigger className="py-3 px-4">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="artist">Nail Artist</SelectItem>
                    <SelectItem value="salon">Salon Owner</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
              <Button 
                type="submit" 
                className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link 
                  to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} 
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewSignUp;
