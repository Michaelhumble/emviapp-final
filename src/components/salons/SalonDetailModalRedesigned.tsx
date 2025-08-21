import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, User, Mail, Phone, Home, Star, Crown, Sparkles, Heart, Share2, Eye } from 'lucide-react';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SalonDetailModalProps {
  salon: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModalRedesigned: React.FC<SalonDetailModalProps> = ({ salon, isOpen, onClose }) => {
  const { isSignedIn } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!salon) return null;

  const isExpired = salon.status === 'expired';
  const isVietnamese = salon.is_vietnamese_listing;
  
  // Get gallery images from salon data
  const getGalleryImages = () => {
    if (salon.image_urls && salon.image_urls.some(url => url && url.trim() !== '')) {
      return salon.image_urls.filter(url => url && url.trim() !== '');
    }
    
    // If no images, return placeholders
    return ['', '', '', '', ''];
  };

  const galleryImages = getGalleryImages();

  // Get pricing tier display
  const getPricingTierDisplay = () => {
    const tier = salon.pricing_tier?.toLowerCase() || 'premium';
    switch (tier) {
      case 'diamond':
        return { 
          color: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white', 
          icon: <Crown className="h-4 w-4" />,
          text: 'DIAMOND TIER'
        };
      case 'featured':
        return { 
          color: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white', 
          icon: <Star className="h-4 w-4" />,
          text: 'FEATURED LISTING'
        };
      case 'vietnamese_featured':
        return { 
          color: 'bg-gradient-to-r from-orange-600 to-amber-600 text-white', 
          icon: <Sparkles className="h-4 w-4" />,
          text: 'VIETNAMESE FEATURED'
        };
      default:
        return { 
          color: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white', 
          icon: <Star className="h-4 w-4" />,
          text: 'PREMIUM LISTING'
        };
    }
  };

  const pricingDisplay = getPricingTierDisplay();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 mx-4 my-4 sm:mx-6 sm:my-6">
        {/* Header with close and actions */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {salon.title || salon.company || "Salon Listing"}
            </DialogTitle>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{salon.location}</span>
              <Badge className={`${pricingDisplay.color} flex items-center gap-1 ml-2`}>
                {pricingDisplay.icon}
                {pricingDisplay.text}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-0">
          {/* Left: Gallery & Description */}
          <div className="lg:col-span-2 p-4 sm:p-6">
            {/* Image Gallery */}
            <div className="mb-6">
              {/* Main Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 group">
                {galleryImages[activeImageIndex] && galleryImages[activeImageIndex].trim() !== '' ? (
                  <img 
                    src={galleryImages[activeImageIndex]} 
                    alt={salon.title || "Salon"} 
                    className={`w-full h-full object-cover transition-all duration-300 ${isExpired ? 'grayscale' : ''}`}
                  />
                ) : (
                  // PLACEHOLDER: Image placeholder when no image URL is provided
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-6xl mb-4">📷</div>
                      <div className="text-lg font-medium">Photos Coming Soon</div>
                      <div className="text-sm">Images will be added by the owner</div>
                    </div>
                  </div>
                )}
                
                {/* Expired Overlay */}
                {isExpired && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-xl">
                      POSITION FILLED
                    </div>
                  </div>
                )}
                
                {/* FOMO Message */}
                {salon.fomo_message && !isExpired && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold text-center animate-pulse">
                      {salon.fomo_message}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === index ? 'border-purple-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {img && img.trim() !== '' ? (
                      <img src={img} alt={`Premium salon interior photo ${index + 1} - established beauty business with khách sang clientele and tip cao potential`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    ) : (
                      // PLACEHOLDER: Thumbnail placeholder
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-400 text-xs text-center">
                          <div className="text-2xl mb-1">📷</div>
                          <div>Photo {index + 1}</div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabbed Content */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 sticky top-0 z-10 bg-white">
                <TabsTrigger value="description" className="text-xs sm:text-sm">Description</TabsTrigger>
                <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
                <TabsTrigger value="details" className="text-xs sm:text-sm">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About This Salon</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {isSignedIn 
                        ? salon.description 
                        : salon.description 
                          ? `${salon.description.substring(0, 150)}... [Sign in to read more]`
                          : 'Sign in to view full description'
                      }
                    </p>
                  </div>
                  
                  {/* Vietnamese Description */}
                  {isVietnamese && salon.vietnamese_description && isSignedIn && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2">Mô tả tiếng Việt:</h4>
                      <p className="text-orange-700">{salon.vietnamese_description}</p>
                    </div>
                  )}
                  
                  {!isSignedIn && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-700 text-center font-medium">
                        🔒 Sign in to view complete description and contact information
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Salon Features & Amenities</h3>
                  {salon.salon_features && salon.salon_features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {salon.salon_features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No specific features listed.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Property Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {salon.square_feet && (
                      <div>
                        <span className="text-gray-500">Square Footage:</span>
                        <p className="font-medium">{salon.square_feet} sqft</p>
                      </div>
                    )}
                    {salon.monthly_rent && (
                      <div>
                        <span className="text-gray-500">Monthly Rent:</span>
                        <p className="font-medium">${salon.monthly_rent}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <p className="font-medium">{salon.category || 'Professional Salon'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Listed:</span>
                      <p className="font-medium">
                        {salon.created_at ? new Date(salon.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right: Pricing & Contact */}
          <div className="lg:col-span-1 bg-gray-50 p-4 sm:p-6 order-first lg:order-last">
            <div className="lg:sticky lg:top-24">
              {/* Price Section */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {isSignedIn ? (salon.price || 'Contact for Price') : '🔒 Sign in for Price'}
                  </div>
                  {salon.monthly_rent && isSignedIn && (
                    <div className="text-sm text-gray-600">
                      Monthly Rent: ${salon.monthly_rent}
                    </div>
                  )}
                </div>
                
                {/* Quick Stats */}
                {isSignedIn && (
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm border-t pt-4">
                    {salon.square_feet && (
                      <div className="text-center">
                        <Home className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                        <div className="font-medium">{salon.square_feet} sqft</div>
                      </div>
                    )}
                    <div className="text-center">
                      <Eye className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                      <div className="font-medium">247 views</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Section */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                
                {isSignedIn ? (
                  <div className="space-y-3">
                    {salon.contact_info?.owner_name && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{salon.contact_info.owner_name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{salon.contact_info?.phone || 'Available after inquiry'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{salon.contact_info?.email || 'inquiries@emvi.app'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    <p className="mb-2">🔒 Contact information available</p>
                    <p className="text-sm">Sign in to view seller details</p>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {isSignedIn ? (
                  <>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                      Contact Seller Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Schedule Viewing
                    </Button>
                    <Button variant="outline" className="w-full">
                      Request More Info
                    </Button>
                  </>
                ) : (
                  <AuthAction
                    onAction={() => true}
                    customTitle="Sign in to contact seller"
                    creditMessage="Create a free account to access contact information and communicate with sellers."
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                      View Contact Info
                    </Button>
                  </AuthAction>
                )}
                
                <Button variant="outline" onClick={onClose} className="w-full">
                  Close
                </Button>
              </div>
              
              {/* Expired Message */}
              {isExpired && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-center font-medium text-sm">
                    💔 This listing has been filled. Set up alerts to catch similar opportunities!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModalRedesigned;