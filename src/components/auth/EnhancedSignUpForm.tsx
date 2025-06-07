
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoleSignUp } from "@/hooks/useRoleSignUp";
import RoleSelectionList from "@/components/auth/roles/RoleSelectionList";
import { Link } from "react-router-dom";

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-purple-100/30 to-pink-100/30 animate-pulse"></div>
      </div>
      
      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            {/* Card Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative z-10 text-center mb-8"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-playfair mb-2">
                Join EmviApp
              </h1>
              <p className="text-gray-600 font-inter">
                Connect with thousands of beauty professionals
              </p>
            </motion.div>

            {/* Form Container */}
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email and Password Fields */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="backdrop-blur-sm bg-white/50 border-white/30 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                      minLength={6}
                      className="backdrop-blur-sm bg-white/50 border-white/30 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                      minLength={6}
                      className="backdrop-blur-sm bg-white/50 border-white/30 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Role Selection */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Label className="text-base font-medium text-gray-700 font-playfair">
                    I am a:
                  </Label>
                  <RoleSelectionList
                    selectedRole={selectedRole}
                    onRoleSelect={setSelectedRole}
                  />
                </motion.div>

                {/* Referral Info */}
                {referrer && (
                  <motion.div 
                    className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <p className="text-sm text-green-700 font-medium">
                      🎉 You were referred! You'll get bonus credits when you sign up.
                    </p>
                  </motion.div>
                )}

                {/* Error Display */}
                {error && (
                  <motion.div 
                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 font-playfair text-lg"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : null}
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </motion.div>

                {/* Sign In Link */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link 
                      to="/sign-in" 
                      className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-all duration-300 font-playfair"
                    >
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Playfair Display Font Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        `}
      </style>
    </div>
  );
};
