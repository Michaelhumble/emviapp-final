
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SalonBasicInfoTabProps {
  salonName: string;
  location: string;
  googleReviewLink?: string; // Added this prop
  setSalonName: (value: string) => void;
  setLocation: (value: string) => void;
  setGoogleReviewLink?: (value: string) => void; // Added this prop
}

const SalonBasicInfoTab = ({
  salonName,
  location,
  googleReviewLink,
  setSalonName,
  setLocation,
  setGoogleReviewLink
}: SalonBasicInfoTabProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="salonName">Salon Name</Label>
        <Input
          id="salonName"
          placeholder="Enter your salon name"
          value={salonName}
          onChange={(e) => setSalonName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="City, State or Full Address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      {setGoogleReviewLink && (
        <div className="space-y-2">
          <Label htmlFor="googleReviewLink">Google Review Link</Label>
          <Input
            id="googleReviewLink"
            placeholder="https://g.page/r/YOUR_CODE/review"
            value={googleReviewLink || ''}
            onChange={(e) => setGoogleReviewLink(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Add your Google review link to encourage customers to leave reviews
          </p>
        </div>
      )}
    </div>
  );
};

export default SalonBasicInfoTab;
