
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useProfileCompletion } from "@/components/profile/hooks/useProfileCompletion";
import ArtistProfilePhotoUploader from "./ArtistProfilePhotoUploader";

const ArtistProfilePictureUpload = () => {
  const { isTaskComplete } = useProfileCompletion();
  const profilePictureTaskComplete = isTaskComplete("profile_picture");

  return (
    <Card className="shadow-sm border-purple-100 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle className="text-lg font-medium flex items-center">
          Profile Picture
          {profilePictureTaskComplete && (
            <span className="ml-2 text-green-500">
              <CheckCircle2 className="h-5 w-5" />
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <ArtistProfilePhotoUploader />
      </CardContent>
    </Card>
  );
};

export default ArtistProfilePictureUpload;
