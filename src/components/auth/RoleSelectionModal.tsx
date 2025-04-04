
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Scissors, Building2, User, Briefcase, ShoppingBag, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserRole } from "@/context/auth/types";

type Role = UserRole;

interface RoleSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const RoleSelectionModal = ({ open, onOpenChange, userId }: RoleSelectionModalProps) => {
  const [selectedRole, setSelectedRole] = useState<Role>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const roles: { id: Role; label: string; description: string; icon: React.ReactNode }[] = [
    {
      id: "artist",
      label: "Artist (Hair, Brows, Lashes, Nails, Tattoo...)",
      description: "I'm a beauty professional looking for jobs, exposure, or to build my brand.",
      icon: <Scissors className="h-5 w-5 text-primary" />
    },
    {
      id: "salon",
      label: "Salon (Business)",
      description: "I'm a salon owner hiring, managing my team, or selling my salon.",
      icon: <Building2 className="h-5 w-5 text-primary" />
    },
    {
      id: "customer",
      label: "Customer",
      description: "I'm looking for beauty services and offers from top professionals.",
      icon: <User className="h-5 w-5 text-primary" />
    },
    {
      id: "freelancer",
      label: "Freelancer (Makeup Artist, Photographer, etc.)",
      description: "I'm a solo artist looking for gigs, clients, or to promote my service.",
      icon: <Briefcase className="h-5 w-5 text-primary" />
    },
    {
      id: "renter",
      label: "Booth Renter (Independent Contractor)",
      description: "I rent space in a salon and run my own business.",
      icon: <Briefcase className="h-5 w-5 text-primary" />
    },
    {
      id: "vendor",
      label: "Vendor (Beauty Supplier)",
      description: "I sell products or tools for beauty salons and professionals.",
      icon: <ShoppingBag className="h-5 w-5 text-primary" />
    },
    {
      id: "other",
      label: "Other",
      description: "I'm not sure yet — I just want to explore.",
      icon: <HelpCircle className="h-5 w-5 text-primary" />
    }
  ];

  const handleRoleSelection = async () => {
    if (!selectedRole) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Role selected!",
        description: `You're now registered as a ${selectedRole}.`,
      });
      
      switch(selectedRole) {
        case 'artist':
          navigate('/artists/profile-setup');
          break;
        case 'salon':
          navigate('/salon/profile-setup');
          break;
        case 'vendor':
        case 'supplier':
        case 'beauty supplier':
          navigate('/vendors/profile-setup');
          break;
        case 'freelancer':
        case 'renter':
          navigate('/freelancers/profile-setup');
          break;
        case 'other':
          navigate('/other/profile-setup');
          break;
        case 'customer':
        default:
          navigate('/customers/profile-setup');
          break;
      }
    } catch (error) {
      console.error("Error setting user role:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "We couldn't save your role. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Welcome to EmviApp!</DialogTitle>
          <DialogDescription>
            Tell us how you'd like to use the platform so we can personalize your experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <RadioGroup
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value as Role)}
            className="space-y-4"
          >
            {roles.map((role) => (
              <div
                key={role.id}
                className={`flex items-start space-x-3 rounded-lg border p-4 transition-all cursor-pointer ${
                  selectedRole === role.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <RadioGroupItem value={role.id} id={role.id} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      {role.icon}
                    </div>
                    <Label htmlFor={role.id} className="text-base font-medium">
                      {role.label}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleRoleSelection}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
