
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ArtistProfileDetails from "./ArtistProfileDetails";
import PortfolioShowcase from "./PortfolioShowcase";
import ServicesList from "./ServicesList";
import BookingForm from "./BookingForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Service } from "@/pages/u/artist-profile/types";
import { UserProfile } from "@/types/profile";
import TestimonialsSection from "./TestimonialsSection";

interface ArtistProfileProps {
  profile: UserProfile;
  services: Service[];
  portfolioImages: any[];
  rating?: number;
  reviewCount?: number;
}

// Dummy testimonials data – replace with real fetched data when available
const demoTestimonials = [
  {
    id: "1",
    client_name: "Sophia Lee",
    service_type: "Gel Manicure",
    review_text: "Absolutely loved my nails! Sophia created the exact style I wanted. Will book again.",
    rating: 5,
  },
  {
    id: "2",
    client_name: "Mia Chen",
    service_type: "Nail Art",
    review_text: "Unique and beautiful designs. The atmosphere was relaxing & friendly.",
    rating: 4,
  },
];

const ArtistProfile = ({
  profile,
  services,
  portfolioImages,
  rating = 5.0,
  reviewCount = 0,
}: ArtistProfileProps) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const isMobile = useIsMobile();

  const handleBookNow = () => setShowBookingModal(true);
  const closeBookingModal = () => setShowBookingModal(false);

  // Use demoTestimonials for now; replace with data from API/backend
  const testimonials = demoTestimonials;

  return (
    <div className="relative">
      {/* Top Book Button */}
      <div className="flex justify-end mb-6">
        {profile.accepts_bookings && (
          <Button
            className="
              px-8 py-3 rounded-lg font-semibold text-base shadow-md bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700
              text-white hover:from-purple-700 hover:to-pink-600 transition-colors
            "
            onClick={handleBookNow}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book This Artist
          </Button>
        )}
      </div>

      <div className="mb-10">
        <ArtistProfileDetails
          profile={profile}
          onBookNow={handleBookNow}
          rating={rating}
          reviewCount={reviewCount}
        />
      </div>

      {/* Portfolio Section */}
      <div className="mb-12">
        <h2 className="text-xl font-serif font-medium mb-4">Portfolio</h2>
        <PortfolioShowcase
          artistId={profile.id}
          artistUsername={profile.instagram || profile.id}
          limit={6}
        />
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} artistName={profile.full_name} />

      {/* Second Book Button after testimonials */}
      {profile.accepts_bookings && (
        <div className="flex justify-center my-10">
          <Button
            size="lg"
            className="
              min-w-[220px] px-8 py-4 rounded-lg font-semibold text-base shadow-lg bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700
              text-white hover:from-purple-700 hover:to-pink-600 transition-colors
            "
            onClick={handleBookNow}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book This Artist
          </Button>
        </div>
      )}

      {/* Services Section */}
      <div className="mb-12">
        <h2 className="text-xl font-serif font-medium mb-4">Services</h2>
        <ServicesList services={services} />
      </div>

      {/* Desktop Book Now button (existing logic) */}
      {!isMobile && profile.accepts_bookings && (
        <div className="sticky top-24 float-right -mt-32 ml-8 z-10 max-w-xs w-full shadow-lg rounded-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-5 text-white">
            <h3 className="font-medium text-lg mb-1">Ready to Book?</h3>
            <p className="text-sm text-white/90">
              Book your appointment with {profile.full_name}
            </p>
          </div>
          <div className="bg-white p-5">
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={handleBookNow}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Now
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              Quick response • Free cancellation (24h)
            </p>
          </div>
        </div>
      )}

      {/* Mobile Sticky Book Button (existing logic) */}
      {isMobile && profile.accepts_bookings && !showBookingModal && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 border-t border-gray-100 backdrop-blur-sm shadow-lg z-20"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-6"
            onClick={handleBookNow}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book with {profile.full_name}
          </Button>
        </motion.div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookingModal}
          >
            <motion.div
              className="w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10 rounded-full h-8 w-8 bg-white/90 text-gray-700 hover:bg-white hover:text-gray-900"
                  onClick={closeBookingModal}
                >
                  <X className="h-4 w-4" />
                </Button>
                <BookingForm
                  artistId={profile.id}
                  artistName={profile.full_name || "Artist"}
                  services={services}
                  onClose={closeBookingModal}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtistProfile;
