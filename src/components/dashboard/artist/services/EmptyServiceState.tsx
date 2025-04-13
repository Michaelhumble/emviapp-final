
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyServiceStateProps {
  onAddClick: () => void;
}

const EmptyServiceState = ({ onAddClick }: EmptyServiceStateProps) => {
  return (
    <div className="text-center py-12 bg-slate-50 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
        <Plus className="h-6 w-6 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No services listed yet.</h3>
      <p className="text-sm text-slate-500 mb-4">
        Start adding your services to let clients know what you offer.
      </p>
      <Button onClick={onAddClick}>
        Add Your First Service
      </Button>
    </div>
  );
};

export default EmptyServiceState;
