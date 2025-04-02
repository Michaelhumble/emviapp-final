
import { useState } from "react";
import { Search, MapPin, Scissors } from "lucide-react";

interface SalonsFilterProps {
  onFilterChange?: (filters: any) => void;
}

const SalonsFilter = ({ onFilterChange }: SalonsFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters = {
      searchTerm,
      location,
      serviceType
    };
    
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4">
      <div className="md:col-span-5 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search salons by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900/60 border border-gray-700/70 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <div className="md:col-span-3 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900/60 border border-gray-700/70 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <div className="md:col-span-3 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Scissors size={18} className="text-gray-400" />
        </div>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 appearance-none bg-gray-900/60 border border-gray-700/70 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">All Services</option>
          <option value="haircut">Haircut</option>
          <option value="color">Hair Color</option>
          <option value="nails">Nails</option>
          <option value="spa">Spa</option>
        </select>
      </div>
      
      <div className="md:col-span-1">
        <button 
          type="submit"
          className="w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SalonsFilter;
