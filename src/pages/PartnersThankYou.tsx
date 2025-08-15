import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import DynamicSEO from '@/components/seo/DynamicSEO';

const PartnersThankYou = () => {
  const navigate = useNavigate();

  return (
    <>
      <DynamicSEO
        title="Application Submitted | EmviApp Partners"
        description="Thank you for your partnership application. We'll review your submission and be in touch if there's a fit."
      />

      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDFDFD' }}>
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-purple-50/20">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.02) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.02) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.02) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>

            {/* Main Content */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-8"
                >
                  <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900">
                    Application Received
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                    Thank you for your interest in partnering with EmviApp.
                  </p>

                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                    <p>
                      We've received your partnership pitch and our team will carefully review your application.
                    </p>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <div className="flex items-center gap-3 mb-4">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                        <h3 className="font-semibold text-gray-900">What Happens Next?</h3>
                      </div>
                      <div className="space-y-3 text-base">
                        <p><strong>If we see a fit</strong>, we will reach out within 2-3 business days.</p>
                        <p><strong>Selected partners</strong> will be given a private SMS contact number for ongoing communication.</p>
                        <p className="text-purple-700 font-medium">📱 Note: This number is for text messages only — calls are not accepted.</p>
                      </div>
                    </div>

                    <p className="text-gray-500 italic">
                      We only partner with those who align perfectly with our vision for transforming the beauty industry.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg font-semibold border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={() => navigate('/partners')}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back to Partners Page
                    </Button>
                    
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg rounded-md"
                      onClick={() => navigate('/')}
                    >
                      Explore EmviApp
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PartnersThankYou;