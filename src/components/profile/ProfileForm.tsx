
import React from 'react';
import { Loader2 } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types/profile';
import FormField from './components/FormField';
import SpecialtySelector from './components/SpecialtySelector';
import { useProfileForm } from './hooks/useProfileForm';

interface ProfileFormProps {
  onProfileUpdate?: (updatedProfile: UserProfile) => void;
}

const ProfileForm = ({ onProfileUpdate }: ProfileFormProps) => {
  const { 
    formData, 
    updating, 
    handleChange, 
    handleSpecialtyChange, 
    handleSubmit 
  } = useProfileForm({ onProfileUpdate });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your profile to help clients find and connect with you
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Display Name */}
            <FormField
              id="full_name"
              name="full_name"
              label="Display Name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Your professional name"
              required
            />
            
            {/* Specialty */}
            <SpecialtySelector
              value={formData.specialty}
              onValueChange={handleSpecialtyChange}
            />
            
            {/* Location */}
            <FormField
              id="location"
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
            />
            
            {/* Instagram URL */}
            <FormField
              id="instagram"
              name="instagram"
              label="Instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@yourusername"
            />
            
            {/* Website URL */}
            <FormField
              id="website"
              name="website"
              label="Website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              type="url"
            />
            
            {/* Bio - Full width */}
            <div className="col-span-1 md:col-span-2">
              <FormField
                id="bio"
                name="bio"
                label="Bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell clients about yourself and your work..."
                type="textarea"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={updating}>
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
