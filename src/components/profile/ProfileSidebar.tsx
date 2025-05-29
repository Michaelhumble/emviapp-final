import { UserProfile } from "@/context/auth/types";
import ProfileCompletionBar from "./ProfileCompletionBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Verified } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileSidebarProps {
  userProfile: UserProfile;
}

const ProfileSidebar = ({ userProfile }: ProfileSidebarProps) => {
  return (
    <div className="space-y-6">
      <ProfileCompletionBar />
      <div className="flex flex-col items-center">
        <Avatar className="w-32 h-32">
          <AvatarImage src={userProfile.avatar_url || undefined} alt={userProfile.full_name} />
          <AvatarFallback>{userProfile.full_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="mt-4 space-y-1 text-center">
          <div className="font-bold text-lg">{userProfile.full_name}</div>
          <div className="text-sm text-gray-500">{userProfile.specialty || 'No Specialty'}</div>
          {userProfile.is_premium && (
            <div className="flex items-center justify-center text-sm text-green-600">
              <Verified className="h-4 w-4 mr-1" />
              Verified
            </div>
          )}
        </div>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link to="/profile/edit" className="flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Link>
        </Button>
      </div>
      
      <div className="border rounded-md p-4 bg-gray-50">
        <h4 className="font-semibold text-sm mb-2">Contact Information</h4>
        <div className="text-sm space-y-2">
          <div>
            <strong>Email:</strong> {userProfile.email}
          </div>
          {userProfile.phone && (
            <div>
              <strong>Phone:</strong> {userProfile.phone}
            </div>
          )}
          {userProfile.location && (
            <div>
              <strong>Location:</strong> {userProfile.location}
            </div>
          )}
          {userProfile.website && (
            <div>
              <strong>Website:</strong>{' '}
              <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Visit Site
              </a>
            </div>
          )}
          {userProfile.instagram && (
            <div>
              <strong>Instagram:</strong>{' '}
              <a href={`https://instagram.com/${userProfile.instagram}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                @{userProfile.instagram}
              </a>
            </div>
          )}
        </div>
      </div>
      
      {userProfile.bio && (
        <div className="border rounded-md p-4 bg-gray-50">
          <h4 className="font-semibold text-sm mb-2">About Me</h4>
          <p className="text-sm text-gray-700">{userProfile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
