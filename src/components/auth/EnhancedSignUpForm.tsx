
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth';
import { UserRole } from '@/context/auth/types';
import EnhancedRoleSelectionCards from './EnhancedRoleSelectionCards';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  referralCode: z.string().optional(),
});

type SignUpData = z.infer<typeof signUpSchema>;

interface EnhancedSignUpFormProps {
  redirectUrl?: string | null;
}

const EnhancedSignUpForm: React.FC<EnhancedSignUpFormProps> = ({ redirectUrl }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<'role' | 'details'>('role');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const watchedFields = watch();

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, {
        fullName: data.fullName,
        role: selectedRole,
        referralCode: data.referralCode,
      });
      
      toast.success('Account created successfully! Please check your email to verify your account.');
      
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleContinue = () => {
    setCurrentStep('details');
  };

  const handleBackToRole = () => {
    setCurrentStep('role');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="backdrop-blur-xl bg-white/95 border border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Join EmviApp
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Connect with the beauty industry's best talent
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <AnimatePresence mode="wait">
            {currentStep === 'role' ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <EnhancedRoleSelectionCards
                  selectedRole={selectedRole}
                  onChange={setSelectedRole}
                />
                
                <Button
                  onClick={handleRoleContinue}
                  className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="details-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Button
                  variant="ghost"
                  onClick={handleBackToRole}
                  className="mb-4 text-gray-600 hover:text-gray-800"
                >
                  ← Change Role
                </Button>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                          {...register('fullName')}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-sm text-red-600">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                          {...register('email')}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          className="pl-10 pr-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                          {...register('password')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-600">{errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referralCode" className="text-sm font-medium text-gray-700">
                        Referral Code (Optional)
                      </Label>
                      <Input
                        id="referralCode"
                        type="text"
                        placeholder="Enter referral code"
                        className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                        {...register('referralCode')}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => navigate('/sign-in')}
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedSignUpForm;
