
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload, AtSign, Globe, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Define specialties for nail technicians, hair stylists, tattoo artists, etc.
const specialties = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Barber",
  "Lash Artist",
  "Tattoo Artist",
  "Massage Therapist",
  "Esthetician",
  "Permanent Makeup Artist",
  "Microblading Specialist",
  "Brow Artist",
  "Waxing Specialist",
  "Hair Colorist",
  "Extension Specialist",
  "Other"
];

// Define skill levels
const skillLevels = [
  "Apprentice",
  "Junior",
  "Intermediate",
  "Senior",
  "Master"
];

const ArtistSetup = () => {
  const { user, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<string>("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [skills, setSkills] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Form step tracking
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  if (!user) {
    navigate('/auth/signin');
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!user) {
      toast.error("You must be logged in to complete your profile");
      setIsSubmitting(false);
      return;
    }
    
    try {
      let avatarUrl = null;
      
      // Upload avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
        
        if (uploadError) throw uploadError;
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          avatarUrl = publicUrl;
        }
      }
      
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          full_name: fullName,
          specialty,
          location,
          bio,
          instagram,
          website,
          avatar_url: avatarUrl || undefined,
          skills: skills.split(',').map(s => s.trim()),
          skill_level: skillLevel,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh the user profile in context
      await refreshUserProfile();
      
      toast.success("Profile setup complete!");
      navigate('/dashboard/artist');
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast.error("Failed to set up your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render different steps of the form
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Basic Information</CardTitle>
              <CardDescription>Let's start with the essentials</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Your professional name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select 
                    value={specialty} 
                    onValueChange={setSpecialty}
                    required
                  >
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialtyOption) => (
                        <SelectItem key={specialtyOption} value={specialtyOption}>
                          {specialtyOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="skillLevel">Experience Level</Label>
                  <Select 
                    value={skillLevel} 
                    onValueChange={setSkillLevel}
                    required
                  >
                    <SelectTrigger id="skillLevel">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, State" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                  />
                </div>
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Profile Details</CardTitle>
              <CardDescription>Tell clients more about you and your work</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell clients and salon owners about your experience, style, and specialties" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input
                    id="skills"
                    placeholder="Acrylic nails, Gel, Nail art, Pedicures"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="flex items-center">
                    <AtSign className="h-5 w-5 mr-2 text-muted-foreground" />
                    <Input
                      id="instagram"
                      placeholder="Username (without @)"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="Your website or portfolio URL"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Upload Profile Photo</CardTitle>
              <CardDescription>A professional photo helps you stand out</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-32 w-32 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-muted">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Profile preview" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                
                <div>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label 
                    htmlFor="avatar" 
                    className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {avatarPreview ? "Change Photo" : "Upload Photo"}
                  </Label>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    {avatarPreview 
                      ? <span className="flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-1 text-green-500" /> Photo selected</span> 
                      : "Upload a clear, professional headshot"}
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Photo Tips:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use good lighting and a neutral background</li>
                  <li>• Show your face clearly (no sunglasses)</li>
                  <li>• Professional attire builds client trust</li>
                  <li>• Square or portrait orientation works best</li>
                </ul>
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="container max-w-xl mx-auto">
        <Card className="border border-border/50 shadow-md bg-card/80 backdrop-blur-sm">
          {/* Progress Bar */}
          <div className="pt-6 px-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <CardFooter className="flex justify-between">
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button 
                  type="button" 
                  className="ml-auto" 
                  onClick={nextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="ml-auto" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Complete Profile"
                  )}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Your profile helps you stand out to clients and salon owners.</p>
          <p className="mt-1">You can edit your profile anytime after setup.</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistSetup;
