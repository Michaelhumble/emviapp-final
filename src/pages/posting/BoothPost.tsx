
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapPin, DollarSign, Link2, Calendar, Info } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { calculateBoothRentalPrice } from "@/utils/postingPriceCalculator";
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
  monthlyRent: z.string().min(1, {
    message: "Monthly rent is required.",
  }),
  availableDate: z.string().min(1, {
    message: "Available date is required.",
  }),
  boothType: z.string().min(1, {
    message: "Booth type/details are required.",
  }),
  vietnameseDescription: z.string().min(10, {
    message: "Vietnamese description must be at least 10 characters.",
  }),
  englishDescription: z.string().min(10, {
    message: "English description must be at least 10 characters.",
  }),
  includesUtilities: z.boolean().default(false),
  isNationwide: z.boolean().default(false),
  bundleWithJobPost: z.boolean().default(false),
});

const BoothPost = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(15); // Base price
  const [pricingOptions, setPricingOptions] = useState({
    isNationwide: false,
    bundleWithJobPost: false,
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
      monthlyRent: "",
      availableDate: new Date().toISOString().split('T')[0],
      boothType: "",
      vietnameseDescription: "",
      englishDescription: "",
      includesUtilities: false,
      isNationwide: false,
      bundleWithJobPost: false,
    },
  });
  
  // Monitor changes to pricing options
  const watchIsNationwide = form.watch("isNationwide");
  const watchBundleWithJobPost = form.watch("bundleWithJobPost");
  
  // Update price when options change
  useState(() => {
    const updatedOptions = {
      ...pricingOptions,
      isNationwide: watchIsNationwide,
      bundleWithJobPost: watchBundleWithJobPost,
    };
    setPricingOptions(updatedOptions);
    setCurrentPrice(calculateBoothRentalPrice(userStats, updatedOptions));
  }, [watchIsNationwide, watchBundleWithJobPost]);
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a booth rental.",
        variant: "destructive",
      });
      return;
    }
    
    // Update final pricing options
    const finalOptions = {
      ...pricingOptions,
      isNationwide: values.isNationwide,
      bundleWithJobPost: values.bundleWithJobPost,
    };
    setPricingOptions(finalOptions);
    
    // Calculate final price
    const finalPrice = calculateBoothRentalPrice(userStats, finalOptions);
    setCurrentPrice(finalPrice);
    
    // Open payment modal
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // This would normally save the post to the database
    console.log("Payment successful, booth rental would be saved to database");
    setIsPaymentModalOpen(false);
    setIsThankYouModalOpen(true);
  };
  
  const handleBoostClick = () => {
    setIsThankYouModalOpen(false);
    // Simulate opening a boost modal
    setTimeout(() => {
      toast({
        title: "Boost Available",
        description: "Contact our team to boost your booth rental visibility.",
      });
    }, 500);
  };
  
  // Sample placeholder text
  const vietnamesePrompt = "Ví dụ: Cho thuê ghế trong tiệm nail cao cấp. Tiệm đông khách, khu vực tốt, có khu vực chờ rộng rãi. Ưu tiên thợ biết làm đủ dịch vụ.";
  const englishPrompt = "Example: Booth rental available in upscale nail salon. Busy location with good foot traffic and spacious waiting area. Preference for technicians who can perform all services.";
  
  return (
    <PostWizardLayout 
      title="Đăng Tin Cho Thuê / Post a Booth Rental"
      subtitle="List your available booth for qualified artists"
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
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rent</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input className="pl-8" placeholder="600" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availableDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="boothType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booth Type/Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nail station, Pedicure chair" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="includesUtilities"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Includes Utilities?</FormLabel>
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
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bundleWithJobPost"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-blue-50 border-blue-200">
                  <div>
                    <FormLabel className="text-base flex items-center">
                      <Link2 className="h-4 w-4 mr-1 text-blue-600" />
                      Bundle With Job Post
                    </FormLabel>
                    <FormDescription>
                      Create a job post along with your booth rental at a discounted rate
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
            <p>Bài đăng của bạn sẽ được xem bởi hàng trăm thợ trên toàn quốc. Chúng tôi sẽ liên hệ để hỗ trợ quảng bá nếu cần.</p>
          </div>
          
          <Button type="submit" className="w-full">Post Booth Rental</Button>
        </form>
      </Form>
      
      <PaymentConfirmationModal 
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        postType="booth"
        price={currentPrice}
        options={pricingOptions}
        onSuccess={handlePaymentSuccess}
      />
      
      <ThankYouModal 
        open={isThankYouModalOpen}
        onOpenChange={setIsThankYouModalOpen}
        postType="booth"
        onBoostClick={handleBoostClick}
      />
    </PostWizardLayout>
  );
};

export default BoothPost;
