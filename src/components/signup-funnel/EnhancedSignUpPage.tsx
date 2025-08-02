import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Store, Users, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/ui/container';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { markUserSignedUp } from '@/utils/signupFunnelTracking';
import { toast } from 'sonner';

type UserRole = 'customer' | 'artist' | 'salon';

interface FormData {
  email: string;
  phone: string;
  password: string;
  fullName: string;
  role: UserRole;
}

interface FormErrors {
  email?: string;
  phone?: string;
  password?: string;
  fullName?: string;
  general?: string;
}

const EnhancedSignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    password: '',
    fullName: '',
    role: 'customer'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const roles = [
    {
      id: 'customer' as UserRole,
      title: 'Customer',
      description: 'Book beauty services',
      icon: User,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'artist' as UserRole,
      title: 'Beauty Artist',
      description: 'Offer your services',
      icon: Users,
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      id: 'salon' as UserRole,
      title: 'Salon Owner',
      description: 'Manage your business',
      icon: Store,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        break;
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!/^[\+]?[(]?[\d\s\-\(\)]{10,}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        break;
      case 'fullName':
        if (!value) return 'Full name is required';
        if (value.length < 2) return 'Please enter your full name';
        break;
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change and validate
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Real-time validation
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    setCurrentStep(2);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'role') {
        const error = validateField(key, formData[key as keyof FormData] as string);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Sign up with Supabase
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            role: formData.role,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ general: 'This email is already registered. Try signing in instead.' });
        } else {
          setErrors({ general: error.message });
        }
        return;
      }

      // Mark user as signed up in tracking
      markUserSignedUp();

      // Show success message
      toast.success('Account created successfully! Welcome to EmviApp.');

      // Redirect based on role
      const redirectPath = formData.role === 'customer' ? '/dashboard/customer' : 
                          formData.role === 'artist' ? '/dashboard/artist' : 
                          '/dashboard/salon';
      
      navigate(redirectPath);

    } catch (error) {
      console.error('Sign up error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Role Selection
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
        <Container className="py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get Booked 3x Faster
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                Join 1,200+ Pros — 100% FREE
              </p>
              <p className="text-sm text-muted-foreground">
                Choose your role to get started with personalized features
              </p>
            </div>

            {/* Role Selection */}
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`
                      relative group p-6 bg-card rounded-2xl border-2 border-transparent 
                      hover:border-primary/20 transition-all duration-300 hover:shadow-lg 
                      hover:scale-[1.02] text-left
                    `}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                );
              })}
            </div>

            {/* Social Proof */}
            <div className="mt-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">1,200+ beauty professionals</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Join thousands of beauty pros who get booked faster every day!
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Step 2: Form Details
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => setCurrentStep(1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Change Role
          </button>
        </div>

        <div className="max-w-md mx-auto">
          {/* Selected Role Display */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${roles.find(r => r.id === formData.role)?.gradient} flex items-center justify-center mx-auto mb-4`}>
              {React.createElement(roles.find(r => r.id === formData.role)?.icon || User, { className: "w-8 h-8 text-white" })}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Complete Your {roles.find(r => r.id === formData.role)?.title} Profile
            </h1>
            <p className="text-muted-foreground">
              Almost there! Fill in your details to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-400">{errors.general}</span>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`${errors.fullName ? 'border-red-300 focus:border-red-500' : ''}`}
                required
              />
              {errors.fullName && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${errors.email ? 'border-red-300 focus:border-red-500' : ''}`}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className={`${errors.phone ? 'border-red-300 focus:border-red-500' : ''}`}
                required
              />
              {errors.phone && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pr-10 ${errors.password ? 'border-red-300 focus:border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Create My FREE Account
                </div>
              )}
            </Button>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: '100% Free', sublabel: 'Always' },
                { label: 'Secure', sublabel: 'Protected' },
                { label: '1,200+', sublabel: 'Members' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EnhancedSignUpPage;