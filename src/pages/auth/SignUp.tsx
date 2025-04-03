
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Scissors, Building2, User, Briefcase, ShoppingBag, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// User type options for registration - make sure this matches AuthContext
type UserType = "artist" | "salon" | "customer" | "freelancer" | "vendor" | "other";

const roles = [
  {
    id: "artist",
    label: "Artist",
    description: "Hair, Brows, Lashes, Nails, Tattoo...",
    tooltip: "I'm a beauty professional looking for jobs, exposure, or to build my brand.",
    icon: <Scissors className="h-4 w-4" />
  },
  {
    id: "salon",
    label: "Salon",
    description: "Business",
    tooltip: "I'm a salon owner hiring, managing my team, or selling my salon.",
    icon: <Building2 className="h-4 w-4" />
  },
  {
    id: "customer",
    label: "Customer",
    description: "",
    tooltip: "I'm looking for beauty services and offers from top professionals.",
    icon: <User className="h-4 w-4" />
  },
  {
    id: "freelancer",
    label: "Freelancer",
    description: "Makeup Artist, Photographer, etc.",
    tooltip: "I'm a solo artist looking for gigs, clients, or to promote my service.",
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    id: "vendor",
    label: "Vendor",
    description: "Beauty Supplier",
    tooltip: "I sell products or tools for beauty salons and professionals.",
    icon: <ShoppingBag className="h-4 w-4" />
  },
  {
    id: "other",
    label: "Other",
    description: "",
    tooltip: "I'm not sure yet — I just want to explore.",
    icon: <HelpCircle className="h-4 w-4" />
  }
];

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState<UserType>("artist");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await signUp(email, password, {
        full_name: fullName,
        user_type: userType as any // Cast to any to avoid type issues with context
      });
      
      // Redirect based on user type to the appropriate setup page
      switch (userType) {
        case "artist":
          navigate("/artists/profile-setup");
          break;
        case "salon":
          navigate("/salon/profile-setup");
          break;
        case "freelancer":
          navigate("/freelancers/profile-setup");
          break;
        case "vendor":
          navigate("/vendors/profile-setup");
          break;
        case "other":
          navigate("/other/profile-setup");
          break;
        case "customer":
          navigate("/customers/profile-setup");
          break;
        default:
          navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Sign up failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to sign up
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-3">
              <Label>I am a:</Label>
              <TooltipProvider>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <Tooltip key={role.id}>
                      <TooltipTrigger asChild>
                        <div 
                          className={cn(
                            "flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all",
                            userType === role.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                          )}
                          onClick={() => setUserType(role.id as UserType)}
                        >
                          <RadioGroup value={userType} onValueChange={(value) => setUserType(value as UserType)} className="hidden">
                            <RadioGroupItem value={role.id} id={`signup-${role.id}`} />
                          </RadioGroup>
                          <div className="rounded-full bg-primary/10 p-2 mb-2">
                            {role.icon}
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{role.label}</div>
                            {role.description && <div className="text-xs text-muted-foreground">{role.description}</div>}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs">
                        {role.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
