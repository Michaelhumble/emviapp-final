import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface ChatAuthFlowProps {
  userName: string;
  language: 'en' | 'vi';
  onAuthSuccess: () => void;
  onCancel: () => void;
}

export const ChatAuthFlow = ({ 
  userName, 
  language, 
  onAuthSuccess, 
  onCancel 
}: ChatAuthFlowProps) => {
  const [step, setStep] = useState<'email' | 'password' | 'signup'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const messages = {
    en: {
      getEmail: `Hi ${userName}! To continue, I'll need your email address. What's your email?`,
      getPassword: `Perfect! Now what's your password?`,
      needSignup: `Looks like you're new! Let's create your account. What password would you like to use?`,
      signupSuccess: `Welcome to EmviApp, ${userName}! Your account is ready!`,
      signinSuccess: `Welcome back, ${userName}! Great to see you again!`,
      error: 'Oops! Something went wrong. Let me help you try again.',
      emailPlaceholder: 'your.email@example.com',
      passwordPlaceholder: 'Your password',
      continue: 'Continue',
      createAccount: 'Create Account',
      cancel: 'Cancel'
    },
    vi: {
      getEmail: `Chào ${userName}! Để tiếp tục, em cần email của anh/chị. Email của anh/chị là gì ạ?`,
      getPassword: `Tuyệt vời! Bây giờ mật khẩu của anh/chị là gì ạ?`,
      needSignup: `Có vẻ anh/chị là người mới! Hãy tạo tài khoản nhé. Anh/chị muốn dùng mật khẩu nào ạ?`,
      signupSuccess: `Chào mừng ${userName} đến với EmviApp! Tài khoản của anh/chị đã sẵn sàng!`,
      signinSuccess: `Chào mừng ${userName} trở lại! Rất vui được gặp lại anh/chị!`,
      error: 'Ối! Có gì đó không đúng. Để em giúp anh/chị thử lại nhé.',
      emailPlaceholder: 'email.cua.ban@example.com',
      passwordPlaceholder: 'Mật khẩu của bạn',
      continue: 'Tiếp tục',
      createAccount: 'Tạo tài khoản',
      cancel: 'Hủy'
    }
  };

  const t = messages[language];

  const handleEmailSubmit = async () => {
    if (!email.trim()) return;
    
    setIsLoading(true);
    try {
      // Try to sign in to check if user exists
      const { error } = await signIn(email, 'dummy-password');
      
      if (error?.message?.includes('Invalid login credentials')) {
        // User doesn't exist, go to signup
        setStep('signup');
      } else {
        // User exists, get password
        setStep('password');
      }
    } catch (e) {
      setStep('password'); // Default to password step
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!password.trim()) return;
    
    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message?.includes('Invalid login credentials')) {
          setStep('signup');
          return;
        }
        throw error;
      }
      
      toast.success(t.signinSuccess);
      onAuthSuccess();
    } catch (e) {
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async () => {
    if (!password.trim()) return;
    
    setIsLoading(true);
    try {
      const { error } = await signUp(email, password);
      
      if (error) throw error;
      
      toast.success(t.signupSuccess);
      onAuthSuccess();
    } catch (e) {
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-lg border border-blue-200/30 backdrop-blur-sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-700 font-medium">
          {step === 'email' && t.getEmail}
          {step === 'password' && t.getPassword}
          {step === 'signup' && t.needSignup}
        </p>

        {step === 'email' && (
          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="pl-10"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleEmailSubmit}
                disabled={!email.trim() || isLoading}
                className="flex-1"
                size="sm"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {t.continue}
              </Button>
              <Button variant="outline" onClick={onCancel} size="sm">
                {t.cancel}
              </Button>
            </div>
          </div>
        )}

        {(step === 'password' || step === 'signup') && (
          <div className="space-y-3">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="pl-10"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && (step === 'password' ? handlePasswordSubmit() : handleSignUpSubmit())}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={step === 'password' ? handlePasswordSubmit : handleSignUpSubmit}
                disabled={!password.trim() || isLoading}
                className="flex-1"
                size="sm"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <User className="h-4 w-4" />}
                {step === 'signup' ? t.createAccount : t.continue}
              </Button>
              <Button variant="outline" onClick={onCancel} size="sm">
                {t.cancel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};