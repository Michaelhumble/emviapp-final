import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/auth';
import { UserRole } from '@/context/auth/types';
import { X, Loader2, Globe } from 'lucide-react';
import { toast } from 'sonner';

// Translation objects
const translations = {
  en: {
    title: "Get Booked 3x Faster",
    joinPros: "Join 1,200+ Pros - ",
    free: "100% FREE",
    limitedOffer: "Post your first job FREE — limited spots available!",
    noHiddenFees: "No Hidden Fees",
    noCreditCard: "No Credit Card Needed",
    cancelAnytime: "Cancel Anytime",
    description: "The exclusive platform where beauty professionals get discovered, build their client base, and earn more. Limited spots available.",
    emailLabel: "Email Address *",
    emailPlaceholder: "Enter your best email address",
    passwordLabel: "Create Password *",
    passwordPlaceholder: "Create a secure password (minimum 6 characters)",
    nameLabel: "Full Name *",
    namePlaceholder: "Enter your full name",
    roleLabel: "I am a *",
    rolePlaceholder: "Choose your professional role",
    customerRole: "Customer Looking for Services",
    artistRole: "Beauty Artist",
    salonRole: "Salon Owner",
    freelancerRole: "Freelance Professional",
    submitButton: "♡ ♡ Get My Spot FREE →",
    creatingAccount: "Creating Your Account...",
    recentSignups: "Recent Sign-Ups •",
    professionalsJoined: "professionals joined • Live counter",
    justJoined: "just joined",
    privacyText: "By signing up, you agree to our",
    privacyLink: "Privacy Policy",
    privacyDisclaimer: ". We will never spam you or sell your data. Unsubscribe anytime.",
    // Error messages
    emailRequired: "Email is required",
    invalidEmail: "Please enter a valid email address",
    passwordTooShort: "Password must be at least 6 characters",
    nameRequired: "Full name is required",
    welcomeMessage: "Welcome to EmviApp! 🎉 Check your email for verification.",
    errorMessage: "Something went wrong. Please try again."
  },
  vi: {
    title: "Tăng Lượng Khách 3 Lần",
    joinPros: "Tham gia cùng 1,200+ Chuyên gia - ",
    free: "100% MIỄN PHÍ",
    limitedOffer: "Đăng tin tuyển dụng đầu tiên MIỄN PHÍ — số lượng có hạn!",
    noHiddenFees: "Không Phí Ẩn",
    noCreditCard: "Không Cần Thẻ Tín Dụng",
    cancelAnytime: "Hủy Bất Kỳ Lúc Nào",
    description: "Nền tảng độc quyền nơi các chuyên gia làm đẹp được khám phá, xây dựng cơ sở khách hàng và kiếm nhiều hơn. Số lượng có hạn.",
    emailLabel: "Địa Chỉ Email *",
    emailPlaceholder: "Nhập địa chỉ email tốt nhất của bạn",
    passwordLabel: "Tạo Mật Khẩu *",
    passwordPlaceholder: "Tạo mật khẩu an toàn (tối thiểu 6 ký tự)",
    nameLabel: "Họ Và Tên *",
    namePlaceholder: "Nhập họ và tên của bạn",
    roleLabel: "Tôi là *",
    rolePlaceholder: "Chọn vai trò chuyên môn của bạn",
    customerRole: "Khách Hàng Tìm Dịch Vụ",
    artistRole: "Nghệ Sĩ Làm Đẹp",
    salonRole: "Chủ Salon",
    freelancerRole: "Chuyên Gia Tự Do",
    submitButton: "♡ ♡ Nhận Chỗ MIỄN PHÍ →",
    creatingAccount: "Đang Tạo Tài Khoản...",
    recentSignups: "Đăng Ký Gần Đây •",
    professionalsJoined: "chuyên gia đã tham gia • Bộ đếm trực tiếp",
    justJoined: "vừa tham gia",
    privacyText: "Bằng cách đăng ký, bạn đồng ý với",
    privacyLink: "Chính Sách Bảo Mật",
    privacyDisclaimer: " của chúng tôi. Chúng tôi sẽ không spam hoặc bán dữ liệu của bạn. Hủy đăng ký bất cứ lúc nào.",
    // Error messages
    emailRequired: "Email là bắt buộc",
    invalidEmail: "Vui lòng nhập địa chỉ email hợp lệ",
    passwordTooShort: "Mật khẩu phải có ít nhất 6 ký tự",
    nameRequired: "Họ và tên là bắt buộc",
    welcomeMessage: "Chào mừng đến với EmviApp! 🎉 Kiểm tra email để xác minh.",
    errorMessage: "Đã xảy ra lỗi. Vui lòng thử lại."
  }
};

const generateRandomSignup = (language: 'en' | 'vi' = 'en') => {
  const names = language === 'vi' 
    ? ['Nguyễn H.', 'Trần M.', 'Lê T.', 'Phạm L.', 'Hoàng N.', 'Vũ A.', 'Đặng K.', 'Bùi T.']
    : ['Jessica M.', 'Marcus T.', 'Sarah K.', 'Amanda R.', 'David L.', 'Maria G.', 'Chris P.', 'Lauren B.'];
  
  const cities = language === 'vi'
    ? ['TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Nha Trang', 'Huế', 'Vũng Tàu']
    : ['Miami', 'LA', 'NYC', 'Chicago', 'Dallas', 'Atlanta', 'Phoenix', 'Seattle'];
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    time: language === 'vi' ? 'vừa xong' : 'just now'
  };
};

