
import { useAuth } from "@/context/auth";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";

const ProfileCompletionWarning = () => {
  const { userProfile } = useAuth();

  if (userProfile && (!userProfile.bio || !userProfile.specialty || !userProfile.avatar_url)) {
    return (
      <div className="mb-6">
        <ProfileCompletionCard />
      </div>
    );
  }

  return null;
};

export default ProfileCompletionWarning;
