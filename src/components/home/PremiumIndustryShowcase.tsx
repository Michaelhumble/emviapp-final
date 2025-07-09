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

interface IndustryListing {
  id: string;
  title: string;
  location: string;
  salary: string;
  tier: 'diamond' | 'premium' | 'featured';
  summary: string;
  imageUrl: string;
  phone?: string;
  rating?: number;
  isFeatured?: boolean;
}

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
    // Navigate to main /jobs page with industry and listing parameters for deep linking
    navigate(`/jobs?industry=${industryName}&listing=${listing.id}`);
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4 flex items-center justify-center">
            <IndustryIcon iconName={icon} className="w-12 h-12 mr-4 text-muted-foreground" />
            {displayName} Listings — Premium Spaces
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Explore premium {industryName.toLowerCase()} spaces, jobs, and opportunities. Connect with the best.
          </p>
        </motion.div>

        {/* Premium Listings Grid - 5 cards wide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
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
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-sm font-inter font-medium hover:bg-gray-50"
                    onClick={() => handleViewDetails(listing)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to={routePath}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              See all {displayName} Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumIndustryShowcase;