
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, Mail, Lock, Phone, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRoleBasedSignUp } from "@/hooks/useRoleBasedSignUp";
import { UserRole } from "@/context/auth/types";
import RoleSelectionCards from "./RoleSelectionCards";
import { toast } from "sonner";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const { signUp, loading } = useRoleBasedSignUp();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    
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
      // Decode the redirect URL if it exists
      const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
      navigate(decodedRedirect);
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-white to-purple-50/30 rounded-3xl overflow-hidden max-w-lg w-full mx-auto backdrop-blur-sm">
      <CardHeader className="space-y-2 pb-8 bg-gradient-to-r from-indigo-600/5 to-purple-600/5">
        <CardTitle className="text-4xl font-bold text-center font-serif bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
          Create an Account
        </CardTitle>
        <p className="text-center text-gray-500 text-sm">Join thousands of beauty professionals</p>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 px-8">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-600" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              className="py-3 px-4 border-2 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300"
              placeholder="Your full name"
            />
            <p className="text-xs text-gray-500 mt-1">This will be displayed on your profile</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="h-4 w-4 text-indigo-600" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="py-3 px-4 border-2 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300"
              placeholder="your@email.com"
            />
            <p className="text-xs text-gray-500 mt-1">We'll use this for account verification</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-600" />
              Password *
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="py-3 px-4 border-2 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-600" />
              Confirm Password *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="py-3 px-4 border-2 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-500 mt-1">Please confirm your password</p>
          </div>

          {/* Placeholder fields - visual only, no logic yet */}
          <div className="space-y-2 opacity-50 pointer-events-none">
            <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Phone className="h-4 w-4 text-indigo-600" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              className="py-3 px-4 border-2 bg-gray-50"
              placeholder="(555) 123-4567"
              disabled
            />
            <p className="text-xs text-gray-400">Coming soon - for booking notifications</p>
          </div>

          <div className="space-y-2 opacity-50 pointer-events-none">
            <Label htmlFor="businessName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Building className="h-4 w-4 text-indigo-600" />
              Business Name
            </Label>
            <Input
              id="businessName"
              type="text"
              className="py-3 px-4 border-2 bg-gray-50"
              placeholder="Your salon or business name"
              disabled
            />
            <p className="text-xs text-gray-400">For salon owners and professionals</p>
          </div>

          <div className="pt-4">
            <RoleSelectionCards
              selectedRole={selectedRole}
              onChange={setSelectedRole}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2 pb-8 px-8">
          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            disabled={loading}
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

          <div className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link 
              to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} 
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200 hover:underline"
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
