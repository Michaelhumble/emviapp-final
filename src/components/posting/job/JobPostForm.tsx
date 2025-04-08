
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, MessageCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Form schema definition
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

export type JobPostFormValues = z.infer<typeof formSchema>;

interface JobPostFormProps {
  onSubmit: (values: JobPostFormValues) => void;
  defaultNationwide: boolean;
}

const JobPostForm = ({ onSubmit, defaultNationwide }: JobPostFormProps) => {
  // Sample placeholder text
  const vietnamesePrompt = "Ví dụ: Cần tuyển thợ nail có kinh nghiệm làm được đủ các dịch vụ, bột, combo, wax. Thu nhập $800-1000/tuần + tips. Môi trường làm việc thân thiện, lịch sự.";
  const englishPrompt = "Example: Looking for experienced nail technicians who can perform all services including acrylic, combo, wax. Weekly pay $800-1000 plus tips. Friendly and professional work environment.";
  
  const form = useForm<JobPostFormValues>({
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
      isNationwide: defaultNationwide,
    },
  });
  
  return (
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
        
        <div className="mt-8">
          <Button type="submit" className="w-full">Post Job</Button>
        </div>
      </form>
    </Form>
  );
};

export default JobPostForm;
