
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import SignUpForm from '@/components/auth/SignUpForm';

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Join EmviApp | Sign Up</title>
        <meta name="description" content="Join EmviApp - Connect with beauty professionals and customers" />
      </Helmet>
      <Layout>
        <div className="min-h-screen relative overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-purple-100/30 to-pink-100/30 animate-pulse"></div>
          </div>
          
          {/* Floating Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Content Container */}
          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md"
            >
              {/* Glassmorphism Card */}
              <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Card Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                
                {/* Header */}
                <div className="relative z-10 text-center mb-8">
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-playfair mb-2"
                  >
                    Welcome to EmviApp
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-gray-600 font-inter"
                  >
                    Join the beauty community
                  </motion.p>
                </div>

                {/* Form Container */}
                <div className="relative z-10">
                  <SignUpForm />
                </div>
              </div>
            </motion.div>
          </div>

          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
            `}
          </style>
        </div>
      </Layout>
    </>
  );
};

export default SignUp;
