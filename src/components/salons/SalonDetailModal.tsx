
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RealSalonListing } from '@/data/salons/realSalonListings';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Clock, User, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';

interface SalonDetailModalProps {
  salon: RealSalonListing | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal: React.FC<SalonDetailModalProps> = ({ salon, isOpen, onClose }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!salon) return null;

  // Navigation functions for image gallery
  const nextImage = () => {
    if (salon.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % salon.images.length);
    }
  };

  const prevImage = () => {
    if (salon.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + salon.images.length) % salon.images.length);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-3 sm:p-6 relative">
        {/* Enhanced X button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-50 w-9 h-9 sm:w-6 sm:h-6 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200 transition-all"
        >
          <span className="text-gray-600 text-xl sm:text-base font-bold leading-none">×</span>
        </button>
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            {salon.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detailed information about {salon.name} salon listing including photos, pricing, and contact details.
          </DialogDescription>
        </DialogHeader>

        {/* Full Image Gallery - Mobile optimized */}
        <div className="mb-4 sm:mb-6">
          {salon.images.length > 0 ? (
            <div className="relative">
              {/* Main Image - Mobile optimized height */}
              <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg">
                <img
                  src={salon.images[currentImageIndex]}
                  alt={salon.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                {salon.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-1.5 sm:p-2 hover:bg-black/80 transition-all"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-1.5 sm:p-2 hover:bg-black/80 transition-all"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </>
                )}

                {/* Image counter - Mobile optimized */}
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
                  {currentImageIndex + 1} / {salon.images.length}
                </div>
              </div>

              {/* Thumbnail strip - Mobile optimized */}
              {salon.images.length > 1 && (
                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto">
                  {salon.images.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded border-2 overflow-hidden bg-white shadow-sm flex-shrink-0 ${
                        index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-purple-500/20"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-48 sm:h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📷</div>
                <div className="font-medium">Photos Coming Soon</div>
              </div>
            </div>
          )}
        </div>

        {/* Salon Details - Mobile optimized spacing */}
        <div className="space-y-4 sm:space-y-6">
          {/* Price and Key Info - Mobile optimized */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">{salon.price}</div>
            {salon.urgent && (
              <Badge className="bg-red-100 text-red-800 text-xs">URGENT SALE</Badge>
            )}
            {salon.featured && (
              <Badge className="bg-purple-100 text-purple-800 text-xs">FEATURED</Badge>
            )}
          </div>

          {/* Stats Grid - Mobile optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              <div>
                <div className="text-xs sm:text-sm text-gray-500">Location</div>
                <div className="font-medium text-sm sm:text-base">{salon.location}</div>
              </div>
            </div>
            
            {salon.sqft && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-500">Size</div>
                  <div className="font-medium text-sm sm:text-base">{salon.sqft.toLocaleString()} sqft</div>
                </div>
              </div>
            )}

            {salon.monthlyRent && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-500">Monthly Rent</div>
                  <div className="font-medium text-sm sm:text-base">${salon.monthlyRent.toLocaleString()}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              <div>
                <div className="text-xs sm:text-sm text-gray-500">Posted</div>
                <div className="font-medium text-sm sm:text-base">{salon.datePosted}</div>
              </div>
            </div>
          </div>

          {/* Descriptions - Vietnamese-first for nails */}
          <div className="space-y-4">
            {salon.category === 'nails' ? (
              <>
                {/* Vietnamese first for nails */}
                {salon.description_vi ? (
                  <>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Mô tả chi tiết</h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">{salon.description_vi}</p>
                    </div>
                    <hr className="border-gray-200" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">English Description</h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{salon.description_en}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{salon.description_en}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* English first for other categories */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{salon.description_en}</p>
                </div>
                
                {salon.description_vi && (
                  <>
                    <hr className="border-gray-200" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Mô tả (Vietnamese)</h3>
                      <p className="text-gray-600 leading-relaxed">{salon.description_vi}</p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Features */}
          {salon.features && salon.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {salon.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information - Auth Gated */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
            
            {isSignedIn ? (
              <div className="space-y-3">
                {salon.contact.name && (
                  <div className="flex items-center gap-3">
                    <div className="font-medium">Contact: {salon.contact.name}</div>
                  </div>
                )}
                
                {salon.contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium text-lg">{salon.contact.phone}</div>
                    </div>
                  </div>
                )}
                
                {salon.contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{salon.contact.email}</div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3">
                  <Button className="bg-green-600 hover:bg-green-700 text-sm">
                    📞 Call Now
                  </Button>
                  <Button variant="outline" className="text-sm">
                    ✉️ Send Message
                  </Button>
                  <Button variant="outline" className="text-sm">
                    📅 Schedule Viewing
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-gray-600 mb-4">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <p className="font-medium">Sign in to view contact information</p>
                  <p className="text-sm">Get access to phone number, email, and messaging</p>
                </div>
                <Button onClick={() => navigate('/auth')} className="bg-purple-600 hover:bg-purple-700">
                  Sign In to Contact Seller
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile-only Close button at bottom */}
        <div className="sm:hidden sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-6">
          <Button 
            onClick={onClose}
            className="w-full h-12 text-base font-medium bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
          >
            Đóng (Close)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;
