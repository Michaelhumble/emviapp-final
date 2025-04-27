
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface FeatureListingButtonProps {
  salonId: string;
  currentlyFeatured?: boolean;
  onFeature?: (salonId: string) => void;
  disabled?: boolean;
}

const FeatureListingButton = ({ 
  salonId, 
  currentlyFeatured = false, 
  onFeature,
  disabled = false
}: FeatureListingButtonProps) => {
  const handleFeatureClick = () => {
    if (onFeature) {
      onFeature(salonId);
    }
  };

  return (
    <Button
      size="sm"
      variant={currentlyFeatured ? "default" : "outline"}
      className={currentlyFeatured ? "bg-amber-500 hover:bg-amber-600" : ""}
      onClick={handleFeatureClick}
      disabled={disabled}
    >
      <Star className={`h-4 w-4 mr-1 ${currentlyFeatured ? "fill-white" : ""}`} />
      {currentlyFeatured ? "Featured" : "Feature"}
    </Button>
  );
};

export default FeatureListingButton;
