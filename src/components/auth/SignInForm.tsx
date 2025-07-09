
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

interface SignInFormProps {
  redirectUrl?: string | null;
}

const SignInForm = ({ redirectUrl }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await signIn(email, password);
      
      if (result) {
        // Decode the redirect URL if it exists, default to dashboard
        const decodedRedirect = redirectUrl ? decodeURIComponent(redirectUrl) : '/dashboard';
        // Use window.location.href for full page refresh to ensure auth state is properly updated
        window.location.href = decodedRedirect;
      }
    } catch (error) {
      // Error handling is done in the signIn method
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Trust Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Secure & Private</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>100% Free</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Industry Trusted</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-gray-700 italic">
            "EmviApp helped me find my dream job in just 3 days! The community is so supportive and genuine."
          </p>
          <p className="text-xs text-gray-600 mt-2 font-medium">— Maria S., Nail Technician, Los Angeles</p>
        </div>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden max-w-lg w-full mx-auto">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold text-center font-serif text-indigo-900">
            Welcome Back
          </CardTitle>
        </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="py-3 px-4"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-600">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="py-3 px-4"
              placeholder="••••••••"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to={`/auth/signup${redirectUrl ? `?redirect=${redirectUrl}` : ''}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
    </div>
  );
};

export default SignInForm;
