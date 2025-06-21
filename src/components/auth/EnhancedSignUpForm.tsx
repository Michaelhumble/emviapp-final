
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoleSignUp } from "@/hooks/useRoleSignUp";
import RoleSelectionList from "@/components/auth/roles/RoleSelectionList";
import { Link } from "react-router-dom";
import { Mail, Lock, Phone, Building, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const EnhancedSignUpForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    selectedRole,
    setSelectedRole,
    isSubmitting,
    error,
    referrer,
    handleSubmit
  } = useRoleSignUp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6 space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emvi-accent to-blue-600 bg-clip-text text-transparent">
            Create an Account
          </CardTitle>
          <p className="text-sm text-slate-600 leading-relaxed">
            Join thousands of beauty professionals and customers on EmviApp
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email and Password Fields */}
            <div className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emvi-accent" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="h-12 bg-slate-50/50 border-slate-200 focus:border-emvi-accent focus:ring-2 focus:ring-emvi-accent/20 transition-all duration-200 hover:bg-slate-50"
                />
                <p className="text-xs text-slate-500 leading-relaxed">
                  We'll use this to send you important updates about your account
                </p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emvi-accent" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  minLength={6}
                  className="h-12 bg-slate-50/50 border-slate-200 focus:border-emvi-accent focus:ring-2 focus:ring-emvi-accent/20 transition-all duration-200 hover:bg-slate-50"
                />
                <p className="text-xs text-slate-500 leading-relaxed">
                  Minimum 6 characters for account security
                </p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emvi-accent" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  minLength={6}
                  className="h-12 bg-slate-50/50 border-slate-200 focus:border-emvi-accent focus:ring-2 focus:ring-emvi-accent/20 transition-all duration-200 hover:bg-slate-50"
                />
                <p className="text-xs text-slate-500 leading-relaxed">
                  Make sure both passwords match exactly
                </p>
              </div>

              {/* NEW PLACEHOLDER FIELDS - Phone Number */}
              <div className="space-y-3 opacity-60">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emvi-accent" />
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  disabled
                  className="h-12 bg-slate-50/50 border-slate-200 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 leading-relaxed">
                  We'll use this for booking confirmations and updates
                </p>
              </div>

              {/* NEW PLACEHOLDER FIELDS - Business Name */}
              <div className="space-y-3 opacity-60">
                <Label htmlFor="businessName" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Building className="h-4 w-4 text-emvi-accent" />
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Enter your business name"
                  disabled
                  className="h-12 bg-slate-50/50 border-slate-200 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 leading-relaxed">
                  Required for salon owners and business accounts
                </p>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold text-slate-800 flex items-center gap-2">
                I am a:
              </Label>
              <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200">
                <RoleSelectionList
                  selectedRole={selectedRole}
                  onRoleSelect={setSelectedRole}
                />
              </div>
            </div>

            {/* Enhanced Referral Info */}
            {referrer && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm animate-fade-in">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      🎉 Welcome! You've been referred to EmviApp
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      You'll receive bonus credits when you complete signup
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Error Display */}
            {error && (
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg shadow-sm animate-fade-in">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Oops! Something went wrong
                    </p>
                    <p className="text-xs text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <Button
              type="submit"
              className={`
                w-full h-12 text-base font-semibold transition-all duration-300 
                ${isSubmitting 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emvi-accent to-blue-600 hover:from-emvi-accent/90 hover:to-blue-600/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                }
              `}
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Your Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Create Account
                </div>
              )}
            </Button>

            {/* Enhanced Sign In Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link 
                  to="/sign-in" 
                  className="text-emvi-accent hover:text-emvi-accent/80 font-semibold transition-colors duration-200 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
