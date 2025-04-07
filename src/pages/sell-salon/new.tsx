
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { SalonSaleFormValues } from "@/types/salonSale";
import { createSalonSale, uploadSalonPhotos } from "@/utils/salonSales";

// Schema for form validation
const salonSaleSchema = z.object({
  salon_name: z.string().min(2, "Salon name is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  asking_price: z.string().min(1, "Asking price is required"),
  size: z.string().optional(),
  business_type: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  is_urgent: z.boolean().default(false),
  is_private: z.boolean().default(false),
});

const NewSalonSalePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SalonSaleFormValues>({
    resolver: zodResolver(salonSaleSchema),
    defaultValues: {
      salon_name: "",
      city: "",
      state: "",
      asking_price: "",
      size: "",
      business_type: "Nails",
      description: "",
      is_urgent: false,
      is_private: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...selectedFiles]);
      
      // Reset the input value so the same file can be selected again
      e.target.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: SalonSaleFormValues) => {
    if (!user) {
      return;
    }

    setIsSubmitting(true);
    try {
      const salonSale = await createSalonSale(values, user.id);
      
      if (salonSale && photos.length > 0) {
        await uploadSalonPhotos(photos, salonSale.id);
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/sell-salon');
      }, 3000);
    } catch (error) {
      console.error('Error submitting salon sale:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="container mx-auto py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <div className="mb-4 text-center">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your salon has been listed!</h2>
              <p className="text-gray-500 mb-4">Tiệm của bạn đã được đăng lên EmviApp.</p>
              <Button onClick={() => navigate('/sell-salon')}>View Listings</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">List Your Salon For Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="salon_name">Salon Name</Label>
                <Input
                  id="salon_name"
                  placeholder="Enter salon name"
                  {...form.register("salon_name")}
                />
                {form.formState.errors.salon_name && (
                  <p className="text-sm text-red-500">{form.formState.errors.salon_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    {...form.register("city")}
                  />
                  {form.formState.errors.city && (
                    <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    {...form.register("state")}
                  />
                  {form.formState.errors.state && (
                    <p className="text-sm text-red-500">{form.formState.errors.state.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asking_price">Asking Price ($)</Label>
                  <Input
                    id="asking_price"
                    placeholder="e.g. 150000"
                    {...form.register("asking_price")}
                  />
                  {form.formState.errors.asking_price && (
                    <p className="text-sm text-red-500">{form.formState.errors.asking_price.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size (sq ft or # of chairs)</Label>
                  <Input
                    id="size"
                    placeholder="e.g. 1,200 sq ft or 8 chairs"
                    {...form.register("size")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_type">Business Type</Label>
                <select
                  id="business_type"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  {...form.register("business_type")}
                >
                  <option value="Nails">Nail Salon</option>
                  <option value="Hair">Hair Salon</option>
                  <option value="Spa">Spa/Massage</option>
                  <option value="Barbershop">Barbershop</option>
                  <option value="Waxing">Waxing Studio</option>
                  <option value="Beauty">Beauty Salon</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your salon and why it's a good opportunity. Include details in both English and Vietnamese if possible."
                  rows={6}
                  {...form.register("description")}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label>Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Upload photos of your salon</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                    >
                      Select Photos
                    </Button>
                    <input
                      id="photo-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {photos.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Selected Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {photos.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="h-24 w-full rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is_urgent" className="mr-2">Mark as Urgent</Label>
                    <p className="text-sm text-gray-500">List your salon as an urgent sale</p>
                  </div>
                  <Switch
                    id="is_urgent"
                    checked={form.watch("is_urgent")}
                    onCheckedChange={(checked) => form.setValue("is_urgent", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is_private" className="mr-2">Private Listing</Label>
                    <p className="text-sm text-gray-500">Only registered EmviApp users can see this listing</p>
                  </div>
                  <Switch
                    id="is_private"
                    checked={form.watch("is_private")}
                    onCheckedChange={(checked) => form.setValue("is_private", checked)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "List My Salon For Sale"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewSalonSalePage;
