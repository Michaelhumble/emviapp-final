
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/context/auth/types";
import EmviLogo from "@/components/branding/EmviLogo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { signUpWithEmail } from "@/services/auth";
import { supabase } from "@/integrations/supabase/client";

// Define invite details type for clarity
interface InviteDetails {
  valid: boolean;
  salon_name?: string;
  role?: string;
  phone_match?: boolean;
  message?: string;
}

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('invite');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [inviteDetails, setInviteDetails] = useState<InviteDetails | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    const validateInvite = async () => {
      if (!inviteToken) return;

      try {
        const { data, error } = await supabase.rpc('validate_team_invite', {
          p_invite_code: inviteToken,
          p_phone_number: phone
        });

        if (error) throw error;
        
        // Make sure data is properly typed
        if (typeof data === 'object') {
          setInviteDetails(data as InviteDetails);
          
          // Pre-fill role if invite specifies one
          if (data.role) {
            setRole(data.role as UserRole);
          }
        }
      } catch (error) {
        console.error('Error validating invite:', error);
      }
    };

    validateInvite();
  }, [inviteToken, phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await signUpWithEmail(email, password, {
        full_name: fullName,
        role: role,
        phone: phone,
        profile_completion: 10,
        completed_profile_tasks: ['account_created']
      });
      
      if (result.success) {
        // If there's an invite token, try to accept it
        if (inviteToken) {
          try {
            const { data } = await supabase.rpc('accept_team_invite', {
              p_invite_code: inviteToken,
              p_user_id: result.user?.id
            });

            if (data) {
              toast.success('Successfully joined the team!');
            }
          } catch (inviteError) {
            console.error('Error accepting invite:', inviteError);
          }
        }

        setSignupSuccess(true);
      } else {
        setError(result.error?.message || "Failed to create account");
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      setError(error.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] p-4 bg-background">
        <Card className="w-full max-w-md">
          <div className="flex justify-center pt-6">
            <EmviLogo size="large" />
          </div>
          
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {inviteDetails?.salon_name 
                ? `Join ${inviteDetails.salon_name}` 
                : 'Create an Account'}
            </CardTitle>
            <CardDescription className="text-center">
              {inviteDetails?.role 
                ? `You're being invited as a ${inviteDetails.role}` 
                : 'Enter your information to get started'}
            </CardDescription>
          </CardHeader>
          
          {signupSuccess ? (
            <CardContent className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Account created successfully!</AlertTitle>
                <AlertDescription className="text-green-700">
                  <p className="mt-2">✅ Please check your email to verify your account.</p>
                  <p className="mt-2">Once verified, you'll be able to sign in and access your dashboard.</p>
                </AlertDescription>
              </Alert>
              <div className="flex flex-col space-y-4 mt-4">
                <Link to="/auth/signin">
                  <Button variant="outline" className="w-full">
                    Go to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your name"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select 
                    value={role}
                    onValueChange={(value) => setRole(value as UserRole)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="artist">Nail Artist</SelectItem>
                      <SelectItem value="nail technician/artist">Nail Technician</SelectItem>
                      <SelectItem value="salon">Salon</SelectItem>
                      <SelectItem value="owner">Salon Owner</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="beauty supplier">Beauty Supplier</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              
              {/* New phone field for invite verification */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 555-5555"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Phone mismatch warning for invites */}
              {inviteDetails && !inviteDetails.phone_match && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mt-4">
                  <p className="text-yellow-800">
                    ⚠️ The phone number doesn't match the team invite. 
                    Ask your salon to resend the invite.
                  </p>
                </div>
              )}

              <CardFooter className="flex flex-col space-y-4 pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || (inviteDetails && !inviteDetails.phone_match)}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default SignUp;
