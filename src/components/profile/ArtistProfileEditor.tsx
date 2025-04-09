
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArtistProfileForm from "./artist/ArtistProfileForm";
import ArtistProfilePhotoUpload from "./artist/ArtistProfilePhotoUpload";
import ProfileProgressTracker from "./artist/ProfileProgressTracker";

const ArtistProfileEditor = () => {
  return (
    <div className="space-y-6">
      <ProfileProgressTracker />
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <ArtistProfilePhotoUpload />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ArtistProfileForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistProfileEditor;
