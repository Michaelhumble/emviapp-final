
import React from "react";
import { SalonFilters as SalonFiltersType } from "../../types/salon";
import { Search, MapPin, Scissors, Clock } from "lucide-react";

interface SalonFiltersProps {
  filters: SalonFiltersType;
  locations: string[];
  salonTypes: string[];
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const SalonFilters: React.FC<SalonFiltersProps> = ({
  filters,
  locations,
  salonTypes,
  onFilterChange,
}) => {
  return (
    <div className="p-6 border border-white/5 rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-md shadow-xl animate-fade-in">
      <h3 className="text-xl font-medium mb-5 text-white">Find Your Perfect Salon</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by name"
            className="pl-10 w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
            onChange={onFilterChange}
            value={filters.searchTerm}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <MapPin size={18} />
          </div>
          <select
            name="location"
            className="pl-10 w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent appearance-none"
            onChange={onFilterChange}
            value={filters.location}
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <Scissors size={18} />
          </div>
          <select
            name="salonType"
            className="pl-10 w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent appearance-none"
            onChange={onFilterChange}
            value={filters.salonType}
          >
            <option value="all">All Types</option>
            {salonTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative flex items-center bg-white/5 rounded-xl border border-white/10 px-4">
          <Clock size={18} className="text-gray-400 mr-2 flex-shrink-0" />
          <label className="flex items-center cursor-pointer flex-1">
            <input
              type="checkbox"
              name="openNow"
              className="sr-only"
              onChange={onFilterChange}
              checked={filters.openNow}
            />
            <div className={`relative w-11 h-6 rounded-full transition-all duration-300 mr-3 ${filters.openNow ? 'bg-purple-500' : 'bg-gray-600/50'}`}>
              <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${filters.openNow ? 'translate-x-5' : ''}`}></div>
            </div>
            <span className="text-white">Open Now</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SalonFilters;
