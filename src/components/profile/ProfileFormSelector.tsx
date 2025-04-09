
import { useAuth } from "@/context/auth";
import ArtistProfileForm from "./ArtistProfileForm";
import SalonOwnerProfileForm from "./SalonOwnerProfileForm";
import GenericProfileForm from "./GenericProfileForm";
import { isArtistRole, isSalonOwnerRole } from "@/utils/roleHelpers";

const ProfileFormSelector = () => {
  const { userRole } = useAuth();

  if (isArtistRole(userRole)) {
    return <ArtistProfileForm />;
  }

  if (isSalonOwnerRole(userRole)) {
    return <SalonOwnerProfileForm />;
  }

  // Default form for other roles
  return <GenericProfileForm />;
};

export default ProfileFormSelector;
