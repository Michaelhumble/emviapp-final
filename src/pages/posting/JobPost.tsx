import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapPin, DollarSign, MessageCircle, Info } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { calculateJobPostPrice } from "@/utils/postingPriceCalculator";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import ThankYouModal from "@/components/posting/ThankYouModal";
import PostWizardLayout from "@/components/posting/PostWizardLayout";
import { Navigate } from "react-router-dom";

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
  contactPhone: z.string().optional(),
  positionType: z.string({
    required_error: "Please select a position type.",
  }),
  weeklyPay: z.string().optional(),
  hasTips: z.boolean().default(false),
  hasBaoLuong: z.boolean().default(false),
  vietnameseDescription: z.string().min(10, {
    message: "Vietnamese description must be at least 10 characters.",
  }),
  englishDescription: z.string().min(10, {
    message: "English description must be at least 10 characters.",
  }),
  isNationwide: z.boolean().default(false),
});

const JobPost = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [pricingOptions, setPricingOptions] = useState({
    isNationwide: false,
    isFirstPost: true, // Assume first post for demo
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
      contactPhone: "",
      positionType: "",
      weeklyPay: "",
      hasTips: true,
      hasBaoLuong: false,
      vietnameseDescription: "",
      englishDescription: "",
      isNationwide: false,
    },
  });
  
  // Monitor changes to the nationwide option
  const watchIsNationwide = form.watch("isNationwide");
  
  // Update price when nationwide option changes
  useState(() => {
    const updatedOptions = {
      ...pricingOptions,
      isNationwide: watchIsNationwide,
    };
    setPricingOptions(updatedOptions);
    setCurrentPrice(calculateJobPostPrice(userStats, updatedOptions));
  }, [watchIsNationwide]);
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a job.",
        variant: "destructive",
      });
      return;
    }
    
    // Update final pricing options
    const finalOptions = {
      ...pricingOptions,
      isNationwide: values.isNationwide,
    };
    setPricingOptions(finalOptions);
    
    // Calculate final price
    const finalPrice = calculateJobPostPrice(userStats, finalOptions);
    setCurrentPrice(finalPrice);
    
    // Open payment modal
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // This would normally save the post to the database
    console.log("Payment successful, post would be saved to database");
    setIsPaymentModalOpen(false);
    setIsThankYouModalOpen(true);
  };
  
  const handleBoostClick = () => {
    setIsThankYouModalOpen(false);
    // Simulate opening a boost modal
    setTimeout(() => {
      toast({
        title: "Boost Available",
        description: "Contact our team to boost your post visibility.",
      });
    }, 500);
  };
  
  // Sample placeholder text in Vietnamese
  const vietnamesePrompt = "Ví dụ: Cần tuyển thợ nail có kinh nghiệm làm được đủ các dịch vụ, bột, combo, wax. Thu nhập $800-1000/tuần + tips. Môi trường làm việc thân thiện, lịch sự.";
  const englishPrompt = "Example: Looking for experienced nail technicians who can perform all services including acrylic, combo, wax. Weekly pay $800-1000 plus tips. Friendly and professional work environment.";
  
  return (
    <PostWizardLayout 
      title="Đăng Tin Tuyển Thợ / Post a Job"
      subtitle="Create a new job posting to find artists for your salon"
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
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="positionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nail_tech">Nail Tech</SelectItem>
                      <SelectItem value="hair">Hair</SelectItem>
                      <SelectItem value="massage">Massage</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="weeklyPay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Pay (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $800-1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hasTips"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Tips?</FormLabel>
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
                name="hasBaoLuong"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Bao Lương Nếu Cần?</FormLabel>
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
          
          <Separator className="my-6" />
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Visibility Options</h3>
            
            <FormField
              control={form.control}
              name="isNationwide"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div>
                    <FormLabel className="text-base">Nationwide Visibility</FormLabel>
                    <FormDescription>
                      Increase your exposure across all states (+$5)
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
              <div className="text-lg font-bold">
                {currentPrice === 0 ? "FREE" : `$${currentPrice}`}
                {pricingOptions.isFirstPost && !pricingOptions.isNationwide && (
                  <span className="ml-2 text-sm font-normal text-gray-500">(First Post Free)</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800 flex items-start">
            <Info className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-700" />
            <p>Bài đăng của bạn sẽ được xem bởi hàng trăm thợ trên toàn quốc. Muốn hiện lên top? Chúng tôi sẽ liên hệ để hỗ trợ nâng cấp.</p>
          </div>
          
          <Button type="submit" className="w-full">Post Job</Button>
        </form>
      </Form>
      
      <PaymentConfirmationModal 
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        postType="job"
        price={currentPrice}
        options={pricingOptions}
        onSuccess={handlePaymentSuccess}
      />
      
      <ThankYouModal 
        open={isThankYouModalOpen}
        onOpenChange={setIsThankYouModalOpen}
        postType="job"
        onBoostClick={handleBoostClick}
      />
    </PostWizardLayout>
  );
};

export default JobPost;
