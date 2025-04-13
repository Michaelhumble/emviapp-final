
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Mail, User, Type, CheckCircle2, Loader2 } from "lucide-react";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  userType: z.string().min(1, "Please select your role"),
  reason: z.string().min(10, "Please tell us a bit more about why you'd like access")
});

const EarlyAccess = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      userType: "",
      reason: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("waitlist_requests").insert({
        full_name: values.fullName,
        email: values.email,
        user_type: values.userType,
        reason: values.reason
      });

      if (error) throw error;
      
      setSubmitted(true);
      toast.success("Your request has been submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting waitlist request:", error);
      toast.error(error.message || "Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-12 px-4 md:py-20">
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-b from-white to-purple-50/30">
          <CardHeader className="text-center pb-6 pt-10">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Sparkles className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
            
            <CardTitle className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text">
              EmviApp Early Access
            </CardTitle>
            <CardDescription className="text-gray-600 max-w-lg mx-auto">
              This is an early access preview of EmviApp. If you've been invited, you may log in. 
              Otherwise, request access below and we'll notify you when you're approved.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 md:px-12">
            {submitted ? (
              <div className="flex flex-col items-center py-8 space-y-4 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="rounded-full bg-green-100 p-4 mb-2"
                >
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </motion.div>
                <h3 className="text-xl font-semibold">Thank you for your interest!</h3>
                <p className="text-gray-600 max-w-md">
                  We've received your request and will review it soon. We'll notify you by email
                  when you've been granted access.
                </p>
                <div className="pt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/")}
                    className="mt-4"
                  >
                    Return to Homepage
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              placeholder="Your name"
                              className="pl-10"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              className="pl-10"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I am a...</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                              <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="artist">Nail Artist</SelectItem>
                                <SelectItem value="nail technician/artist">Nail Technician</SelectItem>
                                <SelectItem value="salon">Salon Owner</SelectItem>
                                <SelectItem value="customer">Customer</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why would you like to join?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a bit about yourself and why you'd like early access..."
                            rows={4}
                            className="resize-none"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        Submitting...
                      </>
                    ) : (
                      "Request Early Access"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          
          <CardFooter className="pb-10 pt-4 text-center justify-center">
            <p className="text-sm text-gray-500">
              Already have an invite? <Button variant="link" className="p-0 h-auto font-medium" onClick={() => navigate("/auth/signin")}>Sign In</Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default EarlyAccess;
