
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Scissors, 
  Building2, 
  Briefcase, 
  Sparkles,
  Users,
  Eye,
  Palette,
  Heart,
  Zap,
  Star,
  Crown,
  Camera,
  HelpCircle
} from "lucide-react";
import Logo from "@/components/ui/Logo";

const beautyRoles = [
  { id: "customer", label: "Customer", icon: <User className="h-4 w-4" />, emoji: "👤" },
  { id: "nail-artist", label: "Nail Artist", icon: <Sparkles className="h-4 w-4" />, emoji: "💅" },
  { id: "salon-owner", label: "Salon Owner", icon: <Building2 className="h-4 w-4" />, emoji: "🏢" },
  { id: "freelancer", label: "Freelancer", icon: <Briefcase className="h-4 w-4" />, emoji: "💼" },
  { id: "hair-stylist", label: "Hair Stylist", icon: <Scissors className="h-4 w-4" />, emoji: "✂️" },
  { id: "barber", label: "Barber", icon: <Scissors className="h-4 w-4" />, emoji: "💈" },
  { id: "lash-technician", label: "Lash Technician", icon: <Eye className="h-4 w-4" />, emoji: "👁️" },
  { id: "esthetician", label: "Esthetician", icon: <Sparkles className="h-4 w-4" />, emoji: "✨" },
  { id: "massage-therapist", label: "Massage Therapist", icon: <Heart className="h-4 w-4" />, emoji: "💆" },
  { id: "makeup-artist", label: "Makeup Artist", icon: <Palette className="h-4 w-4" />, emoji: "💄" },
  { id: "permanent-makeup-artist", label: "Permanent Makeup Artist", icon: <Zap className="h-4 w-4" />, emoji: "🎨" },
  { id: "tattoo-artist", label: "Tattoo Artist", icon: <Star className="h-4 w-4" />, emoji: "🎨" },
  { id: "wax-specialist", label: "Wax Specialist", icon: <Crown className="h-4 w-4" />, emoji: "🕯️" },
  { id: "facialist", label: "Facialist", icon: <Sparkles className="h-4 w-4" />, emoji: "🧴" },
  { id: "spray-tan-specialist", label: "Spray Tan Specialist", icon: <Users className="h-4 w-4" />, emoji: "☀️" },
  { id: "eyebrow-threader", label: "Eyebrow Threader", icon: <Eye className="h-4 w-4" />, emoji: "🧵" },
  { id: "beauty-influencer", label: "Beauty Influencer", icon: <Camera className="h-4 w-4" />, emoji: "📸" },
  { id: "other", label: "Other", icon: <HelpCircle className="h-4 w-4" />, emoji: "❓" }
];

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.string().min(1, "Please select your role"),
  customRole: z.string().optional(),
  fullName: z.string().min(2, "Please enter your full name"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const FloatingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full opacity-20 ${className}`}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

export const EnhancedSignUpForm = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [showCustomRole, setShowCustomRole] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const watchedRole = watch("role");

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setValue("role", roleId);
    setShowCustomRole(roleId === "other");
  };

  const onSubmit = async (data: SignUpFormData) => {
    console.log("Enhanced Sign Up Form Data:", data);
    // This is just for testing - will be connected to actual auth later
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Floating Background Orbs */}
      <FloatingOrb className="w-64 h-64 bg-purple-200 top-10 left-10" delay={0} />
      <FloatingOrb className="w-48 h-48 bg-pink-200 top-1/3 right-20" delay={2} />
      <FloatingOrb className="w-32 h-32 bg-indigo-200 bottom-20 left-1/4" delay={4} />
      <FloatingOrb className="w-56 h-56 bg-rose-200 bottom-10 right-10" delay={1} />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="large" showText={true} />
          </div>

          {/* Main Form Card */}
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Join EmviApp
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Connect with beauty professionals worldwide
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      {...register("fullName")}
                      className="mt-1 bg-white/70 border-purple-200 focus:border-purple-400"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1 bg-white/70 border-purple-200 focus:border-purple-400"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div>
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                      {beautyRoles.map((role) => (
                        <motion.div
                          key={role.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all duration-200 ${
                              selectedRole === role.id
                                ? "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 shadow-md"
                                : "bg-white/50 border-gray-200 hover:border-purple-200"
                            }`}
                            onClick={() => handleRoleSelect(role.id)}
                          >
                            <CardContent className="p-3 text-center">
                              <div className="flex flex-col items-center space-y-2">
                                <span className="text-2xl">{role.emoji}</span>
                                <span className="text-xs font-medium text-gray-700">
                                  {role.label}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                    )}
                  </div>

                  {/* Custom Role Input */}
                  {showCustomRole && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Label htmlFor="customRole">Please specify your role</Label>
                      <Input
                        id="customRole"
                        {...register("customRole")}
                        className="mt-1 bg-white/70 border-purple-200 focus:border-purple-400"
                        placeholder="e.g., Beauty Consultant, Cosmetologist..."
                      />
                    </motion.div>
                  )}

                  {/* Password */}
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      className="mt-1 bg-white/70 border-purple-200 focus:border-purple-400"
                      placeholder="Create a secure password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                      className="mt-1 bg-white/70 border-purple-200 focus:border-purple-400"
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  {/* Sign In Link */}
                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/auth/signin" className="text-purple-600 hover:text-purple-700 font-medium">
                      Sign in
                    </a>
                  </div>
                </form>
              </motion.div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedSignUpForm;
