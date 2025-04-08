
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ArtistErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

const ArtistErrorState = ({ errorMessage, onRetry }: ArtistErrorStateProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Bell className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Couldn't Load Your Dashboard</h3>
          <p className="text-gray-600 mb-4">{errorMessage}</p>
          <Button 
            onClick={onRetry}
            variant="outline"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistErrorState;