interface PremiumSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumSignupModal: React.FC<PremiumSignupModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [liveCounter, setLiveCounter] = useState(1247);
  const [recentSignups, setRecentSignups] = useState([
    { name: 'Jessica M.', city: 'Miami', time: 'just now' },
    { name: 'Marcus T.', city: 'LA', time: '2 min ago' },
    { name: 'Sarah K.', city: 'NYC', time: '4 min ago' },
  ]);

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const t = translations[language];

  // Initialize language-specific signups
  useEffect(() => {
    const initialSignups = [
      generateRandomSignup(language),
      generateRandomSignup(language),
      generateRandomSignup(language)
    ];
    setRecentSignups(initialSignups);
  }, [language]);

  // Live counter and recent signups effect
  useEffect(() => {
    if (!isOpen) return;

    // Update counter every 3-8 seconds
    const counterInterval = setInterval(() => {
      setLiveCounter(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, Math.random() * 5000 + 3000);

    // Update recent signups every 8-15 seconds
    const signupsInterval = setInterval(() => {
      setRecentSignups(prev => {
        const newSignup = generateRandomSignup(language);
        return [newSignup, ...prev.slice(0, 2)];
      });
    }, Math.random() * 7000 + 8000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(signupsInterval);
    };
  }, [isOpen, language]);

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle email input change with inline validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !isValidEmail(value)) {
      setEmailError(t.invalidEmail);
    } else {
      setEmailError('');
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError(t.emailRequired);
      return;
    }
    
    if (!isValidEmail(email)) {
      setEmailError(t.invalidEmail);
      return;
    }

    if (!password || password.length < 6) {
      toast.error(t.passwordTooShort);
      return;
    }

    if (!fullName.trim()) {
      toast.error(t.nameRequired);
      return;
    }

    setIsSubmitting(true);
    setEmailError('');
    
    try {
      const result = await signUp(email, password, {
        full_name: fullName.trim(),
        role: role,
        user_type: role
      });
      
      if (result.success) {
        onClose();
        toast.success(t.welcomeMessage);
        
        // Track successful signup
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
            value: 1.0,
            currency: 'USD'
          });
        }
        
        // Redirect to main page after successful signup
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header with Close Button and Language Toggle */}
            <div className="relative flex-shrink-0 p-6 pb-4">
              {/* Language Toggle Button */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors z-10"
              >
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'Tiếng Việt' : 'English'}
              </button>
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="text-center pr-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif"
                >
                  {t.title}
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3"
                >
                  <span className="text-xl font-semibold text-purple-600">{t.joinPros}</span>
                  <span className="text-3xl font-bold text-green-600">{t.free}</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl mb-4"
                >
                  <span className="text-lg font-bold text-orange-600">"{t.limitedOffer}"</span>
                </motion.div>

                {/* Free Features Checkmarks */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2 mb-4"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-green-800 font-medium">{t.noHiddenFees}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-green-800 font-medium">{t.noCreditCard}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-green-800 font-medium">{t.cancelAnytime}</span>
                  </div>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base text-gray-600 leading-relaxed"
                >
                  {t.description}
                </motion.p>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {/* Signup Form */}
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* Form Section 1: Contact Details */}
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-800 mb-2 block">
                      {t.emailLabel}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={handleEmailChange}
                      className={`h-12 text-base border-2 rounded-2xl transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md ${
                        emailError 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100'
                      }`}
                      required
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center">!</span>
                        {emailError}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-800 mb-2 block">
                      {t.passwordLabel}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 rounded-2xl transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                </div>

                {/* Form Section 2: Personal Details */}
                <div className="space-y-5 pt-2">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-800 mb-2 block">
                      {t.nameLabel}
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 rounded-2xl transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-sm font-semibold text-gray-800 mb-2 block">
                      {t.roleLabel}
                    </Label>
                    <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                      <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 rounded-2xl transition-all duration-300 bg-gray-50/50 hover:bg-white shadow-sm hover:shadow-md">
                        <SelectValue placeholder={t.rolePlaceholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 rounded-2xl shadow-xl z-[150]">
                        <SelectItem value="customer" className="rounded-xl">{t.customerRole}</SelectItem>
                        <SelectItem value="artist" className="rounded-xl">{t.artistRole}</SelectItem>
                        <SelectItem value="salon" className="rounded-xl">{t.salonRole}</SelectItem>
                        <SelectItem value="freelancer" className="rounded-xl">{t.freelancerRole}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t.creatingAccount}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>{t.submitButton}</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Live Counter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-6"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-green-600">✨</span>
                      <span className="text-sm font-semibold text-green-800">
                        {t.recentSignups} {liveCounter.toLocaleString()} {t.professionalsJoined}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {recentSignups.slice(0, 2).map((signup, index) => (
                        <motion.div
                          key={`${signup.name}-${signup.time}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 * index }}
                          className="text-sm text-green-700"
                        >
                          {signup.name} {language === 'vi' ? 'từ' : 'from'} {signup.city} {t.justJoined}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Privacy Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-center text-sm text-gray-500 pt-2"
                >
                  {t.privacyText}{' '}
                  <a href="/privacy" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {t.privacyLink}
                  </a>
                  {t.privacyDisclaimer}
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumSignupModal;