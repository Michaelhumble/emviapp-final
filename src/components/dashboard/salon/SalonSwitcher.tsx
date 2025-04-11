import { useState } from "react";
import { useSalon } from "@/context/salon";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical, Settings, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Salon } from "@/context/salon";

const SalonSwitcher = () => {
  const { salons, currentSalon, selectSalon, createSalon, isLoadingSalons, deleteSalon } = useSalon();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSalonName, setNewSalonName] = useState("");
  const [newSalonLocation, setNewSalonLocation] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSalon = async () => {
    if (!newSalonName.trim()) return;
    
    setIsCreating(true);
    try {
      const success = await createSalon({
        salon_name: newSalonName.trim(),
        location: newSalonLocation.trim()
      });
      
      if (success) {
        setIsCreateDialogOpen(false);
        setNewSalonName("");
        setNewSalonLocation("");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleSalonSelect = (salonId: string) => {
    selectSalon(salonId);
  };

  const handleDeleteSalon = async (salonId: string) => {
    await deleteSalon(salonId);
  };

  if (isLoadingSalons) {
    return (
      <div className="flex items-center space-x-2 h-10 w-[200px] px-4 rounded-md border border-gray-200 bg-white/50 animate-pulse">
        <div className="h-4 w-4 rounded-full bg-gray-200"></div>
        <div className="h-4 flex-1 rounded bg-gray-200"></div>
      </div>
    );
  }

  if (salons.length === 0) {
    return (
      <Button onClick={() => setIsCreateDialogOpen(true)} variant="outline" className="h-10">
        <PlusCircle className="h-4 w-4 mr-2" />
        Create Your First Salon
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select 
        value={currentSalon?.id || ""} 
        onValueChange={handleSalonSelect}
        disabled={salons.length <= 1}
      >
        <SelectTrigger className="w-[200px] h-10 bg-white">
          <SelectValue placeholder="Select salon" />
        </SelectTrigger>
        <SelectContent>
          {salons.map((salon) => (
            <SelectItem key={salon.id} value={salon.id}>
              {salon.salon_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {currentSalon && (
            <>
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit salon
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Salon settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-red-600" 
                onClick={() => currentSalon && handleDeleteSalon(currentSalon.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete salon
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {salons.length < 3 && (
        <Button 
          variant="outline" 
          size="sm" 
          className="h-10"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Salon
        </Button>
      )}

      {/* Create Salon Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Salon</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="salon-name">Salon Name</Label>
              <Input
                id="salon-name"
                placeholder="Enter your salon name"
                value={newSalonName}
                onChange={(e) => setNewSalonName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salon-location">Location (Optional)</Label>
              <Input
                id="salon-location"
                placeholder="e.g., Los Angeles, CA"
                value={newSalonLocation}
                onChange={(e) => setNewSalonLocation(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateSalon} 
              disabled={!newSalonName.trim() || isCreating}
            >
              {isCreating ? "Creating..." : "Create Salon"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalonSwitcher;
