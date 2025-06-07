
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRoleBasedSignUp } from "@/hooks/useRoleBasedSignUp";
import { UserRole } from "@/context/auth/types";
import RoleSelectionCards from "./RoleSelectionCards";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const { signUp, loading } = useRoleBasedSignUp();
  const navigate = useNavigate();
  
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
      // Decode the redirect URL if it exists
      const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
      navigate(decodedRedirect);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-pink-600/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(139, 69, 19, 0.1), rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.1))",
              "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(139, 69, 19, 0.1), rgba(59, 130, 246, 0.05))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.1), rgba(139, 69, 19, 0.1))"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CardHeader className="space-y-1 pb-6 bg-gradient-to-r from-white to-purple-50/50">
                <CardTitle className="text-4xl font-bold text-center font-playfair bg-gradient-to-r from-purple-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Create an Account
                </CardTitle>
                <p className="text-center text-gray-600 font-inter text-sm mt-2">
                  Join thousands of beauty professionals
                </p>
              </CardHeader>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 p-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 font-inter">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="h-12 px-4 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 font-inter">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="h-12 px-4 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="••••••••"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 font-inter">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="h-12 px-4 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="••••••••"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-4"
                >
                  <RoleSelectionCards
                    selectedRole={selectedRole}
                    onChange={setSelectedRole}
                  />
                </motion.div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 p-8 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="w-full space-y-3"
                >
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 font-inter"
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

                  {/* Google Sign Up Button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-200 bg-white/70 hover:bg-white hover:border-gray-300 text-gray-700 font-semibold rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 font-inter"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-sm text-center text-gray-600 font-inter"
                >
                  Already have an account?{" "}
                  <Link 
                    to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} 
                    className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpForm;
