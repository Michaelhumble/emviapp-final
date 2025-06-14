
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Camera, ChevronLeft, ChevronRight, Star, Users, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRoleBasedSignUp } from "@/hooks/useRoleBasedSignUp";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";

interface MultiStepSignUpFormProps {
  redirectUrl?: string | null;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  licenseNumber?: string;
  experienceYears?: string;
  languages?: string;
  businessName?: string;
  address?: string;
  chairCount?: string;
  yearsInBusiness?: string;
  website?: string;
  companyName?: string;
  products?: string;
  location?: string;
  referralSource?: string;
}

const roleOptions = [
  { id: "customer" as UserRole, label: "Customer", description: "I'm looking for beauty services" },
  { id: "nail-artist" as UserRole, label: "Nail Artist", description: "I specialize in nail services" },
  { id: "hair-stylist" as UserRole, label: "Hair Stylist", description: "I provide hair styling services" },
  { id: "lash-tech" as UserRole, label: "Lash Technician", description: "I specialize in eyelash extensions" },
  { id: "barber" as UserRole, label: "Barber", description: "I provide barbering services" },
  { id: "esthetician" as UserRole, label: "Esthetician", description: "I provide skincare services" },
  { id: "massage-therapist" as UserRole, label: "Massage Therapist", description: "I provide massage therapy" },
  { id: "salon-owner" as UserRole, label: "Salon Owner", description: "I own/manage a beauty salon" },
  { id: "freelancer" as UserRole, label: "Freelancer", description: "I offer mobile beauty services" },
  { id: "beauty-supplier" as UserRole, label: "Beauty Supplier", description: "I supply beauty products/equipment" },
];

const MultiStepSignUpForm = ({ redirectUrl }: MultiStepSignUpFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "customer"
  });
  
  const { signUp, loading } = useRoleBasedSignUp();
  const navigate = useNavigate();

  const totalSteps = formData.role === "customer" ? 2 : 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isArtistRole = ['nail-artist', 'hair-stylist', 'lash-tech', 'barber', 'esthetician', 'massage-therapist', 'freelancer'].includes(formData.role);
  const isSalonOwner = formData.role === 'salon-owner';
  const isSupplier = formData.role === 'beauty-supplier';

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName) {
        toast.error("Please fill in all required fields");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        return false;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    // Prepare user data with role-specific fields
    const userData = {
      role: formData.role,
      user_type: formData.role,
      full_name: formData.fullName,
      phone: formData.phone,
      license_number: formData.licenseNumber,
      experience_years: formData.experienceYears ? parseInt(formData.experienceYears) : undefined,
      business_name: formData.businessName,
      address: formData.address,
      website: formData.website,
      company_name: formData.companyName,
      referred_by: formData.referralSource
    };

    const result = await signUp(formData.email, formData.password, formData.role);
    
    if (result) {
      const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
      navigate(decodedRedirect);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EmviApp</h2>
        <p className="text-gray-600">Join thousands of beauty professionals</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            10K+ Users
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            4.8 Rating
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            Trusted
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="your@email.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            placeholder="••••••••"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            placeholder="••••••••"
            className="mt-1"
          />
        </div>

        <div>
          <Label>I am a: *</Label>
          <Select value={formData.role} onValueChange={(value: UserRole) => updateFormData('role', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => {
    if (formData.role === "customer") {
      return (
        <div className="space-y-5">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost Done!</h2>
            <p className="text-gray-600">Help us personalize your experience</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="referralSource">How did you hear about us? (optional)</Label>
              <Select value={formData.referralSource} onValueChange={(value) => updateFormData('referralSource', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="friend">Friend/Referral</SelectItem>
                  <SelectItem value="salon">At a Salon</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h2>
          <p className="text-gray-600">This helps us create your professional profile</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => updateFormData('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="mt-1"
            />
          </div>

          {isArtistRole && (
            <>
              <div>
                <Label htmlFor="licenseNumber">License Number (if applicable)</Label>
                <Input
                  id="licenseNumber"
                  type="text"
                  value={formData.licenseNumber || ''}
                  onChange={(e) => updateFormData('licenseNumber', e.target.value)}
                  placeholder="Enter your license number"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Select value={formData.experienceYears} onValueChange={(value) => updateFormData('experienceYears', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Just starting</SelectItem>
                    <SelectItem value="1">1-2 years</SelectItem>
                    <SelectItem value="3">3-5 years</SelectItem>
                    <SelectItem value="6">6-10 years</SelectItem>
                    <SelectItem value="11">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="languages">Languages Spoken (optional)</Label>
                <Input
                  id="languages"
                  type="text"
                  value={formData.languages || ''}
                  onChange={(e) => updateFormData('languages', e.target.value)}
                  placeholder="e.g., English, Vietnamese, Spanish"
                  className="mt-1"
                />
              </div>
            </>
          )}

          {isSalonOwner && (
            <>
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  type="text"
                  value={formData.businessName || ''}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  placeholder="Enter your salon name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="123 Main St, City, State"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="chairCount">Number of Chairs/Stations</Label>
                <Select value={formData.chairCount} onValueChange={(value) => updateFormData('chairCount', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select chair count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 chairs</SelectItem>
                    <SelectItem value="6-10">6-10 chairs</SelectItem>
                    <SelectItem value="11-20">11-20 chairs</SelectItem>
                    <SelectItem value="20+">20+ chairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  placeholder="https://yoursalon.com"
                  className="mt-1"
                />
              </div>
            </>
          )}

          {isSupplier && (
            <>
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName || ''}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  placeholder="Enter your company name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="products">Products/Services</Label>
                <Textarea
                  id="products"
                  value={formData.products || ''}
                  onChange={(e) => updateFormData('products', e.target.value)}
                  placeholder="Describe the products or services you offer"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Service Area</Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  placeholder="e.g., California, West Coast, Nationwide"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="mt-1"
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
        <p className="text-gray-600">Ready to join the EmviApp community?</p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg text-center">
        <Camera className="h-12 w-12 mx-auto mb-4 text-purple-600" />
        <h3 className="font-semibold mb-2">Complete Your Profile Later</h3>
        <p className="text-sm text-gray-600">
          You can add photos, portfolio items, and more details after signing up.
        </p>
      </div>

      <div className="text-center text-sm text-gray-500">
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden max-w-lg w-full mx-auto">
      <CardHeader className="space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-indigo-900 font-serif">
            Create Account
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Step {currentStep} of {totalSteps}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="pb-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
        <div className="flex gap-3 w-full">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={loading}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={nextStep}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              disabled={loading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          )}
        </div>

        <div className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to={`/sign-in${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MultiStepSignUpForm;
