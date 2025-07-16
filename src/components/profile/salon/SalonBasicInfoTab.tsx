
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
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-center sm:text-left">Salon Information</h3>
      
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="salonName" className="flex items-center gap-2 text-sm font-medium">
            <Building className="h-4 w-4" /> Salon Name
          </Label>
          <Input
            id="salonName"
            placeholder="Your salon's name"
            value={salonName}
            onChange={(e) => setSalonName(e.target.value)}
            className="h-12 text-base"
          />
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4" /> Location
          </Label>
          <Input
            id="location"
            placeholder="Salon address or city/state"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12 text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default SalonBasicInfoTab;
