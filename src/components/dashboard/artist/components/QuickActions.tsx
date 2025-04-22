
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        size="sm"
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create New Service
      </Button>
      <Button 
        size="sm"
        variant="outline"
        disabled
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Send Promo
      </Button>
    </div>
  );
};

export default QuickActions;
