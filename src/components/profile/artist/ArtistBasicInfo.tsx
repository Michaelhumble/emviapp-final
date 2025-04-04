
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ArtistBasicInfoProps {
  fullName: string;
  setFullName: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  skillLevel: string;
  setSkillLevel: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  specialties: string[];
  skillLevels: string[];
}

const ArtistBasicInfo = ({
  fullName,
  setFullName,
  specialty,
  setSpecialty,
  skillLevel,
  setSkillLevel,
  location,
  setLocation,
  specialties,
  skillLevels
}: ArtistBasicInfoProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input 
          id="fullName" 
          placeholder="Your professional name" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="specialty">Specialty</Label>
        <Select 
          value={specialty} 
          onValueChange={setSpecialty}
        >
          <SelectTrigger id="specialty">
            <SelectValue placeholder="Select your specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialtyOption) => (
              <SelectItem key={specialtyOption} value={specialtyOption}>
                {specialtyOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="skillLevel">Experience Level</Label>
        <Select 
          value={skillLevel} 
          onValueChange={setSkillLevel}
        >
          <SelectTrigger id="skillLevel">
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            {skillLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location" 
          placeholder="City, State" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
      </div>
    </div>
  );
};

export default ArtistBasicInfo;
