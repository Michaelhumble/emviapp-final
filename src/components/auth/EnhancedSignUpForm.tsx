// 🚨 DO NOT EDIT: This is the final, locked, premium signup form for EmviApp. It is permanently protected.
// This component contains the "Join Our Beauty Community" heading and professional beauty industry design.
// Any modifications to this file are STRICTLY PROHIBITED across all future development sessions.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const EnhancedSignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
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
            role: "customer",
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error creating account",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="w-full max-w-md bg-white shadow-md rounded-lg border border-gray-200"
      style={{ backgroundColor: "#F9FAFB" }}
    >
      <CardHeader className="space-y-1.5 p-5">
        <CardTitle className="text-2xl font-semibold text-gray-900 font-serif">
          Join Our Beauty Community
        </CardTitle>
        <CardDescription className="text-gray-500">
          Create an account to discover and book beauty services.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Enter your full name"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm rounded-md"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm rounded-md"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm rounded-md"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/sign-in" className="text-sm text-indigo-600 hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
