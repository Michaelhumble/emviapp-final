
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AtSign, Globe } from "lucide-react";

interface ArtistProfessionalDetailsProps {
  bio: string;
  setBio: (value: string) => void;
  skills: string;
  setSkills: (value: string) => void;
  instagram: string;
  setInstagram: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
}

const ArtistProfessionalDetails = ({
  bio,
  setBio,
  skills,
  setSkills,
  instagram,
  setInstagram,
  website,
  setWebsite,
}: ArtistProfessionalDetailsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Professional Details</h3>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell clients about your experience, style, and specialties"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input
            id="skills"
            placeholder="e.g. Hair Coloring, Balayage, Extensions"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Enter your skills separated by commas
          </p>
        </div>
        
        <h4 className="font-medium mt-2">Social & Online Presence</h4>
        
        <div className="grid gap-2">
          <Label htmlFor="instagram" className="flex items-center gap-2">
            <AtSign className="h-4 w-4" /> Instagram
          </Label>
          <Input
            id="instagram"
            placeholder="Your Instagram username (without @)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Website
          </Label>
          <Input
            id="website"
            placeholder="Your website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistProfessionalDetails;
