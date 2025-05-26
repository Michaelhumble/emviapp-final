
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, Share2, Eye, TrendingUp, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SalonConfirmationSection = () => {
  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Second burst after delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-2xl">
          <CardContent className="p-12 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                🎉 Your Salon is Live!
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Congratulations! Your premium listing is now active and attracting buyers.
              </p>
              <div className="flex justify-center gap-2 mb-4">
                <Badge className="bg-green-100 text-green-800">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Active Listing
                </Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium Featured
                </Badge>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">127</div>
                <div className="text-sm text-blue-700">Views in first hour</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-sm text-green-700">Interested buyers</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">#1</div>
                <div className="text-sm text-purple-700">In your area</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3">
                <Eye className="h-4 w-4 mr-2" />
                View Your Listing
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3">
                <Share2 className="h-4 w-4 mr-2" />
                Share Listing
              </Button>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 text-left"
            >
              <h3 className="font-semibold text-gray-900 mb-4 text-center">🚀 What Happens Next?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-medium">1</div>
                    <div>
                      <div className="font-medium text-gray-900">Buyer Screening</div>
                      <div>We verify all potential buyers before sharing your contact info</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-medium">2</div>
                    <div>
                      <div className="font-medium text-gray-900">Instant Notifications</div>
                      <div>Get notified immediately when qualified buyers show interest</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-medium">3</div>
                    <div>
                      <div className="font-medium text-gray-900">Expert Support</div>
                      <div>Our team helps negotiate and close your sale successfully</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-medium">4</div>
                    <div>
                      <div className="font-medium text-gray-900">Secure Transfer</div>
                      <div>Safe, documented ownership transfer with legal protection</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-center text-sm text-gray-500"
            >
              Questions? Call us at (555) 123-4567 or email support@emviapp.com
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
