
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import RoleSelectionCards from "./RoleSelectionCards";
import { UserRole } from "@/context/auth/types";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    console.log('Starting sign-up process...', { 
      email: email.trim(), 
      role: selectedRole, 
      fullName: fullName.trim() 
    });

    try {
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: selectedRole,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      console.log('Sign-up response:', { data, error });

      if (error) {
        console.error('Sign-up error:', error);
        
        // Handle specific error cases
        if (error.message.includes('User already registered')) {
          toast.error("An account with this email already exists. Please sign in instead.");
        } else if (error.message.includes('Invalid email')) {
          toast.error("Please enter a valid email address.");
        } else if (error.message.includes('Password')) {
          toast.error("Password must be at least 6 characters long.");
        } else if (error.message.includes('Database error')) {
          toast.error("There was a problem creating your account. Please try again.");
          console.error('Database error details:', error);
        } else {
          toast.error(error.message || "Failed to create account. Please try again.");
        }
        return;
      }

      if (data.user) {
        console.log('User created successfully:', data.user);
        
        // Check if email confirmation is required
        if (!data.session) {
          toast.success("Account created! Please check your email to verify your account before signing in.");
        } else {
          toast.success("Account created successfully! Redirecting to dashboard...");
        }
        
        // Navigate to sign-in with success message
        const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
        navigate(`/sign-in?redirect=${encodeURIComponent(decodedRedirect)}&message=account-created`);
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } catch (error: any) {
      console.error('Unexpected sign-up error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden max-w-lg w-full mx-auto">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
          Create Account
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
              placeholder="Enter your full name"
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
              minLength={6}
            />
            <p className="text-xs text-gray-500">Minimum 6 characters</p>
          </div>

          <RoleSelectionCards 
            selectedRole={selectedRole} 
            onChange={setSelectedRole} 
          />
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
  );
};

export default SignUpForm;
