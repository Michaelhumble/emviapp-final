
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRoleSignUp } from "@/hooks/useRoleSignUp";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle,
  Phone,
  Building2,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const EnhancedSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const {
    formData,
    handleInputChange,
    handleRoleChange,
    handleSubmit,
    isLoading,
    errors,
    availableRoles,
    referrer
  } = useRoleSignUp();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleFieldFocus = (fieldName: string) => setFocusedField(fieldName);
  const handleFieldBlur = () => setFocusedField(null);

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#8b5cf6", transition: { duration: 0.2 } },
    blur: { scale: 1, borderColor: "#e5e7eb", transition: { duration: 0.2 } }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join EmviApp
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create your account and start your beauty journey
          </CardDescription>
          
          {/* Referral Badge */}
          <AnimatePresence>
            {referrer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-center mt-4"
              >
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Referred by {referrer}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <motion.div variants={fieldVariants} initial="hidden" animate="visible">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-purple-500" />
                Full Name
              </Label>
              <div className="relative mt-1">
                <motion.div
                  variants={inputVariants}
                  animate={focusedField === "fullName" ? "focus" : "blur"}
                >
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus("fullName")}
                    onBlur={handleFieldBlur}
                    placeholder="Enter your full name"
                    className="pl-10 h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </motion.div>
                {errors.fullName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.fullName}
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">This will be displayed on your profile</p>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-500" />
                Email Address
              </Label>
              <div className="relative mt-1">
                <motion.div
                  variants={inputVariants}
                  animate={focusedField === "email" ? "focus" : "blur"}
                >
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus("email")}
                    onBlur={handleFieldBlur}
                    placeholder="Enter your email"
                    className="pl-10 h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </motion.div>
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">We'll use this for account verification</p>
            </motion.div>

            {/* Phone Number Field (Placeholder) */}
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-500" />
                Phone Number
                <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
              </Label>
              <div className="relative mt-1">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="pl-10 h-11 border-gray-200 bg-gray-50 cursor-not-allowed"
                  disabled={true}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Optional - for appointment reminders</p>
            </motion.div>

            {/* Business Name Field (Placeholder) */}
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <Label htmlFor="businessName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-500" />
                Business Name
                <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
              </Label>
              <div className="relative mt-1">
                <Input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="Your salon or business name"
                  className="pl-10 h-11 border-gray-200 bg-gray-50 cursor-not-allowed"
                  disabled={true}
                />
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Optional - for salon owners and businesses</p>
            </motion.div>

            {/* Role Selection */}
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                I am a...
              </Label>
              <Select value={formData.role} onValueChange={handleRoleChange} disabled={isLoading}>
                <SelectTrigger className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.role}
                </motion.div>
              )}
              <p className="text-xs text-gray-500 mt-1">This helps us personalize your experience</p>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4 text-purple-500" />
                Password
              </Label>
              <div className="relative mt-1">
                <motion.div
                  variants={inputVariants}
                  animate={focusedField === "password" ? "focus" : "blur"}
                >
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus("password")}
                    onBlur={handleFieldBlur}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </motion.div>
                {errors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with letters and numbers</p>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4 text-purple-500" />
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <motion.div
                  variants={inputVariants}
                  animate={focusedField === "confirmPassword" ? "focus" : "blur"}
                >
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus("confirmPassword")}
                    onBlur={handleFieldBlur}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </motion.div>
                {errors.confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Must match your password above</p>
            </motion.div>

            {/* Global Error Alert */}
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-800">
                      {errors.submit}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating your account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Create Account
                  </div>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Sign In Link */}
          <motion.div 
            variants={fieldVariants} 
            initial="hidden" 
            animate="visible" 
            transition={{ delay: 0.8 }}
            className="text-center pt-4 border-t border-gray-100"
          >
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/sign-in" 
                className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
