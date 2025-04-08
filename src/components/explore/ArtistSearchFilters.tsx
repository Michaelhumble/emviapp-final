
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

interface ArtistSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

const ArtistSearchFilters: React.FC<ArtistSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  specialty,
  setSpecialty,
  sortBy,
  setSortBy,
  location,
  setLocation
}) => {
  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'Nail Artist', label: 'Nail Artist' },
    { value: 'Nail Technician', label: 'Nail Technician' },
    { value: 'Lash Artist', label: 'Lash Artist' },
    { value: 'Hair Stylist', label: 'Hair Stylist' },
    { value: 'Makeup Artist', label: 'Makeup Artist' },
    { value: 'Brow Artist', label: 'Brow Artist' },
    { value: 'Esthetician', label: 'Esthetician' },
    { value: 'Massage Therapist', label: 'Massage Therapist' },
  ];

  const sortOptions = [
    { value: 'boosted', label: 'Featured Artists' },
    { value: 'newest', label: 'Newest Artists' },
    { value: 'alphabetical', label: 'A-Z' },
  ];

  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">Search Artists</Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Name, specialty, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="specialty" className="text-sm font-medium mb-1.5 block">Specialty</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty" className="w-full">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="sortBy" className="text-sm font-medium mb-1.5 block">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sortBy" className="w-full">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-4">
        <Label htmlFor="location" className="text-sm font-medium mb-1.5 block">Filter by Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            placeholder="City, state, or zip code..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistSearchFilters;
