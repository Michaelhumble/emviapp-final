
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { UserRole } from "@/context/auth/types";
import RoleSelectionCards from "./RoleSelectionCards";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { navigateToRoleDashboard } from "@/utils/navigation";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  role: z.string().min(1, "Please select your role"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: "customer"
    }
  });

  // Watch for role changes
  const watchedRole = watch("role");

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const onSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.role,
            user_type: data.role,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        },
      });

      if (error) {
        if (error.message.includes('already')) {
          toast({
            title: "Account already exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "You're In! ✨",
        description: "Setting up your dashboard...",
      });

      // Use the navigation utility to redirect based on role
      setTimeout(() => {
        navigateToRoleDashboard(navigate, data.role as UserRole);
      }, 1500);

    } catch (error) {
      toast({
        title: "Error creating account",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignIn = async (data: Pick<SignUpFormData, 'email' | 'password'>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back! ✨",
        description: "Redirecting to your dashboard...",
      });

      // Redirect to dashboard - the auth state change will handle role-based routing
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      toast({
        title: "Error signing in",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              EmviApp
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isSignUp ? "Join Our Beauty Community" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isSignUp ? "Start your professional beauty journey today" : "Sign in to your account"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(isSignUp ? onSignUp : onSignIn)} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email address"
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Create a secure password"
                  className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {isSignUp && (
              <div className="space-y-3">
                <RoleSelectionCards 
                  selectedRole={selectedRole} 
                  onChange={handleRoleChange}
                />
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </div>
              ) : (
                isSignUp ? "Join Our Beauty Community" : "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {isSignUp && (
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                Book appointments and discover beauty professionals
              </p>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                <span>🔒 Free to join</span>
                <span>•</span>
                <span>✨ No spam ever</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
