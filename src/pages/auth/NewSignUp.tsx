
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";

type UserRole = 'customer' | 'artist' | 'salon' | 'freelancer' | 'supplier' | 'manager' | 'admin' | 'renter' | 'other';

const roleOptions: { value: UserRole; label: string; description: string }[] = [
  { value: 'customer', label: 'Customer', description: 'Book appointments and find nail artists' },
  { value: 'artist', label: 'Nail Artist', description: 'Showcase your work and get bookings' },
  { value: 'salon', label: 'Salon Owner', description: 'Manage your salon and team' },
  { value: 'freelancer', label: 'Freelancer', description: 'Work independently and find clients' },
  { value: 'supplier', label: 'Supplier', description: 'Provide nail supplies and products' },
  { value: 'other', label: 'Other', description: 'Other industry professional' }
];

const getRoleDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'artist':
      return '/dashboard/artist';
    case 'salon':
      return '/dashboard/salon';
    case 'customer':
      return '/dashboard/customer';
    case 'freelancer':
      return '/dashboard/freelancer';
    case 'supplier':
      return '/dashboard/supplier';
    case 'manager':
      return '/dashboard/manager';
    case 'admin':
      return '/dashboard/admin';
    case 'renter':
      return '/dashboard/renter';
    case 'other':
      return '/dashboard/other';
    default:
      return '/dashboard';
  }
};

const NewSignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (!fullName.trim()) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      console.log('Starting sign up process...');
      console.log('Data being sent:', { fullName, email, role: selectedRole });

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: selectedRole
          }
        }
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        
        // Handle specific error cases
        if (signUpError.message.includes('already registered')) {
          setError("This email is already registered. Please sign in instead.");
        } else if (signUpError.message.includes('Password')) {
          setError("Password is too weak. Please use a stronger password.");
        } else if (signUpError.message.includes('email')) {
          setError("Please enter a valid email address.");
        } else {
          setError(`Sign up failed: ${signUpError.message}`);
        }
        setLoading(false);
        return;
      }

      if (!data.user) {
        console.error('No user data returned from sign up');
        setError("Account creation failed. Please try again.");
        setLoading(false);
        return;
      }

      console.log('Sign up successful:', data.user);
      
      // Show success message
      toast.success("Account created successfully! Redirecting to your dashboard...");
      
      // Redirect to appropriate dashboard
      const dashboardPath = getRoleDashboardPath(selectedRole);
      console.log('Redirecting to:', dashboardPath);
      
      setTimeout(() => {
        navigate(dashboardPath);
      }, 1500);

    } catch (err: any) {
      console.error('Unexpected error during sign up:', err);
      setError(`An unexpected error occurred: ${err.message || 'Please try again.'}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        
        <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
              Create an Account
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
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
                  disabled={loading}
                  className="py-3 px-4"
                  placeholder="Enter your full name"
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
                  disabled={loading}
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
                  disabled={loading}
                  className="py-3 px-4"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-600">
                  I am a...
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {roleOptions.map((role) => (
                    <label
                      key={role.value}
                      className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedRole === role.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={selectedRole === role.value}
                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                        disabled={loading}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{role.label}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
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
                <Link to="/sign-in" className="text-indigo-600 hover:text-indigo-800 font-medium">
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
