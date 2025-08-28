import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthState } from '@/hooks/useAuthState';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Shield, X, Heart } from 'lucide-react';

/**
 * SignupFastFomo - Ultra-Conversion Signup Page
 * Premium, clean, luxurious design focused on free signup conversion
 */
const SignupFastFomo = () => {
  // State management
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  // REMOVED: Exit intent modal functionality 
  // Modal overlays have been permanently disabled

  const { signUp } = useAuthState();
  const { toast } = useToast();

  // REMOVED: Exit intent detection - no more popup modals

  // Analytics tracking
  useEffect(() => {
    // Track page visit
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Ultra Conversion Signup',
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

    setIsSubmitting(true);
    setEmailError('');
    
    try {
      await signUp(email, 'tempPassword123!', {
        full_name: name.trim() || undefined,
        user_type: 'artist'
      });
      
      setIsSubmitted(true);
      
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
      setEmailError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Get Booked 3x Faster — Join 1,200+ Pros FREE | EmviApp</title>
        <meta 
          name="description" 
          content="The exclusive platform where beauty professionals get discovered, build their client base, and earn more. Join 100% FREE — no hidden fees, no spam." 
        />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content="Get Booked 3x Faster — Join 1,200+ Pros FREE | EmviApp" />
        <meta property="og:description" content="The exclusive platform where beauty professionals get discovered, build their client base, and earn more. Join 100% FREE — no hidden fees, no spam." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emvi.app/signup-fast-fomo" />
        <meta property="og:image" content="https://emvi.app/og-signup-image.jpg" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Booked 3x Faster — Join 1,200+ Pros FREE | EmviApp" />
        <meta name="twitter:description" content="The exclusive platform where beauty professionals get discovered, build their client base, and earn more. Join 100% FREE — no hidden fees, no spam." />
        <meta name="twitter:image" content="https://emvi.app/og-signup-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://emvi.app/signup-fast-fomo" />
      </Helmet>

      {/* REMOVED: Exit intent popup modal - no more blocking overlays */}

      {/* Main Layout */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold text-purple-600 font-serif">
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
                  to="/signin" 
                  className="bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center pt-16 pb-12">
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
              <span className="block text-4xl md:text-6xl mt-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent font-bold">
                FREE
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
          </div>

          {/* Signup Form - Front and Center */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg mx-auto mb-16"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleEmailChange}
                      className={`h-16 text-lg border-2 rounded-2xl transition-all ${
                        emailError 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-purple-500'
                      }`}
                      required
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-2 ml-1">{emailError}</p>
                    )}
                  </div>
                  
                  <div>
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-16 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-2xl transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !!emailError}
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Securing your spot...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Heart className="h-6 w-6" />
                        ♡ Get Early Access FREE →
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  >
                    <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">You're In! 🎉</h3>
                  <p className="text-xl text-gray-600">
                    Welcome to EmviApp! Check your email for your early access invitation.
                  </p>
                </div>
              )}

              {/* Trust Signals - Prominent */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">No spam. Unsubscribe anytime.</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-600">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Your data is secure & encrypted.</span>
                </div>
                <div className="text-center pt-2">
                  <a 
                    href="/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignupFastFomo;