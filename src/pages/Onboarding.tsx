import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, Camera, User, MapPin, Briefcase, CheckCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Onboarding = () => {
  const { user, userRole, updateProfile, isNewUser, clearIsNewUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    full_name: "",
    bio: "",
    location: "",
    specialty: "",
    phone: "",
    website: "",
    instagram: ""
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  // Define steps based on user role
  const getStepsForRole = () => {
    const baseSteps = [
      {
        id: "profile",
        title: "Basic Profile",
        description: "Tell us about yourself",
        icon: <User className="h-5 w-5" />
      },
      {
        id: "location",
        title: "Location",
        description: "Where are you located?",
        icon: <MapPin className="h-5 w-5" />
      }
    ];

    if (userRole === "artist" || userRole === "freelancer") {
      baseSteps.push({
        id: "specialty",
        title: "Specialty",
        description: "What services do you offer?",
        icon: <Briefcase className="h-5 w-5" />
      });
    }

    baseSteps.push({
      id: "complete",
      title: "Complete",
      description: "You're all set!",
      icon: <CheckCircle className="h-5 w-5" />
    });

    return baseSteps;
  };

  const steps = getStepsForRole();
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    // If user is not new or not authenticated, redirect to dashboard
    if (!isNewUser || !user) {
      navigate(`/dashboard/${userRole || 'customer'}`);
      return;
    }

    // Pre-fill with existing user data if available
    if (user.user_metadata) {
      setProfileData(prev => ({
        ...prev,
        full_name: user.user_metadata.full_name || "",
      }));
    }
  }, [user, isNewUser, userRole, navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Update profile with collected data
      await updateProfile({
        ...profileData,
        completed_profile_tasks: ["bio", "location", "specialty"]
      });

      // Clear new user flag
      clearIsNewUser();
      
      toast.success("Profile setup complete! Welcome to EmviApp!");
      
      // Navigate to appropriate dashboard
      navigate(`/dashboard/${userRole || 'customer'}`);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Failed to complete setup. Please try again.");
    }
  };

  const handleSkip = () => {
    clearIsNewUser();
    toast.info("You can complete your profile later in settings");
    navigate(`/dashboard/${userRole || 'customer'}`);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile photo preview - beauty professional headshot for premium salon and khách sang clientele engagement" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <Camera className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700">
                  <Upload className="h-3 w-3" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-600">Upload a profile photo</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>
        );

      case "location":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., San Jose, California"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={profileData.website}
                onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={profileData.instagram}
                onChange={(e) => setProfileData(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="@yourusername"
              />
            </div>
          </div>
        );

      case "specialty":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="specialty">Specialty/Services *</Label>
              <Input
                id="specialty"
                value={profileData.specialty}
                onChange={(e) => setProfileData(prev => ({ ...prev, specialty: e.target.value }))}
                placeholder="e.g., Nail Technician, Hair Stylist, Makeup Artist"
                required
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Pro Tip</h4>
              <p className="text-blue-700 text-sm">
                Be specific about your services to help clients find you more easily. 
                You can add more details to your profile later.
              </p>
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to EmviApp, {profileData.full_name || 'there'}!
              </h3>
              <p className="text-gray-600">
                Your profile is set up and ready to go. You can always update your information later in settings.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">What's Next?</h4>
              <ul className="text-purple-700 text-sm space-y-1">
                {userRole === "customer" && (
                  <>
                    <li>• Discover local salons and artists</li>
                    <li>• Book your first appointment</li>
                    <li>• Join the beauty community</li>
                  </>
                )}
                {(userRole === "artist" || userRole === "freelancer") && (
                  <>
                    <li>• Complete your portfolio</li>
                    <li>• Set your availability</li>
                    <li>• Start receiving bookings</li>
                  </>
                )}
                {userRole === "salon" && (
                  <>
                    <li>• Add your salon details</li>
                    <li>• Manage your team</li>
                    <li>• Start attracting customers</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case "profile":
        return profileData.full_name.trim() !== "";
      case "location":
        return profileData.location.trim() !== "";
      case "specialty":
        return userRole === "customer" || profileData.specialty.trim() !== "";
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Logo size="medium" showText={true} />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Let's set up your profile
          </h1>
          <p className="text-gray-600 mt-2">
            This will only take a few minutes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index <= currentStep 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step.icon
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-12 h-0.5 mx-2
                    ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {steps[currentStep].icon}
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription>
              {steps[currentStep].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <div>
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleSkip}>
              Skip for now
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleComplete} className="bg-purple-600 hover:bg-purple-700">
                Complete Setup
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;