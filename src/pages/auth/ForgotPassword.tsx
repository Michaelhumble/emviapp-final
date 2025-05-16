import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { getLanguagePreference } from "@/utils/languagePreference";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const language = getLanguagePreference();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    if (!email || !email.includes('@')) {
      setError(language === 'en' ? 'Please enter a valid email address' : 'Vui lòng nhập địa chỉ email hợp lệ');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setEmail("");
      toast.success(
        language === 'en' 
          ? 'Password reset link sent to your email' 
          : 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn'
      );
    } catch (error: any) {
      console.error("Password reset error:", error);
      setError(error.message || 'An error occurred while sending the reset link');
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    en: {
      title: "Reset Your Password",
      description: "Enter your email address and we'll send you a link to reset your password",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      resetButton: "Send Reset Link",
      sendingButton: "Sending...",
      backToSignIn: "Back to Sign In",
      successMessage: "Check your inbox",
      successDescription: "We've sent a password reset link to your email address.",
    },
    vi: {
      title: "Đặt Lại Mật Khẩu",
      description: "Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu",
      emailLabel: "Email",
      emailPlaceholder: "email@cuaban.com",
      resetButton: "Gửi Liên Kết Đặt Lại",
      sendingButton: "Đang gửi...",
      backToSignIn: "Quay lại Đăng Nhập",
      successMessage: "Kiểm tra hộp thư đến của bạn",
      successDescription: "Chúng tôi đã gửi liên kết đặt lại mật khẩu đến địa chỉ email của bạn.",
    }
  };

  const t = translations[language === 'vi' ? 'vi' : 'en'];

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] p-4 bg-background">
        <Card className="w-full max-w-md">
          <div className="flex justify-center pt-6">
            <Logo size="large" showText={true} />
          </div>
          
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
            <CardDescription className="text-center">
              {t.description}
            </CardDescription>
          </CardHeader>
          
          {success ? (
            <CardContent className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 font-medium">
                  {t.successMessage}
                </AlertDescription>
                <p className="text-green-600 mt-2 text-sm">
                  {t.successDescription}
                </p>
              </Alert>
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
                  <Label htmlFor="email">{t.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
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
                      {t.sendingButton}
                    </>
                  ) : (
                    t.resetButton
                  )}
                </Button>
                
                <div className="text-sm text-center text-gray-500">
                  <Link to="/auth/signin" className="text-primary hover:underline">
                    {t.backToSignIn}
                  </Link>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
