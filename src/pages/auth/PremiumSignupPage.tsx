import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/auth';
import { UserRole } from '@/context/auth/types';
import { 
  CheckCircle, 
  Shield, 
  X, 
  Heart, 
  Sparkles, 
  Globe,
  Users,
  Star,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

// FOMO data generators
const generateRandomSignup = () => {
  const names = ['Jessica M.', 'Marcus T.', 'Sarah K.', 'Amanda R.', 'David L.', 'Maria G.', 'Chris P.', 'Lauren B.'];
  const cities = ['Miami', 'LA', 'NYC', 'Chicago', 'Dallas', 'Atlanta', 'Phoenix', 'Seattle'];
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    time: 'just now'
  };
};

/**
 * PremiumSignupPage - Ultra-Premium Signup Page
 * Billion-dollar design with instant signup modal and emphasis on FREE
 */
const PremiumSignupPage = () => {
  // State management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(true);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);
  const [liveCounter, setLiveCounter] = useState(1247);
  const [recentSignups, setRecentSignups] = useState([
    { name: 'Jessica M.', city: 'Miami', time: 'just now' },
    { name: 'Marcus T.', city: 'LA', time: '2 min ago' },
    { name: 'Sarah K.', city: 'NYC', time: '4 min ago' },
  ]);

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');

  // Live counter and recent signups effect
  useEffect(() => {
    // Update counter every 3-8 seconds
    const counterInterval = setInterval(() => {
      setLiveCounter(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, Math.random() * 5000 + 3000);

    // Update recent signups every 8-15 seconds
    const signupsInterval = setInterval(() => {
      setRecentSignups(prev => {
        const newSignup = generateRandomSignup();
        return [newSignup, ...prev.slice(0, 2)];
      });
    }, Math.random() * 7000 + 8000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(signupsInterval);
    };
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered && !isSubmitted && !showSignupModal) {
        setShowExitIntent(true);
        setExitIntentTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentTriggered, isSubmitted, showSignupModal]);

  // Analytics tracking
  useEffect(() => {
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Premium Signup Page',
        page_location: window.location.href
      });
    }
  }, []);

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle email input change with inline validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !isValidEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!fullName.trim()) {
      toast.error('Full name is required');
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
        setIsSubmitted(true);
        setShowSignupModal(false);
        setShowExitIntent(false);
        
        toast.success('Welcome to EmviApp! 🎉 Check your email for verification.');
        
        // Track successful signup
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
            value: 1.0,
            currency: 'USD'
          });
        }
        
        // Navigate based on role or redirect URL
        let targetUrl = '/dashboard';
        
        switch (role) {
          case 'artist':
            targetUrl = '/dashboard/artist';
            break;
          case 'salon':
            targetUrl = '/dashboard/salon';
            break;
          case 'customer':
            targetUrl = '/dashboard/customer';
            break;
          case 'freelancer':
            targetUrl = '/dashboard/freelancer';
            break;
          default:
            if (redirectUrl) {
              targetUrl = decodeURIComponent(redirectUrl);
            }
            break;
        }
        
        setTimeout(() => {
          navigate(targetUrl, { replace: true });
        }, 2000);
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Get Booked 3x Faster — Join 1,200+ Pros 100% FREE | EmviApp</title>
        <meta 
          name="description" 
          content="The exclusive platform where beauty professionals get discovered, build their client base, and earn more. Join 100% FREE — no hidden fees, no spam, no credit card needed." 
        />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content="Get Booked 3x Faster — Join 1,200+ Pros 100% FREE | EmviApp" />
        <meta property="og:description" content="The exclusive platform where beauty professionals get discovered, build their client base, and earn more. Join 100% FREE — no hidden fees, no spam, no credit card needed." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emvi.app/auth/premium-signup" />
        <meta property="og:image" content="https://emvi.app/og-signup-image.jpg" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Booked 3x Faster — Join 1,200+ Pros 100% FREE | EmviApp" />
        <meta name="twitter:description" content="The exclusive platform where beauty professionals get discovered, build their client base, and earn more. Join 100% FREE — no hidden fees, no spam, no credit card needed." />
        <meta name="twitter:image" content="https://emvi.app/og-signup-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://emvi.app/auth/premium-signup" />
      </Helmet>

      {/* Instant Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Header with Close Button */}
              <div className="relative flex-shrink-0 p-6 pb-4">
                <button
                  onClick={() => setShowSignupModal(false)}
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
                    Get Booked 3x Faster
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-xl mb-3"
                  >
                    <span className="text-xl font-bold text-white">Join 1,200+ Pros</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2 rounded-xl mb-4"
                  >
                    <span className="text-2xl font-bold text-white">100% FREE</span>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base text-gray-600 leading-relaxed"
                  >
                    The exclusive platform where beauty professionals get discovered, 
                    build their client base, and earn more. Limited spots available.
                  </motion.p>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {/* Signup Form */}
                {!isSubmitted ? (
                  <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        className={`h-12 text-base border-2 rounded-xl transition-all ${
                          emailError 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-purple-500'
                        }`}
                        required
                      />
                      {emailError && (
                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
                        Password *
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-1 block">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1 block">
                        I am a *
                      </Label>
                      <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                        <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-[150]">
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="artist">Artist</SelectItem>
                          <SelectItem value="salon">Salon Owner</SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !!emailError}
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:transform-none mt-6"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creating your account...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Heart className="h-5 w-5" />
                          ♡ Get My Spot FREE →
                        </div>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="text-center py-6"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">You're In! 🎉</h3>
                    <p className="text-lg text-gray-600 mb-3">
                      Welcome to EmviApp! Check your email for verification.
                    </p>
                    <p className="text-base text-purple-600 font-semibold">
                      Redirecting to your dashboard...
                    </p>
                  </motion.div>
                )}

                {/* Trust Signals */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 space-y-2"
                >
                  <div className="flex items-center justify-center gap-3 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="font-medium text-sm">No spam. Unsubscribe anytime.</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-600">
                    <Shield className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="font-medium text-sm">Your data is secure & encrypted.</span>
                  </div>
                  <div className="text-center pt-2">
                    <a 
                      href="/privacy-policy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 underline font-medium text-sm"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowExitIntent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
                  Wait! Don't Miss Out!
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Join 1,200+ professionals getting 3x more bookings.
                  <br />
                  <span className="font-semibold text-green-600 text-xl">100% FREE</span> — no hidden fees!
                </p>
                
                <Button
                  onClick={() => {
                    setShowExitIntent(false);
                    setShowSignupModal(true);
                  }}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  ♡ Get My Spot FREE →
                </Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  No spam. Unsubscribe anytime. Data protected.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/30">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold text-purple-600 font-serif">
                EmviApp
              </Link>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Home
                </Link>
                <Link to="/marketplace" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Marketplace
                </Link>
                <Link to="/book-services" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Book Services
                </Link>
                <Link to="/community" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Community
                </Link>
                <Link to="/blog" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Blog
                </Link>
                
                {/* Language Toggle */}
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <select className="text-sm text-gray-600 bg-transparent border-none focus:outline-none">
                    <option value="en">EN</option>
                    <option value="vi">VI</option>
                  </select>
                </div>
              </div>
              
              {/* Auth Buttons */}
              <div className="flex items-center gap-4">
                <Link 
                  to="/sign-in" 
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Button
                  onClick={() => setShowSignupModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Sign Up FREE
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section with Benefits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 font-serif leading-tight"
            >
              Get Booked 3x Faster
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3 rounded-2xl inline-block mt-4 text-white shadow-lg">
                Join 1,200+ Pros
              </span>
              <span className="block text-4xl md:text-6xl mt-4 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-bold">
                100% FREE
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              The exclusive platform where beauty professionals get discovered, 
              build their client base, and earn more. Limited spots available.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
                ✓ No Hidden Fees
              </div>
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
                ✓ No Credit Card Needed
              </div>
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
                ✓ Cancel Anytime
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={() => setShowSignupModal(true)}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
              >
                <Heart className="h-8 w-8 mr-3" />
                ♡ Get My Spot FREE →
              </Button>
            </motion.div>
          </div>

          {/* Live Counter and Recent Signups */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-green-500" />
                <span className="text-2xl font-bold text-green-800">✨ Recent Sign-Ups</span>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="text-lg text-green-700 mb-6 font-semibold">
                {liveCounter.toLocaleString()} professionals joined • Live counter
              </div>
              
              <div className="space-y-3">
                {recentSignups.map((signup, index) => (
                  <motion.div
                    key={`${signup.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg text-green-800 font-medium"
                  >
                    <strong>{signup.name}</strong> from {signup.city} just joined
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 font-serif mb-4">
                EmviApp
              </div>
              <p className="text-gray-600 mb-6">
                Connecting beauty professionals with clients worldwide
              </p>
              <div className="flex justify-center gap-8 text-sm">
                <Link to="/privacy" className="text-gray-500 hover:text-gray-700">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-500 hover:text-gray-700">
                  Terms of Service
                </Link>
                <Link to="/contact" className="text-gray-500 hover:text-gray-700">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PremiumSignupPage;