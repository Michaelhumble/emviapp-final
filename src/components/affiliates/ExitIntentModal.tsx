import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ExitIntentModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of window and hasn't been shown yet
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Here you would send to your email service
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg pointer-events-auto"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Close button */}
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white
                           transition-colors text-gray-600 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 opacity-50" />

                {/* Content */}
                <div className="relative p-8 md:p-12">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 
                                    flex items-center justify-center shadow-2xl shadow-fuchsia-500/50">
                        <Gift className="w-10 h-10 text-white" />
                      </div>
                      <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-violet-600 animate-pulse" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--ink-900))] mb-3">
                    Wait! Before you go...
                  </h3>
                  <p className="text-center text-[hsl(var(--ink-600))] mb-2">
                    Join <span className="font-semibold text-violet-600">1,247 affiliates</span> earning an average of
                  </p>
                  <p className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-6">
                    $3,240/month
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-12 h-14 text-base rounded-xl border-2 border-gray-200
                                 focus:border-violet-500 transition-colors"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 text-base font-semibold rounded-xl
                               bg-gradient-to-r from-violet-600 to-fuchsia-500
                               hover:shadow-xl hover:shadow-fuchsia-500/50
                               transition-all duration-300"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Get Free Affiliate Success Guide
                    </Button>
                  </form>

                  {/* Benefits */}
                  <div className="mt-6 pt-6 border-t border-black/10">
                    <p className="text-xs text-center text-[hsl(var(--ink-600))] mb-3">
                      You'll get instant access to:
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {[
                        'Proven strategies',
                        'Email templates',
                        'Content calendar',
                        'Conversion tips',
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 
                                       flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[hsl(var(--ink-700))]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust line */}
                  <p className="mt-4 text-xs text-center text-[hsl(var(--ink-500))]">
                    No spam. Unsubscribe anytime. 🔒 GDPR compliant
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;
