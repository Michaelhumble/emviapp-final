
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Crown, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useRoleBasedSignUp } from "@/hooks/useRoleBasedSignUp";
import { UserRole } from "@/context/auth/types";
import EnhancedRoleSelectionCards from "./EnhancedRoleSelectionCards";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface EnhancedSignUpFormProps {
  redirectUrl?: string | null;
}

const EnhancedSignUpForm = ({ redirectUrl }: EnhancedSignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const { signUp, loading } = useRoleBasedSignUp();
  
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
    
    if (result && redirectUrl) {
      const decodedRedirect = decodeURIComponent(redirectUrl);
      window.location.href = decodedRedirect;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-2xl"
          animate={{ 
            x: [-50, 50, -50],
            y: [-30, 30, -30]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden">
          {/* Premium Header */}
          <CardHeader className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
              >
                <Crown className="h-8 w-8 text-yellow-300" />
              </motion.div>
              
              <CardTitle className="text-3xl font-bold font-playfair mb-2">
                Join EmviApp
              </CardTitle>
              
              <p className="text-white/90 text-lg">
                Your luxury beauty experience starts here
              </p>
              
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm text-white/80">Premium Features</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-300" />
                  <span className="text-sm text-white/80">Secure & Trusted</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-8 space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <Label htmlFor="email" className="text-base font-semibold text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="h-12 px-4 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </motion.div>
              
              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <Label htmlFor="password" className="text-base font-semibold text-gray-700">
                  Create Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="h-12 px-4 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-all duration-300"
                  placeholder="••••••••"
                />
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <Label htmlFor="confirmPassword" className="text-base font-semibold text-gray-700">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="h-12 px-4 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-all duration-300"
                  placeholder="••••••••"
                />
              </motion.div>

              {/* Enhanced Role Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-2"
              >
                <EnhancedRoleSelectionCards
                  selectedRole={selectedRole}
                  onChange={setSelectedRole}
                />
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-6 p-8 bg-gray-50/50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full"
              >
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Creating Your Account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5" />
                      Start Your Beauty Journey
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center"
              >
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} 
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedSignUpForm;
