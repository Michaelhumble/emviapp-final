import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useProfile } from "@/context/profile";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  salon_name: z.string().min(2, {
    message: "Salon name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip_code: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  website: z.string().optional(),
  instagram: z.string().optional(),
  accepts_bookings: z.boolean().default(false).optional(),
  amenities: z.array(z.string()).optional(),
});

const SalonSetupPage = () => {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salon_name: userProfile?.full_name || "",
      description: userProfile?.bio || "",
      address: userProfile?.location || "",
      city: "",
      state: "",
      zip_code: "",
      phone: userProfile?.phone || "",
      website: userProfile?.website || "",
      instagram: userProfile?.instagram || "",
      accepts_bookings: userProfile?.accepts_bookings || false,
      amenities: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    try {
      const response = await updateProfile({
        full_name: values.salon_name,
        bio: values.description,
        location: values.address,
        phone: values.phone,
        website: values.website,
        instagram: values.instagram,
        accepts_bookings: values.accepts_bookings,
      });

      if (response?.success) {
        toast({
          title: "Profile updated successfully.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Something went wrong.",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  const amenities = [
    { value: "wifi", label: "Free Wi-Fi" },
    { value: "parking", label: "Free Parking" },
    { value: "coffee", label: "Coffee & Drinks" },
    { value: "snacks", label: "Snacks" },
    { value: "tv", label: "TV" },
    { value: "magazines", label: "Magazines" },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Complete Your Salon Profile</h1>
        <p className="text-lg text-gray-600">
          Let's set up your salon profile to showcase your services and attract clients.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="steps-container">
            <div className="step-item">
              <h2>Basic Information</h2>
              <p>
                Let's start with your salon details and contact information.
              </p>

              <FormField
                control={form.control}
                name="salon_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salon Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your salon name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your salon"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
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
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Instagram" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="step-item">
              <h2>Services & Amenities</h2>
              <p>
                Highlight what makes your salon special.
              </p>

              <FormField
                control={form.control}
                name="accepts_bookings"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Accepts Bookings</FormLabel>
                      <FormDescription>
                        Let customers book appointments directly through your
                        profile.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Amenities</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {amenities.map((amenity) => (
                    <FormField
                      key={amenity.value}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={amenity.value}
                            className="flex flex-row items-center space-x-2 rounded-md border border-secondary p-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(amenity.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, amenity.value])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== amenity.value
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {amenity.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SalonSetupPage;
