
import { Briefcase, MapPin, Scissors, DollarSign, Search } from "lucide-react";

export interface JobFiltersState {
  searchTerm: string;
  location: string;
  jobType: string;
  specialty: string;
  salary: string;
}

interface JobFiltersProps {
  filters: JobFiltersState;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit?: (filters: JobFiltersState) => void;
}

const JobFilters = ({ filters, onFilterChange, onSubmit }: JobFiltersProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(filters);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          name="searchTerm"
          placeholder="Search for job titles"
          className="pl-10 w-full p-3 rounded-xl bg-gray-900/60 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          onChange={onFilterChange}
          value={filters.searchTerm}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          name="location"
          placeholder="Filter by location"
          className="pl-10 w-full p-3 rounded-xl bg-gray-900/60 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          onChange={onFilterChange}
          value={filters.location}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Briefcase size={18} className="text-gray-400" />
        </div>
        <select
          name="jobType"
          className="pl-10 w-full p-3 rounded-xl bg-gray-900/60 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent appearance-none"
          onChange={onFilterChange}
          value={filters.jobType}
        >
          <option value="">Job Type (All)</option>
          <option value="fulltime">Full-Time</option>
          <option value="parttime">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Scissors size={18} className="text-gray-400" />
        </div>
        <select
          name="specialty"
          className="pl-10 w-full p-3 rounded-xl bg-gray-900/60 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent appearance-none"
          onChange={onFilterChange}
          value={filters.specialty}
        >
          <option value="">Specialty (All)</option>
          <option value="hair">Hair Stylist</option>
          <option value="nails">Nail Technician</option>
          <option value="makeup">Makeup Artist</option>
          <option value="barber">Barber</option>
          <option value="esthetician">Esthetician</option>
          <option value="massage">Massage Therapist</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign size={18} className="text-gray-400" />
        </div>
        <select
          name="salary"
          className="pl-10 w-full p-3 rounded-xl bg-gray-900/60 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent appearance-none"
          onChange={onFilterChange}
          value={filters.salary}
        >
          <option value="">Salary Range (Any)</option>
          <option value="0-30000">Up to $30,000</option>
          <option value="30000-50000">$30,000 - $50,000</option>
          <option value="50000-75000">$50,000 - $75,000</option>
          <option value="75000-100000">$75,000 - $100,000</option>
          <option value="100000+">$100,000+</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {onSubmit && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </form>
  );
};

export default JobFilters;
