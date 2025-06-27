
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, User, Scissors, Building2, Briefcase, ShoppingBag, HelpCircle, Star, Heart, Sparkles } from "lucide-react";
import { UserRole } from "@/context/auth/types";
import { useRoleSignUp } from "@/hooks/useRoleSignUp";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface PremiumAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: 'signin' | 'signup';
}

interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const roleOptions: RoleOption[] = [
  {
    id: "customer",
    label: "Customer",
    description: "Book amazing services",
    icon: <User className="h-5 w-5" />,
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: "artist",
    label: "Artist",
    description: "Showcase your talent",
    icon: <Scissors className="h-5 w-5" />,
    gradient: "from-purple-400 to-purple-600"
  },
  {
    id: "salon",
    label: "Salon Owner",
    description: "Grow your business",
    icon: <Building2 className="h-5 w-5" />,
    gradient: "from-pink-400 to-pink-600"
  },
  {
    id: "freelancer",
    label: "Freelancer",
    description: "Work independently",
    icon: <Briefcase className="h-5 w-5" />,
    gradient: "from-green-400 to-green-600"
  },
  {
    id: "supplier",
    label: "Supplier",
    description: "Sell products & supplies",
    icon: <ShoppingBag className="h-5 w-5" />,
    gradient: "from-orange-400 to-orange-600"
  },
  {
    id: "other",
    label: "Other",
    description: "I'm exploring options",
    icon: <HelpCircle className="h-5 w-5" />,
    gradient: "from-gray-400 to-gray-600"
  }
];

export const PremiumAuthModal = ({ open, onOpenChange, defaultMode = 'signup' }: PremiumAuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sign up form state
  const {
    email: signUpEmail,
    setEmail: setSignUpEmail,
    password: signUpPassword,
    setPassword: setSignUpPassword,
    confirmPassword,
    setConfirmPassword,
    selectedRole,
    setSelectedRole,
    handleSubmit: handleSignUp
  } = useRoleSignUp();
  
  // Sign in form state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const { signIn } = useAuth();

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signIn(signInEmail, signInPassword);
      if (result) {
        toast.success('Welcome back! Redirecting to your dashboard...');
        onOpenChange(false);
      }
    } catch (error) {
      // Error handling is done in the signIn method
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await handleSignUp(e);
      toast.success('🎉 You\'re In! Setting up your dashboard...');
      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      // Error handling is done in useRoleSignUp
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto p-0 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 border-0 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-6">
            <div className="flex justify-center mb-4">
              <Logo size="large" showText={true} />
            </div>
            
            {mode === 'signup' ? (
              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Join the #1 Beauty Community
                </h2>
                <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  It's Your Turn to Shine <Sparkles className="h-4 w-4 text-yellow-500" />
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-600">
                  Ready to continue your journey?
                </p>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="px-6 pb-6">
            {mode === 'signup' ? (
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    I am a:
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {roleOptions.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "relative cursor-pointer rounded-xl p-3 border-2 transition-all duration-200 hover:scale-105",
                          selectedRole === option.id
                            ? "border-indigo-500 bg-gradient-to-r shadow-lg shadow-indigo-200/50"
                            : "border-gray-200 bg-white hover:border-indigo-200",
                          selectedRole === option.id ? option.gradient : ""
                        )}
                        onClick={() => setSelectedRole(option.id)}
                      >
                        <div className="flex flex-col items-center text-center space-y-1">
                          <div className={cn(
                            "p-2 rounded-full",
                            selectedRole === option.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                          )}>
                            {option.icon}
                          </div>
                          <span className={cn(
                            "text-xs font-medium",
                            selectedRole === option.id ? "text-white" : "text-gray-900"
                          )}>
                            {option.label}
                          </span>
                          <span className={cn(
                            "text-xs",
                            selectedRole === option.id ? "text-white/80" : "text-gray-500"
                          )}>
                            {option.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Create a secure password"
                      className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Your Account...
                    </>
                  ) : (
                    <>
                      Join EmviApp <Heart className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Toggle to Sign In */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Already have an account? Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Welcome Back"
                  )}
                </Button>

                {/* Toggle to Sign Up */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Don't have an account? Join Now
                  </button>
                </div>
              </form>
            )}

            {/* Trust Messaging */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-3 w-3 text-red-400 mr-1" />
                  <span>15,000+ members</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                Your privacy is protected. We never share your information.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
