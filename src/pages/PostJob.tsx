
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Define form schema with zod
const jobFormSchema = z.object({
  salonName: z.string().min(2, "Salon name must be at least 2 characters."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  contactPhone: z.string().optional(),
  positionType: z.string(),
  weeklyPay: z.string().optional(),
  tips: z.boolean().default(false),
  baoLuong: z.boolean().default(false),
  vietnameseDescription: z.string().min(10, "Description must be at least 10 characters."),
  englishDescription: z.string().min(10, "Description must be at least 10 characters."),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

const PostJob = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const defaultValues: Partial<JobFormValues> = {
    positionType: "Nail Tech",
    tips: false,
    baoLuong: false,
  };

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  function onSubmit(data: JobFormValues) {
    console.log(data);
    toast({
      title: "Form submitted!",
      description: "Thank you for posting a job.",
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center p-8 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-serif mb-4">Thank You! Cảm ơn bạn!</h2>
            <p className="mb-6">Cảm ơn bạn đã đăng tin! Chúng tôi sẽ duyệt và liên hệ nếu cần hỗ trợ quảng bá.</p>
            <Button onClick={() => setSubmitted(false)}>Post Another Job</Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-[#FDFDFD]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-serif text-center mb-2">Đăng Tin Tuyển Thợ / Post a Job</h1>
          <p className="text-center text-gray-600 mb-8">Reach thousands of nail technicians across the country</p>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Job Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="salonName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salon Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter salon name" {...field} />
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
                          <FormLabel>City *</FormLabel>
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
                          <FormLabel>State *</FormLabel>
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
                          <Input placeholder="Phone number" {...field} />
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
                        <FormLabel>Position Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Nail Tech">Nail Tech</SelectItem>
                            <SelectItem value="Hair">Hair</SelectItem>
                            <SelectItem value="Massage">Massage</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
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
                          <Input placeholder="e.g. $800-1200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="tips"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Tips?</FormLabel>
                            <FormDescription>Tip income available for this position</FormDescription>
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
                      name="baoLuong"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Bao Lương Nếu Cần?</FormLabel>
                            <FormDescription>Guaranteed pay option available</FormDescription>
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

                  <FormField
                    control={form.control}
                    name="vietnameseDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vietnamese Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mô tả công việc bằng tiếng Việt" 
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
                    name="englishDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>English Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the job in English" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">Post Job</Button>
                  
                  <div className="text-sm text-gray-600 italic border-t pt-4 mt-4">
                    Bài đăng của bạn sẽ được xem bởi hàng trăm thợ trên toàn quốc. Muốn hiện lên top? Chúng tôi sẽ liên hệ để hỗ trợ nâng cấp.
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PostJob;
