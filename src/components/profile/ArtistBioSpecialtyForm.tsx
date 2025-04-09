
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { LoaderCircle, Check } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import SpecialtySelector from './components/SpecialtySelector';

interface ArtistBioSpecialtyFormProps {
  onComplete?: (taskId: string) => void;
}

const ArtistBioSpecialtyForm = ({ onComplete }: ArtistBioSpecialtyFormProps) => {
  const { user, refreshUserProfile, userProfile } = useAuth();
  const [bio, setBio] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 300;

  // Load existing data when component mounts
  useEffect(() => {
    if (userProfile) {
      setBio(userProfile.bio || '');
      setSpecialty(userProfile.specialty || '');
      setCharCount(userProfile.bio?.length || 0);
    }
  }, [userProfile]);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = e.target.value;
    if (newBio.length <= maxChars) {
      setBio(newBio);
      setCharCount(newBio.length);
    }
  };

  const isFormValid = () => {
    return bio.trim().length > 0 && specialty.length > 0;
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    if (!isFormValid()) {
      toast.error("Please fill in both your bio and specialty");
      return;
    }

    setIsSaving(true);

    try {
      // Update bio and specialty in the users table
      const { error } = await supabase
        .from('users')
        .update({
          bio: bio.trim(),
          specialty,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh user profile data
      await refreshUserProfile();

      toast.success("Profile updated successfully!");

      // Mark this task as complete if both fields are filled
      if (onComplete && bio.trim() && specialty) {
        onComplete("bio_specialty");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const isComplete = !!(bio.trim() && specialty);

  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-4">
        <CardTitle className="text-lg font-medium flex items-center">
          Tell Us About You
          {isComplete && <Check className="ml-2 h-4 w-4 text-green-500" />}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Your Bio <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="bio"
            placeholder="Tell clients about your expertise, style, and what makes your work unique..."
            className="resize-none min-h-[120px]"
            value={bio}
            onChange={handleBioChange}
            required
          />
          <div className="flex justify-end">
            <span className={`text-xs ${charCount >= maxChars ? 'text-red-500' : 'text-muted-foreground'}`}>
              {charCount}/{maxChars} characters
            </span>
          </div>
        </div>

        <SpecialtySelector
          value={specialty}
          onValueChange={setSpecialty}
          required={true}
        />
      </CardContent>

      <CardFooter className="bg-gray-50 px-5 py-4">
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !isFormValid()}
          className="ml-auto"
        >
          {isSaving ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Profile'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArtistBioSpecialtyForm;
