
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRoleSignUp } from '@/hooks/auth/useRoleSignUp';
import { UserRole } from '@/context/auth/types';
import { 
  User, 
  Mail, 
  Lock, 
  CheckCircle, 
  Store, 
  Scissors, 
  Heart, 
  Package,
  Sparkles,
  Shield
} from 'lucide-react';

const EnhancedSignUpForm = () => {
  const {
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    selectedRole, setSelectedRole,
    isSubmitting, error, referrer, handleSubmit
  } = useRoleSignUp();

  const roleOptions = [
    {
      value: 'customer' as UserRole,
      label: 'Customer',
      description: 'Book appointments and discover beauty professionals',
      icon: Heart,
      gradient: 'from-pink-400 to-rose-400'
    },
    {
      value: 'artist' as UserRole,
      label: 'Beauty Professional',
      description: 'Showcase your skills and grow your client base',
      icon: Scissors,
      gradient: 'from-purple-400 to-indigo-400'
    },
    {
      value: 'salon' as UserRole,
      label: 'Salon Owner',
      description: 'Manage your salon and team of professionals',
      icon: Store,
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      value: 'vendor' as UserRole,
      label: 'Supplier',
      description: 'Connect with salons and beauty professionals',
      icon: Package,
      gradient: 'from-emerald-400 to-teal-400'
    }
  ];

  const getPlaceholderText = () => {
    if (selectedRole === 'salon') {
      return {
        email: 'salon@example.com',
        password: 'Create a secure password'
      };
    }
    if (selectedRole === 'vendor') {
      return {
        email: 'supplier@company.com',
        password: 'Create a secure password'
      };
    }
    return {
      email: 'your.email@example.com',
      password: 'Create a secure password'
    };
  };

  const placeholders = getPlaceholderText();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Join EmviApp
              </CardTitle>
              <p className="text-gray-600 mt-2">Create your account to get started</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  I am a...
                </Label>
                <div className="grid grid-cols-1 gap-3">
                  {roleOptions.map((role) => {
                    const IconComponent = role.icon;
                    const isSelected = selectedRole === role.value;
                    
                    return (
                      <motion.div
                        key={role.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 shadow-md' 
                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedRole(role.value)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${role.gradient}`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{role.label}</h3>
                            <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <CheckCircle className="h-5 w-5 text-purple-500" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholders.email}
                    className="pl-4 h-12 border-gray-300 focus:border-purple-400 focus:ring-purple-400 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={placeholders.password}
                    className="pl-4 h-12 border-gray-300 focus:border-purple-400 focus:ring-purple-400 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-4 h-12 border-gray-300 focus:border-purple-400 focus:ring-purple-400 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedRole}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/auth/signin" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                  Sign in
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedSignUpForm;
