
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { ArtistDataProvider } from "@/components/dashboard/artist/context/ArtistDataContext";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ProfileCompletionGuard from "@/components/profile/ProfileCompletionGuard";
import ProfileHighlights from "@/components/artist-profile/ProfileHighlights";
import PersonalMessageBanner from "@/components/artist-profile/PersonalMessageBanner";
import BookArtistCta from "@/components/artist-profile/BookArtistCta";
import ClientTestimonials from "@/components/artist-profile/ClientTestimonials";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const ArtistDashboardPage = () => {
  const { userProfile } = useAuth();
  const isMobile = useIsMobile();
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const handleBookNow = () => {
    setShowBookingModal(true);
    toast.info("Booking feature coming soon!");
  };
  
  return (
    <Layout>
      <ProfileCompletionGuard>
        <ArtistDataProvider>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                {/* Sticky Desktop CTA */}
                {!isMobile && (
                  <div className="sticky top-24">
                    <BookArtistCta 
                      artistName={userProfile?.full_name || "Artist"} 
                      rating={4.9}
                      onBookNow={handleBookNow}
                    />
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <div className="space-y-8">
                  <ArtistDashboard />
                  
                  <ProfileHighlights 
                    stats={{
                      rating: 4.9,
                      clients: 156,
                      completionRate: 98,
                      responseTime: "2 hrs",
                      repeatClients: 42,
                      experience: userProfile?.years_experience ? `${userProfile.years_experience} years` : "5+ years"
                    }} 
                  />
                  
                  <PersonalMessageBanner artistName={userProfile?.full_name} />
                  
                  <ClientTestimonials />
                </div>
              </div>
            </div>
            
            {/* Mobile Sticky CTA */}
            {isMobile && (
              <motion.div 
                className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 border-t border-gray-200 backdrop-blur-sm shadow-lg"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              >
                <button 
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md shadow-md flex items-center justify-center font-medium"
                  onClick={handleBookNow}
                >
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                  </span>
                  Book {userProfile?.full_name || "This Artist"}
                </button>
              </motion.div>
            )}
            
            {/* Booking Modal */}
            {showBookingModal && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-lg shadow-xl w-full max-w-md"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Book with {userProfile?.full_name}</h2>
                    <p className="mb-4">Booking functionality is coming soon! This premium feature will allow clients to book directly with you.</p>
                    <div className="flex justify-end">
                      <button 
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
                        onClick={() => setShowBookingModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </ArtistDataProvider>
      </ProfileCompletionGuard>
    </Layout>
  );
};

export default ArtistDashboardPage;
