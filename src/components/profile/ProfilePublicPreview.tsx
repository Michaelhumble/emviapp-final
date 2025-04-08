
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";

const ProfilePublicPreview = () => {
  const { userProfile } = useAuth();
  
  // Create a public profile URL
  const publicProfileUrl = userProfile?.id 
    ? `/profile/${userProfile.id}`
    : null;
  
  if (!publicProfileUrl) return null;
  
  return (
    <Card className="border border-gray-100 shadow-sm bg-gradient-to-r from-gray-50 to-blue-50">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">See your public profile</h3>
              <p className="text-sm text-gray-500">Preview how others view your profile</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={publicProfileUrl} target="_blank" className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Public Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePublicPreview;
