import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, ArrowUp, Star } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { IndustryListing } from '@/types/industryListing';
import { useAuth } from '@/context/auth';

interface IndustryExpiredSectionProps {
  industryName: string;
  displayName: string;
  expiredListings: IndustryListing[];
  gradientColors: string;
  onViewAllActive: () => void;
}

const IndustryExpiredSection: React.FC<IndustryExpiredSectionProps> = ({
  industryName,
  displayName,
  expiredListings,
  gradientColors,
  onViewAllActive
}) => {
  const { isSignedIn } = useAuth();

  if (!expiredListings || expiredListings.length === 0) {
    return null;
  }

  const fomoMessages = [
    "These opportunities were just snatched up! Don't miss the next one—follow your favorite artists or book now.",
    "Gone in minutes! Be the first to know when new spots open up.",
    "Missed out? These premium positions fill fast—get alerts for the next wave!"
  ];

  const randomFomoMessage = fomoMessages[Math.floor(Math.random() * fomoMessages.length)];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-20 mb-16"
    >
      {/* Visual Separator */}
      <div className="border-t border-gray-200 mb-12"></div>

      {/* FOMO Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-700">
            Recently Filled
          </h2>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`bg-gradient-to-r ${gradientColors} p-6 rounded-2xl mx-auto max-w-4xl mb-8`}
        >
          <p className="text-xl md:text-2xl font-inter text-gray-800 font-medium leading-relaxed">
            {randomFomoMessage}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={onViewAllActive}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-bold px-8 py-3 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5 mr-2" />
            See All Available {displayName} Services
          </Button>
        </motion.div>
      </div>

      {/* Expired Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {expiredListings.slice(0, 8).map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Card className="h-full overflow-hidden border border-gray-300 opacity-60 hover:opacity-75 transition-all duration-300 relative">
              {/* Expired Overlay */}
              <div className="absolute inset-0 bg-gray-900/20 z-10 pointer-events-none"></div>
              
              <div className="relative aspect-video grayscale">
                <ImageWithFallback
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  businessName={listing.title}
                />
                <div className="absolute top-3 left-3 z-20">
                  <Badge className="bg-red-600 text-white border-0 font-bold px-3 py-1">
                    Booked Out
                  </Badge>
                </div>
                {/* Only show rating for nails industry */}
                {listing.rating && industryName === 'nails' && (
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 z-20">
                    <div className="flex items-center text-sm font-medium opacity-60">
                      <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                      {listing.rating}
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-4 relative z-20">
                <h3 className="text-lg font-playfair font-bold text-gray-600 mb-2 line-clamp-1">
                  {listing.title}
                </h3>

                <div className="flex items-center text-gray-500 mb-2 font-inter">
                  <MapPin className="w-4 h-4 mr-2" />
                  {listing.location}
                </div>

                <div className="bg-gray-100 rounded-lg p-2 mb-3">
                  <div className="flex items-center text-gray-600 font-inter font-semibold text-base">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {listing.salary}
                  </div>
                </div>

                <p className="text-gray-500 font-inter text-sm mb-4 line-clamp-2">
                  {listing.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>No Longer Available</span>
                  </div>
                  {!isSignedIn && (
                    <span className="text-purple-600 font-medium">Sign in for details</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-12"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-3xl mx-auto">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">
            Don't Miss Out Again!
          </h3>
          <p className="text-gray-600 font-inter mb-6 leading-relaxed">
            New {displayName.toLowerCase()} opportunities are posted daily. 
            {!isSignedIn ? " Sign up for free alerts and never miss your dream position again!" : " Check back often or set up alerts!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onViewAllActive}
              variant="outline"
              className="font-inter font-semibold"
            >
              View Current Openings
            </Button>
            {!isSignedIn && (
              <Button
                onClick={() => window.location.href = '/auth'}
                className="bg-purple-600 hover:bg-purple-700 text-white font-inter font-bold"
              >
                Sign Up for Alerts
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-lg font-inter italic text-gray-700 mb-3">
            "I missed out on 3 perfect positions before I signed up for alerts. Now I'm working at my dream salon!"
          </p>
          <p className="font-inter font-semibold text-gray-900">
            — Sarah M., {displayName} Professional
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default IndustryExpiredSection;