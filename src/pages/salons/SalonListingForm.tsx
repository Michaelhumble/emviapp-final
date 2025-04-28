import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, CircleDollarSign, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { usePostPayment } from "@/hooks/payments/usePostPayment";

const salonListingSchema = z.object({
  salonName: z.string().min(2, { message: "Salon name is required" }),
  location: z.object({
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
  }),
  askingPrice: z.string().min(1, { message: "Asking price is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  features: z.array(z.string()).optional(),
  listingType: z.enum(["standard", "featured"]),
  termsAccepted: z.boolean().refine(val => val === true, { 
    message: "You must accept the terms to continue" 
  })
});

type SalonListingFormValues = z.infer<typeof salonListingSchema>;

const SalonListingForm = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SalonListingFormValues>({
    resolver: zodResolver(salonListingSchema),
    defaultValues: {
      salonName: "",
      location: {
        city: "",
        state: "",
      },
      askingPrice: "",
      description: "",
      features: [],
      listingType: "standard",
      termsAccepted: false
    },
  });

  const handleSubmit = async (values: SalonListingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here we would normally upload the photos and save salon data
      console.log("Form values:", values);
      console.log("Photos:", photoUploads);
      
      // Different payment based on listing type
      const paymentType = values.listingType === "featured" ? "salon" : "salon";
      
      // Initiate payment
      await initiatePayment(paymentType);
      
      toast.success("Listing submitted successfully!", {
        description: "Your salon listing has been created."
      });
      
      // In a real app, we might wait for webhook confirmation before redirecting
      navigate("/salons");
    } catch (error) {
      console.error("Error submitting listing:", error);
      toast.error("Failed to submit listing", {
        description: "Please try again or contact support."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setPhotoUploads(prev => [...prev, ...selectedFiles].slice(0, 5)); // Limit to 5 photos
    }
  };
  
  const removePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };
  
  const salonFeatures = [
    { id: "turnkey", label: "Turnkey Business" },
    { id: "loyal-clients", label: "Loyal Client Base" },
    { id: "parking", label: "Parking Available" },
    { id: "equipment", label: "All Equipment Included" },
    { id: "high-traffic", label: "High Traffic Area" },
    { id: "recently-renovated", label: "Recently Renovated" },
    { id: "owner-retiring", label: "Owner Retiring" },
    { id: "profitable", label: "Profitable" },
    { id: "training", label: "Training Provided" },
    { id: "ecommerce", label: "Online/E-commerce Setup" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold mb-2">List Your Salon For Sale</h1>
          <p className="text-gray-600">
            Fill out the form below to list your salon on our marketplace.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Salon Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="salonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salon Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter salon name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
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
                      <FormLabel>Asking Price*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter asking price" 
                          type="text" 
                          {...field} 
                          onChange={e => {
                            // Keep only numbers and format as currency
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            if (value) {
                              const formatted = `$${Number(value).toLocaleString()}`;
                              field.onChange(formatted);
                            } else {
                              field.onChange('');
                            }
                          }}
                        />
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
                      <FormLabel>Description*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your salon, its features, and why it's a good investment" 
                          className="h-32" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Photo Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-500 mb-3">
                      Upload up to 5 photos of your salon (interior, exterior, equipment, etc.)
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      disabled={photoUploads.length >= 5}
                    >
                      Select Photos
                    </Button>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={photoUploads.length >= 5}
                    />
                  </div>
                  
                  {photoUploads.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {photoUploads.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Salon photo ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button 
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                            onClick={() => removePhoto(index)}
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {salonFeatures.map((feature) => (
                    <FormField
                      key={feature.id}
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature.id)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                const updatedValues = checked
                                  ? [...currentValues, feature.id]
                                  : currentValues.filter((value) => value !== feature.id);
                                field.onChange(updatedValues);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {feature.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Listing Type</CardTitle>
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
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          <div className="relative">
                            <RadioGroupItem
                              value="standard"
                              id="standard"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="standard"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-6 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <div className="mb-3">
                                <CircleDollarSign className="h-8 w-8 mb-2 text-purple-600" />
                                <div className="text-lg font-semibold">Standard Listing</div>
                                <div className="text-2xl font-bold mt-1">$49</div>
                              </div>
                              <Badge className="bg-gray-200 hover:bg-gray-300 text-gray-700 mb-2">Basic Visibility</Badge>
                              <ul className="text-sm space-y-2 text-gray-500">
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> 30 days listing
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> Up to 5 photos
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> Basic search visibility
                                </li>
                              </ul>
                            </Label>
                          </div>
                          
                          <div className="relative">
                            <RadioGroupItem
                              value="featured"
                              id="featured"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="featured"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-br from-amber-50 to-white p-6 hover:bg-amber-50 hover:border-amber-200 peer-data-[state=checked]:border-amber-400 [&:has([data-state=checked])]:border-amber-400"
                            >
                              <div className="mb-3">
                                <Star className="h-8 w-8 mb-2 text-amber-500 fill-amber-400" />
                                <div className="text-lg font-semibold">Featured Listing</div>
                                <div className="text-2xl font-bold mt-1">$99</div>
                              </div>
                              <Badge className="bg-amber-200 hover:bg-amber-300 text-amber-800 mb-2">Premium Visibility</Badge>
                              <ul className="text-sm space-y-2 text-gray-500">
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> 
                                  <span className="font-semibold">60 days</span> listing
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> Up to 5 photos
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> 
                                  <span className="font-semibold">Top placement</span> in search results
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> Featured badge
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> Social media promotion
                                </li>
                              </ul>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Separator />
              
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
                      <FormLabel className="font-normal">
                        I agree to the terms and conditions, and I certify that I am the owner or authorized representative of this business.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? "Processing..." : "Submit Listing & Proceed to Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default SalonListingForm;
