
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, X } from 'lucide-react';
import { UserRole } from '@/context/auth/types';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone?: string;
  location?: string;
  role: UserRole;
  // Role-specific fields
  specialties?: string[];
  experience_years?: number;
  license_number?: string;
  preferred_work_types?: string[];
  business_name?: string;
  salon_type?: string;
  services_offered?: string[];
  seat_count?: number;
  cities_willing_to_work?: string[];
  rate_range_min?: number;
  rate_range_max?: number;
  skills?: string[];
  referral_source?: string;
}

const roleOptions = [
  { value: 'customer', label: 'Customer', description: 'I want to book beauty services' },
  { value: 'nail-artist', label: 'Nail Artist', description: 'I provide nail services' },
  { value: 'hair-stylist', label: 'Hair Stylist', description: 'I provide hair services' },
  { value: 'lash-tech', label: 'Lash Technician', description: 'I provide lash services' },
  { value: 'barber', label: 'Barber', description: 'I provide barbering services' },
  { value: 'esthetician', label: 'Esthetician', description: 'I provide skincare services' },
  { value: 'massage-therapist', label: 'Massage Therapist', description: 'I provide massage therapy' },
  { value: 'salon-owner', label: 'Salon Owner', description: 'I own/manage a beauty business' },
  { value: 'freelancer', label: 'Freelancer', description: 'I provide mobile/freelance services' }
];

const specialtyOptions = {
  'nail-artist': ['Gel Manicure', 'Acrylic Nails', 'Nail Art', 'Pedicure', 'Extensions'],
  'hair-stylist': ['Cut & Style', 'Color', 'Extensions', 'Treatments', 'Styling'],
  'lash-tech': ['Classic Lashes', 'Volume Lashes', 'Lash Lift', 'Tinting', 'Removal'],
  'barber': ['Haircuts', 'Beard Trim', 'Shaving', 'Styling', 'Treatments'],
  'esthetician': ['Facials', 'Chemical Peels', 'Microdermabrasion', 'Waxing', 'Skincare'],
  'massage-therapist': ['Swedish', 'Deep Tissue', 'Hot Stone', 'Prenatal', 'Sports']
};

const workTypeOptions = ['Salon Employee', 'Booth Rental', 'Mobile Services', 'Home Studio', 'Freelance'];

