import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Heart,
  TrendingUp,
  Sparkles,
  Timer,
  UserPlus
} from 'lucide-react';

/**
 * SignupFastFomo - High-converting standalone signup landing page
 * Optimized for Facebook ads with FOMO tactics and minimal friction
 * Features: Live counter, countdown timer, social proof, mobile-first design
 */
const SignupFastFomo = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // FOMO elements state
  const [liveCounter, setLiveCounter] = useState(1247); // Starting count
  const [recentJoiners, setRecentJoiners] = useState<string[]>([
    'Jessica M. from Miami', 
    'Marcus T. from LA', 
    'Sarah K. from NYC'
  ]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 23,
    seconds: 45
  });

  const navigate = useNavigate();

  /**
   * Live counter simulation - increments every 8-15 seconds
   * Simulates real-time sign-ups for FOMO effect
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter(prev => prev + 1);
      
      // Add new joiner every few increments
      if (Math.random() < 0.3) {
        const newJoiners = [
          'Alex R. from Austin', 'Maria L. from Chicago', 'David W. from Seattle',
          'Lisa P. from Boston', 'James H. from Denver', 'Emma S. from Portland',
          'Tyler M. from Dallas', 'Rachel C. from Phoenix', 'Kevin L. from Atlanta'
        ];
        const randomJoiner = newJoiners[Math.floor(Math.random() * newJoiners.length)];
        
        setRecentJoiners(prev => [randomJoiner, ...prev.slice(0, 2)]);
      }
    }, Math.random() * 7000 + 8000); // 8-15 seconds

    return () => clearInterval(interval);
  }, []);

  /**
   * Countdown timer - creates urgency with 48-hour window
   * Resets daily to maintain pressure
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 48 hours when timer expires
          hours = 47;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Email validation
   */
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Form submission handler
   * Integrates with existing Supabase auth system
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Use existing Supabase sign-up with minimal info
      const { data, error } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36).slice(-8) + 'A1!', // Temporary password
        options: {
          data: {
            full_name: name || email.split('@')[0],
            role: 'customer', // Default to customer for lead capture
            source: 'fomo_landing_page'
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast.error('Something went wrong. Please try again.');
        return;
      }

      // Track conversion
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'signup_conversion', {
          event_category: 'conversion',
          event_label: 'fomo_landing_page',
          value: 1
        });
      }

      setIsSubmitted(true);
      toast.success('🎉 Welcome to EmviApp! Check your email to complete setup.');
      
      // Delay redirect to show success state
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Success screen after form submission
   */
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-purple-600 to-pink-600 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 text-center max-w-md w-full"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're In! 🎉</h2>
          <p className="text-gray-600 mb-4">
            Welcome to the EmviApp community. Check your email to complete your setup.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting to your dashboard...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Join 1,200+ Beauty Pros Getting Booked Daily | EmviApp Early Access</title>
        <meta 
          name="description" 
          content="Limited-time early access to EmviApp - the platform where beauty professionals get booked 3x faster. Join 1,200+ artists already earning more." 
        />
        <meta name="keywords" content="beauty professional booking, salon app, nail technician jobs, beauty career" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Join 1,200+ Beauty Pros Getting Booked Daily | EmviApp" />
        <meta property="og:description" content="Limited-time early access to EmviApp - get booked 3x faster. Join 1,200+ artists earning more." />
        <meta property="og:url" content="https://emvi.app/signup-fast-fomo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://emvi.app/og-signup-fomo.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join 1,200+ Beauty Pros Getting Booked Daily" />
        <meta name="twitter:description" content="Limited-time early access to EmviApp - get booked 3x faster." />
        <meta name="twitter:image" content="https://emvi.app/og-signup-fomo.jpg" />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://emvi.app/signup-fast-fomo" />
      </Helmet>

      {/* Main Landing Page */}
      <div className="min-h-screen bg-gradient-to-br from-primary via-purple-600 to-pink-600 relative overflow-hidden">
        
        {/* Navigation Header */}
        <nav className="relative z-10 flex justify-between items-center p-4 md:p-6">
          <Link to="/" className="text-white font-bold text-xl">
            EmviApp
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white/80 hover:text-white text-sm">
              Home
            </Link>
            <Link to="/signin" className="text-white/80 hover:text-white text-sm">
              Sign In
            </Link>
          </div>
        </nav>

        {/* Live Activity Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm border-b border-white/20 py-2 px-4"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-white text-sm">
            <UserPlus className="h-4 w-4 text-green-400" />
            <span className="font-medium">{liveCounter} professionals joined</span>
            <span className="text-white/80">•</span>
            <span className="text-white/80">Live counter</span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-16">
          <div className="text-center text-white mb-8">
            
            {/* Urgency Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Timer className="h-4 w-4" />
              <span>LIMITED TIME: Early Access Ending Soon</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Get Booked 3x Faster<br />
              <span className="text-yellow-300">Join 1,200+ Pros</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            >
              The exclusive platform where beauty professionals get discovered, 
              build their client base, and earn more. Limited spots available.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold mb-2">Early Access Ends In:</h3>
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">{timeLeft.hours}</div>
                    <div className="text-sm text-white/80">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">{timeLeft.minutes}</div>
                    <div className="text-sm text-white/80">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">{timeLeft.seconds}</div>
                    <div className="text-sm text-white/80">Seconds</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Social Proof & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              
              {/* Recent Joiners */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-yellow-300" />
                    <h3 className="font-semibold">Recent Sign-Ups</h3>
                  </div>
                  <AnimatePresence mode="wait">
                    {recentJoiners.map((joiner, index) => (
                      <motion.div
                        key={joiner}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm">{joiner} just joined</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Key Benefits */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Why Join Now?</h3>
                
                {[
                  { icon: TrendingUp, text: "Get 3x more bookings than other platforms" },
                  { icon: Star, text: "Average artist earns $2,400+ extra per month" },
                  { icon: Users, text: "Connect with 10,000+ verified clients" },
                  { icon: Zap, text: "AI-powered matching finds your perfect clients" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 text-white"
                  >
                    <benefit.icon className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                    <span>{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-sm mb-3">
                    "I've tripled my bookings since joining EmviApp. The clients are amazing 
                    and the platform makes everything so easy!"
                  </p>
                  <div className="text-xs text-white/80">
                    — Jessica Martinez, Nail Artist, Miami
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column: Sign-Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-white shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
                      ✨ Free Early Access
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Secure Your Spot
                    </h2>
                    <p className="text-gray-600">
                      Join the waitlist and get instant access when we launch in your area
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 text-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 text-lg"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 transform hover:scale-105"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Securing Your Spot...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Heart className="h-5 w-5" />
                          Get Early Access FREE
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </form>

                  {/* Trust Indicators */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>No spam, unsubscribe anytime</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Your data is secure & encrypted</span>
                    </div>
                    <div className="text-center">
                      <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700 underline">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center mt-16 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">
              Don't Miss Out - Limited Spots Available
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              We're accepting only the first 2,000 beauty professionals to ensure 
              the best experience for everyone. Secure your spot before it's too late.
            </p>
            <div className="text-sm text-white/80">
              Already have an account? <Link to="/signin" className="text-yellow-300 hover:text-yellow-200 underline">Sign in here</Link>
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
      </div>
    </>
  );
};

export default SignupFastFomo;