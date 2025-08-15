
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RealSalonListing } from '@/data/salons/realSalonListings';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Clock, User, Mail, Phone, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { supabaseBypass } from '@/types/supabase-bypass';
import { toast } from 'sonner';
import ContactInfoGate from "@/components/jobs/ContactInfoGate";

interface SalonDetailModalProps {
  salon: RealSalonListing | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal: React.FC<SalonDetailModalProps> = ({ salon, isOpen, onClose }) => {
  const { isSignedIn, user, userRole } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!salon) return null;

  // Check if current user owns this listing
  const isOwner = user && ('user_id' in salon) && salon.user_id === user.id;
  const isAdmin = userRole === 'admin';
  const canEdit = isOwner || isAdmin;

  const handleEdit = () => {
    navigate(`/posting/salon?edit=${salon.id}`);
    onClose();
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      const { error } = await supabaseBypass
        .from('salon_sales' as any)
        .delete()
        .eq('id' as any, salon.id);
        
      if (error) throw error;
      
      toast.success('Listing deleted successfully');
      onClose();
      // Auto-refresh will happen via the parent component
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
    }
  };

  // Filter valid images
  const validImages = salon.images?.filter(img => img && img.trim() && img !== 'null' && img !== 'undefined') || [];
  console.log('SalonDetailModal salon data:', salon);
  console.log('SalonDetailModal validImages:', validImages);

  // Navigation functions for image gallery
  const nextImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const prevImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] sm:w-auto overflow-y-auto p-3 sm:p-6">
        <DialogHeader>
          <div className="flex justify-between items-start gap-4">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              {salon.name}
            </DialogTitle>
            {canEdit && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleEdit}
                  className="h-8 px-3 text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDelete}
                  className="h-8 px-3 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        {/* Full Image Gallery - Mobile optimized */}
        <div className="mb-4 sm:mb-6">
          {validImages.length > 0 ? (
            <div className="relative">
              {/* Main Image - Mobile optimized height */}
              <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={validImages[currentImageIndex]}
                  alt={salon.name}
                  className="w-full h-full object-cover"
                  businessName={salon.name}
                />
                
                {/* Navigation arrows */}
                {validImages.length > 1 && (
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
                  {currentImageIndex + 1} / {validImages.length}
                </div>
              </div>

              {/* Thumbnail strip - Mobile optimized */}
              {validImages.length > 1 && (
                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto">
                  {validImages.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded border-2 overflow-hidden bg-white shadow-sm flex-shrink-0 ${
                        index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                      }`}
                    >
                      <ImageWithFallback
                        src={imageUrl}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        businessName={salon.name}
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
                <div className="text-xs mt-1">Available photos: {validImages.length}</div>
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
            
            {(salon.sqft || (salon as any).square_feet) && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-500">Size</div>
                  <div className="font-medium text-sm sm:text-base">
                    {(salon.sqft || (salon as any).square_feet)?.toLocaleString()} sqft
                  </div>
                </div>
              </div>
            )}

            {(salon.monthlyRent || (salon as any).monthly_rent) && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-500">Monthly Rent</div>
                  <div className="font-medium text-sm sm:text-base">
                    ${(salon.monthlyRent || (salon as any).monthly_rent)?.toLocaleString()}
                  </div>
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

          {/* Business Details Section */}
          {((salon as any).number_of_staff || (salon as any).number_of_chairs || (salon as any).number_of_tables || (salon as any).monthly_revenue || (salon as any).monthly_profit) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Business Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(salon as any).number_of_staff && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👥</span>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Staff</div>
                      <div className="font-medium">{(salon as any).number_of_staff} Employees</div>
                    </div>
                  </div>
                )}

                {(salon as any).number_of_chairs && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💺</span>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Chairs</div>
                      <div className="font-medium">{(salon as any).number_of_chairs} Chairs</div>
                    </div>
                  </div>
                )}

                {(salon as any).number_of_tables && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🪑</span>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Tables</div>
                      <div className="font-medium">{(salon as any).number_of_tables} Tables</div>
                    </div>
                  </div>
                )}

                {(salon as any).monthly_revenue && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📈</span>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Monthly Revenue</div>
                      <div className="font-medium">${(salon as any).monthly_revenue}</div>
                    </div>
                  </div>
                )}

                {(salon as any).monthly_profit && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Monthly Profit</div>
                      <div className="font-medium">${(salon as any).monthly_profit}</div>
                    </div>
                  </div>
                )}

                {(salon as any).established_year && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Established</div>
                      <div className="font-medium">{(salon as any).established_year}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Descriptions - Vietnamese-first for nails */}
          <div className="space-y-4">
            {salon.category === 'nails' || (salon as any)?.business_type?.toLowerCase().includes('nail') ? (
              <>
                {/* Vietnamese first for nail salons */}
                {salon.description_vi ? (
                  <>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Mô tả chi tiết</h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">{salon.description_vi}</p>
                    </div>
                    {salon.description_en && (
                      <>
                        <hr className="border-gray-200" />
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold mb-2">English Description</h3>
                          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{salon.description_en}</p>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{salon.description_en}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* English first for other categories */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{salon.description_en}</p>
                </div>
                
                {salon.description_vi && (
                  <>
                    <hr className="border-gray-200" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Mô tả (Vietnamese)</h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{salon.description_vi}</p>
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

          {/* FOMO & Social Proof - Enhanced */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">📊 Listing Activity</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-2 rounded border">
                <div className="text-xs text-gray-500">Views (24h)</div>
                <div className="font-bold text-purple-600">127</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="text-xs text-gray-500">Bookmarked</div>
                <div className="font-bold text-blue-600">18</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="text-xs text-gray-500">Inquiries</div>
                <div className="font-bold text-green-600">5</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="text-xs text-gray-500">Tours Booked</div>
                <div className="font-bold text-orange-600">3</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-600 text-center">
              🔥 Popular listing - getting high interest!
            </div>
          </div>

          {/* Contact Information - Auth Gated with Blur Effect */}
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
              <div className="text-center py-6 relative">
                {/* Blurred contact preview */}
                <div className="filter blur-sm pointer-events-none mb-4 bg-white/50 p-4 rounded">
                  <div className="flex items-center gap-3 justify-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">(555) XXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center mt-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">salon@xxx.com</span>
                  </div>
                </div>
                
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
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;
