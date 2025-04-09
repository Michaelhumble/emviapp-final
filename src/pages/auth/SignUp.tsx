
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
import { motion, AnimatePresence } from "framer-motion";
import { UserRole } from "@/context/auth/types";
import RoleSelectionCards from "@/components/auth/RoleSelectionCards";
import { normalizeUserRole } from "@/utils/roleUtils";
import { navigateToRoleDashboard } from "@/utils/navigation";

// Define form schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  location: z.string().optional(),
  specialty: z.string().optional(),
  businessName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("artist");
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      location: "",
      specialty: "",
      businessName: "",
    },
  });
  
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Ensure we have a valid normalized role
      const normalizedRole = normalizeUserRole(selectedRole);
      
      if (!normalizedRole) {
        toast.error("Please select a valid role to continue");
        setIsLoading(false);
        return;
      }
      
      console.log(`Signing up user with role: ${normalizedRole}`);
      
      // Sign up with Supabase - explicitly set role in metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: normalizedRole, // Set role in auth metadata
          },
        },
      });
      
      if (authError) {
        toast.error(authError.message);
        setIsLoading(false);
        return;
      }
      
      if (authData?.user) {
        // Prepare user profile data based on role
        const profileData: Record<string, any> = {
          full_name: data.fullName,
          role: normalizedRole, // Set role in users table
          location: data.location || null,
        };
        
        // Add role-specific fields
        if (normalizedRole === "artist" || normalizedRole === "freelancer") {
          profileData.specialty = data.specialty || null;
        }
        
        if (normalizedRole === "salon_owner") {
          profileData.salon_name = data.businessName || null;
        }
        
        // Update user profile with role information
        const { error: profileError } = await supabase
          .from("users")
          .update(profileData)
          .eq("id", authData.user.id);
          
        if (profileError) {
          console.error("Error updating profile:", profileError);
          // Continue despite error to ensure the user can still use the app
        }
        
        // Success message
        toast.success(`Account created successfully! Welcome to EmviApp.`);
        
        // Navigate to appropriate dashboard
        navigateToRoleDashboard(navigate, normalizedRole);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Role-specific form fields
  const renderRoleSpecificFields = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRole}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {selectedRole === "artist" && (
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Specialty <span className="text-xs text-gray-500">(optional)</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nails">Nail Art</SelectItem>
                      <SelectItem value="hair">Hair Styling</SelectItem>
                      <SelectItem value="makeup">Makeup</SelectItem>
                      <SelectItem value="skincare">Skincare</SelectItem>
                      <SelectItem value="lashes">Lashes & Brows</SelectItem>
                      <SelectItem value="massage">Massage</SelectItem>
                      <SelectItem value="tattoo">Tattoo</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {selectedRole === "freelancer" && (
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Service <span className="text-xs text-gray-500">(optional)</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="makeup">Makeup Artist</SelectItem>
                      <SelectItem value="hair">Hair Stylist</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="coaching">Beauty Coach</SelectItem>
                      <SelectItem value="event">Event Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {selectedRole === "salon_owner" && (
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon/Business Name <span className="text-xs text-gray-500">(optional)</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your salon's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {selectedRole === "customer" && (
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Location <span className="text-xs text-gray-500">(optional)</span></FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </motion.div>
      </AnimatePresence>
    );
  };
  
  return (
    <Layout>
      <div className="container max-w-md mx-auto px-4 py-6 sm:py-12">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
        
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400"></div>
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Create your free account</CardTitle>
            <CardDescription>Unlock your beauty journey with EmviApp</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <RoleSelectionCards selectedRole={selectedRole} onChange={handleRoleSelect} />
            </div>
            
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
                      <FormLabel>Location <span className="text-xs text-gray-500">(optional)</span></FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Role-specific fields */}
                {renderRoleSpecificFields()}
                
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
                    "Create Account"
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

export default SignUpPage;
