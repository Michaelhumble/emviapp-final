
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Instagram, Phone } from 'lucide-react';

interface SalonContactTabProps {
  bio: string;
  phone: string;
  instagram: string;
  website: string;
  setBio: (value: string) => void;
  setPhone: (value: string) => void;
  setInstagram: (value: string) => void;
  setWebsite: (value: string) => void;
}

const SalonContactTab = ({ 
  bio, 
  phone, 
  instagram, 
  website, 
  setBio, 
  setPhone, 
  setInstagram, 
  setWebsite 
}: SalonContactTabProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">About & Contact Information</h3>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="bio">About Your Salon</Label>
          <Textarea
            id="bio"
            placeholder="Tell potential clients and professionals about your salon"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone" className="flex items-center gap-1">
            <Phone className="h-4 w-4" /> Phone
          </Label>
          <Input
            id="phone"
            placeholder="Contact phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="instagram" className="flex items-center gap-1">
            <Instagram className="h-4 w-4" /> Instagram
          </Label>
          <Input
            id="instagram"
            placeholder="Instagram username (without @)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="website" className="flex items-center gap-1">
            <Globe className="h-4 w-4" /> Website
          </Label>
          <Input
            id="website"
            placeholder="Your salon's website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SalonContactTab;
