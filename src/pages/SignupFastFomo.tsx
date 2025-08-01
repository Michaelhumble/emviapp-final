import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthState } from '@/hooks/useAuthState';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  Sparkles,
  Heart,
  Shield,
  Target,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

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
 * SignupFastFomo - Premium Fast FOMO Signup Page
 * High-converting standalone signup page optimized for Facebook ads
 * Features: Exit-intent popup, live counter, countdown timer, social proof
 */
const SignupFastFomo = () => {
  // State management
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);
  const [liveCounter, setLiveCounter] = useState(1247);
  const [recentSignups, setRecentSignups] = useState([
    { name: 'Jessica M.', city: 'Miami', time: 'just now' },
    { name: 'Marcus T.', city: 'LA', time: '2 min ago' },
    { name: 'Sarah K.', city: 'NYC', time: '4 min ago' },
  ]);

  // Calculate launch date (48 hours from now)
  const [launchDate] = useState(() => new Date(Date.now() + 48 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { signUp } = useAuthState();
  const { toast } = useToast();

  // Countdown timer effect - counts down to actual launch date
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

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
      if (e.clientY <= 0 && !exitIntentTriggered && !isSubmitted) {
        setShowExitIntent(true);
        setExitIntentTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentTriggered, isSubmitted]);

  // Analytics tracking
  useEffect(() => {
    // Track page visit
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Fast FOMO Signup',
        page_location: window.location.href
      });
    }
  }, []);

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await signUp(email, 'tempPassword123!', {
        full_name: name.trim() || undefined,
        user_type: 'artist'
      });
      
      setIsSubmitted(true);
      setShowExitIntent(false);
      toast({
        title: "Welcome to EmviApp! 🎉",
        description: "You're now on the early access list. Check your email for next steps!",
      });
      
      // Track successful signup
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
          value: 1.0,
          currency: 'USD'
        });
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Exit intent popup submission
  const handleExitIntentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <>
      <Helmet>
        <title>Get Booked 3x Faster - Join 1,200+ Beauty Pros | EmviApp</title>
        <meta 
          name="description" 
          content="Join the exclusive platform where beauty professionals get discovered, build their client base, and earn 3x more. Limited early access spots available!" 
        />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content="Get Booked 3x Faster - Join 1,200+ Beauty Pros | EmviApp" />
        <meta property="og:description" content="Join the exclusive platform where beauty professionals get discovered, build their client base, and earn 3x more. Limited early access spots available!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emvi.app/signup-fast-fomo" />
        <meta property="og:image" content="https://emvi.app/og-signup-image.jpg" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Booked 3x Faster - Join 1,200+ Beauty Pros | EmviApp" />
        <meta name="twitter:description" content="Join the exclusive platform where beauty professionals get discovered, build their client base, and earn 3x more. Limited early access spots available!" />
        <meta name="twitter:image" content="https://emvi.app/og-signup-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://emvi.app/signup-fast-fomo" />
      </Helmet>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowExitIntent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Wait! Don't Miss Out! 🎯
                </h3>
                <p className="text-gray-600 mb-6">
                  Join 1,200+ professionals who are already getting 3x more bookings. 
                  Secure your early access spot before it's too late!
                </p>
                
                <form onSubmit={handleExitIntentSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email for instant access"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    {isSubmitting ? 'Securing...' : '♡ Get My Spot FREE →'}
                  </Button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4">
                  No spam. Unsubscribe anytime. Data protected.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold text-purple-600 font-playfair">
                EmviApp
              </Link>
              
              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/sign-in" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-playfair"
            >
              Get Booked 3x Faster<br />
              <span className="bg-yellow-300 px-4 py-2 rounded-lg inline-block mt-2">
                Join 1,200+ Pros
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              The exclusive platform where beauty professionals get discovered, 
              build their client base, and earn more. Limited spots available.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4 mb-12"
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-lg p-4 min-w-[80px]">
                    <div className="text-2xl font-bold font-mono">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs uppercase tracking-wide">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Social Proof & Benefits */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8 lg:order-1 order-2"
            >
              {/* Live Recent Sign-ups */}
              <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-800">✨ Recent Sign-Ups</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="text-sm text-green-700 mb-3 font-medium">
                  {liveCounter.toLocaleString()} professionals joined • Live counter
                </div>
                
                <div className="space-y-2">
                  {recentSignups.map((signup, index) => (
                    <motion.div
                      key={`${signup.name}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-green-800"
                    >
                      <strong>{signup.name}</strong> from {signup.city} just joined
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Why Join Now */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Join Now?</h3>
                <div className="space-y-4">
                  {[
                    { icon: Target, text: 'Get 3x more bookings than other platforms' },
                    { icon: TrendingUp, text: 'Average artist earns $2,400+ extra per month' },
                    { icon: Users, text: 'Connect with 10,000+ verified clients' },
                    { icon: Sparkles, text: 'AI-powered matching finds your perfect clients' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Testimonial */}
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "I've tripled my bookings since joining EmviApp. The clients are amazing 
                  and the platform makes everything so easy!"
                </blockquote>
                <cite className="text-sm font-semibold text-purple-700">
                  — Jessica Martinez, Nail Artist, Miami
                </cite>
              </Card>
            </motion.div>

            {/* Right Side - Signup Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-24 lg:order-2 order-1"
            >
              <Card className="p-8 bg-white shadow-xl border-2 border-purple-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">
                    Secure Your Spot
                  </h2>
                  <p className="text-gray-600">
                    Join the waitlist and get instant access when we launch in your area.
                  </p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 text-base"
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Securing your spot...
                        </div>
                      ) : (
                        <>
                          <Heart className="h-5 w-5 mr-2" />
                          ♡ Get Early Access FREE →
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">You're In! 🎉</h3>
                    <p className="text-gray-600">
                      Check your email for your early access invitation.
                    </p>
                  </div>
                )}

                {/* Trust Signals */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No spam, unsubscribe anytime</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Your data is secure & encrypted</span>
                  </div>
                  <div className="text-center">
                    <a 
                      href="/privacy-policy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 hover:text-purple-700 underline"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Scarcity Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 py-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't Miss Out – Limited Spots Available
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We're accepting only the first 2,000 beauty professionals to ensure 
              the best experience for everyone. Secure your spot before it's too late.
            </p>
            
            <div className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-purple-600 hover:text-purple-700 underline">
                Sign in here
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignupFastFomo;