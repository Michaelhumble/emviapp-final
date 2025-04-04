
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AtSign, Globe } from 'lucide-react';

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
  setWebsite
}: ArtistProfessionalDetailsProps) => {
  return (
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
        <Label htmlFor="skills">Skills (comma separated)</Label>
        <Input
          id="skills"
          placeholder="Acrylic nails, Gel, Nail art, Pedicures"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="instagram">Instagram</Label>
        <div className="flex items-center">
          <AtSign className="h-5 w-5 mr-2 text-muted-foreground" />
          <Input
            id="instagram"
            placeholder="Username (without @)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="website">Website or Portfolio</Label>
        <div className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
          <Input
            id="website"
            placeholder="https://your-portfolio-site.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistProfessionalDetails;
