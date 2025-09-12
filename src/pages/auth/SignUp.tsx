import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Logo from "@/components/ui/Logo";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'customer' | 'artist' | 'salon_owner' | 'freelancer'>('customer');
  const [loading, setLoading] = useState(false);
  const [showPhoneSignUp, setShowPhoneSignUp] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      if (data.user) {
        // Insert profile with role
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: fullName,
          email: email,
          role: role
        });

        toast.success('Account created successfully!');
        
        // Route directly to correct dashboard
        routeByRole(role);
      }
    } catch (error: any) {
      console.error('Sign-up error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneClick = () => {
    setShowPhoneSignUp(true);
    toast.info('Phone signup coming soon!');
  };

  const routeByRole = (userRole: string) => {
    switch (userRole) {
      case 'salon_owner':
        navigate('/dashboard/salon');
        break;
      case 'artist':
        navigate('/dashboard/profile');
        break;
      case 'freelancer':
        navigate('/dashboard/profile');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white">
      <Helmet>
        <title>Join Our Beauty Community | EmviApp</title>
        <meta name="description" content="Create your EmviApp account and join the beauty community" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://emviapp-final.vercel.app/auth/signup" />
      </Helmet>

      {/* Minimal top navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <Logo size="small" showText={true} />
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/jobs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Jobs
          </Link>
          <Link to="/salons" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Salons
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif text-center">Join Our Beauty Community</CardTitle>
          <CardDescription className="text-center">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>I am a:</Label>
              <RadioGroup value={role} onValueChange={(value: any) => setRole(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="artist" id="artist" />
                  <Label htmlFor="artist">Artist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="salon_owner" id="salon_owner" />
                  <Label htmlFor="salon_owner">Salon Owner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="freelancer" id="freelancer" />
                  <Label htmlFor="freelancer">Freelancer</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Join Our Beauty Community'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <SocialAuthButtons mode="signup" onPhoneClick={handlePhoneClick} />

          <div className="text-center text-sm">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/auth/signin')}
              className="text-indigo-600 hover:text-indigo-700 underline"
            >
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Soft call-to-action link */}
      <div className="text-center mt-6">
        <Link 
          to="/" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Not ready yet? Explore EmviApp →
        </Link>
      </div>
    </div>
  </div>
</div>
  );
};

export default SignUp;