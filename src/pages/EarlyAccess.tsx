
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import EmviLogo from "@/components/branding/EmviLogo";

const EarlyAccess = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit waitlist request to Supabase
      const { error } = await supabase.from("waitlist_requests").insert({
        full_name: fullName,
        email,
        user_type: userType,
        reason,
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Your request has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting waitlist request:", error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <EmviLogo size="large" className="mb-8" />
          
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Early Access</CardTitle>
              <CardDescription>
                This is an early access preview of EmviApp. If you've been invited, you may{" "}
                <Link to="/auth/signin" className="text-primary hover:underline">
                  log in
                </Link>
                . Otherwise, request access below.
              </CardDescription>
            </CardHeader>
            
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="userType">I am a...</Label>
                    <Select value={userType} onValueChange={setUserType} required>
                      <SelectTrigger id="userType">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="artist">Nail Artist</SelectItem>
                        <SelectItem value="salon">Salon</SelectItem>
                        <SelectItem value="owner">Salon Owner</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                        <SelectItem value="beauty supplier">Beauty Supplier</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Why do you want to join?</Label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Tell us briefly why you're interested in EmviApp..."
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request Access"}
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <CardContent className="py-8 text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-4"
                >
                  ✉️
                </motion.div>
                <CardTitle>Thank you for your interest!</CardTitle>
                <CardDescription className="text-base">
                  We've received your request to join EmviApp. Our team will review your application and we'll be in touch soon.
                </CardDescription>
              </CardContent>
            )}
          </Card>
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an invitation?{" "}
            <Link to="/auth/signin" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default EarlyAccess;
