
import { Store, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import SalonFeatureCard from "./SalonFeatureCard";
import PremiumFeaturesCard from "./PremiumFeaturesCard";

interface SalonSecondaryFeaturesProps {
  isPremium: boolean;
}

const SalonSecondaryFeatures = ({ isPremium }: SalonSecondaryFeaturesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Salon Profile Card */}
      <SalonFeatureCard
        title="Salon Profile"
        description="Manage your salon's public profile"
        icon={Store}
        buttonText="Edit Salon Profile"
        buttonLink="/salon/profile"
      />
      
      {/* Premium Features Card */}
      <PremiumFeaturesCard isPremium={isPremium} />
    </div>
  );
};

export default SalonSecondaryFeatures;