export const EnhancedSignUpForm: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    role: 'customer'
  });

  const updateFormData = (field: keyof SignUpFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: keyof SignUpFormData, value: string) => {
    const currentArray = (formData[field] as string[]) || [];
    if (!currentArray.includes(value)) {
      updateFormData(field, [...currentArray, value]);
    }
  };

  const removeFromArray = (field: keyof SignUpFormData, value: string) => {
    const currentArray = (formData[field] as string[]) || [];
    updateFormData(field, currentArray.filter(item => item !== value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        full_name: formData.full_name,
        role: formData.role,
        phone: formData.phone,
        location: formData.location,
        ...getRole SpecificData()
      };

      const result = await signUp(formData.email, formData.password, userData);
      
      if (result.success) {
        toast.success('Account created successfully!');
        // Route to role-specific dashboard/onboarding
        routeToRoleDashboard();
      } else {
        toast.error(result.error?.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getRoleSpecificData = () => {
    const { role } = formData;
    const data: any = {};

    if (['nail-artist', 'hair-stylist', 'lash-tech', 'barber', 'esthetician', 'massage-therapist'].includes(role)) {
      data.specialties = formData.specialties;
      data.experience_years = formData.experience_years;
      data.license_number = formData.license_number;
      data.preferred_work_types = formData.preferred_work_types;
    }

    if (role === 'salon-owner') {
      data.business_name = formData.business_name;
      data.salon_type = formData.salon_type;
      data.services_offered = formData.services_offered;
      data.seat_count = formData.seat_count;
    }

    if (role === 'freelancer') {
      data.cities_willing_to_work = formData.cities_willing_to_work;
      data.rate_range_min = formData.rate_range_min;
      data.rate_range_max = formData.rate_range_max;
      data.skills = formData.skills;
    }

    if (role === 'customer') {
      data.referral_source = formData.referral_source;
    }

    return data;
  };

  const routeToRoleDashboard = () => {
    const { role } = formData;
    
    switch (role) {
      case 'nail-artist':
      case 'hair-stylist':
      case 'lash-tech':
      case 'barber':
      case 'esthetician':
      case 'massage-therapist':
        navigate('/dashboard/artist');
        break;
      case 'salon-owner':
        navigate('/dashboard/salon');
        break;
      case 'freelancer':
        navigate('/dashboard/freelancer');
        break;
      case 'customer':
      default:
        navigate('/dashboard/customer');
        break;
    }
  };

  const renderRoleSpecificFields = () => {
    const { role } = formData;

    // Artist/Tech fields
    if (['nail-artist', 'hair-stylist', 'lash-tech', 'barber', 'esthetician', 'massage-therapist'].includes(role)) {
      return (
        <div className="space-y-4">
          {/* Specialties */}
          <div>
            <Label>Specialties</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {specialtyOptions[role as keyof typeof specialtyOptions]?.map(specialty => (
                <Badge
                  key={specialty}
                  variant={formData.specialties?.includes(specialty) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (formData.specialties?.includes(specialty)) {
                      removeFromArray('specialties', specialty);
                    } else {
                      addToArray('specialties', specialty);
                    }
                  }}
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              value={formData.experience_years || ''}
              onChange={(e) => updateFormData('experience_years', parseInt(e.target.value) || 0)}
            />
          </div>

          {/* License */}
          <div>
            <Label htmlFor="license">License Number (if applicable)</Label>
            <Input
              id="license"
              value={formData.license_number || ''}
              onChange={(e) => updateFormData('license_number', e.target.value)}
              placeholder="Enter your license number"
            />
          </div>

          {/* Preferred Work Types */}
          <div>
            <Label>Preferred Work Environment</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {workTypeOptions.map(workType => (
                <Badge
                  key={workType}
                  variant={formData.preferred_work_types?.includes(workType) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (formData.preferred_work_types?.includes(workType)) {
                      removeFromArray('preferred_work_types', workType);
                    } else {
                      addToArray('preferred_work_types', workType);
                    }
                  }}
                >
                  {workType}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Salon Owner fields
    if (role === 'salon-owner') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="business_name">Business Name *</Label>
            <Input
              id="business_name"
              required
              value={formData.business_name || ''}
              onChange={(e) => updateFormData('business_name', e.target.value)}
              placeholder="Enter your salon/business name"
            />
          </div>

          <div>
            <Label htmlFor="salon_type">Salon Type</Label>
            <Select onValueChange={(value) => updateFormData('salon_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select salon type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-service">Full Service Salon</SelectItem>
                <SelectItem value="nail-salon">Nail Salon</SelectItem>
                <SelectItem value="hair-salon">Hair Salon</SelectItem>
                <SelectItem value="spa">Spa</SelectItem>
                <SelectItem value="barbershop">Barbershop</SelectItem>
                <SelectItem value="lash-studio">Lash Studio</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="seat_count">Number of Stations/Seats</Label>
            <Input
              id="seat_count"
              type="number"
              min="1"
              max="100"
              value={formData.seat_count || ''}
              onChange={(e) => updateFormData('seat_count', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      );
    }

    // Freelancer fields
    if (role === 'freelancer') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cities">Cities Willing to Work In</Label>
            <Input
              id="cities"
              value={formData.cities_willing_to_work?.join(', ') || ''}
              onChange={(e) => updateFormData('cities_willing_to_work', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="Enter cities separated by commas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rate_min">Min Rate ($/hour)</Label>
              <Input
                id="rate_min"
                type="number"
                min="0"
                value={formData.rate_range_min || ''}
                onChange={(e) => updateFormData('rate_range_min', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="rate_max">Max Rate ($/hour)</Label>
              <Input
                id="rate_max"
                type="number"
                min="0"
                value={formData.rate_range_max || ''}
                onChange={(e) => updateFormData('rate_range_max', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
      );
    }

    // Customer fields
    if (role === 'customer') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="referral">How did you hear about us?</Label>
            <Select onValueChange={(value) => updateFormData('referral_source', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select referral source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friend">Friend/Family</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="google">Google Search</SelectItem>
                <SelectItem value="salon">My Salon/Artist</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Join EmviApp</CardTitle>
        <p className="text-center text-gray-600">Create your beauty professional account</p>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                required
                value={formData.full_name}
                onChange={(e) => updateFormData('full_name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                placeholder="Create a password"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location || ''}
              onChange={(e) => updateFormData('location', e.target.value)}
              placeholder="City, State"
            />
          </div>

          {/* Role Selection */}
          <div>
            <Label>I am a *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {roleOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.role === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateFormData('role', option.value as UserRole)}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Role-specific fields */}
          {renderRoleSpecificFields()}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </form>
    </Card>
  );
};
