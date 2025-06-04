
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/ui/Logo';

const NewSignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validation
    if (!fullName.trim()) {
      setError('Full name is required');
      setIsSubmitting(false);
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      setIsSubmitting(false);
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsSubmitting(false);
      return;
    }

    console.log('=== SIGN UP ATTEMPT STARTED ===');
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Selected Role:', role);

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

    console.log('=== SUPABASE AUTH SIGNUP PAYLOAD ===');
    console.log('Email:', signUpPayload.email);
    console.log('Metadata:', signUpPayload.options.data);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp(signUpPayload);
      
      console.log('=== SUPABASE AUTH SIGNUP RESPONSE ===');
      console.log('Data:', data);
      console.log('Error:', signUpError);

      if (signUpError) {
        console.error('Supabase Auth Error Details:', {
          message: signUpError.message,
          status: signUpError.status,
          name: signUpError.name,
          cause: signUpError.cause || 'undefined'
        });
        
        // Show user-friendly error messages
        let userMessage = signUpError.message;
        if (signUpError.message.includes('already registered')) {
          userMessage = 'This email is already registered. Please sign in instead.';
        } else if (signUpError.message.includes('Database error')) {
          userMessage = 'There was a problem creating your account. Please try again.';
        } else if (signUpError.message.includes('Invalid email')) {
          userMessage = 'Please enter a valid email address.';
        } else if (signUpError.message.includes('Password')) {
          userMessage = 'Password must be at least 6 characters long.';
        }
        
        setError(userMessage);
        toast.error(userMessage);
        setIsSubmitting(false);
        return;
      }

      if (data?.user) {
        console.log('=== SIGN UP SUCCESS ===');
        console.log('User created:', data.user.id);
        console.log('User metadata:', data.user.user_metadata);
        
        toast.success('Account created successfully! Redirecting...');
        
        // Redirect based on role
        setTimeout(() => {
          switch (role) {
            case 'artist':
            case 'nail technician/artist':
              navigate('/dashboard/artist');
              break;
            case 'salon':
            case 'owner':
              navigate('/dashboard/salon');
              break;
            case 'freelancer':
              navigate('/dashboard/freelancer');
              break;
            case 'customer':
            default:
              navigate('/dashboard/customer');
              break;
          }
        }, 1500);
      } else {
        console.error('No user returned from signup');
        setError('Account creation failed. Please try again.');
        setIsSubmitting(false);
      }
      
    } catch (err: any) {
      console.error('=== UNEXPECTED ERROR ===');
      console.error('Error object:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      
      setError('An unexpected error occurred. Please try again.');
      toast.error('Sign up failed. Please try again.');
      setIsSubmitting(false);
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
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-600">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isSubmitting}
                  className="py-3 px-4"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="py-3 px-4"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-600">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="py-3 px-4"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-600">
                  I am a
                </Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="customer">Customer</option>
                  <option value="artist">Nail Artist</option>
                  <option value="salon">Salon Owner</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
              <Button 
                type="submit" 
                className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
                <a href="/sign-in" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Sign in
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewSignUp;
