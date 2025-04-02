
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Define form schema with zod
const salonFormSchema = z.object({
  salonName: z.string().min(2, "Salon name must be at least 2 characters."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  askingPrice: z.string().min(1, "Asking price is required."),
  rentPerMonth: z.string().optional(),
  numberOfStaff: z.string().min(1, "Number of staff is required."),
  revenue: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters."),
  willTrain: z.boolean().default(false),
});

type SalonFormValues = z.infer<typeof salonFormSchema>;

const PostSalon = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const defaultValues: Partial<SalonFormValues> = {
    willTrain: false,
  };

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues,
  });

  function onSubmit(data: SalonFormValues) {
    console.log(data);
    toast({
      title: "Form submitted!",
      description: "Thank you for posting your salon.",
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
            <Button onClick={() => setSubmitted(false)}>Post Another Salon</Button>
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
          <h1 className="text-3xl font-serif text-center mb-2">Đăng Tiệm Bán / Post a Salon for Sale</h1>
          <p className="text-center text-gray-600 mb-8">Connect with interested buyers nationwide</p>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Salon Information</CardTitle>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="askingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asking Price *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. $150,000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rentPerMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rent per Month (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. $3,500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="numberOfStaff"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Staff *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 6" {...field} />
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
                            <Input placeholder="e.g. $30,000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="willTrain"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Owner Will Train New Owner?</FormLabel>
                          <FormDescription>Current owner is willing to provide training</FormDescription>
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (VN + EN) *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your salon in Vietnamese and English" 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include both Vietnamese and English descriptions to reach more potential buyers.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border rounded-md p-4">
                    <FormLabel>Photo Upload</FormLabel>
                    <div className="mt-2 border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Click or drag photos to upload (up to 5)</p>
                      <p className="mt-1 text-xs text-gray-400">Support for JPG, PNG (max 5MB each)</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Post Salon for Sale</Button>
                  
                  <div className="text-sm text-gray-600 italic border-t pt-4 mt-4">
                    Cơ hội tuyệt vời để bán nhanh. Chúng tôi giúp quảng bá tiệm của bạn đến hàng ngàn người có nhu cầu mua lại.
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

export default PostSalon;
