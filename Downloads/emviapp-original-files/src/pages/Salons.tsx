
import { Scissors } from "lucide-react";
import { useState } from "react";
import SalonsList from "../components/salons/SalonsList";
import SalonsFilter from "../components/salons/SalonsFilter";
import BookingModal from "../components/salons/BookingModal";
import { useSalonData } from "../hooks/useSalonData";
import { Salon } from "../types/salon";

const Salons = () => {
  const { salons, loading, error } = useSalonData({
    searchTerm: "",
    location: "",
    salonType: "",
    openNow: false
  });
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBooking = (salon: Salon) => {
    setSelectedSalon(salon);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedSalon(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      <div className="flex items-center mb-8">
        <Scissors size={30} className="text-purple-400 mr-3" strokeWidth={1.5} />
        <h1 className="text-3xl font-medium bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent tracking-tight">
          Salons & Studios
        </h1>
      </div>

      <div className="bg-gradient-to-b from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-8 mb-10 transition-all hover:shadow-purple-900/10">
        <h2 className="text-xl font-medium text-white mb-5 tracking-tight">Find Your Perfect Salon</h2>
        <SalonsFilter />
      </div>

      <SalonsList
        salons={salons}
        loading={loading}
        error={error}
        onBookAppointment={handleOpenBooking}
      />

      {selectedSalon && isBookingModalOpen && (
        <BookingModal
          salon={selectedSalon}
          onClose={handleCloseBooking}
        />
      )}
      
      <div className="h-20"></div> {/* Extra space at the bottom for better UX */}
    </div>
  );
};

export default Salons;
