
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
import { Search, Filter } from "lucide-react";

interface Filters {
  weeklyPay: boolean;
  ownerWillTrain: boolean;
  employmentType: string;
  showExpired: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
}

interface JobFiltersProps {
  filters: Filters;
  searchTerm: string;
  onFiltersChange: (filters: Filters) => void;
  onSearchChange: (searchTerm: string) => void;
  onResetFilters: () => void;
  showVietnameseFilters?: boolean;
}

const JobFilters = ({
  filters,
  searchTerm,
  onFiltersChange,
  onSearchChange,
  onResetFilters,
  showVietnameseFilters = false
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
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
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
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Weekly Pay Filter */}
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="weeklyPay">
                    Weekly Pay
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
                    Owner Will Train
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
                        Has Housing (Có chỗ ở)
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
