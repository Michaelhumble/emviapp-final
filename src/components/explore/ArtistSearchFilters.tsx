
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, Star, Sparkles, Clock, Users } from 'lucide-react';

interface ArtistSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  specialty: string;
  setSpecialty: (specialty: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  location: string;
  setLocation: (location: string) => void;
}

const specialties = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Lash Technician",
  "Brow Artist",
  "Esthetician",
  "Barber",
  "Massage Therapist",
  "Tattoo Artist"
];

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
  const handleClearFilters = () => {
    setSearchQuery("");
    setSpecialty("all");
    setSortBy("boosted");
    setLocation("");
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 p-4 md:p-6 mb-8">
      <div className="flex flex-col space-y-4">
        {/* Search Input */}
        <div className="flex items-center relative">
          <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, specialty, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Specialty Filter */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium mb-1 flex items-center">
              <Filter className="h-4 w-4 mr-1" /> Specialty
            </label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Location Filter */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium mb-1 flex items-center">
              <MapPin className="h-4 w-4 mr-1" /> Location
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Location</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Houston">Houston</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="Seattle">Seattle</SelectItem>
                <SelectItem value="Dallas">Dallas</SelectItem>
                <SelectItem value="Atlanta">Atlanta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Sort By */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium mb-1 flex items-center">
              <Star className="h-4 w-4 mr-1" /> Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boosted">
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    <span>Most Boosted</span>
                  </div>
                </SelectItem>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Newest</span>
                  </div>
                </SelectItem>
                <SelectItem value="popular">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Most Popular</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Clear Filters Button */}
        {(searchQuery || specialty !== "all" || sortBy !== "boosted" || location) && (
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            size="sm"
            className="self-start"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArtistSearchFilters;
