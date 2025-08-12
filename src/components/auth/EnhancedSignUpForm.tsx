
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Users, Building2, Briefcase } from "lucide-react";
import { getAppOrigin } from "@/utils/getAppOrigin";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  role: z.enum(["customer", "artist", "salon", "freelancer"]),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const EnhancedSignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("customer");
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: "customer",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("🚀 [SIGN UP] Starting sign up process for:", data.email, "Role:", data.role);
    setIsLoading(true);
    
    try {
      console.log("📧 [SIGN UP] Calling Supabase signUp...");
      
      // Map frontend roles to backend-compatible roles
      let mappedRole: string = data.role;
      if (data.role === 'salon') {
        mappedRole = 'owner'; // Map "salon" selection to "owner" in database
        console.log("🔄 [ROLE MAPPING] Mapped 'salon' to 'owner'");
      }
      
      // Validate role is supported
      const supportedRoles = ['artist', 'owner', 'customer', 'supply_partner', 'freelancer', 'salon'];
      if (!supportedRoles.includes(mappedRole)) {
        throw new Error(`Rất tiếc, bạn chỉ có thể đăng ký với vai trò Khách hàng, Thợ, Chủ tiệm, Freelancer, hoặc Nhà cung cấp. / Sorry, only Customer, Artist, Owner, Freelancer, or Supplier roles are supported right now.`);
      }
      
      console.log("📝 [SIGN UP] Final role for database:", mappedRole);
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
          options: {
            emailRedirectTo: `${getAppOrigin()}/auth/redirect`,
            data: {
              full_name: data.fullName,
              role: mappedRole, // Use mapped role
            },
          },
      });

      console.log("✅ [SIGN UP] Supabase response:", { authData, error });

      if (error) {
        console.error("❌ [SIGN UP] Supabase error:", error);
        throw error;
      }

      if (authData?.user) {
        console.log("🎉 [SIGN UP] User created successfully:", authData.user.id);
        
        // Show success message with EmviApp branding
        toast({
          title: "Chào mừng bạn đến với EmviApp! 🌸",
          description: "Welcome to our beautiful community! Please check your email to verify your account and begin your journey.",
        });

        // Navigate to appropriate dashboard based on role
        console.log("🔄 [SIGN UP] Determining target dashboard for role:", mappedRole);
        
        let targetUrl = '/dashboard'; // Default fallback
        
        switch (mappedRole) {
          case 'artist':
            targetUrl = '/dashboard/artist';
            break;
          case 'owner':
            targetUrl = '/dashboard/salon';
            break;
          case 'customer':
            targetUrl = '/dashboard/customer';
            break;
          case 'freelancer':
            targetUrl = '/dashboard/freelancer';
            break;
          default:
            targetUrl = '/dashboard';
        }
        
        console.log("🔄 [SIGN UP] Navigating to:", targetUrl);
        navigate(targetUrl, { replace: true });
      } else {
        console.warn("⚠️ [SIGN UP] No user returned from Supabase");
        throw new Error("Account creation didn't complete properly. Please try again.");
      }
    } catch (error) {
      console.error("💥 [SIGN UP] Full error details:", error);
      
      let errorMessage = "Something went wrong. Please try again or contact our support team.";
      let errorTitle = "Không thể tạo tài khoản - Unable to Create Account";
      
      if (error instanceof Error) {
        // Handle specific error cases with friendly EmviApp messaging
        if (error.message.includes("Database error saving new user") || error.message.includes("violates check constraint")) {
          errorTitle = "Vấn đề hệ thống - System Issue";
          errorMessage = "We're experiencing technical difficulties with your selected role. Our team has been notified. Please try a different role or contact support. 💚";
        } else if (error.message.includes("User already registered")) {
          errorTitle = "Tài khoản đã tồn tại - Account Already Exists";
          errorMessage = "This email is already part of our beauty community! Try signing in instead. 💅";
        } else if (error.message.includes("Password")) {
          errorTitle = "Mật khẩu không hợp lệ - Password Issue";
          errorMessage = "Please make sure your password is at least 6 characters long. 🔐";
        } else if (error.message.includes("only") && error.message.includes("roles are supported")) {
          errorTitle = "Vai trò không hỗ trợ - Role Not Supported";
          errorMessage = error.message;
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log("🏁 [SIGN UP] Process completed");
    }
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setValue("role", role as any);
  };

  const roleIcons = {
    customer: <Sparkles className="w-5 h-5" />,
    artist: <Users className="w-5 h-5" />,
    salon: <Building2 className="w-5 h-5" />,
    freelancer: <Briefcase className="w-5 h-5" />
  };

  const roleDescriptions = {
    customer: "Book appointments and discover beauty professionals",
    artist: "Showcase your skills and grow your client base",
    salon: "Manage your salon and connect with talented artists",
    freelancer: "Build your independent beauty business"
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-amber-50">
      <div className="w-full max-w-lg">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 bg-gradient-to-r from-rose-50 to-amber-50 rounded-t-lg">
            <CardTitle className="font-playfair text-3xl font-bold text-gray-800 mb-2">
              Join Our Beauty Community
            </CardTitle>
            <CardDescription className="text-gray-600 text-base font-medium">
              Start your professional beauty journey today
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  className="h-12 border-2 border-gray-200 focus:border-rose-300 focus:ring-rose-200 rounded-lg transition-all duration-200"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 font-medium">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  className="h-12 border-2 border-gray-200 focus:border-rose-300 focus:ring-rose-200 rounded-lg transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Create a secure password"
                  className="h-12 border-2 border-gray-200 focus:border-rose-300 focus:ring-rose-200 rounded-lg transition-all duration-200"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 font-medium">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  I am a...
                </Label>
                <Tabs value={selectedRole} onValueChange={handleRoleChange} className="w-full">
                  <div className="space-y-3">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 h-auto p-1 bg-gray-50 rounded-lg">
                      <TabsTrigger 
                        value="customer" 
                        className="flex items-center gap-2 h-16 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-rose-600 rounded-md transition-all duration-200"
                      >
                        {roleIcons.customer}
                        <div className="text-left">
                          <div className="font-semibold text-sm">Customer</div>
                          <div className="text-xs opacity-70">Book & Discover</div>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="artist" 
                        className="flex items-center gap-2 h-16 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-rose-600 rounded-md transition-all duration-200"
                      >
                        {roleIcons.artist}
                        <div className="text-left">
                          <div className="font-semibold text-sm">Artist</div>
                          <div className="text-xs opacity-70">Showcase Skills</div>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 h-auto p-1 bg-gray-50 rounded-lg">
                      <TabsTrigger 
                        value="salon" 
                        className="flex items-center gap-2 h-16 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-rose-600 rounded-md transition-all duration-200"
                      >
                        {roleIcons.salon}
                        <div className="text-left">
                          <div className="font-semibold text-sm">Salon Owner</div>
                          <div className="text-xs opacity-70">Manage Business</div>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="freelancer" 
                        className="flex items-center gap-2 h-16 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-rose-600 rounded-md transition-all duration-200"
                      >
                        {roleIcons.freelancer}
                        <div className="text-left">
                          <div className="font-semibold text-sm">Freelancer</div>
                          <div className="text-xs opacity-70">Independent Pro</div>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
                
                <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-4 rounded-lg border border-rose-100">
                  <p className="text-sm text-gray-600 font-medium">
                    {roleDescriptions[selectedRole as keyof typeof roleDescriptions]}
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Your Account...
                  </div>
                ) : (
                  "Join Our Beauty Community"
                )}
              </Button>
              
              {/* Sign In Link for Existing Users */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    to="/signin" 
                    className="font-semibold text-rose-600 hover:text-rose-700 transition-colors duration-200 underline-offset-2 hover:underline"
                  >
                    Welcome Back! Sign In
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
