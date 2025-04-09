
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const SPECIALTIES = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Esthetician",
  "Tattoo Artist",
  "Microblading",
  "Barber",
  "Lash Tech",
  "Nail Artist",
  "Permanent Makeup",
  "Body Piercing",
  "Waxing Specialist",
  "Brow Specialist",
  "Skin Care Specialist",
  "Other"
];

interface SpecialtySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

const SpecialtySelector = ({ 
  value, 
  onValueChange, 
  required = false,
  placeholder = "Select your specialty" 
}: SpecialtySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="specialty">
        Specialty {required && <span className="text-red-500">*</span>}
      </Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        required={required}
      >
        <SelectTrigger id="specialty" className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {SPECIALTIES.map(specialty => (
            <SelectItem key={specialty} value={specialty}>
              {specialty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SpecialtySelector;
