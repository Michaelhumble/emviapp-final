
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
  // Use optional chaining and fallback values for all potentially missing fields
  const avatarUrl = userProfile?.avatar_url || undefined;
  const fullName = userProfile?.full_name || 'User';
  const firstLetter = fullName?.charAt(0) || 'U';
  const specialty = userProfile?.specialty || 'No Specialty';
  const email = userProfile?.email || '';
  const phone = userProfile?.phone || '';
  const location = userProfile?.location || '';
  const website = userProfile?.website || '';
  const instagram = userProfile?.instagram || '';
  const bio = userProfile?.bio || '';
  // Safely check for badges without assuming specific structure
  const isPremium = userProfile?.badges && Array.isArray(userProfile.badges) && 
                   userProfile.badges.some((badge: any) => badge === 'premium' || (typeof badge === 'object' && badge?.type === 'premium'));

  return (
    <div className="space-y-6">
      <ProfileCompletionBar />
      <div className="flex flex-col items-center">
        <Avatar className="w-32 h-32">
          <AvatarImage src={avatarUrl} alt={fullName} />
          <AvatarFallback>{firstLetter}</AvatarFallback>
        </Avatar>
        <div className="mt-4 space-y-1 text-center">
          <div className="font-bold text-lg">{fullName}</div>
          <div className="text-sm text-gray-500">{specialty}</div>
          {isPremium && (
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
            <strong>Email:</strong> {email}
          </div>
          {phone && (
            <div>
              <strong>Phone:</strong> {phone}
            </div>
          )}
          {location && (
            <div>
              <strong>Location:</strong> {location}
            </div>
          )}
          {website && (
            <div>
              <strong>Website:</strong>{' '}
              <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Visit Site
              </a>
            </div>
          )}
          {instagram && (
            <div>
              <strong>Instagram:</strong>{' '}
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                @{instagram}
              </a>
            </div>
          )}
        </div>
      </div>
      
      {bio && (
        <div className="border rounded-md p-4 bg-gray-50">
          <h4 className="font-semibold text-sm mb-2">About Me</h4>
          <p className="text-sm text-gray-700">{bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
