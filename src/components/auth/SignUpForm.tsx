
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Users, Building2 } from "lucide-react";
import { useRoleSignUp } from "@/hooks/useRoleSignUp";
import RoleSelectionCards from "./RoleSelectionCards";
import { Link } from "react-router-dom";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
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
    handleSubmit
  } = useRoleSignUp();

  const benefits = [
    {
      icon: Sparkles,
      text: "Discover Exclusive Nail Opportunities",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Building2,
      text: "Unlock Premium Salon Access",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      text: "Join a Vibrant Beauty Community",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center p-4 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Benefits & Motivation */}
          <motion.div 
            variants={itemVariants}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Welcome to
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                    EmviApp
                  </span>
                </h1>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600 font-light leading-relaxed"
              >
                Join thousands of beauty professionals transforming their careers with premium opportunities and exclusive connections.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${benefit.gradient} p-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-lg font-medium text-gray-800">{benefit.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
            >
              <p className="text-sm font-medium text-purple-800 mb-2">✨ Limited Time</p>
              <p className="text-purple-700">Join now and unlock exclusive access to premium salon partnerships and career opportunities.</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Sign Up Form */}
          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-lg bg-white/80 border-0 shadow-2xl rounded-3xl p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Mobile Benefits */}
                <div className="lg:hidden space-y-4 mb-8">
                  <h1 className="font-playfair text-3xl font-bold text-gray-900 text-center">
                    Join <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">EmviApp</span>
                  </h1>
                  <div className="grid gap-3">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${benefit.gradient} p-1.5`}>
                            <Icon className="w-full h-full text-white" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <p className="text-sm font-medium text-gray-700">{benefit.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="hidden lg:block font-playfair text-3xl font-bold text-gray-900">
                    Create Your Account
                  </h2>
                  <p className="text-gray-600">Start your beauty career journey today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-2xl"
                    >
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </motion.div>
                  )}

                  <RoleSelectionCards 
                    selectedRole={selectedRole} 
                    onChange={setSelectedRole} 
                  />

                  <div className="space-y-5">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-base"
                        placeholder="your@email.com"
                        required
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-base"
                        placeholder="Create a strong password"
                        required
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-12 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-base"
                        placeholder="Confirm your password"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Creating Your Account...</span>
                        </div>
                      ) : (
                        "Create Account & Start Growing"
                      )}
                    </Button>
                  </motion.div>

                  <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link 
                        to="/sign-in" 
                        className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200"
                      >
                        Sign In
                      </Link>
                    </p>
                    
                    <p className="text-xs text-gray-500 leading-relaxed">
                      By creating an account, you agree to our Terms of Service and Privacy Policy. 
                      Join thousands of beauty professionals already growing with EmviApp.
                    </p>
                  </div>
                </form>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
