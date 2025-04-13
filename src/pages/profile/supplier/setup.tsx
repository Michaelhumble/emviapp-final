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
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProfileCompletion } from "@/context/profile/ProfileCompletionProvider";
import { uploadImage } from "@/utils/uploadImage";
import ImageUploader from "@/components/shared/ImageUploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(500, "Bio must be less than 500 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
  instagram: z.string().optional(),
  location: z.string().min(2, "Location must be at least 2 characters"),
  specialty: z.string().optional(),
  business_type: z.string().optional(),
  years_in_business: z.string().optional(),
  delivery_options: z.array(z.string()).optional(),
  product_categories: z.array(z.string()).optional(),
  accepts_online_orders: z.boolean().optional(),
  minimum_order_amount: z.string().optional(),
  shipping_policy: z.string().optional(),
  return_policy: z.string().optional(),
});

const SupplierProfileSetup = () => {
  const { userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(userProfile?.avatar_url || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [portfolioUrls, setPortfolioUrls] = useState<string[]>(userProfile?.portfolio_urls || []);
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([]);
  const { updateCompletionStatus } = useProfileCompletion();
  const [productCategories, setProductCategories] = useState<string[]>(["Nail Polish", "Acrylic Powder", "Gel Systems", "Nail Tips", "Files & Buffers", "Nail Art", "Salon Furniture", "Pedicure Supplies", "Manicure Tools", "Sanitization Products"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>(["Local Delivery", "Shipping", "Pickup"]);
  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState<string[]>([]);
  const [acceptsOnlineOrders, setAcceptsOnlineOrders] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: userProfile?.full_name || "",
      bio: userProfile?.bio || "",
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
      website: userProfile?.website || "",
      instagram: userProfile?.instagram || "",
      location: userProfile?.location || "",
      specialty: userProfile?.specialty || "",
      business_type: "",
      years_in_business: "",
      delivery_options: [],
      product_categories: [],
      accepts_online_orders: false,
      minimum_order_amount: "",
      shipping_policy: "",
      return_policy: "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        full_name: userProfile.full_name || "",
        bio: userProfile.bio || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        website: userProfile.website || "",
        instagram: userProfile.instagram || "",
        location: userProfile.location || "",
        specialty: userProfile.specialty || "",
      });
    }
  }, [userProfile, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      let updatedAvatarUrl = avatarUrl;
      
      // Upload avatar if changed
      if (avatarFile) {
        const { url, error } = await uploadImage(avatarFile, "avatars");
        if (error) throw new Error(error.message);
        updatedAvatarUrl = url;
      }
      
      // Upload portfolio images if added
      let updatedPortfolioUrls = [...portfolioUrls];
      if (portfolioFiles.length > 0) {
        for (const file of portfolioFiles) {
          const { url, error } = await uploadImage(file, "portfolio");
          if (error) throw new Error(error.message);
          updatedPortfolioUrls.push(url);
        }
      }
      
      // Update profile with form values and uploaded images
      const { success, error } = await updateProfile({
        ...values,
        avatar_url: updatedAvatarUrl,
        portfolio_urls: updatedPortfolioUrls,
        role: "supplier",
        completed_profile_tasks: ["basic_info", "supplier_details"],
      });
      
      if (!success) throw new Error(error?.message || "Failed to update profile");
      
      // Update completion status
      updateCompletionStatus("basic_info", true);
      updateCompletionStatus("supplier_details", true);
      
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handlePortfolioChange = (files: File[]) => {
    setPortfolioFiles(files);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleDeliveryToggle = (option: string) => {
    setSelectedDeliveryOptions(prev => 
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Complete Your Supplier Profile</h1>
        <p className="text-lg text-gray-600">
          Let's set up your business profile to showcase your products and services.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <Progress value={activeTab === "basic" ? 50 : 100} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Basic Info</span>
            <span>Business Details</span>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="business">Business Details</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="basic">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-2">Profile Photo</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Upload a professional photo or your business logo.
                        </p>
                      </div>
                      <div className="w-full md:w-2/3">
                        <ImageUploader 
                          existingUrl={avatarUrl} 
                          onImageChange={handleAvatarChange}
                          className="w-32 h-32 rounded-full"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-2">Business Information</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Tell us about your business and how to contact you.
                        </p>
                      </div>
                      <div className="w-full md:w-2/3 space-y-4">
                        <FormField
                          control={form.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your business name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell salons about your business, products, and services..." 
                                  className="min-h-[120px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="your@email.com" {...field} />
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="(123) 456-7890" {...field} />
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
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-2">Online Presence</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Add your website and social media links.
                        </p>
                      </div>
                      <div className="w-full md:w-2/3 space-y-4">
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="https://yourbusiness.com" {...field} />
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
                                <Input placeholder="@yourbusiness" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <Button type="button" onClick={() => setActiveTab("business")}>
                      Continue to Business Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="business">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-2">Business Details</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Tell us more about your business operations.
                        </p>
                      </div>
                      <div className="w-full md:w-2/3 space-y-4">
                        <FormField
                          control={form.control}
                          name="business_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Type</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select business type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                                  <SelectItem value="distributor">Distributor</SelectItem>
                                  <SelectItem value="wholesaler">Wholesaler</SelectItem>
                                  <SelectItem value="retailer">Retailer</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="years_in_business"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years in Business</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select years in business" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="less_than_1">Less than 1 year</SelectItem>
                                  <SelectItem value="1_to_3">1-3 years</SelectItem>
                                  <SelectItem value="4_to_10">4-10 years</SelectItem>
                                  <SelectItem value="more_than_10">More than 10 years</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="specialty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Specialty</FormLabel>
                              <FormControl>
                                <Input placeholder="What makes your business unique?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-2">Product Categories</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Select the categories of products you offer.
                        </p>
                      </div>
                      <div className="w-full md:w-2/3">
                        <div className="grid grid-cols-2 gap-3">
                          {productCategories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category}`} 
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategoryToggle(category)}
                              />
                              <Label htmlFor={`category-${category}`}>{category}</Label>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Selected Categories:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedCategories.length === 0 ? (
                              <span className="text-sm text-gray-500">No categories selected</span>
                            ) : (
                              selectedCategories.map((category) => (
                                <Badge key={category} variant="outline" className="bg-primary/10">
                                  {category}
                                </Badge>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-2">Ordering & Delivery</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Tell salons how they can order from you.
                        </p>
                      </div>
                      <div className="w-full md:w-2/3 space-y-4">
                        <div className="space-y-3">
                          <Label>Delivery Options</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {deliveryOptions.map((option) => (
                              <div key={option} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`delivery-${option}`} 
                                  checked={selectedDeliveryOptions.includes(option)}
                                  onCheckedChange={() => handleDeliveryToggle(option)}
                                />
                                <Label htmlFor={`delivery-${option}`}>{option}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="accepts-online-orders" 
                            checked={acceptsOnlineOrders}
                            onCheckedChange={setAcceptsOnlineOrders}
                          />
                          <Label htmlFor="accepts-online-orders">Accept online orders</Label>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="minimum_order_amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Order Amount (if any)</FormLabel>
                              <FormControl>
                                <Input placeholder="$100" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-2">Policies</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Share your shipping and return policies.
                        </p>
                      </div>
                      <div className="w-full md:w-2/3 space-y-4">
                        <FormField
                          control={form.control}
                          name="shipping_policy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Shipping Policy</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your shipping policy..." 
                                  className="min-h-[100px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="return_policy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Return Policy</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your return policy..." 
                                  className="min-h-[100px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-medium mb-2">Product Images</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Upload images of your products or catalog.
                        </p>
                      </div>
                      <div className="w-full md:w-2/3">
                        <ImageUploader 
                          existingUrls={portfolioUrls} 
                          onImagesChange={handlePortfolioChange}
                          multiple={true}
                          maxFiles={10}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Upload up to 10 images of your products, catalog, or business.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-8 bg-blue-50">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-600">
                      Your profile will be reviewed by our team before being published to ensure quality standards.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex justify-between mt-8">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                      Back to Basic Info
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Complete Profile"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default SupplierProfileSetup;
