
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
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-center sm:text-left">About & Contact Information</h3>
      
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="bio" className="text-sm font-medium">About Your Salon</Label>
          <Textarea
            id="bio"
            placeholder="Tell potential clients and professionals about your salon"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="text-base resize-none"
          />
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
            <Phone className="h-4 w-4" /> Phone
          </Label>
          <Input
            id="phone"
            placeholder="Contact phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 text-base"
            type="tel"
          />
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="instagram" className="flex items-center gap-2 text-sm font-medium">
            <Instagram className="h-4 w-4" /> Instagram
          </Label>
          <Input
            id="instagram"
            placeholder="Instagram username (without @)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="h-12 text-base"
          />
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4" /> Website
          </Label>
          <Input
            id="website"
            placeholder="Your salon's website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="h-12 text-base"
            type="url"
          />
        </div>
      </div>
    </div>
  );
};

export default SalonContactTab;
