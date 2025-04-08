
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
import { Loader2, Upload, AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { SalonSaleFormValues } from "@/types/salonSale";
import { createSalonSale, uploadSalonPhotos } from "@/utils/salonSales";
import { toast } from "sonner";

// Schema for form validation
const salonSaleSchema = z.object({
  salon_name: z.string().min(2, "Salon name is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  asking_price: z.string().min(1, "Asking price is required"),
  monthly_rent: z.string().optional(),
  revenue: z.string().optional(),
  staff_size: z.string().min(1, "Number of staff is required"),
  size: z.string().optional(),
  business_type: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  is_urgent: z.boolean().default(false),
  is_private: z.boolean().default(false),
  willing_to_train: z.boolean().default(false),
});

const NewSalonSalePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const form = useForm<SalonSaleFormValues & { staff_size: string, monthly_rent: string, revenue: string, willing_to_train: boolean }>({
    resolver: zodResolver(salonSaleSchema),
    defaultValues: {
      salon_name: "",
      city: "",
      state: "",
      asking_price: "",
      monthly_rent: "",
      revenue: "",
      staff_size: "",
      size: "",
      business_type: "Nails",
      description: "",
      is_urgent: false,
      is_private: false,
      willing_to_train: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if adding new files would exceed the limit of 5
      if (photos.length + e.target.files.length > 5) {
        toast.error("Maximum 5 photos allowed");
        return;
      }

      const selectedFiles = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...selectedFiles]);
      
      // Reset the input value so the same file can be selected again
      e.target.value = '';
      
      toast.success(`${selectedFiles.length} photo${selectedFiles.length > 1 ? 's' : ''} selected`);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    toast.info("Photo removed");
  };

  const onSubmit = async (values: SalonSaleFormValues & { staff_size: string, monthly_rent: string, revenue: string, willing_to_train: boolean }) => {
    if (!user) {
      toast.error("You must be logged in to list a salon for sale");
      return;
    }

    setErrors([]);
    setIsSubmitting(true);
    
    try {
      // Prepare the data for Supabase
      const salonSaleData = {
        salon_name: values.salon_name,
        city: values.city,
        state: values.state,
        asking_price: values.asking_price,
        size: `${values.staff_size} staff, ${values.size || 'N/A'} sq ft`,
        business_type: values.business_type,
        description: `
${values.description}

Monthly Rent: ${values.monthly_rent || 'Not specified'}
Revenue: ${values.revenue || 'Not specified'}
Willing to Train: ${values.willing_to_train ? 'Yes' : 'No'}
        `.trim(),
        is_urgent: values.is_urgent,
        is_private: values.is_private,
      };

      const salonSale = await createSalonSale(salonSaleData as SalonSaleFormValues, user.id);
      
      if (salonSale && photos.length > 0) {
        await uploadSalonPhotos(photos, salonSale.id);
      }
      
      setIsSuccess(true);
      toast.success("Your salon has been listed for sale!");
      
      setTimeout(() => {
        navigate('/sell-salon');
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting salon sale:', error);
      setErrors([error.message || 'Failed to list salon for sale']);
      toast.error("Error listing salon for sale");
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
              <Button onClick={() => navigate('/sell-salon')}>View My Listings</Button>
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
            <p className="text-gray-500 mt-1">Đăng bán tiệm của bạn</p>
          </CardHeader>
          <CardContent>
            {errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-red-800">Error</h4>
                    <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="salon_name">Salon Name <span className="text-sm text-gray-500">(Tên tiệm)</span></Label>
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
                  <Label htmlFor="city">City <span className="text-sm text-gray-500">(Thành phố)</span></Label>
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
                  <Label htmlFor="state">State <span className="text-sm text-gray-500">(Tiểu bang)</span></Label>
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
                  <Label htmlFor="asking_price">Asking Price ($) <span className="text-sm text-gray-500">(Giá bán)</span></Label>
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
                  <Label htmlFor="monthly_rent">Monthly Rent ($) <span className="text-sm text-gray-500">(Tiền thuê hàng tháng)</span></Label>
                  <Input
                    id="monthly_rent"
                    placeholder="e.g. 2500"
                    {...form.register("monthly_rent")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Monthly Revenue ($) <span className="text-sm text-gray-500">(Doanh thu hàng tháng)</span></Label>
                  <Input
                    id="revenue"
                    placeholder="e.g. 25000"
                    {...form.register("revenue")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff_size">Number of Staff <span className="text-sm text-gray-500">(Số nhân viên)</span></Label>
                  <Input
                    id="staff_size"
                    placeholder="e.g. 5"
                    {...form.register("staff_size")}
                  />
                  {form.formState.errors.staff_size && (
                    <p className="text-sm text-red-500">{form.formState.errors.staff_size.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Salon Size (sq ft) <span className="text-sm text-gray-500">(Diện tích tiệm)</span></Label>
                <Input
                  id="size"
                  placeholder="e.g. 1,200 sq ft"
                  {...form.register("size")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_type">Business Type <span className="text-sm text-gray-500">(Loại hình kinh doanh)</span></Label>
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
                <Label htmlFor="description">Description <span className="text-sm text-gray-500">(Mô tả chi tiết)</span></Label>
                <Textarea
                  id="description"
                  placeholder="Describe your salon and why it's a good opportunity. Include details in both English and Vietnamese if possible."
                  rows={6}
                  {...form.register("description")}
                />
                <p className="text-xs text-gray-500">Mô tả chi tiết về tiệm của bạn, vì sao đây là cơ hội tốt. Khuyến khích viết bằng cả tiếng Anh và tiếng Việt.</p>
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label>Photos <span className="text-sm text-gray-500">(Hình ảnh tiệm)</span></Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Upload photos of your salon</p>
                    <p className="text-xs text-gray-500 mb-3">Tải lên hình ảnh của tiệm (tối đa 5 hình)</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      disabled={photos.length >= 5}
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
                      disabled={photos.length >= 5}
                    />
                  </div>
                </div>

                {photos.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Selected Photos <span className="text-sm text-gray-500">({photos.length}/5)</span></h3>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
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
                    <Label htmlFor="willing_to_train" className="mr-2">Willing to Train <span className="text-sm text-gray-500">(Sẵn sàng đào tạo)</span></Label>
                    <p className="text-sm text-gray-500">Are you willing to train the new owner?</p>
                  </div>
                  <Switch
                    id="willing_to_train"
                    checked={form.watch("willing_to_train")}
                    onCheckedChange={(checked) => form.setValue("willing_to_train", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is_urgent" className="mr-2">Mark as Urgent <span className="text-sm text-gray-500">(Khẩn cấp)</span></Label>
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
                    <Label htmlFor="is_private" className="mr-2">Private Listing <span className="text-sm text-gray-500">(Chỉ người dùng EmviApp mới nhìn thấy)</span></Label>
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
              <p className="text-center text-sm text-gray-500">
                Listing will be active for 30 days. You can edit or remove it anytime.
                <br />
                <span className="text-xs">Tin đăng sẽ hiển thị trong 30 ngày. Bạn có thể chỉnh sửa hoặc xóa bất cứ lúc nào.</span>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewSalonSalePage;
