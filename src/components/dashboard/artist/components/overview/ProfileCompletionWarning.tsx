
import { useAuth } from "@/context/auth";
import { ProfileCompletionCard } from "@/components/profile/ProfileCompletionCard";

const ProfileCompletionWarning = () => {
  const { userProfile } = useAuth();

  // Calculate profile completion
  const calculateCompletion = () => {
    if (!userProfile) return { percentage: 0, incompleteFields: ['Profile Photo', 'Bio', 'Specialty'], isComplete: false };
    
    const requiredFields = ['bio', 'specialty', 'avatar_url'];
    const completedFields = requiredFields.filter(field => {
      const value = userProfile[field as keyof typeof userProfile];
      return value && value !== '';
    });
    
    const percentage = Math.floor((completedFields.length / requiredFields.length) * 100);
    const incompleteFields = requiredFields
      .filter(field => !userProfile[field as keyof typeof userProfile] || userProfile[field as keyof typeof userProfile] === '')
      .map(field => {
        switch(field) {
          case 'avatar_url': return 'Profile Photo';
          case 'bio': return 'Bio';
          case 'specialty': return 'Specialty';
          default: return field;
        }
      });
    
    return {
      percentage,
      incompleteFields,
      isComplete: percentage === 100
    };
  };

  const completion = calculateCompletion();

  if (completion.isComplete) {
    return null;
  }

  return (
    <div className="mb-6">
      <ProfileCompletionCard 
        completionPercentage={completion.percentage}
        incompleteFields={completion.incompleteFields}
        isComplete={completion.isComplete}
      />
    </div>
  );
};

export default ProfileCompletionWarning;
