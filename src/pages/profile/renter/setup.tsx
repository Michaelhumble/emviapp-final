import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { PortfolioUploader } from "@/components/shared/PortfolioUploader";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  professional_name: z.string().optional(),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }).max(500, {
    message: "Bio must not exceed 500 characters."
  }),
  specialty: z.string().optional(),
  location: z.string().min(2, {
    message: "Location is required."
  }),
  phone: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  booking_url: z.string().optional(),
  years_experience: z.coerce.number().min(0).optional(),
});

const RenterProfileSetup = () => {
  const { userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(userProfile?.avatar_url || null);
  const [portfolioUrls, setPortfolioUrls] = useState<string[]>(userProfile?.portfolio_urls || []);
  const [skills, setSkills] = useState<string[]>(userProfile?.skills || []);
  const [acceptsBookings, setAcceptsBookings] = useState<boolean>(userProfile?.accepts_bookings || false);
  const [progress, setProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: userProfile?.full_name || "",
      professional_name: userProfile?.professional_name || "",
      bio: userProfile?.bio || "",
      specialty: userProfile?.specialty || "",
      location: userProfile?.location || "",
      phone: userProfile?.phone || "",
      instagram: userProfile?.instagram || "",
      website: userProfile?.website || "",
      booking_url: userProfile?.booking_url || "",
      years_experience: userProfile?.years_experience || 0,
    },
  });

  // Calculate profile completion progress
  useEffect(() => {
    const formValues = form.getValues();
    let completedFields = 0;
    let totalFields = 0;

    // Basic info fields
    const basicFields = ['full_name', 'bio', 'specialty', 'location', 'phone'];
    basicFields.forEach(field => {
      totalFields++;
      if (formValues[field as keyof typeof formValues]) completedFields++;
    });

    // Social fields
    const socialFields = ['instagram', 'website', 'booking_url'];
    socialFields.forEach(field => {
      totalFields++;
      if (formValues[field as keyof typeof formValues]) completedFields++;
    });

    // Other fields
    totalFields += 3; // Avatar, portfolio, skills
    if (avatarUrl) completedFields++;
    if (portfolioUrls.length > 0) completedFields++;
    if (skills.length > 0) completedFields++;

    const calculatedProgress = Math.round((completedFields / totalFields) * 100);
    setProgress(calculatedProgress);
  }, [form.getValues(), avatarUrl, portfolioUrls, skills]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Combine form values with other state
      const profileData = {
        ...values,
        avatar_url: avatarUrl,
        portfolio_urls: portfolioUrls,
        skills: skills,
        accepts_bookings: acceptsBookings,
        role: "renter",
        completed_profile_tasks: userProfile?.completed_profile_tasks || [],
      };

      // Add profile setup to completed tasks if not already there
      if (!profileData.completed_profile_tasks.includes("profile_setup")) {
        profileData.completed_profile_tasks.push("profile_setup");
      }

      const result = await updateProfile(profileData);
      
      if (result.success) {
        toast.success("Profile updated successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsLoading(false);
    }
  };

  const skillOptions = [
    { label: "Acrylic", value: "acrylic" },
    { label: "Gel", value: "gel" },
    { label: "Nail Art", value: "nail_art" },
    { label: "Manicure", value: "manicure" },
    { label: "Pedicure", value: "pedicure" },
    { label: "Dip Powder", value: "dip_powder" },
    { label: "Extensions", value: "extensions" },
    { label: "Nail Repair", value: "nail_repair" },
    { label: "Paraffin Treatment", value: "paraffin" },
    { label: "Callus Treatment", value: "callus" },
    { label: "Reflexology", value: "reflexology" },
    { label: "Waxing", value: "waxing" },
    { label: "Massage", value: "massage" },
    { label: "Lash Extensions", value: "lash_extensions" },
    { label: "Lash Lift", value: "lash_lift" },
    { label: "Brow Tinting", value: "brow_tinting" },
    { label: "Brow Lamination", value: "brow_lamination" },
    { label: "Microblading", value: "microblading" },
    { label: "Facials", value: "facials" },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Complete Your Booth Renter Profile</h1>
        <p className="text-lg text-gray-600">
          Let's set up your professional profile to showcase your work and attract clients.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>Complete your profile to increase visibility</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-gray-500">{progress}% complete</p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio & Skills</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                  <CardDescription>
                    Let's start with your professional details and contact information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={avatarUrl || ""} />
                      <AvatarFallback>{userProfile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <ImageUploader
                      onImageUploaded={(url) => setAvatarUrl(url)}
                      buttonText="Upload Profile Photo"
                      existingImageUrl={avatarUrl}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="professional_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your professional name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell clients about yourself and your work..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="specialty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialty</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your specialty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nail_technician">Nail Technician</SelectItem>
                              <SelectItem value="nail_artist">Nail Artist</SelectItem>
                              <SelectItem value="esthetician">Esthetician</SelectItem>
                              <SelectItem value="lash_technician">Lash Technician</SelectItem>
                              <SelectItem value="brow_artist">Brow Artist</SelectItem>
                              <SelectItem value="makeup_artist">Makeup Artist</SelectItem>
                              <SelectItem value="hair_stylist">Hair Stylist</SelectItem>
                              <SelectItem value="massage_therapist">Massage Therapist</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="years_experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social & Booking</CardTitle>
                  <CardDescription>
                    Add your social media and booking links to help clients connect with you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Instagram handle" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your website URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="booking_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Link (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your booking page URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="accepts_bookings"
                      checked={acceptsBookings}
                      onCheckedChange={(checked) => setAcceptsBookings(checked as boolean)}
                    />
                    <Label htmlFor="accepts_bookings">I'm currently accepting new clients</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate("/dashboard")}>
                    Save for Later
                  </Button>
                  <Button onClick={() => setActiveTab("portfolio")}>
                    Continue to Portfolio
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>
                    Show off your best work to attract clients.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-6">
                    <InfoCircledIcon className="h-4 w-4" />
                    <AlertTitle>Tip</AlertTitle>
                    <AlertDescription>
                      Upload 4-6 high-quality images of your best work to make a great impression.
                    </AlertDescription>
                  </Alert>

                  <PortfolioUploader
                    onImagesUploaded={(urls) => setPortfolioUrls(urls)}
                    existingImageUrls={portfolioUrls}
                    maxImages={6}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>
                    Highlight your specialties and skills to help clients find you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skills" className="mb-2 block">
                        Select Your Skills
                      </Label>
                      <MultiSelect
                        options={skillOptions}
                        selected={skills}
                        onChange={setSkills}
                        placeholder="Select skills..."
                        className="w-full"
                      />
                    </div>

                    <div className="mt-4">
                      <Label className="mb-2 block">Selected Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.length > 0 ? (
                          skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skillOptions.find(option => option.value === skill)?.label || skill}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No skills selected yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("basic")}>
                    Back to Basic Info
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Complete Profile"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default RenterProfileSetup;
