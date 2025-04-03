
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// User type options for registration
type UserType = "artist" | "owner" | "renter" | "customer" | "freelancer";

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
        user_type: userType
      });
      
      // Redirect based on user type
      switch (userType) {
        case "artist":
          navigate("/profile/artist/setup");
          break;
        case "owner":
          navigate("/profile/salon/setup");
          break;
        case "renter":
          navigate("/profile/renter/setup");
          break;
        case "freelancer":
          navigate("/profile/freelancer/setup");
          break;
        case "customer":
          navigate("/");
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
              <RadioGroup 
                value={userType} 
                onValueChange={(value) => setUserType(value as UserType)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="artist" id="artist" />
                  <Label htmlFor="artist" className="cursor-pointer">Nail Technician/Artist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="owner" id="owner" />
                  <Label htmlFor="owner" className="cursor-pointer">Salon Owner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="renter" id="renter" />
                  <Label htmlFor="renter" className="cursor-pointer">Booth Renter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer" className="cursor-pointer">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="freelancer" id="freelancer" />
                  <Label htmlFor="freelancer" className="cursor-pointer">Freelancer</Label>
                </div>
              </RadioGroup>
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
