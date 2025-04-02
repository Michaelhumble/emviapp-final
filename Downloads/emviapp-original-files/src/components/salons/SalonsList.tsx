
import { Salon } from "../../types/salon";
import SalonCard from "./SalonCard";
import { Scissors } from "lucide-react";

export interface SalonsListProps {
  salons: Salon[];
  loading: boolean;
  error: string | null;
  onBookAppointment: (salon: Salon) => void;
}

const SalonsList = ({ salons, loading, error, onBookAppointment }: SalonsListProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin mb-4">
          <Scissors size={24} className="text-purple-400" />
        </div>
        <p className="text-gray-400">Loading salons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 p-6 rounded-xl text-red-200 border border-red-500/20">
        <h3 className="font-medium text-xl mb-2">Error Loading Salons</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!salons.length) {
    return (
      <div className="bg-gray-800 p-10 rounded-xl text-center">
        <div className="inline-flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mb-4">
          <Scissors size={24} className="text-purple-400" />
        </div>
        <h3 className="font-medium text-xl mb-2 text-white">No Salons Found</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          We couldn't find any salons matching your criteria. Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {salons.map((salon) => (
        <SalonCard 
          key={salon.id} 
          salon={salon} 
          onBookAppointment={onBookAppointment} 
        />
      ))}
    </div>
  );
};

export default SalonsList;
