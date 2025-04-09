
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useProfileCompletion } from "../hooks/useProfileCompletion";
import ProfilePhotoUploader from "./ProfilePhotoUploader";

const ArtistProfilePictureUpload = () => {
  const { isTaskComplete } = useProfileCompletion();
  const profilePictureTaskComplete = isTaskComplete("profile_picture");

  return (
    <Card className="shadow-sm border-border/50 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          Profile Picture
          {profilePictureTaskComplete && (
            <span className="ml-2 text-green-500">
              <Check className="h-5 w-5" />
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        <ProfilePhotoUploader />
      </CardContent>
    </Card>
  );
};

export default ArtistProfilePictureUpload;
