import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Eye, MapPin, DollarSign, Phone, LockIcon, ArrowLeft, Home, Plus, Edit } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import AuthAction from '@/components/common/AuthAction';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { IndustryListing } from '@/types/industryListing';
import DiamondFOMOCard from './DiamondFOMOCard';
import MagicNailsDiamondCard from './MagicNailsDiamondCard';

interface IndustryListingPageProps {
  industryName: string;
  displayName: string;
  listings: IndustryListing[];
  headerTitle: string;
  headerSubtitle: string;
  gradientColors: string;
  metaDescription: string;
}

const IndustryListingPage: React.FC<IndustryListingPageProps> = ({
  industryName,
  displayName,
  listings,
  headerTitle,
  headerSubtitle,
  gradientColors,
  metaDescription
}) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedListing, setSelectedListing] = useState<IndustryListing | null>(null);
  
  // Check if we have a listing ID in the URL parameters for deep linking
  const highlightedListingId = searchParams.get('listing');
  
  useEffect(() => {
    if (highlightedListingId) {
      const listing = listings.find(l => l.id === highlightedListingId);
      if (listing) {
        setSelectedListing(listing);
        // Scroll to the listing or open modal
        setTimeout(() => {
          const element = document.getElementById(`listing-${highlightedListingId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, [highlightedListingId, listings]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return (
          <Badge className="bg-blue-600 text-white border-0 font-bold px-3 py-1" style={{ backgroundColor: '#2176FF' }}>
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
      case 'free':
        return (
          <Badge className="bg-gray-100 text-gray-700 border border-gray-300 font-medium px-2 py-1 text-xs">
            Free Post
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTierCardClass = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return 'border-2 border-blue-300 shadow-2xl shadow-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-50';
      case 'premium':
        return 'border border-purple-200 shadow-xl shadow-purple-100/50 bg-gradient-to-br from-purple-50 to-indigo-50';
      case 'featured':
        return 'border border-blue-200 shadow-lg shadow-blue-100/50 bg-gradient-to-br from-blue-50 to-cyan-50';
      case 'free':
        return 'border border-gray-200 shadow-sm bg-white';
      default:
        return 'border border-gray-200 shadow-md';
    }
  };

  const handleViewDetails = (listing: IndustryListing) => {
    if (!isSignedIn) {
      // Show sign-in prompt
      return;
    }
    setSelectedListing(listing);
  };

  const handleEditJob = (listing: IndustryListing) => {
    if (listing.isOwner && listing.originalJobData) {
      navigate('/post-job/nails', {
        state: {
          editJobId: listing.id,
          editJobData: listing.originalJobData
        }
      });
    }
  };

  const diamondListings = listings.filter(l => l.tier === 'diamond');
  const premiumListings = listings.filter(l => l.tier === 'premium');
  const featuredListings = listings.filter(l => l.tier === 'featured');
  const freeListings = listings.filter(l => l.tier === 'free');

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{headerTitle} | EmviApp</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      {/* Hero Header */}
      <section className={`w-full bg-gradient-to-br ${gradientColors} py-16 mb-12`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              {headerTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-inter max-w-3xl mx-auto">
              {headerSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <span>/</span>
            <Link to="/jobs" className="hover:text-purple-600 transition-colors">
              Jobs
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{displayName}</span>
          </nav>
          
          <Link 
            to="/jobs" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-inter font-medium text-base transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Beauty Jobs
          </Link>
        </motion.div>
        {/* Diamond Tier Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-playfair font-bold text-foreground">Diamond Exclusive</h2>
              <Crown className="w-8 h-8 text-blue-600 ml-3" />
            </div>
            <p className="text-lg text-muted-foreground font-inter">
              Only 1 spot available — The most exclusive {industryName.toLowerCase()} opportunity
            </p>
            <Badge className="bg-red-500 text-white mt-2 animate-pulse">
              1 SPOT ONLY
            </Badge>
          </div>

          <div className="max-w-md mx-auto">
            {/* Show Magic Nails Diamond card for nails industry, FOMO card for all others */}
            {industryName === 'nails' ? (
              <MagicNailsDiamondCard />
            ) : (
              <DiamondFOMOCard industryName={industryName} />
            )}
          </div>
        </motion.section>

        {/* Premium Tier Section */}
        {premiumListings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">Premium Listings</h2>
              <p className="text-lg text-muted-foreground font-inter">
                Hand-selected {industryName.toLowerCase()} opportunities with exceptional benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  id={`listing-${listing.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className={highlightedListingId === listing.id ? 'ring-4 ring-purple-300 rounded-lg' : ''}
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
                      {/* Only show rating for nails industry */}
                      {listing.rating && industryName === 'nails' && (
                        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1">
                          <div className="flex items-center text-sm font-medium">
                            <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                            {listing.rating}
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-5">
                      <h3 className="text-lg font-playfair font-bold text-foreground mb-2">
                        {listing.title}
                      </h3>

                      <div className="flex items-center text-muted-foreground mb-2 font-inter">
                        <MapPin className="w-4 h-4 mr-2" />
                        {listing.location}
                      </div>

                      <div className="bg-green-100 rounded-lg p-2 mb-3">
                        <div className="flex items-center text-green-800 font-inter font-semibold text-base">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {listing.salary}
                        </div>
                      </div>

                      <p className="text-muted-foreground font-inter text-base mb-4 line-clamp-2">
                        {listing.summary}
                      </p>

                      <div className="space-y-2">
                        <Button
                          onClick={() => handleViewDetails(listing)}
                          variant="outline"
                          className="w-full font-inter"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {listing.isOwner && industryName === 'nails' && (
                          <Button
                            onClick={() => handleEditJob(listing)}
                            variant="outline"
                            size="sm"
                            className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Job
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Featured Tier Section */}
        {featuredListings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">Featured Opportunities</h2>
              <p className="text-lg text-muted-foreground font-inter">
                Quality {industryName.toLowerCase()} positions with competitive compensation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  id={`listing-${listing.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className={highlightedListingId === listing.id ? 'ring-4 ring-blue-300 rounded-lg' : ''}
                >
                  <Card className={`h-full ${getTierCardClass(listing.tier)} overflow-hidden`}>
                    <div className="relative aspect-video">
                      <ImageWithFallback
                        src={listing.imageUrl}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        businessName={listing.title}
                      />
                      <div className="absolute top-2 left-2">
                        {getTierBadge(listing.tier)}
                      </div>
                      {/* Only show rating for nails industry */}
                      {listing.rating && industryName === 'nails' && (
                        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1">
                          <div className="flex items-center text-xs font-medium">
                            <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                            {listing.rating}
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="text-lg font-playfair font-bold text-foreground mb-1">
                        {listing.title}
                      </h3>

                      <div className="flex items-center text-muted-foreground mb-2 text-base font-inter">
                        <MapPin className="w-4 h-4 mr-1" />
                        {listing.location}
                      </div>

                      <div className="bg-green-100 rounded p-2 mb-2">
                        <div className="flex items-center text-green-800 font-inter font-semibold text-base">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {listing.salary}
                        </div>
                      </div>

                      <p className="text-muted-foreground font-inter text-base mb-3 line-clamp-2">
                        {listing.summary}
                      </p>

                      <div className="space-y-2">
                        <Button
                          onClick={() => handleViewDetails(listing)}
                          variant="outline"
                          size="sm"
                          className="w-full font-inter"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {listing.isOwner && industryName === 'nails' && (
                          <Button
                            onClick={() => handleEditJob(listing)}
                            variant="outline"
                            size="sm"
                            className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Job
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Free Listings Section */}
        {freeListings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">Free Listings</h2>
              <p className="text-lg text-muted-foreground font-inter">
                Basic opportunities to get started in {industryName.toLowerCase()}
              </p>
              
              {/* Check for newly posted real jobs and show success banner */}
              {(() => {
                const realFreeJobs = freeListings.filter((listing: any) => listing.isUserSubmitted);
                if (realFreeJobs.length > 0) {
                  return (
                    <div className="mt-4 max-w-md mx-auto">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-center gap-2 text-green-700">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-inter font-medium">
                            {realFreeJobs.length} live job{realFreeJobs.length > 1 ? 's' : ''} from real employers!
                          </span>
                        </div>
                        <p className="text-sm text-green-600 mt-1 font-inter">
                          These listings are submitted by actual employers looking to hire now.
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {freeListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className={`h-full ${getTierCardClass(listing.tier)} overflow-hidden`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-playfair font-bold text-foreground">
                          {listing.title}
                        </h3>
                        {getTierBadge(listing.tier)}
                      </div>

                      <div className="flex items-center text-muted-foreground mb-2 font-inter text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {listing.location}
                      </div>

                      <div className="bg-green-50 rounded p-2 mb-3">
                        <div className="flex items-center text-green-700 font-inter font-semibold text-sm">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {listing.salary}
                        </div>
                      </div>

                      <p className="text-muted-foreground font-inter text-sm mb-3 line-clamp-2">
                        {listing.summary}
                      </p>

                      {/* Contact Info for Free Listings */}
                      {isSignedIn && listing.contact ? (
                        <div className="bg-gray-50 rounded p-3 mb-3 text-sm">
                          <div className="font-medium text-gray-900">{listing.contact.name}</div>
                          <div className="text-gray-600">{listing.contact.phone}</div>
                          <div className="text-gray-600">{listing.contact.email}</div>
                        </div>
                      ) : (
                        <AuthAction
                          customTitle="Sign in to see contact details"
                          onAction={() => true}
                          fallbackContent={
                            <div className="text-sm text-muted-foreground italic flex items-center gap-2 font-inter mb-3">
                              <LockIcon className="w-4 h-4" />
                              <span>Sign in to see contact details</span>
                            </div>
                          }
                        />
                      )}

                      <div className="space-y-2">
                        <Button
                          onClick={() => handleViewDetails(listing)}
                          variant="outline"
                          size="sm"
                          className="w-full font-inter text-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {listing.isOwner && industryName === 'nails' && (
                          <Button
                            onClick={() => handleEditJob(listing)}
                            variant="outline"
                            size="sm"
                            className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 text-sm"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Job
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
            <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
              Ready to Post Your {displayName} Position?
            </h2>
            <p className="text-muted-foreground font-inter mb-6 max-w-2xl mx-auto">
              Join thousands of successful {industryName.toLowerCase()} businesses that have found their perfect team members through EmviApp.
            </p>
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-inter font-bold"
              onClick={() => navigate(industryName === 'nails' ? '/post-job/nails' : '/post-job')}
            >
              Post Your {displayName} Job Now
            </Button>
          </div>
        </motion.section>
      </div>

      {/* Detail Modal */}
      {selectedListing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedListing(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-foreground">
                    {selectedListing.title}
                  </h2>
                  <p className="text-muted-foreground font-inter">{selectedListing.location}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedListing(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={selectedListing.imageUrl}
                  alt={selectedListing.title}
                  className="w-full h-full object-cover"
                  businessName={selectedListing.title}
                />
              </div>

              <div className="space-y-4">
                <div className="bg-green-100 rounded-lg p-4">
                  <div className="flex items-center text-green-800 font-bold text-lg">
                    <DollarSign className="w-5 h-5 mr-2" />
                    {selectedListing.salary}
                  </div>
                </div>

                {selectedListing.phone && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center text-blue-800 font-semibold">
                      <Phone className="w-5 h-5 mr-2" />
                      {selectedListing.phone}
                    </div>
                  </div>
                )}

                <div className="prose max-w-none">
                  <p className="text-foreground font-inter whitespace-pre-line">
                    {selectedListing.fullDescription || selectedListing.summary}
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-inter font-bold"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </motion.div>
          </motion.div>
        )}
      
      {/* Floating Post Job Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full px-6 py-4 font-inter font-bold"
          onClick={() => navigate(industryName === 'nails' ? '/post-job/nails' : '/post-job')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Post {displayName} Job
        </Button>
      </div>
    </div>
  );
};

export default IndustryListingPage;