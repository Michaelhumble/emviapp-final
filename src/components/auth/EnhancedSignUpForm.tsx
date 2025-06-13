
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { UserRole } from '@/context/auth/types';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  role: UserRole | '';
  
  // Artist/Tech fields
  specialties?: string[];
  experienceYears?: number;
  licenseNumber?: string;
  portfolioFile?: File;
  preferredWorkTypes?: string[];
  
  // Salon Owner fields
  businessName?: string;
  salonType?: string;
  location?: string;
  servicesOffered?: string[];
  seatCount?: number;
  businessLicense?: string;
  logoFile?: File;
  
  // Freelancer fields
  citiesWillingToWork?: string[];
  rateRangeMin?: number;
  rateRangeMax?: number;
  skills?: string[];
  availability?: string;
  
  // Customer fields
  referralSource?: string;
}

const BEAUTY_ROLES: { value: UserRole; label: string }[] = [
  { value: 'nail-artist', label: 'Nail Artist' },
  { value: 'hair-stylist', label: 'Hair Stylist' },
  { value: 'lash-tech', label: 'Lash Technician' },
  { value: 'barber', label: 'Barber' },
  { value: 'esthetician', label: 'Esthetician' },
  { value: 'massage-therapist', label: 'Massage Therapist' },
  { value: 'salon-owner', label: 'Salon Owner' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'customer', label: 'Customer' }
];

const SPECIALTIES = [
  'Nail Art', 'Gel Manicures', 'Acrylics', 'Color', 'Cuts', 'Styling',
  'Extensions', 'Classic Lashes', 'Volume Lashes', 'Brow Shaping',
  'Facials', 'Chemical Peels', 'Microdermabrasion', 'Deep Tissue',
  'Relaxation', 'Hot Stone'
];

const WORK_TYPES = [
  'Full-time Employment', 'Part-time Employment', 'Booth Rental', 
  'Commission-based', 'Contract Work', 'Freelance'
];

const SALON_TYPES = [
  'Full Service Salon', 'Nail Salon', 'Hair Salon', 'Day Spa',
  'Barbershop', 'Beauty Bar', 'Medical Spa'
];

const SERVICES = [
  'Hair Services', 'Nail Services', 'Skincare', 'Massage',
  'Lash & Brow', 'Makeup', 'Waxing', 'Permanent Makeup'
];

