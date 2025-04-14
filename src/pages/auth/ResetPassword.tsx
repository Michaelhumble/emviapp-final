
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, KeyRound } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { getLanguagePreference } from "@/utils/languagePreference";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();
  const language = getLanguagePreference();

  // Check if we have a session with access token
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.access_token) {
        setHasToken(true);
      } else {
        setHasToken(false);
        setError(language === 'en' 
          ? 'Invalid or expired reset link. Please request a new password reset.' 
          : 'Liên kết đặt lại không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu đặt lại mật khẩu mới.');
      }
    };
    
    checkSession();
  }, [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (password.length < 6) {
      setError(language === 'en' 
        ? 'Password must be at least 6 characters long' 
        : 'Mật khẩu phải có ít nhất 6 ký tự');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(language === 'en' 
        ? 'Passwords do not match' 
        : 'Mật khẩu không khớp');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      toast.success(language === 'en' 
        ? 'Password has been reset successfully!' 
        : 'Mật khẩu đã được đặt lại thành công!');
      
      // Redirect to sign in page after successful reset
      setTimeout(() => {
        navigate('/auth/signin');
      }, 1500);
    } catch (error: any) {
      console.error("Password update error:", error);
      setError(error.message || (language === 'en' 
        ? 'Failed to reset password. Please try again.' 
        : 'Không thể đặt lại mật khẩu. Vui lòng thử lại.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    en: {
      title: "Create New Password",
      description: "Enter and confirm your new password",
      passwordLabel: "New Password",
      confirmPasswordLabel: "Confirm Password",
      resetButton: "Reset Password",
      resettingButton: "Resetting...",
      backToSignIn: "Back to Sign In",
      invalidToken: "Invalid or expired reset link",
      requestNewLink: "Please request a new password reset link",
      requestLinkButton: "Request New Link"
    },
    vi: {
      title: "Tạo Mật Khẩu Mới",
      description: "Nhập và xác nhận mật khẩu mới của bạn",
      passwordLabel: "Mật Khẩu Mới",
      confirmPasswordLabel: "Xác Nhận Mật Khẩu",
      resetButton: "Đặt Lại Mật Khẩu",
      resettingButton: "Đang đặt lại...",
      backToSignIn: "Quay lại Đăng Nhập",
      invalidToken: "Liên kết đặt lại không hợp lệ hoặc đã hết hạn",
      requestNewLink: "Vui lòng yêu cầu liên kết đặt lại mật khẩu mới",
      requestLinkButton: "Yêu Cầu Liên Kết Mới"
    }
  };

  const t = translations[language === 'vi' ? 'vi' : 'en'];

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] p-4 bg-background">
        <Card className="w-full max-w-md">
          <div className="flex justify-center pt-6">
            <EmviLogo size="large" />
          </div>
          
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
            <CardDescription className="text-center">
              {t.description}
            </CardDescription>
          </CardHeader>
          
          {!hasToken ? (
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium">{t.invalidToken}</p>
                  <p className="mt-1">{t.requestNewLink}</p>
                </AlertDescription>
              </Alert>
              
              <Button 
                className="w-full mt-4"
                onClick={() => navigate('/forgot-password')}
              >
                {t.requestLinkButton}
              </Button>
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
                  <Label htmlFor="password">{t.passwordLabel}</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.confirmPasswordLabel}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    minLength={6}
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
                      {t.resettingButton}
                    </>
                  ) : (
                    <>
                      <KeyRound className="mr-2 h-4 w-4" />
                      {t.resetButton}
                    </>
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

export default ResetPassword;
