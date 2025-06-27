
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
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Building2, Briefcase } from "lucide-react";

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
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.role,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Welcome to our beauty community!",
        description: "Please check your email to verify your account and complete your journey.",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Unable to create account",
        description: error instanceof Error ? error.message : "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
    <div style={{ backgroundColor: '#FFF3E0' }} className="min-h-screen flex items-center justify-center p-4">
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
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                  Full Name
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
                  Email Address
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
                  Password
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
                  <TabsList className="grid w-full grid-cols-2 gap-2 h-auto p-1 bg-gray-50 rounded-lg">
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
                  
                  <TabsList className="grid w-full grid-cols-2 gap-2 h-auto p-1 bg-gray-50 rounded-lg mt-2">
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
