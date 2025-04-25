
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import EmviLogo from '@/components/branding/EmviLogo';
import { MobileButton } from '@/components/ui/mobile-button';

const EarlyAccess = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const founderMessage = useScrollAnimation({ animation: 'fade-in', delay: 100 });
  const socialProof = useScrollAnimation({ animation: 'fade-in', delay: 200 });
  const urgencySection = useScrollAnimation({ animation: 'fade-in', delay: 300 });

  useEffect(() => {
    // Scroll to top when component mounts
    if (topRef.current) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <Layout>
      <div ref={topRef} className="w-full overflow-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <EmviLogo size="large" className="mx-auto" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-playfair text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-gray-900"
              >
                You're Not Just Early —<br /> You're Essential.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-700 mb-8 md:mb-10 max-w-2xl"
              >
                Unlock VIP Access to The Beauty Industry's Future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
              >
                <MobileButton 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none hover:opacity-90 text-base md:text-lg font-medium px-8 py-3 h-auto shadow-md"
                >
                  Claim My VIP Access
                </MobileButton>
                <p className="mt-4 text-sm text-gray-600 italic">
                  Support EmviApp's mission — pay what feels right after you join.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-14 md:py-20 bg-gray-50">
          <div 
            className="container px-4 md:px-6 mx-auto"
            ref={socialProof.ref}
          >
            <GradientBackground variant="artist" className="py-10 md:py-12">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={socialProof.isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-8">
                  Join 1,200+ beauty professionals shaping the future.
                </h2>

                <div className="flex justify-center relative h-16 mb-6">
                  {/* Testimonial avatars */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border-2 border-white shadow-sm overflow-hidden w-12 h-12 md:w-14 md:h-14"
                      initial={{ opacity: 0, x: -10 }}
                      animate={socialProof.isVisible ? { 
                        opacity: 1, 
                        x: 0,
                        left: `${i * 6}%`,
                        zIndex: 8 - i
                      } : { opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      style={{ 
                        left: `${20 + i * 6}%`, 
                        backgroundImage: `url(https://images.unsplash.com/photo-${1500000000000 + i * 10000}?q=80&w=100&h=100&auto=format)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-10">
                  {['Inspiring', 'Revolutionary', 'Essential', 'Community-driven', 'Supportive'].map((tag, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-sm text-gray-700 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </GradientBackground>
          </div>
        </section>

        {/* Founder's Message Section */}
        <section className="py-16 md:py-24">
          <div 
            className="container px-4 md:px-6 mx-auto"
            ref={founderMessage.ref}
          >
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0 }}
                animate={founderMessage.isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-4">
                  A Message from Our Founder
                </h2>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 md:p-8 shadow-sm relative"
                initial={{ opacity: 0, y: 20 }}
                animate={founderMessage.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
              >
                <svg className="absolute top-0 left-10 text-gray-300 transform -translate-y-6 w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391C14.017 8.365 15.356 5.205 19.985 4l.865 1.36c-2.343.817-3.64 2.564-3.64 7.25v1.885h3.82V21h-7.013zm-9.477 0v-7.391C4.54 8.365 5.878 5.205 10.508 4l.865 1.36c-2.343.817-3.64 2.564-3.64 7.25v1.885h3.82V21H4.54z" />
                </svg>
                
                <p className="text-gray-700 mb-6 pt-6 text-lg italic">
                  "EmviApp was born from a vision to connect and empower beauty professionals in ways never before possible. What started as a simple idea has blossomed into a movement — a community of passionate artists and entrepreneurs ready to transform their industry.
                </p>
                <p className="text-gray-700 mb-6 text-lg italic">
                  Our early supporters aren't just users — they're co-creators, visionaries who see what we see: a future where beauty professionals have the tools, connections, and platform they deserve.
                </p>
                <p className="text-gray-700 text-lg italic">
                  Your decision to join us now, at the beginning of our journey, means everything. Together, we're writing the first chapter of something truly special."
                </p>
                
                <div className="flex items-center justify-center mt-8">
                  <div className="w-14 h-14 rounded-full bg-gray-300 mr-4"></div>
                  <div className="text-left">
                    <h4 className="font-playfair text-lg font-semibold">Emma Vi</h4>
                    <p className="text-sm text-gray-600">Founder, EmviApp</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Urgency Section */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-white to-gray-50">
          <div 
            className="container px-4 md:px-6 mx-auto"
            ref={urgencySection.ref}
          >
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={urgencySection.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <div className="flex items-center justify-center gap-2 bg-purple-100 text-purple-800 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-sm">Limited Time Opportunity</span>
                </div>
              </div>
              
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-4">
                Early Access spots are limited — secure yours before public launch.
              </h2>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8 inline-block">
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-bold text-purple-800">87</span>
                  <span className="text-lg text-gray-600 ml-2">VIP spots left this month</span>
                </div>
              </div>
              
              <MobileButton 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none hover:opacity-90 text-base md:text-lg font-medium px-8 py-3 h-auto shadow-md"
              >
                Claim My VIP Access
              </MobileButton>
              
              <p className="mt-8 text-gray-600 italic">
                Your early access provides direct influence on product development<br /> and special founder benefits not available to the public.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EarlyAccess;
