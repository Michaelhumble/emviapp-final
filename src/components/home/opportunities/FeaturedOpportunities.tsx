import React from 'react';
import { motion } from 'framer-motion';
import { IndustryListing } from '@/types/industryListing';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, MapPin, DollarSign, Phone, LockIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { realVietnameseNailListings } from '@/data/realVietnameseNailListings';

const FeaturedOpportunities = () => {
  const { isSignedIn } = useAuth();

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0 font-bold px-3 py-1">
            <Crown className="w-3 h-3 mr-1" />
            Diamond
          </Badge>
        );
      case 'premium':
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 font-bold px-3 py-1">
            <Star className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        );
      case 'featured':
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 font-bold px-3 py-1">
            Featured
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTierCardClass = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return 'border-2 border-amber-300 shadow-2xl shadow-amber-200/50 bg-gradient-to-br from-amber-50 to-yellow-50';
      case 'premium':
        return 'border border-purple-200 shadow-xl shadow-purple-100/50 bg-gradient-to-br from-purple-50 to-indigo-50';
      case 'featured':
        return 'border border-blue-200 shadow-lg shadow-blue-100/50 bg-gradient-to-br from-blue-50 to-cyan-50';
      default:
        return 'border border-gray-200 shadow-md';
    }
  };

  // Show Premium and Featured real Vietnamese nail listings only
  const premiumListings = realVietnameseNailListings.filter(l => l.tier === 'premium').slice(0, 5);
  const featuredListings = realVietnameseNailListings.filter(l => l.tier === 'featured').slice(0, 5);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">
            Featured Nail Opportunities
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover premium nail salon positions with competitive compensation and benefits.
          </p>
        </motion.div>

        {/* Premium Listings Section */}
        {premiumListings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-purple-500" />
                Premium
              </h3>
              <p className="text-lg text-muted-foreground font-inter">
                Hand-selected nail salon opportunities with exceptional benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {premiumListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <Card className={`h-full ${getTierCardClass(listing.tier)} overflow-hidden`}>
                    <div className="relative aspect-video">
                      <ImageWithFallback
                        src={listing.imageUrl}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        businessName={listing.title}
                      />
                      <div className="absolute top-3 left-3">
                        {getTierBadge(listing.tier)}
                      </div>
                      {listing.rating && (
                        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1">
                          <div className="flex items-center text-sm font-medium">
                            <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                            {listing.rating}
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h4 className="text-lg font-playfair font-bold text-foreground mb-2 line-clamp-2">
                        {listing.title}
                      </h4>

                      <div className="flex items-center text-muted-foreground mb-2 font-inter text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {listing.location}
                      </div>

                      <div className="bg-green-100 rounded-lg p-2 mb-3">
                        <div className="flex items-center text-green-800 font-inter font-semibold text-sm">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {listing.salary}
                        </div>
                      </div>

                      <p className="text-muted-foreground font-inter text-sm mb-4 line-clamp-2">
                        {listing.summary}
                      </p>

                      {/* Contact Info - Gated */}
                      <div className="mb-4">
                        {isSignedIn && listing.phone ? (
                          <div className="flex items-center text-foreground font-inter text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            <span className="truncate">{listing.phone}</span>
                          </div>
                        ) : (
                          <AuthAction
                            customTitle="Sign in to see contact details"
                            onAction={() => true}
                            fallbackContent={
                              <div className="text-sm text-muted-foreground italic flex items-center gap-1 font-inter">
                                <LockIcon className="w-3 h-3" />
                                <span>Sign in for contact</span>
                              </div>
                            }
                          />
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full font-inter text-sm"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Xem Chi Tiết
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Featured Listings Section */}
        {featuredListings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-blue-500" />
                Featured
              </h3>
              <p className="text-lg text-muted-foreground font-inter">
                Quality nail positions with competitive compensation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {featuredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <Card className={`h-full ${getTierCardClass(listing.tier)} overflow-hidden`}>
                    <div className="relative aspect-video">
                      <ImageWithFallback
                        src={listing.imageUrl}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        businessName={listing.title}
                      />
                      <div className="absolute top-3 left-3">
                        {getTierBadge(listing.tier)}
                      </div>
                      {listing.rating && (
                        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1">
                          <div className="flex items-center text-sm font-medium">
                            <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                            {listing.rating}
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h4 className="text-lg font-playfair font-bold text-foreground mb-2 line-clamp-2">
                        {listing.title}
                      </h4>

                      <div className="flex items-center text-muted-foreground mb-2 font-inter text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {listing.location}
                      </div>

                      <div className="bg-green-100 rounded-lg p-2 mb-3">
                        <div className="flex items-center text-green-800 font-inter font-semibold text-sm">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {listing.salary}
                        </div>
                      </div>

                      <p className="text-muted-foreground font-inter text-sm mb-4 line-clamp-2">
                        {listing.summary}
                      </p>

                      {/* Contact Info - Gated */}
                      <div className="mb-4">
                        {isSignedIn && listing.phone ? (
                          <div className="flex items-center text-foreground font-inter text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            <span className="truncate">{listing.phone}</span>
                          </div>
                        ) : (
                          <AuthAction
                            customTitle="Sign in to see contact details"
                            onAction={() => true}
                            fallbackContent={
                              <div className="text-sm text-muted-foreground italic flex items-center gap-1 font-inter">
                                <LockIcon className="w-3 h-3" />
                                <span>Sign in for contact</span>
                              </div>
                            }
                          />
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full font-inter text-sm"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Xem Chi Tiết
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-inter">
              View All Nail Opportunities
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;