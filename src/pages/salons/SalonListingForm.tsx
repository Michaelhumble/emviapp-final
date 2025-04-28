
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { usePostPayment } from "@/hooks/payments/usePostPayment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ImagePlus, Info, Star, Upload, X } from "lucide-react";

// Define the form data structure
interface SalonListingFormData {
  salonName: string;
  location: string;
  price: string;
  description: string;
  features: string[];
  listingType: "standard" | "featured";
}

// Features options for the form
const FEATURES = [
  "Turnkey Business",
  "Parking Available",
  "Loyal Client Base",
  "High Foot Traffic",
  "Recently Renovated",
  "All Equipment Included",
  "Staff Willing to Stay",
  "Owner Will Train",
  "Profitable",
  "Good Lease Terms"
];

const SalonListingForm = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  
  // Form state management
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SalonListingFormData>({
    defaultValues: {
      listingType: "standard",
      features: []
    }
  });
  
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const selectedListingType = watch("listingType");
  
  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Clear previous error
    setUploadError(null);
    
    // Validate file count
    if (uploadedImages.length + files.length > 5) {
      setUploadError("You can upload a maximum of 5 images.");
      return;
    }
    
    // Process each file
    const newFiles: File[] = [];
    const newUrls: string[] = [];
    
    Array.from(files).forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError("Please upload only image files.");
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Images must be smaller than 5MB.");
        return;
      }
      
      newFiles.push(file);
      newUrls.push(URL.createObjectURL(file));
    });
    
    setUploadedImages([...uploadedImages, ...newFiles]);
    setPreviewUrls([...previewUrls, ...newUrls]);
  };
  
  // Remove an uploaded image
  const removeImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    const updatedUrls = [...previewUrls];
    
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(updatedUrls[index]);
    
    updatedImages.splice(index, 1);
    updatedUrls.splice(index, 1);
    
    setUploadedImages(updatedImages);
    setPreviewUrls(updatedUrls);
  };
  
  // Form submission handler
  const onSubmit = async (data: SalonListingFormData) => {
    // For demonstration purposes, we'll just show a toast and redirect
    // In a real app, you would upload images and save form data
    
    try {
      // Initiate payment through Stripe
      await initiatePayment(data.listingType === "featured" ? 'salon_featured' : 'salon_standard');
      
      // Show success message
      toast.success("Salon listing submitted!", {
        description: "Your listing will be visible after payment is confirmed."
      });
      
      // Redirect to listing page after successful submission
      navigate('/salons');
    } catch (error) {
      toast.error("There was an error processing your listing", {
        description: "Please try again or contact support."
      });
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>List Your Salon | EmviApp</title>
        <meta 
          name="description" 
          content="List your salon for sale on EmviApp's marketplace." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
              List Your Salon For Sale
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Complete the form below to list your salon on the EmviApp marketplace. 
              Choose between Standard and Featured listings for more visibility.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Salon Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Salon Name */}
                <div className="space-y-2">
                  <Label htmlFor="salonName">Salon Name *</Label>
                  <Input
                    id="salonName"
                    {...register("salonName", { 
                      required: "Salon name is required" 
                    })}
                    placeholder="Enter your salon's name"
                  />
                  {errors.salonName && (
                    <p className="text-sm text-red-500">{errors.salonName.message}</p>
                  )}
                </div>
                
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...register("location", { 
                      required: "Location is required" 
                    })}
                    placeholder="City, State"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>
                
                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">Asking Price *</Label>
                  <Input
                    id="price"
                    {...register("price", { 
                      required: "Asking price is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a valid number"
                      }
                    })}
                    placeholder="e.g., 250000"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">{errors.price.message}</p>
                  )}
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register("description", { 
                      required: "Description is required",
                      minLength: {
                        value: 50,
                        message: "Description must be at least 50 characters"
                      }
                    })}
                    placeholder="Provide detailed information about your salon..."
                    rows={6}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Photo Upload */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Salon Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      id="photos"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label 
                      htmlFor="photos" 
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <ImagePlus className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-lg font-medium mb-1">Upload Photos</p>
                      <p className="text-sm text-gray-500">
                        Upload up to 5 high-quality images (max 5MB each)
                      </p>
                    </label>
                  </div>
                  
                  {uploadError && (
                    <p className="text-sm text-red-500">{uploadError}</p>
                  )}
                  
                  {/* Preview uploaded images */}
                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Salon photo ${index + 1}`}
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Features Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Salon Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`feature-${feature}`}
                        {...register("features")} 
                        value={feature}
                      />
                      <Label htmlFor={`feature-${feature}`} className="text-sm">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Listing Type Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Choose Listing Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Standard Listing */}
                  <div className="border rounded-lg p-5 transition-all relative">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg">Standard Listing</h3>
                      <div className="text-xl font-bold">$49</div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        30 days visibility
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Up to 5 photos
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Basic listing placement
                      </li>
                    </ul>
                    
                    <div className="mt-auto">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="standard"
                          {...register("listingType")}
                          className="form-radio"
                          checked={selectedListingType === 'standard'}
                        />
                        <span>Select Standard</span>
                      </label>
                    </div>
                    
                    {selectedListingType === 'standard' && (
                      <Badge className="absolute top-3 right-3 bg-blue-500">Selected</Badge>
                    )}
                  </div>
                  
                  {/* Featured Listing */}
                  <div className="border rounded-lg p-5 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 transition-all relative">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg">Featured Listing</h3>
                      <div className="text-xl font-bold">$99</div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        30 days visibility
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Up to 5 photos
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="font-medium">Priority placement at top of listings</span>
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="font-medium">Featured badge</span>
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="font-medium">Highlighted in weekly newsletter</span>
                      </li>
                    </ul>
                    
                    <div className="mt-auto">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="featured"
                          {...register("listingType")}
                          className="form-radio"
                          checked={selectedListingType === 'featured'}
                        />
                        <span>Select Featured</span>
                      </label>
                    </div>
                    
                    {selectedListingType === 'featured' ? (
                      <Badge className="absolute top-3 right-3 bg-amber-500">
                        <Star className="h-3 w-3 mr-1 fill-white" />
                        Selected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="absolute top-3 right-3 border-amber-500 text-amber-600">
                        <Star className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-md">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm text-blue-700">
                        <strong>Pro Tip:</strong> Featured listings get 5x more views and sell 3x faster on average.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit & Proceed to Payment"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingForm;
