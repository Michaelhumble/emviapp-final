import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ArtistsFiltersProps {
  q: string;
  location: string;
  specialty: string;
  available: boolean;
  vietnamese: boolean;
  sort: "updated" | "experience" | "rate";
  onChange: (patch: Partial<ArtistsFiltersProps>) => void;
  specialtyChips: string[];
  hasLanguageField?: boolean;
}

const ArtistsFilters: React.FC<ArtistsFiltersProps> = ({
  q,
  location,
  specialty,
  available,
  vietnamese,
  sort,
  onChange,
  specialtyChips,
  hasLanguageField = false,
}) => {
  return (
    <div className={cn(
      "sticky top-0 z-30 animate-fade-in",
      "backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90",
      "border-b shadow-sm"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              placeholder="Search name, headline, specialties"
              value={q}
              onChange={(e) => onChange({ q: e.target.value })}
            />
            <Input
              placeholder="Location (city or state)"
              value={location}
              onChange={(e) => onChange({ location: e.target.value })}
            />
            <Input
              placeholder="Specialty"
              value={specialty}
              onChange={(e) => onChange({ specialty: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={available} onChange={(e) => onChange({ available: e.target.checked })} />
              <span>Available now</span>
            </label>
            {hasLanguageField && (
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={vietnamese} onChange={(e) => onChange({ vietnamese: e.target.checked })} />
                <span>Vietnamese speaking</span>
              </label>
            )}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={sort}
              onChange={(e) => onChange({ sort: e.target.value as any })}
            >
              <option value="updated">Updated (newest)</option>
              <option value="experience">Experience (desc)</option>
              <option value="rate">Rate (asc)</option>
            </select>
          </div>
        </div>

        {specialtyChips.length > 0 && (
          <div className="pb-3 flex flex-wrap gap-2">
            {specialtyChips.map((chip) => (
              <Button
                key={chip}
                size="sm"
                variant={specialty === chip ? "default" : "outline"}
                className="rounded-full"
                onClick={() => onChange({ specialty: specialty === chip ? "" : chip })}
              >
                {chip}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistsFilters;
