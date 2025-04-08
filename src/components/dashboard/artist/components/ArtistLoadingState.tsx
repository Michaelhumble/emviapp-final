
import { Loader } from "lucide-react";

const ArtistLoadingState = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center">
      <div className="text-center">
        <Loader className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default ArtistLoadingState;