export const EnhancedSignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    role: ''
  });

  const handleInputChange = (field: keyof SignUpFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof SignUpFormData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleFileChange = (field: keyof SignUpFormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password || !formData.fullName || !formData.role) {
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
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = {
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.role,
        // Add role-specific data
        ...(isArtistRole(formData.role as UserRole) && {
          specialties: formData.specialties,
          experience_years: formData.experienceYears,
          license_number: formData.licenseNumber,
          preferred_work_types: formData.preferredWorkTypes
        }),
        ...(formData.role === 'salon-owner' && {
          business_name: formData.businessName,
          salon_type: formData.salonType,
          location: formData.location,
          services_offered: formData.servicesOffered,
          seat_count: formData.seatCount,
          business_license: formData.businessLicense
        }),
        ...(formData.role === 'freelancer' && {
          cities_willing_to_work: formData.citiesWillingToWork,
          rate_range_min: formData.rateRangeMin,
          rate_range_max: formData.rateRangeMax,
          skills: formData.skills,
          availability: formData.availability
        }),
        ...(formData.role === 'customer' && {
          referral_source: formData.referralSource
        })
      };

      const result = await signUp(formData.email, formData.password, userData);
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
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

  const isArtistRole = (role: UserRole): boolean => {
    return ['nail-artist', 'hair-stylist', 'lash-tech', 'barber', 'esthetician', 'massage-therapist'].includes(role);
  };

  const renderRoleSpecificFields = () => {
    if (!formData.role) return null;

    const role = formData.role as UserRole;

    if (isArtistRole(role)) {
      return (
        <div className="space-y-4">
          <div>
            <Label>Specialties</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SPECIALTIES.map(specialty => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={specialty}
                    checked={(formData.specialties || []).includes(specialty)}
                    onCheckedChange={(checked) => 
                      handleArrayChange('specialties', specialty, checked as boolean)
                    }
                  />
                  <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="experienceYears">Years of Experience</Label>
            <Input
              id="experienceYears"
              type="number"
              value={formData.experienceYears || ''}
              onChange={(e) => handleInputChange('experienceYears', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="licenseNumber">License Number (Optional)</Label>
            <Input
              id="licenseNumber"
              value={formData.licenseNumber || ''}
              onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
              placeholder="Enter license number"
            />
          </div>

          <div>
            <Label>Preferred Work Types</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {WORK_TYPES.map(workType => (
                <div key={workType} className="flex items-center space-x-2">
                  <Checkbox
                    id={workType}
                    checked={(formData.preferredWorkTypes || []).includes(workType)}
                    onCheckedChange={(checked) => 
                      handleArrayChange('preferredWorkTypes', workType, checked as boolean)
                    }
                  />
                  <Label htmlFor={workType} className="text-sm">{workType}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="portfolioFile">Portfolio Image (Optional)</Label>
            <Input
              id="portfolioFile"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('portfolioFile', e.target.files?.[0] || null)}
            />
          </div>
        </div>
      );
    }

    if (role === 'salon-owner') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={formData.businessName || ''}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Enter business name"
              required
            />
          </div>

          <div>
            <Label htmlFor="salonType">Salon Type</Label>
            <Select onValueChange={(value) => handleInputChange('salonType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select salon type" />
              </SelectTrigger>
              <SelectContent>
                {SALON_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State"
              required
            />
          </div>

          <div>
            <Label>Services Offered</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SERVICES.map(service => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={(formData.servicesOffered || []).includes(service)}
                    onCheckedChange={(checked) => 
                      handleArrayChange('servicesOffered', service, checked as boolean)
                    }
                  />
                  <Label htmlFor={service} className="text-sm">{service}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="seatCount">Number of Seats/Stations</Label>
            <Input
              id="seatCount"
              type="number"
              value={formData.seatCount || ''}
              onChange={(e) => handleInputChange('seatCount', parseInt(e.target.value))}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="businessLicense">Business License Number (Optional)</Label>
            <Input
              id="businessLicense"
              value={formData.businessLicense || ''}
              onChange={(e) => handleInputChange('businessLicense', e.target.value)}
              placeholder="Enter license number"
            />
          </div>

          <div>
            <Label htmlFor="logoFile">Business Logo (Optional)</Label>
            <Input
              id="logoFile"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('logoFile', e.target.files?.[0] || null)}
            />
          </div>
        </div>
      );
    }

    if (role === 'freelancer') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="citiesWillingToWork">Cities Willing to Work In</Label>
            <Textarea
              id="citiesWillingToWork"
              value={(formData.citiesWillingToWork || []).join(', ')}
              onChange={(e) => handleInputChange('citiesWillingToWork', e.target.value.split(',').map(s => s.trim()))}
              placeholder="Enter cities separated by commas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rateRangeMin">Minimum Rate ($/hour)</Label>
              <Input
                id="rateRangeMin"
                type="number"
                value={formData.rateRangeMin || ''}
                onChange={(e) => handleInputChange('rateRangeMin', parseInt(e.target.value))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="rateRangeMax">Maximum Rate ($/hour)</Label>
              <Input
                id="rateRangeMax"
                type="number"
                value={formData.rateRangeMax || ''}
                onChange={(e) => handleInputChange('rateRangeMax', parseInt(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label>Skills</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SPECIALTIES.map(skill => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={(formData.skills || []).includes(skill)}
                    onCheckedChange={(checked) => 
                      handleArrayChange('skills', skill, checked as boolean)
                    }
                  />
                  <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="availability">Availability</Label>
            <Textarea
              id="availability"
              value={formData.availability || ''}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              placeholder="Describe your availability (e.g., weekends, evenings, etc.)"
            />
          </div>
        </div>
      );
    }

    if (role === 'customer') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="referralSource">How did you hear about us? (Optional)</Label>
            <Select onValueChange={(value) => handleInputChange('referralSource', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select referral source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="friend-referral">Friend Referral</SelectItem>
                <SelectItem value="search-engine">Search Engine</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Join EmviApp</CardTitle>
          <CardDescription className="text-center">
            Create your account and connect with the beauty industry
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">I am a... *</Label>
                <Select onValueChange={(value) => handleInputChange('role', value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {BEAUTY_ROLES.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Role-specific fields */}
            {formData.role && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                {renderRoleSpecificFields()}
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
