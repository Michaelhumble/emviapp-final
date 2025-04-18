import React, { useState } from 'react';
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, MapPin, Globe, Calendar, Languages } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostPayment } from '@/hooks/payments/usePostPayment';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  jobType: z.string().min(1, "Job type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  compensation: z.string().min(1, "Compensation information is required"),
  startDate: z.string().optional(),
  languages: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Booth Rent",
  "Commission",
  "Contract",
  "Temporary"
];

const PostJob = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { initiatePayment, isLoading: paymentLoading } = usePostPayment();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      city: "",
      state: "",
      jobType: "",
      description: "",
      compensation: "",
      startDate: "",
      languages: "",
    }
  });
  
  if (!user) {
    navigate('/auth/signin');
    return null;
  }
  
  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    if (!user) {
      navigate('/auth/signin');
      return;
    }
    
    // Start payment flow
    await initiatePayment('job');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
          <p className="text-gray-600 mb-2">Reach local artists looking for their next opportunity.</p>
          
          {/* Vietnamese translation */}
          <p className="text-gray-500 text-sm italic mb-8">
            <span className="block">Đăng tuyển dụng để tìm nhân viên phù hợp cho tiệm của bạn.</span>
            <span className="block">Post jobs to find the right staff for your salon.</span>
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Fill out the information below to create your job listing</CardDescription>
            </CardHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Nail Technician, Hair Stylist" {...field} />
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
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                              <Input className="pl-8" placeholder="City" {...field} />
                            </div>
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
                            <Input placeholder="State" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jobTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the role, responsibilities, and what makes your salon special"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="compensation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pay or Booth Rent Information</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., $25-30/hr, 60% commission, $300/week booth rent" 
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
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Start Date (Optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                className="pl-8"
                                type="date" 
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages Preferred (Optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Languages className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                className="pl-8"
                                placeholder="e.g., English, Vietnamese, Spanish" 
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Future: Salon photo upload 
                  <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center">
                    <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button variant="outline" type="button">Upload Salon Photo</Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Optional: Add a photo of your salon</p>
                  </div>
                  */}
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      toast.info("Preview functionality coming soon!");
                    }}
                  >
                    Preview Post
                  </Button>
                  
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Posting...
                      </>
                    ) : "Submit Job"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
          
          <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-medium text-lg mb-2">Why post on EmviApp?</h3>
            <p className="text-gray-600">Your job will be shown to qualified nail technicians in your area. We've helped hundreds of salon owners find their perfect team members.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;
