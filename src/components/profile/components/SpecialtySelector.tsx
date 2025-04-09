
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
  "Other"
];

interface SpecialtySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
}

const SpecialtySelector = ({ value, onValueChange, required = false }: SpecialtySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="specialty">Specialty</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger id="specialty">
          <SelectValue placeholder="Select your specialty" />
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
