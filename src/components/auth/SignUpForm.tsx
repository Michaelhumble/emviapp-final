
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Gift, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  phoneNumber?: string;
  setPhoneNumber?: (phoneNumber: string) => void;
  isSubmitting: boolean;
  referralCode: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void> | void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  phoneNumber = '',
  setPhoneNumber = () => {},
  isSubmitting,
  referralCode,
  handleSubmit,
  showPassword,
  setShowPassword
}: SignUpFormProps) => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  
  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid && email) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(null);
    }
    return isValid;
  };
  
  // Validate password strength
  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };
  
  // Check if passwords match
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword]);

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
          Create an Account
        </CardTitle>
        <CardDescription className="text-center text-indigo-700/70">
          Join EmviApp and discover beauty professionals near you
        </CardDescription>
        {referralCode && (
          <div className="mt-4 bg-indigo-50 p-4 rounded-xl text-center border border-indigo-100">
            <div className="flex items-center justify-center text-indigo-700 mb-1">
              <Gift className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">You were invited!</span>
            </div>
            <p className="text-xs text-indigo-600">
              Signing up with a referral gives you bonus credits to start.
            </p>
          </div>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              disabled={isSubmitting}
              className="py-3 px-4 bg-white border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
            />
            {emailError && (
              <p className="text-xs text-red-500 mt-1">{emailError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-600">Phone Number (Optional)</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="(123) 456-7890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isSubmitting}
              className="py-3 px-4 bg-white border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-600">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                onBlur={() => validatePassword(password)}
                disabled={isSubmitting}
                className="py-3 px-4 bg-white border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                className={`py-3 px-4 bg-white border-gray-200 transition-all shadow-sm pr-10 ${
                  !passwordsMatch && confirmPassword
                    ? "border-red-300 focus:ring-red-200"
                    : "focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300"
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {!passwordsMatch && confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
            )}
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Lock className="h-3 w-3 mr-1 text-gray-400" />
              Your password is encrypted and private
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-5 pt-2 pb-6">
          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium text-base transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={isSubmitting || !passwordsMatch || !!passwordError || !!emailError}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Continue"
            )}
          </Button>
          
          <div className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
