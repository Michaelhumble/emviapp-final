
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useProfileCompletion } from "../hooks/useProfileCompletion";
import ProfilePhotoUploader from "./ProfilePhotoUploader";
import { useEffect } from "react";
import { useAuth } from "@/context/auth";

const ArtistProfilePictureUpload = () => {
  const { isTaskComplete, markTaskComplete } = useProfileCompletion();
  const { userProfile } = useAuth();
  const profilePictureTaskComplete = isTaskComplete("profile_picture");
  
  // Auto-mark task complete if profile picture exists
  useEffect(() => {
    if (userProfile?.avatar_url && !profilePictureTaskComplete) {
      console.log("Auto-marking profile picture task as complete");
      markTaskComplete("profile_picture");
    }
  }, [userProfile?.avatar_url, profilePictureTaskComplete, markTaskComplete]);

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
        <ProfilePhotoUploader 
          onSuccess={() => markTaskComplete("profile_picture")}
        />
      </CardContent>
    </Card>
  );
};

export default ArtistProfilePictureUpload;
