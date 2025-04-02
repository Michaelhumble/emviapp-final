
import { User } from "../types/user";
import { 
  User as UserIcon, 
  MapPin, 
  Briefcase, 
  Instagram, 
  Globe
} from "lucide-react";
import FormField from "./profile/FormField";
import FormActions from "./profile/FormActions";
import ErrorMessage from "./profile/ErrorMessage";
import { useProfileForm } from "../hooks/useProfileForm";

interface EditProfileFormProps {
  profile: User;
  onProfileUpdate: (updatedProfile: User) => void;
}

const EditProfileForm = ({ profile, onProfileUpdate }: EditProfileFormProps) => {
  const {
    formData,
    loading,
    success,
    error,
    handleChange,
    handleSubmit
  } = useProfileForm(profile, onProfileUpdate);

  const handleCancel = () => {
    // You can add functionality here if needed
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg">
      <ErrorMessage error={error} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="full_name"
          name="full_name"
          label="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Your full name"
          icon={<UserIcon size={18} className="text-purple-300" />}
        />
        
        <FormField
          id="avatar_url"
          name="avatar_url"
          label="Avatar URL"
          value={formData.avatar_url}
          onChange={handleChange}
          placeholder="https://example.com/avatar.jpg"
        />
        
        <FormField
          id="specialty"
          name="specialty"
          label="Specialty"
          value={formData.specialty}
          onChange={handleChange}
          placeholder="Hair colorist, Nail artist, etc."
          icon={<Briefcase size={18} className="text-purple-300" />}
        />
        
        <FormField
          id="location"
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, State or Country"
          icon={<MapPin size={18} className="text-purple-300" />}
        />
        
        <FormField
          id="instagram"
          name="instagram"
          label="Instagram"
          value={formData.instagram}
          onChange={handleChange}
          placeholder="@yourusername"
          icon={<Instagram size={18} className="text-purple-300" />}
        />
        
        <FormField
          id="website"
          name="website"
          label="Website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          icon={<Globe size={18} className="text-purple-300" />}
        />
        
        <FormField
          id="phone"
          name="phone"
          label="Phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          as="input"
        />
        
        <FormField
          id="bio"
          name="bio"
          label="Bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          as="textarea"
          rows={5}
        />
      </div>
      
      <FormActions
        loading={loading}
        success={success}
        onCancel={handleCancel}
      />
    </form>
  );
};

export default EditProfileForm;
