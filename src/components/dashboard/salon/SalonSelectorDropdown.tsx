
import { Fragment } from "react";
import { Check, ChevronDown, PlusCircle, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SalonData } from "@/hooks/useOwnerDashboardData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface SalonSelectorDropdownProps {
  salons: SalonData[];
  currentSalon: SalonData | null;
  onSelect: (salonId: string) => void;
  isLoading: boolean;
}

export function SalonSelectorDropdown({ 
  salons, 
  currentSalon, 
  onSelect, 
  isLoading 
}: SalonSelectorDropdownProps) {
  const navigate = useNavigate();
  
  if (isLoading) {
    return <Skeleton className="h-10 w-52" />;
  }
  
  if (salons.length === 0) {
    return (
      <Button 
        variant="outline" 
        className="gap-2" 
        onClick={() => navigate("/salon/create")}
      >
        <PlusCircle size={16} />
        <span>Create Your First Salon</span>
      </Button>
    );
  }
  
  const handleSalonSelect = (salonId: string) => {
    onSelect(salonId);
  };
  
  const handleCreateSalon = () => {
    navigate("/salon/create");
  };
  
  const handleManageSalon = () => {
    navigate("/salon/manage");
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between w-52">
          <span className="font-medium truncate">
            {currentSalon?.salon_name || "Select Salon"}
          </span>
          <ChevronDown size={16} className="ml-2 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {salons.map((salon) => (
          <DropdownMenuItem
            key={salon.id}
            className="cursor-pointer flex items-center justify-between"
            onClick={() => handleSalonSelect(salon.id)}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="truncate"
            >
              {salon.salon_name}
            </motion.span>
            {currentSalon?.id === salon.id && (
              <Check size={16} className="ml-2 text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        {salons.length < 3 && (
          <Fragment>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={handleCreateSalon}
            >
              <PlusCircle size={16} className="mr-2" />
              <span>Add New Salon</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </Fragment>
        )}
        
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleManageSalon}
        >
          <Settings size={16} className="mr-2" />
          <span>Manage Salons</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
