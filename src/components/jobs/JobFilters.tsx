
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Search, Filter, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Filters {
  weeklyPay: boolean;
  ownerWillTrain: boolean;
  employmentType: string;
  showExpired: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
  industry?: string;
  language?: string;
  location?: string;
}

interface JobFiltersProps {
  filters: Filters;
  searchTerm: string;
  onFiltersChange: (filters: Filters) => void;
  onSearchChange: (searchTerm: string) => void;
  onResetFilters: () => void;
  showVietnameseFilters?: boolean;
  suggestedKeywords?: string[];
}

const JobFilters = ({
  filters,
  searchTerm,
  onFiltersChange,
  onSearchChange,
  onResetFilters,
  showVietnameseFilters = false,
  suggestedKeywords = []
}: JobFiltersProps) => {
  const handleFilterChange = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleKeywordSelect = (keyword: string) => {
    onSearchChange(keyword);
  };

  // Sample locations for dropdown
  const locations = [
    "All Locations",
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Philadelphia, PA",
    "Phoenix, AZ",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA"
  ];

  // Sample industries
  const industries = [
    "All Industries",
    "Nails",
    "Hair",
    "Tattoo",
    "Barbershop",
    "Makeup",
    "Massage",
    "Skincare",
    "Eyelash"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <Accordion type="single" collapsible defaultValue="filters">
        <AccordionItem value="filters" className="border-b-0">
          <AccordionTrigger className="py-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter Jobs</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {/* Search Input with Autocomplete */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
                {searchTerm && suggestedKeywords.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestedKeywords
                      .filter(keyword => 
                        keyword.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((keyword, index) => (
                        <div 
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleKeywordSelect(keyword)}
                        >
                          {keyword}
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>

              {/* Suggested Keywords */}
              <div className="flex flex-wrap gap-2">
                {['Weekly Pay 💰', 'Housing 🏠', 'High Tips 💅', 'Bao Lương ✅', 'Owner Train 👩‍🏫'].map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleKeywordSelect(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Employment Type */}
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select 
                    value={filters.employmentType} 
                    onValueChange={(value) => handleFilterChange('employmentType', value)}
                  >
                    <SelectTrigger id="employmentType">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-Time">Full-Time</SelectItem>
                      <SelectItem value="Part-Time">Part-Time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Bao Lương">Bao Lương</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry Type - New */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={filters.industry || 'all'} 
                    onValueChange={(value) => handleFilterChange('industry', value)}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry === "All Industries" ? "all" : industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location - New */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Select 
                      value={filters.location || 'all'} 
                      onValueChange={(value) => handleFilterChange('location', value)}
                    >
                      <SelectTrigger id="location" className="flex-grow">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(location => (
                          <SelectItem key={location} value={location === "All Locations" ? "all" : location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="flex-shrink-0"
                      title="Use my location"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Language - New */}
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={filters.language || 'all'} 
                    onValueChange={(value) => handleFilterChange('language', value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="vietnamese">Vietnamese</SelectItem>
                      <SelectItem value="bilingual">Bilingual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Weekly Pay Filter */}
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="weeklyPay">
                    Weekly Pay 💰
                  </Label>
                  <Switch 
                    id="weeklyPay"
                    checked={filters.weeklyPay}
                    onCheckedChange={(checked) => handleFilterChange('weeklyPay', checked)}
                  />
                </div>

                {/* Owner Will Train Filter */}
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="ownerWillTrain">
                    Owner Will Train 👩‍🏫
                  </Label>
                  <Switch 
                    id="ownerWillTrain"
                    checked={filters.ownerWillTrain}
                    onCheckedChange={(checked) => handleFilterChange('ownerWillTrain', checked)}
                  />
                </div>

                {/* Show Expired Jobs */}
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="showExpired">
                    Show Expired Posts
                  </Label>
                  <Switch 
                    id="showExpired"
                    checked={filters.showExpired}
                    onCheckedChange={(checked) => handleFilterChange('showExpired', checked)}
                  />
                </div>

                {/* Vietnamese-specific filters */}
                {showVietnameseFilters && (
                  <>
                    {/* Has Housing Filter */}
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="hasHousing">
                        Has Housing 🏠 (Có chỗ ở)
                      </Label>
                      <Switch 
                        id="hasHousing"
                        checked={filters.hasHousing || false}
                        onCheckedChange={(checked) => handleFilterChange('hasHousing', checked)}
                      />
                    </div>

                    {/* No Supply Deduction Filter */}
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="noSupplyDeduction">
                        No Supply Deduction (Không trừ supply)
                      </Label>
                      <Switch 
                        id="noSupplyDeduction"
                        checked={filters.noSupplyDeduction || false}
                        onCheckedChange={(checked) => handleFilterChange('noSupplyDeduction', checked)}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Reset Button */}
              <div className="pt-2 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={onResetFilters} 
                  size="sm"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default JobFilters;
