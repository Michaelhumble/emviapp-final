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
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white py-3 px-4 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full -translate-y-32 transform rotate-12"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full translate-y-24 transform -rotate-12"></div>
      </div>

      <div className="container mx-auto flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2 text-yellow-300">
            <Eye className="h-5 w-5" />
            <Briefcase className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm md:text-base font-medium leading-tight">
              <span className="hidden md:inline">🎯 Get exclusive access: </span>
              <strong>Preview 500+ beauty jobs before anyone else</strong>
              <span className="hidden sm:inline"> — completely free, no commitments</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-shrink-0">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-4 py-2 w-48 md:w-64 text-sm bg-white/95 border-white/20 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm whitespace-nowrap shadow-lg transition-all duration-200"
          >
            {isLoading ? '...' : 'Preview Jobs'}
          </Button>
        </form>

        <button
          onClick={handleDismiss}
          className="text-white/70 hover:text-white transition-colors p-1 flex-shrink-0"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default MicroConversionTop;