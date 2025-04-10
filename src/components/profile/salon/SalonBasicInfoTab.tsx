
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, MapPin } from 'lucide-react';

interface SalonBasicInfoTabProps {
  salonName: string;
  location: string;
  setSalonName: (value: string) => void;
  setLocation: (value: string) => void;
}

const SalonBasicInfoTab = ({ salonName, location, setSalonName, setLocation }: SalonBasicInfoTabProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Salon Information</h3>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="salonName" className="flex items-center gap-1">
            <Building className="h-4 w-4" /> Salon Name
          </Label>
          <Input
            id="salonName"
            placeholder="Your salon's name"
            value={salonName}
            onChange={(e) => setSalonName(e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location" className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> Location
          </Label>
          <Input
            id="location"
            placeholder="Salon address or city/state"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SalonBasicInfoTab;
