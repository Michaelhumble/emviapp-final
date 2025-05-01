
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * ForgotPassword component for password reset functionality
 * 
 * @component
 * @returns {JSX.Element} Forgot password form component
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  /**
   * Handles the password reset request submission
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });

      if (error) {
        setFormError(error.message || "Failed to send reset email");
      } else {
        setFormSuccess(
          "Password reset instructions have been sent to your email address."
        );
      }
    } catch (error: any) {
      setFormError(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
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
              {/* Error Alert */}
              {formError && (
                <Alert variant="destructive" className="animate-in fade-in-50 slide-in-from-top-5">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {/* Success Alert */}
              {formSuccess && (
                <Alert className="bg-green-50 border-green-200 animate-in fade-in-50 slide-in-from-top-5">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">{formSuccess}</AlertDescription>
                </Alert>
              )}

              {!formSuccess && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Enter your email address below and we'll send you instructions on how to reset your password.
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="py-3 px-4"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
              {!formSuccess ? (
                <Button
                  type="submit"
                  className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full" 
                  onClick={() => {
                    setEmail("");
                    setFormSuccess(null);
                  }}
                >
                  Send Again
                </Button>
              )}

              <div className="text-sm text-center text-gray-500">
                <Link to="/sign-in" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
