
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

// Component implementation that properly uses toast from sonner
const ArtistClientsPreviewSection = () => {
  // Using the proper toast implementation
  const handleAddClient = () => {
    toast.info("Adding new client", {
      description: "This feature is coming soon!"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Clients</h3>
        <Button variant="ghost" size="sm" onClick={handleAddClient}>
          <PlusCircle className="w-4 h-4 mr-1" />
          Add Client
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        No clients added yet. Add your first client to keep track of their preferences and appointments.
      </div>
    </div>
  );
};

export default ArtistClientsPreviewSection;
