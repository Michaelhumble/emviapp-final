
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const BookingsErrorState = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <AlertTriangle className="h-10 w-10 text-amber-500 mb-3" />
        <h3 className="font-medium text-lg mb-2">Unable to load bookings</h3>
        <p className="text-muted-foreground text-center mb-4">
          We couldn't load your bookings. Please try again later.
        </p>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
        >
          Retry
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingsErrorState;
