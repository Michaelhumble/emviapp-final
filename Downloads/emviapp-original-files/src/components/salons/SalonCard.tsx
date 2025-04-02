
import { Star, Clock, MapPin, CalendarDays } from "lucide-react";
import { Salon } from "../../types/salon";

interface SalonCardProps {
  salon: Salon;
  onBookAppointment: (salon: Salon) => void;
}

const SalonCard = ({ salon, onBookAppointment }: SalonCardProps) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-400 opacity-50"
              : "text-gray-600"
          }`}
        />
      ));
  };

  return (
    <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700/50 overflow-hidden hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
      <div className="relative h-48">
        <img
          src={salon.images?.[0] || '/placeholder-salon.jpg'}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {renderStars(salon.rating)}
            </div>
            <span className="text-white text-sm">
              {salon.rating} ({salon.reviews?.length || 0})
            </span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-medium text-white mb-2">{salon.name}</h3>
        <div className="flex items-start mb-3">
          <MapPin size={18} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
          <p className="text-gray-300 text-sm">{salon.address}</p>
        </div>
        <div className="flex items-start mb-5">
          <Clock size={18} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
          <div className="text-gray-300 text-sm">
            <p>{typeof salon.hours === 'string' ? salon.hours : 'Hours available'}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-purple-300 font-medium">
            {salon.services && Array.isArray(salon.services) && salon.services.length > 0 
              ? typeof salon.services[0] === 'string' 
                ? salon.services[0] 
                : 'Hair Services'
              : 'Hair Services'}
          </span>
          <button
            onClick={() => onBookAppointment(salon)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg flex items-center transition-colors"
          >
            <CalendarDays size={16} className="mr-2" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalonCard;
