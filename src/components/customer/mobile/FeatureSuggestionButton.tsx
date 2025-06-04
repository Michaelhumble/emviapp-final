
import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeatureSuggestionButton = () => {
  const navigate = useNavigate();

  const handleSuggestFeature = () => {
    // Navigate to profile page where the feature suggestion widget exists
    navigate('/profile');
  };

  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSuggestFeature}
        className="w-full justify-start bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 hover:from-yellow-100 hover:to-amber-100"
      >
        <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
        <span className="text-yellow-800">Suggest a Feature, Earn Credits!</span>
        <Coins className="h-3 w-3 ml-auto text-amber-600" />
      </Button>
      <p className="text-xs text-gray-500 mt-1 px-1">
        Share your ideas and get rewarded! 💡
      </p>
    </div>
  );
};

export default FeatureSuggestionButton;
