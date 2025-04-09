
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";

// Define form schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  location: z.string().optional(),
  beautyPreferences: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CustomerSignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      location: "",
      beautyPreferences: "",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Sign up with Supabase - explicitly set role to "customer"
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            location: data.location,
            role: "customer", // Explicit customer role assignment
          },
        },
      });
      
      if (authError) {
        toast.error(authError.message);
        setIsLoading(false);
        return;
      }
      
      if (authData?.user) {
        // Update user profile with additional information
        const { error: profileError } = await supabase
          .from("users")
          .update({
            full_name: data.fullName,
            location: data.location || null,
            preferences: data.beautyPreferences ? [data.beautyPreferences] : [],
            role: "customer", // Explicitly set role again in users table
          })
          .eq("id", authData.user.id);
          
        if (profileError) {
          console.error("Error updating profile:", profileError);
          // Continue despite error to ensure the user can still use the app
        }
        
        toast.success("Customer account created successfully!");
        navigate("/dashboard/customer");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container max-w-md mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
        
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500"></div>
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Join as a Beauty Enthusiast</CardTitle>
            <CardDescription>Welcome to EmviApp — Your beauty journey starts here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
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
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password (min 8 characters)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="beautyPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beauty Interests (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your primary interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="nail_art">Nail Art</SelectItem>
                          <SelectItem value="hair_styling">Hair Styling</SelectItem>
                          <SelectItem value="makeup">Makeup</SelectItem>
                          <SelectItem value="skincare">Skincare</SelectItem>
                          <SelectItem value="massage">Massage</SelectItem>
                          <SelectItem value="lashes">Lashes & Brows</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Customer Account"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-pink-600 hover:text-pink-800 font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerSignupPage;
