
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRoleBasedSignUp } from "@/hooks/useRoleBasedSignUp";
import { UserRole } from "@/context/auth/types";
import RoleSelectionCards from "./RoleSelectionCards";
import { toast } from "sonner";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, loading } = useRoleBasedSignUp();
  const navigate = useNavigate();

  // Password validation
  const passwordRequirements = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number or symbol", met: /[\d\W]/.test(password) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const result = await signUp(email, password, selectedRole);
    
    if (result) {
      const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
      navigate(decodedRedirect);
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-white to-indigo-50/40 rounded-3xl overflow-hidden max-w-lg w-full mx-auto backdrop-blur-sm">
      <CardHeader className="space-y-2 pb-8 text-center">
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent font-playfair">
          Join EmviApp
        </CardTitle>
        <p className="text-gray-600 text-sm">Create your account and start your beauty journey</p>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="py-3.5 px-4 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="py-3.5 px-4 pr-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-200"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Requirements */}
            {password.length > 0 && (
              <div className="mt-3 space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    {req.met ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : (
                      <AlertCircle size={14} className="text-gray-400" />
                    )}
                    <span className={req.met ? "text-green-600" : "text-gray-500"}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className={`py-3.5 px-4 pr-12 rounded-xl transition-all duration-200 ${
                  confirmPassword.length > 0
                    ? passwordsMatch
                      ? "border-green-300 focus:border-green-400 focus:ring-green-400/20"
                      : "border-red-300 focus:border-red-400 focus:ring-red-400/20"
                    : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20"
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {confirmPassword.length > 0 && (
              <div className="flex items-center gap-2 text-xs mt-2">
                {passwordsMatch ? (
                  <>
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span className="text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} className="text-red-500" />
                    <span className="text-red-500">Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="pt-2">
            <RoleSelectionCards
              selectedRole={selectedRole}
              onChange={setSelectedRole}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-4 pb-8">
          <Button 
            type="submit" 
            className="w-full py-4 text-base bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold"
            disabled={loading || !isPasswordValid || !passwordsMatch}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Your Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link 
              to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} 
              className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
            >
              Sign in here
            </Link>
          </div>

          <div className="text-xs text-center text-gray-500 pt-2">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
