
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Helmet } from 'react-helmet';
import { Loader2, Upload, DollarSign, Check, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// Define salon features options
const salonFeaturesOptions = [
  { id: "turnkey", label: "Turnkey Business" },
  { id: "parking", label: "Parking Available" },
  { id: "loyalClients", label: "Loyal Client Base" },
  { id: "equipment", label: "Equipment Included" },
  { id: "goodLocation", label: "Great Location" },
  { id: "renovated", label: "Recently Renovated" },
  { id: "lowRent", label: "Low Rent" },
  { id: "establishedBusiness", label: "Established Business" },
];

// Form validation schema
const formSchema = z.object({
  salonName: z.string().min(3, { message: "Salon name must be at least 3 characters" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  askingPrice: z.string().min(1, { message: "Asking price is required" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  features: z.array(z.string()).optional(),
  listingType: z.enum(["standard", "featured"], { 
    required_error: "Please select a listing type" 
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SalonListingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salonName: "",
      city: "",
      state: "",
      askingPrice: "",
      description: "",
      features: [],
      listingType: "standard",
      termsAccepted: false,
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    // In a real application, this would upload the images and save the form data
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Listing submitted successfully!",
        description: "Your salon listing has been created and is now live.",
      });
      
      // Navigate to the listings page
      navigate("/salons");
    } catch (error) {
      toast({
        title: "Error submitting listing",
        description: "There was a problem submitting your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Add new files to the array
      setUploadedPhotos(prev => [...prev, ...Array.from(files)]);
    }
  };
  
  // Remove uploaded photo
  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };
  
  // Calculate price based on listing type
  const listingPrice = form.watch("listingType") === "featured" ? 99 : 49;

  return (
    <Layout>
      <Helmet>
        <title>List Your Salon For Sale | EmviApp</title>
        <meta 
          name="description" 
          content="Create a listing to sell your salon on EmviApp's Salon Marketplace." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold mb-2">List Your Salon For Sale</h1>
          <p className="text-gray-600 mb-8">
            Complete the form below to create a listing for your salon on our marketplace.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Tell potential buyers about your salon.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="salonName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salon Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="askingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asking Price (USD)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input className="pl-10" {...field} type="text" inputMode="numeric" />
                          </div>
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
                            {...field} 
                            rows={5} 
                            placeholder="Describe your salon, its history, why you're selling, and what makes it a good opportunity..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Salon Features</CardTitle>
                  <CardDescription>
                    Select the features that apply to your salon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="features"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {salonFeaturesOptions.map((feature) => (
                            <FormField
                              key={feature.id}
                              control={form.control}
                              name="features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={feature.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(feature.id)}
                                        onCheckedChange={(checked) => {
                                          const currentValues = field.value || [];
                                          return checked
                                            ? field.onChange([...currentValues, feature.id])
                                            : field.onChange(
                                                currentValues.filter(
                                                  (value) => value !== feature.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {feature.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Photos */}
              <Card>
                <CardHeader>
                  <CardTitle>Photos</CardTitle>
                  <CardDescription>
                    Upload photos of your salon (max 10).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {uploadedPhotos.map((photo, index) => (
                        <div 
                          key={index} 
                          className="relative aspect-square rounded-md overflow-hidden bg-gray-100 border"
                        >
                          <img 
                            src={URL.createObjectURL(photo)} 
                            alt={`Salon photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-black/70 text-white h-6 w-6 rounded-full flex items-center justify-center hover:bg-black"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      
                      {uploadedPhotos.length < 10 && (
                        <label className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-4 aspect-square cursor-pointer hover:bg-gray-50 transition-colors">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                        </label>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      {uploadedPhotos.length}/10 photos uploaded
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Listing Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Listing Options</CardTitle>
                  <CardDescription>
                    Choose how you'd like to list your salon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="listingType"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="standard" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <div className="flex flex-col">
                                  <span className="font-medium">Standard Listing - $49</span>
                                  <span className="text-sm text-gray-500">Basic listing with all features</span>
                                </div>
                              </FormLabel>
                            </FormItem>
                            
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="featured" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <div className="flex flex-col">
                                  <div className="flex items-center">
                                    <span className="font-medium mr-2">Featured Listing - $99</span>
                                    <Badge className="bg-amber-500 hover:bg-amber-500">Recommended</Badge>
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    Premium placement + highlighted with a badge + 3x more views
                                  </span>
                                </div>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Terms & Review */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4">
                      <div className="rounded-full bg-purple-100 p-2 flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Order Summary</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {form.watch("listingType") === "featured" 
                            ? "Featured Salon Listing (30 days)" 
                            : "Standard Salon Listing (30 days)"}
                        </p>
                        <div className="text-xl font-semibold">${listingPrice}</div>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the <a href="#" className="text-purple-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${listingPrice} and Publish Listing`
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-500">
                      Your listing will be active for 30 days.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingForm;
