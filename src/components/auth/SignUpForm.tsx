
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Check, Sparkles } from "lucide-react";
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
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
      const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
      navigate(decodedRedirect);
    }
  };

  const benefits = [
    "Discover Exclusive Nail Opportunities",
    "Unlock Premium Salon Access", 
    "Join a Vibrant Beauty Community"
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const benefitVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Benefits & Branding */}
          <motion.div 
            className="order-2 lg:order-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Sparkles className="h-8 w-8 text-indigo-600 mr-3" />
                <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900">
                  Welcome to EmviApp
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
                Your gateway to the most exclusive beauty opportunities
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  variants={benefitVariants}
                  custom={index}
                  className="flex items-center justify-center lg:justify-start group"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="hidden lg:block p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100"
            >
              <p className="text-indigo-700 font-medium italic">
                "Join thousands of beauty professionals who've transformed their careers with EmviApp"
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Sign Up Form */}
          <motion.div 
            className="order-1 lg:order-2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden max-w-lg w-full mx-auto">
              <motion.div variants={itemVariants}>
                <CardHeader className="text-center pb-2 pt-8 px-8">
                  <CardTitle className="text-3xl font-bold font-playfair text-gray-900 mb-2">
                    Create Your Account
                  </CardTitle>
                  <p className="text-gray-600">Start your beauty journey today</p>
                </CardHeader>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 px-8">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        disabled={loading}
                        className={`py-3 px-4 text-base rounded-xl border-2 transition-all duration-300 ${
                          focusedField === 'email' 
                            ? 'border-indigo-500 shadow-lg shadow-indigo-100 scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        disabled={loading}
                        className={`py-3 px-4 text-base rounded-xl border-2 transition-all duration-300 ${
                          focusedField === 'password' 
                            ? 'border-indigo-500 shadow-lg shadow-indigo-100 scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        disabled={loading}
                        className={`py-3 px-4 text-base rounded-xl border-2 transition-all duration-300 ${
                          focusedField === 'confirmPassword' 
                            ? 'border-indigo-500 shadow-lg shadow-indigo-100 scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-2">
                    <RoleSelectionCards
                      selectedRole={selectedRole}
                      onChange={setSelectedRole}
                    />
                  </motion.div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-6 pt-2 pb-8 px-8">
                  <motion.div variants={itemVariants} className="w-full">
                    <Button 
                      type="submit" 
                      className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating Your Account...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="text-center">
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <Link 
                        to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} 
                        className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 hover:underline"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </motion.div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
