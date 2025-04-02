
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapPin, DollarSign, Users, Camera, TrendingUp, Info, Building } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { calculateSalonForSalePrice } from "@/utils/postingPriceCalculator";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import ThankYouModal from "@/components/posting/ThankYouModal";
import PostWizardLayout from "@/components/posting/PostWizardLayout";

const formSchema = z.object({
  salonName: z.string().min(2, {
    message: "Salon name must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  askingPrice: z.string().min(1, {
    message: "Asking price is required.",
  }),
  monthlyRent: z.string().optional(),
  numberOfStaff: z.string().min(1, {
    message: "Number of staff is required.",
  }),
  revenue: z.string().optional(),
  vietnameseDescription: z.string().min(10, {
    message: "Vietnamese description must be at least 10 characters.",
  }),
  englishDescription: z.string().min(10, {
    message: "English description must be at least 10 characters.",
  }),
  willTrain: z.boolean().default(false),
  isNationwide: z.boolean().default(false),
  fastSalePackage: z.boolean().default(false),
});

const SalonPost = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(20); // Base price
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState({
    isNationwide: false,
    fastSalePackage: false,
  });

  // Mock user stats
  const userStats = {
    totalJobPosts: 0,
    totalSalonPosts: 0,
    totalBoothPosts: 0,
    referralCount: 0,
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salonName: "",
      city: "",
      state: "",
      askingPrice: "",
      monthlyRent: "",
      numberOfStaff: "",
      revenue: "",
      vietnameseDescription: "",
      englishDescription: "",
      willTrain: false,
      isNationwide: false,
      fastSalePackage: false,
    },
  });
  
  // Monitor changes to pricing options
  const watchIsNationwide = form.watch("isNationwide");
  const watchFastSalePackage = form.watch("fastSalePackage");
  
  // Update price when options change
  useState(() => {
    const updatedOptions = {
      ...pricingOptions,
      isNationwide: watchIsNationwide,
      fastSalePackage: watchFastSalePackage,
    };
    setPricingOptions(updatedOptions);
    setCurrentPrice(calculateSalonForSalePrice(userStats, updatedOptions));
  }, [watchIsNationwide, watchFastSalePackage]);
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a salon listing.",
        variant: "destructive",
      });
      return;
    }
    
    // Update final pricing options
    const finalOptions = {
      ...pricingOptions,
      isNationwide: values.isNationwide,
      fastSalePackage: values.fastSalePackage,
    };
    setPricingOptions(finalOptions);
    
    // Calculate final price
    const finalPrice = calculateSalonForSalePrice(userStats, finalOptions);
    setCurrentPrice(finalPrice);
    
    // Open payment modal
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // This would normally save the post to the database
    console.log("Payment successful, salon listing would be saved to database");
    setIsPaymentModalOpen(false);
    setIsThankYouModalOpen(true);
  };
  
  const handleBoostClick = () => {
    setIsThankYouModalOpen(false);
    // Simulate opening a boost modal
    setTimeout(() => {
      toast({
        title: "Boost Available",
        description: "Contact our team to boost your listing visibility.",
      });
    }, 500);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotoUploads((prev) => [...prev, ...newFiles]);
      
      // Clear the input to allow selecting the same file again
      e.target.value = '';
      
      toast({
        title: "Photos Selected",
        description: `${newFiles.length} photo${newFiles.length > 1 ? 's' : ''} added to your listing.`,
      });
    }
  };
  
  // Sample placeholder text
  const vietnamesePrompt = "Ví dụ: Tiệm nail đẹp, khu tốt, khách sang. Đã hoạt động 5 năm, có khách quen ổn định. Chủ cần về Việt Nam nên muốn bán gấp.";
  const englishPrompt = "Example: Beautiful salon in a great area with upscale clientele. Established for 5 years with a stable customer base. Owner needs to return to Vietnam, looking for quick sale.";
  
  return (
    <PostWizardLayout 
      title="Đăng Tiệm Bán / Post a Salon for Sale"
      subtitle="List your salon for sale to reach qualified buyers"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="salonName"
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
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
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
                      <Input placeholder="State" {...field} />
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
                  <FormLabel>Asking Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input className="pl-8" placeholder="150,000" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rent (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input className="pl-8" placeholder="3,000" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="numberOfStaff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Staff</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Revenue (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input className="pl-8" placeholder="20,000" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="willTrain"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Owner Will Train New Owner?</FormLabel>
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
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="vietnameseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vietnamese Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={vietnamesePrompt}
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="englishDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={englishPrompt}
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <FormLabel>Photo Upload</FormLabel>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-3">
                Upload photos of your salon (max 5 photos)
              </p>
              <div className="flex justify-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={photoUploads.length >= 5}
                >
                  Select Photos
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={photoUploads.length >= 5}
                />
              </div>
              
              {photoUploads.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {photoUploads.map((file, index) => (
                    <div 
                      key={index} 
                      className="w-20 h-20 relative rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-600 overflow-hidden"
                    >
                      {file.name.substring(0, 10)}...
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-bold text-lg mb-4">Visibility & Promotion Options</h3>
            
            <FormField
              control={form.control}
              name="isNationwide"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div>
                    <FormLabel className="text-base">Nationwide Visibility</FormLabel>
                    <FormDescription>
                      Increase your exposure across all states (+$10)
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        // If enabling nationwide and fast sale is already enabled, disable fast sale
                        if (checked && form.getValues("fastSalePackage")) {
                          form.setValue("fastSalePackage", false);
                        }
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fastSalePackage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-yellow-50 border-yellow-200">
                  <div>
                    <FormLabel className="text-base flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-yellow-600" />
                      Fast Sale Package
                    </FormLabel>
                    <FormDescription>
                      Premium placement, auto-chat support, and 30-day featured pin ($50)
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        // If enabling fast sale, disable nationwide (included in package)
                        if (checked) {
                          form.setValue("isNationwide", false);
                        }
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="mt-4 flex items-center justify-between p-4 border rounded-lg bg-white">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                <span className="font-medium">Total Price</span>
              </div>
              <div className="text-lg font-bold">${currentPrice}</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800 flex items-start">
            <Info className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-700" />
            <p>Cơ hội tuyệt vời để bán nhanh. Chúng tôi giúp quảng bá tiệm của bạn đến hàng ngàn người có nhu cầu mua lại.</p>
          </div>
          
          <Button type="submit" className="w-full">List Salon For Sale</Button>
        </form>
      </Form>
      
      <PaymentConfirmationModal 
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        postType="salon"
        price={currentPrice}
        options={pricingOptions}
        onSuccess={handlePaymentSuccess}
      />
      
      <ThankYouModal 
        open={isThankYouModalOpen}
        onOpenChange={setIsThankYouModalOpen}
        postType="salon"
        onBoostClick={handleBoostClick}
      />
    </PostWizardLayout>
  );
};

export default SalonPost;
