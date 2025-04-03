
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFiltersProps {
  filters: {
    weeklyPay: boolean;
    ownerWillTrain: boolean;
    employmentType: string;
    showExpired: boolean;
  };
  searchTerm: string;
  onFiltersChange: (filters: {
    weeklyPay: boolean;
    ownerWillTrain: boolean;
    employmentType: string;
    showExpired: boolean;
  }) => void;
  onSearchChange: (searchTerm: string) => void;
  onResetFilters: () => void;
}

const JobFilters = ({
  filters,
  searchTerm,
  onFiltersChange,
  onSearchChange,
  onResetFilters,
}: JobFiltersProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-grow"
        />

        <Select 
          value={filters.employmentType} 
          onValueChange={(value) => 
            onFiltersChange({ ...filters, employmentType: value })
          }
        >
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full-Time</SelectItem>
            <SelectItem value="part-time">Part-Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="secondary" onClick={onResetFilters}>Reset Filters</Button>
      </div>

      <div className="flex items-center flex-wrap gap-6 mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="weeklyPay"
            checked={filters.weeklyPay}
            onCheckedChange={(checked) => 
              onFiltersChange({ ...filters, weeklyPay: !!checked })
            }
          />
          <label
            htmlFor="weeklyPay"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Weekly Pay
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="ownerWillTrain"
            checked={filters.ownerWillTrain}
            onCheckedChange={(checked) => 
              onFiltersChange({ ...filters, ownerWillTrain: !!checked })
            }
          />
          <label
            htmlFor="ownerWillTrain"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Owner Will Train
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showExpired"
            checked={filters.showExpired}
            onCheckedChange={(checked) => 
              onFiltersChange({ ...filters, showExpired: !!checked })
            }
          />
          <label
            htmlFor="showExpired"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Expired
          </label>
        </div>
      </div>
    </>
  );
};

export default JobFilters;
