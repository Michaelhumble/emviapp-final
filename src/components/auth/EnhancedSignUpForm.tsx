
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, User, Mail, Lock, Phone, MapPin, Building, Award, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRoleBasedSignUp } from '@/hooks/useRoleBasedSignUp';
import { UserRole } from '@/context/auth/types';
import { toast } from 'sonner';

interface RoleFormData {
  // Common fields
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone?: string;
  location: string;
  
  // Role-specific fields
  businessName?: string;
  businessLicense?: string;
  yearsExperience?: number;
  specialties?: string[];
  companyName?: string;
  website?: string;
  bio?: string;
  referralCode?: string;
  
  // Marketing preferences
  wantsMarketing?: boolean;
  wantsReferrals?: boolean;
}

const ROLE_OPTIONS = [
  { value: 'customer' as UserRole, label: 'Customer', description: 'Book beauty services', icon: User },
  { value: 'nail-artist' as UserRole, label: 'Nail Artist', description: 'Professional nail services', icon: Award },
  { value: 'hair-stylist' as UserRole, label: 'Hair Stylist', description: 'Hair cutting & styling', icon: Award },
  { value: 'barber' as UserRole, label: 'Barber', description: 'Men\'s grooming expert', icon: Award },
  { value: 'lash-tech' as UserRole, label: 'Lash Technician', description: 'Eyelash extensions & beauty', icon: Award },
  { value: 'esthetician' as UserRole, label: 'Esthetician', description: 'Skincare & facial treatments', icon: Award },
  { value: 'massage-therapist' as UserRole, label: 'Massage Therapist', description: 'Therapeutic massage services', icon: Award },
  { value: 'salon-owner' as UserRole, label: 'Salon Owner', description: 'Own a beauty business', icon: Building },
  { value: 'freelancer' as UserRole, label: 'Freelancer', description: 'Independent beauty professional', icon: User },
  { value: 'beauty-supplier' as UserRole, label: 'Beauty Supplier', description: 'Supply beauty products', icon: Users },
];

const SPECIALTY_OPTIONS = {
  'nail-artist': ['Gel Manicures', 'Nail Art', 'Acrylic Extensions', 'Dip Powder', 'Pedicures'],
  'hair-stylist': ['Cutting', 'Coloring', 'Styling', 'Extensions', 'Treatments'],
  'barber': ['Haircuts', 'Beard Trimming', 'Hot Towel Shaves', 'Styling'],
  'lash-tech': ['Classic Lashes', 'Volume Lashes', 'Lash Lifts', 'Brow Services'],
  'esthetician': ['Facials', 'Chemical Peels', 'Microdermabrasion', 'Anti-Aging'],
  'massage-therapist': ['Swedish', 'Deep Tissue', 'Hot Stone', 'Therapeutic']
};

export const EnhancedSignUpForm = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [formData, setFormData] = useState<RoleFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    location: '',
    specialties: [],
    wantsMarketing: true,
    wantsReferrals: true
  });
  const [step, setStep] = useState(1);
  const { signUp, loading } = useRoleBasedSignUp();

  const handleInputChange = (field: keyof RoleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    const current = formData.specialties || [];
    const updated = current.includes(specialty) 
      ? current.filter(s => s !== specialty)
      : [...current, specialty];
    handleInputChange('specialties', updated);
  };

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName) {
      toast.error('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
      return;
    }

    // Final submission
    const success = await signUp(formData.email, formData.password, selectedRole);
    if (success) {
      toast.success('Welcome to EmviApp! 🎉');
    }
  };

  const renderRoleSpecificFields = () => {
    const isArtist = ['nail-artist', 'hair-stylist', 'barber', 'lash-tech', 'esthetician', 'massage-therapist'].includes(selectedRole);
    const isSalonOwner = selectedRole === 'salon-owner';
    const isSupplier = selectedRole === 'beauty-supplier';

    return (
      <div className="space-y-4">
        {/* Common location field */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location *
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, State"
            required
          />
        </div>

        {/* Artist-specific fields */}
        {isArtist && (
          <>
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Select onValueChange={(value) => handleInputChange('yearsExperience', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Just starting out</SelectItem>
                  <SelectItem value="1">1-2 years</SelectItem>
                  <SelectItem value="3">3-5 years</SelectItem>
                  <SelectItem value="6">6-10 years</SelectItem>
                  <SelectItem value="11">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {SPECIALTY_OPTIONS[selectedRole as keyof typeof SPECIALTY_OPTIONS] && (
              <div className="space-y-2">
                <Label>Specialties (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {SPECIALTY_OPTIONS[selectedRole as keyof typeof SPECIALTY_OPTIONS].map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={formData.specialties?.includes(specialty)}
                        onCheckedChange={() => handleSpecialtyToggle(specialty)}
                      />
                      <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="bio">Tell us about yourself</Label>
              <Textarea
                id="bio"
                value={formData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Brief description of your services and experience..."
                rows={3}
              />
            </div>
          </>
        )}

        {/* Salon Owner fields */}
        {isSalonOwner && (
          <>
            <div className="space-y-2">
              <Label htmlFor="businessName" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Business Name *
              </Label>
              <Input
                id="businessName"
                value={formData.businessName || ''}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Your salon name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yoursalon.com"
              />
            </div>
          </>
        )}

        {/* Supplier fields */}
        {isSupplier && (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company Name *
              </Label>
              <Input
                id="companyName"
                value={formData.companyName || ''}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Your company name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Company Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourcompany.com"
              />
            </div>
          </>
        )}

        {/* Optional phone for all */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone (optional)
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Referral code */}
        <div className="space-y-2">
          <Label htmlFor="referralCode" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Referral Code (optional)
          </Label>
          <Input
            id="referralCode"
            value={formData.referralCode || ''}
            onChange={(e) => handleInputChange('referralCode', e.target.value)}
            placeholder="Enter referral code for bonuses"
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
          Join EmviApp
        </CardTitle>
        <p className="text-center text-gray-600">
          {step === 1 ? 'Create your account' : 'Complete your profile'}
        </p>
        <div className="flex justify-center space-x-2 mt-4">
          <div className={`w-4 h-1 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
          <div className={`w-4 h-1 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          {step === 1 && (
            <>
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">I am a:</Label>
                <div className="grid gap-2">
                  {ROLE_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-all ${
                          selectedRole === option.value
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-200'
                        }`}
                        onClick={() => setSelectedRole(option.value)}
                      >
                        <Icon className="h-5 w-5 text-indigo-500" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{option.label}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedRole === option.value
                            ? 'border-indigo-600 bg-indigo-600'
                            : 'border-gray-300'
                        }`}>
                          {selectedRole === option.value && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && renderRoleSpecificFields()}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
          {step === 2 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="w-full"
            >
              Back
            </Button>
          )}
          
          <Button
            type="submit"
            className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : step === 1 ? (
              'Continue'
            ) : (
              'Create Account'
            )}
          </Button>

          <div className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/auth/signin" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign in
            </Link>
          </div>

          {step === 2 && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-xs text-green-600 mb-2">
                <Star className="h-3 w-3" />
                <span>Trusted by 1,000+ beauty professionals</span>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
