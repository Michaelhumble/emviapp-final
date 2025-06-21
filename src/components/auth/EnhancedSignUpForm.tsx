
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRoleSignUp } from "@/hooks/useRoleSignUp";
import { UserRole } from "@/context/auth/types";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Palette, 
  ShoppingBag, 
  Loader2,
  Phone,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";

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

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const roleOptions = [
    { 
      value: "customer" as UserRole, 
      label: "Customer", 
      description: "Book services and find artists",
      icon: User,
      gradient: "from-blue-500 to-purple-600"
    },
    { 
      value: "artist" as UserRole, 
      label: "Artist", 
      description: "Showcase work and get bookings",
      icon: Palette,
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      value: "salon_owner" as UserRole, 
      label: "Salon Owner", 
      description: "Manage salon and team",
      icon: Building2,
      gradient: "from-pink-500 to-rose-600"
    },
    { 
      value: "supplier" as UserRole, 
      label: "Supplier", 
      description: "Sell products and supplies",
      icon: ShoppingBag,
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Join EmviApp
          </CardTitle>
          <p className="text-center text-gray-600 text-sm">
            Create your account and start your beauty journey
          </p>
          {referrer && (
            <div className="text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Referred by: {referrer}
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">
                Choose Your Role
              </Label>
              <RadioGroup
                value={selectedRole}
                onValueChange={(value: UserRole) => setSelectedRole(value)}
                className="grid grid-cols-1 gap-3"
              >
                {roleOptions.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <motion.div
                      key={role.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <RadioGroupItem
                        value={role.value}
                        id={role.value}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={role.value}
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedRole === role.value
                            ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${role.gradient} mr-4`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{role.label}</div>
                          <div className="text-sm text-gray-600">{role.description}</div>
                        </div>
                        {selectedRole === role.value && (
                          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </Label>
                    </motion.div>
                  );
                })}
              </RadioGroup>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Phone Number Field (Conditional) */}
            {(selectedRole === "salon_owner" || selectedRole === "supplier") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200"
                  />
                </div>
              </motion.div>
            )}

            {/* Business Name Field (Conditional) */}
            {(selectedRole === "salon_owner" || selectedRole === "supplier") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="businessName" className="text-sm font-semibold text-gray-700">
                  {selectedRole === "salon_owner" ? "Salon Name" : "Business Name"}
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="businessName"
                    type="text"
                    placeholder={`Enter your ${selectedRole === "salon_owner" ? "salon" : "business"} name`}
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200"
                  />
                </div>
              </motion.div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-xl transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth"
                className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
