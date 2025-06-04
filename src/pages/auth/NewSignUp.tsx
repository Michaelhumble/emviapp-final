
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import RoleSelectionCards from "@/components/auth/RoleSelectionCards";
import { UserRole } from "@/context/auth/types";

const NewSignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    console.log("=== SIGN UP ATTEMPT STARTED ===");
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Selected Role:", selectedRole);
    
    // Validation
    if (!fullName.trim()) {
      const errorMsg = "Full name is required";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Validation failed:", errorMsg);
      return;
    }

    if (!email.trim()) {
      const errorMsg = "Email is required";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Validation failed:", errorMsg);
      return;
    }

    if (password !== confirmPassword) {
      const errorMsg = "Passwords don't match";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Validation failed:", errorMsg);
      return;
    }

    if (password.length < 6) {
      const errorMsg = "Password must be at least 6 characters";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Validation failed:", errorMsg);
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Prepare the sign-up payload
      const signUpPayload = {
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: selectedRole
          }
        }
      };
      
      console.log("=== SUPABASE AUTH SIGNUP PAYLOAD ===");
      console.log("Email:", signUpPayload.email);
      console.log("Metadata:", signUpPayload.options.data);
      
      const { data, error: signUpError } = await supabase.auth.signUp(signUpPayload);
      
      console.log("=== SUPABASE AUTH SIGNUP RESPONSE ===");
      console.log("Data:", data);
      console.log("Error:", signUpError);
      
      if (signUpError) {
        console.error("Supabase Auth Error Details:", {
          message: signUpError.message,
          status: signUpError.status,
          name: signUpError.name,
          cause: signUpError.cause
        });
        
        let userFriendlyError = "Sign up failed";
        
        if (signUpError.message.includes("already")) {
          userFriendlyError = "This email is already registered. Please use a different email or try signing in.";
        } else if (signUpError.message.includes("password")) {
          userFriendlyError = "Password is too weak. Please use a stronger password.";
        } else if (signUpError.message.includes("email")) {
          userFriendlyError = "Invalid email format. Please check your email address.";
        } else if (signUpError.message.includes("Database error updating user")) {
          userFriendlyError = "Account creation failed due to a database error. Please try again or contact support.";
        } else {
          userFriendlyError = `Sign up failed: ${signUpError.message}`;
        }
        
        setError(userFriendlyError);
        toast.error(userFriendlyError);
        setIsSubmitting(false);
        return;
      }
      
      if (!data.user) {
        const errorMsg = "User creation failed - no user returned";
        console.error(errorMsg);
        setError(errorMsg);
        toast.error(errorMsg);
        setIsSubmitting(false);
        return;
      }

      console.log("=== USER CREATED SUCCESSFULLY ===");
      console.log("User ID:", data.user.id);
      console.log("User Email:", data.user.email);
      console.log("User Metadata:", data.user.user_metadata);
      
      // Check if user was created in public.users table
      try {
        console.log("=== CHECKING PUBLIC.USERS TABLE ===");
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        console.log("Profile data:", userProfile);
        console.log("Profile error:", profileError);
        
        if (profileError) {
          console.error("Profile lookup error:", profileError);
          toast.error("Account created but profile setup failed. Please contact support.");
        } else if (userProfile) {
          console.log("✅ User profile found in public.users:", userProfile);
        } else {
          console.warn("⚠️ User profile not found in public.users table");
        }
      } catch (profileCheckError) {
        console.error("Error checking user profile:", profileCheckError);
      }

      toast.success("Account created successfully! Redirecting...");
      
      // Redirect based on role
      setTimeout(() => {
        switch (selectedRole) {
          case 'artist':
          case 'nail technician/artist':
            navigate('/dashboard/artist');
            break;
          case 'salon':
          case 'owner':
            navigate('/dashboard/salon');
            break;
          case 'customer':
            navigate('/dashboard/customer');
            break;
          case 'freelancer':
            navigate('/dashboard/freelancer');
            break;
          default:
            navigate(redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard');
        }
      }, 1500);
      
    } catch (err: any) {
      console.error("=== UNEXPECTED ERROR ===", err);
      const errorMsg = err.message || "An unexpected error occurred";
      setError(errorMsg);
      toast.error(`Unexpected error: ${errorMsg}`);
    } finally {
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
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-600">Full Name</Label>
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
                <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email</Label>
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
                <Label htmlFor="password" className="text-sm font-medium text-gray-600">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="py-3 px-4"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="py-3 px-4"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4">
                <RoleSelectionCards
                  selectedRole={selectedRole}
                  onChange={setSelectedRole}
                />
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
                  "Sign Up"
                )}
              </Button>

              <div className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
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
