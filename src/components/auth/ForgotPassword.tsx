
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

/**
 * ForgotPassword component for password reset functionality
 * 
 * @component
 * @returns {JSX.Element} Forgot password component
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  /**
   * Handles form submission for password reset
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setFormSuccess(`Password reset instructions sent to ${email}. Please check your email inbox.`);
    } catch (error: any) {
      console.error("Password reset error:", error);
      setFormError(error.message || "Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-indigo-50/30 rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center font-serif text-indigo-900">
              Reset Your Password
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Display form errors */}
              {formError && (
                <Alert variant="destructive" className="animate-in fade-in-50 slide-in-from-top-5">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              
              {/* Display success messages */}
              {formSuccess && (
                <Alert className="bg-green-50 border-green-200 animate-in fade-in-50 slide-in-from-top-5">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">{formSuccess}</AlertDescription>
                </Alert>
              )}
              
              {!formSuccess && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 mb-4">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                    Email Address
                  </Label>
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
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
              {!formSuccess ? (
                <Button
                  type="submit"
                  className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Instructions...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  className="w-full py-6"
                  variant="outline"
                  onClick={() => setFormSuccess(null)}
                >
                  Send Again
                </Button>
              )}
              
              <Link to="/sign-in" className="flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
