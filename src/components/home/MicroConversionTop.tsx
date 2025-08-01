import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail, Briefcase, Eye } from 'lucide-react';
import { toast } from 'sonner';

const MicroConversionTop = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for email capture
    setTimeout(() => {
      toast.success('Great! Check your email for exclusive job previews.');
      setEmail('');
      setIsLoading(false);
      setIsVisible(false);
      
      // Track micro-conversion
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'micro_conversion', {
          event_category: 'engagement',
          event_label: 'email_preview_signup',
          value: 1
        });
      }
    }, 1000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    
    // Track dismissal
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'micro_conversion_dismissed', {
        event_category: 'engagement',
        event_label: 'email_preview_banner'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white py-6 px-4 relative overflow-hidden"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full -translate-y-48 transform rotate-12 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full translate-y-36 transform -rotate-12 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10 blur-xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2 text-yellow-300">
              <Eye className="h-5 w-5" />
              <Briefcase className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium leading-tight">
                🎯 <strong>Get instant access to 500+ beauty jobs</strong> — completely free, no commitments
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 pr-4 py-3 w-72 text-base bg-white/95 border-white/20 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-transparent rounded-xl"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-base whitespace-nowrap shadow-xl transition-all duration-200 rounded-xl"
            >
              {isLoading ? '...' : 'Get Started'}
            </Button>
          </form>

          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors p-2 flex-shrink-0 hover:bg-white/10 rounded-full"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden text-center space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-yellow-300">
              <Eye className="h-6 w-6" />
              <Briefcase className="h-5 w-5" />
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Value Proposition */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-yellow-300">
              🔒 Unlock 500+ Beauty Jobs
            </h3>
            <p className="text-base font-medium opacity-90">
              Join 5,000+ beauty pros — get instant access!
            </p>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 h-14 text-base bg-white/95 border-2 border-white/20 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-transparent rounded-2xl font-medium shadow-lg"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg shadow-xl transition-all duration-200 rounded-2xl"
              onClick={() => {
                // Track mobile email submission
                if (typeof (window as any).gtag !== 'undefined') {
                  (window as any).gtag('event', 'email_submitted_mobile', {
                    event_category: 'conversion',
                    event_label: 'mobile_micro_conversion',
                    value: 1
                  });
                }
              }}
            >
              {isLoading ? 'Getting Access...' : 'Unlock Now'}
            </Button>
          </form>

          {/* Trust Badge */}
          <p className="text-sm text-white/80 font-medium">
            ✓ No spam. Unsubscribe anytime. Join 5,000+ beauty insiders.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MicroConversionTop;