import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useProfileCompletion } from '@/context/profile/ProfileCompletionProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/ui/LanguageToggle';

const profileFormSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  professional_name: z.string().optional(),
  bio: z.string().optional(),
  specialty: z.string().optional(),
  location: z.string().optional(),
  years_experience: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  booking_url: z.string().optional(),
  contact_link: z.string().optional(),
  skills: z.array(z.string()).optional(),
  accepts_bookings: z.boolean().default(false).optional(),
});

const ArtistProfileSetup = () => {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useAuth();
  const { markTaskAsComplete } = useProfileCompletion();
  const { toast } = useToast();
  const { t } = useTranslation();

  const [isSaving, setIsSaving] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    if (userProfile?.completed_profile_tasks) {
      setCompletedTasks(userProfile.completed_profile_tasks);
    }
  }, [userProfile?.completed_profile_tasks]);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: userProfile?.full_name || "",
      professional_name: userProfile?.professional_name || "",
      bio: userProfile?.bio || "",
      specialty: userProfile?.specialty || "",
      location: userProfile?.location || "",
      years_experience: userProfile?.years_experience?.toString() || "",
      instagram: userProfile?.instagram || "",
      website: userProfile?.website || "",
      booking_url: userProfile?.booking_url || "",
      contact_link: userProfile?.contact_link || "",
      skills: userProfile?.skills || [],
      accepts_bookings: userProfile?.accepts_bookings || false,
    },
    mode: "onChange",
  })

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    setIsSaving(true);
    try {
      const response = await updateProfile({
        ...values,
        years_experience: values.years_experience ? parseInt(values.years_experience) : 0,
      });

      if (response.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });

        // Mark the profile setup task as complete
        if (!completedTasks.includes('profileSetup')) {
          markTaskAsComplete('profileSetup');
        }

        navigate('/profile');
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error?.message || "Failed to update profile.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const skillsOptions = [
    { label: 'Hair Styling', value: 'hair_styling' },
    { label: 'Makeup Artistry', value: 'makeup_artistry' },
    { label: 'Nail Art', value: 'nail_art' },
    { label: 'Barbering', value: 'barbering' },
    { label: 'Esthetics', value: 'esthetics' },
    { label: 'Cosmetology', value: 'cosmetology' },
    { label: 'Eyelash Extensions', value: 'eyelash_extensions' },
    { label: 'Microblading', value: 'microblading' },
    { label: 'Tattooing', value: 'tattooing' },
    { label: 'Piercing', value: 'piercing' },
    { label: 'Massage Therapy', value: 'massage_therapy' },
    { label: 'Waxing', value: 'waxing' },
    { label: 'Threading', value: 'threading' },
    { label: 'Henna Art', value: 'henna_art' },
    { label: 'Spray Tanning', value: 'spray_tanning' },
    { label: 'Permanent Makeup', value: 'permanent_makeup' },
    { label: 'Special Effects Makeup', value: 'special_effects_makeup' },
    { label: 'Bridal Services', value: 'bridal_services' },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Complete Your Artist Profile</h1>
          <p className="text-lg text-gray-600">
            Let's set up your professional profile to showcase your work and attract clients.
          </p>
        </div>
        <LanguageToggle />
      </div>

      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-8">
          <div className="steps-container">
            <div className="step-item">
              <h2>Basic Information</h2>
              <p>
                Let's start with your professional details and contact information.
              </p>

              <FormField
                control={profileForm.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="professional_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your professional name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your specialty" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="years_experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your years of experience"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="step-item">
              <h2>Portfolio & Skills</h2>
              <p>
                Show off your best work and highlight your specialties.
              </p>

              <FormField
                control={profileForm.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={skillsOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select your skills"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Instagram URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Website URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="booking_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Booking URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="contact_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Contact Link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" disabled={!profileForm.formState.isValid || isSaving}>
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ArtistProfileSetup;
