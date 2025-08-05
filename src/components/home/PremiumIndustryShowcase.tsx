import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, DollarSign, Crown, Star, Phone, LockIcon, Sparkles, Scissors, Hand, Droplets, Palette, Eye, Brush } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import AuthAction from '@/components/common/AuthAction';
import { IndustryListing } from '@/types/industryListing';

// Icon mapping for professional icons
const iconMap = {
  'Sparkles': Sparkles,
  'Scissors': Scissors,
  'Hand': Hand,
  'Droplets': Droplets,
  'Palette': Palette,
  'Eye': Eye,
  'Brush': Brush,
};

interface IndustryIconProps {
  iconName: string;
  className?: string;
}

const IndustryIcon: React.FC<IndustryIconProps> = ({ iconName, className }) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Sparkles;
  return <IconComponent className={className} />;
};


interface PremiumIndustryShowcaseProps {
  industryName: string;
  displayName: string;
  listings: IndustryListing[];
  routePath: string;
  gradientColors: string;
  icon: string;
}

const PremiumIndustryShowcase: React.FC<PremiumIndustryShowcaseProps> = ({
  industryName,
  displayName,
  listings,
  routePath,
  gradientColors,
  icon
}) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = (listing: IndustryListing) => {
    // Navigate to industry-specific page for focused browsing
    navigate(routePath);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return <Crown className="w-4 h-4 text-amber-500" />;
      case 'premium':
        return <Star className="w-4 h-4 text-purple-500" />;
      default:
        return <Star className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold border-0 shadow-lg">
            <Crown className="w-3 h-3 mr-1" />
            DIAMOND
          </Badge>
        );
      case 'premium':
        return (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold border-0 shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            PREMIUM
          </Badge>
        );
      default:
        return (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold border-0 shadow-lg">
            FEATURED
          </Badge>
        );
    }
  };

  const getCardBorder = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return 'border-2 border-gradient-to-r from-amber-400 to-yellow-500 shadow-xl shadow-amber-200/50';
      case 'premium':
        return 'border-2 border-gradient-to-r from-purple-400 to-pink-500 shadow-xl shadow-purple-200/50';
      default:
        return 'border border-gray-200 shadow-lg';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50/80 to-white relative overflow-hidden w-full max-w-full">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-full">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 flex items-center justify-center leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <motion.div
              className="mr-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <IndustryIcon iconName={icon} className="w-10 h-10 md:w-12 md:h-12 text-purple-600" />
            </motion.div>
            {displayName} Listings — Premium Spaces
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore premium {industryName.toLowerCase()} spaces, jobs, and opportunities. Connect with the best.
          </motion.p>
        </motion.div>

        {/* Premium Listings Grid - 5 cards wide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12 w-full max-w-full">
          {listings.slice(0, 5).map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className={`h-full bg-white hover:shadow-2xl transition-all duration-300 ${getCardBorder(listing.tier)} overflow-hidden group cursor-pointer`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={listing.imageUrl} 
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {getTierBadge(listing.tier)}
                  
                  {listing.tier === 'diamond' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent" />
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {getTierIcon(listing.tier)}
                    {listing.rating && (
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-sm font-medium ml-1">{listing.rating}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-playfair font-bold text-foreground text-base line-clamp-2 mb-2">
                    {listing.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2 font-inter">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="line-clamp-1">{listing.location}</span>
                  </div>
                  
                  <div className="bg-green-50 p-2 rounded-lg mb-3">
                    <div className="flex items-center text-green-700 font-inter font-bold text-base">
                      <DollarSign className="w-3 h-3 mr-1" />
                      <span className="line-clamp-1">{listing.salary}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground font-inter line-clamp-2 mb-3">
                    {listing.summary}
                  </p>

                  {/* Contact Info - Hidden unless signed in */}
                  {listing.phone && (
                    <div className="mb-3">
                      {isSignedIn ? (
                        <div className="flex items-center text-sm text-foreground font-inter">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>{listing.phone}</span>
                        </div>
                      ) : (
                        <AuthAction
                          customTitle="Sign in to see contact details"
                          onAction={() => true}
                          fallbackContent={
                            <div className="text-sm text-muted-foreground italic flex items-center gap-1 font-inter">
                              <LockIcon className="h-3 w-3" />
                              <span>Sign in to see contact</span>
                            </div>
                          }
                        />
                      )}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-sm font-inter font-medium hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all duration-300 group"
                        onClick={() => handleViewDetails(listing)}
                      >
                        <span className="mr-2">View Details</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </motion.div>
                    
                    {/* Industry-specific CTA */}
                    <Link to={routePath}>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs"
                      >
                        🔥 Claim Your Spot in {displayName}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to={routePath}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white font-inter font-bold py-6 px-10 rounded-2xl text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-3">🔥 Claim Your Spot in {displayName}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumIndustryShowcase;