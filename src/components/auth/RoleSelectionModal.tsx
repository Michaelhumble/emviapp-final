
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Role = "artist" | "freelancer" | "salon" | "customer" | "supplier" | "other";

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
  
  const roles: { id: Role; label: string; description: string }[] = [
    {
      id: "artist",
      label: "Artist (Nail Technicians, Hair Stylists, etc.)",
      description: "I'm a licensed beauty artist ready to offer my services."
    },
    {
      id: "freelancer",
      label: "Freelancer (Makeup, Photography, Content, etc.)",
      description: "I'm an independent creative offering beauty-related gigs or support."
    },
    {
      id: "salon",
      label: "Salon (Business Owner)",
      description: "I own or manage a beauty business."
    },
    {
      id: "customer",
      label: "Customer",
      description: "I'm here to discover services, book appointments, or explore EmviApp."
    },
    {
      id: "supplier",
      label: "Beauty Supplier (Vendor)",
      description: "I sell products or equipment to beauty professionals."
    },
    {
      id: "other",
      label: "Other",
      description: "I'm not listed above, but I'd still love to join."
    }
  ];

  const handleRoleSelection = async () => {
    if (!selectedRole) return;
    
    setIsSubmitting(true);
    
    try {
      // Update user role in Supabase
      const { error } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Show success toast
      toast({
        title: "Role selected!",
        description: `You're now registered as a ${selectedRole}.`,
      });
      
      // Redirect to appropriate profile setup page
      switch(selectedRole) {
        case 'artist':
          navigate('/artists/profile-setup');
          break;
        case 'salon':
          navigate('/salon/profile-setup');
          break;
        case 'supplier':
          navigate('/vendors/profile-setup');
          break;
        case 'freelancer':
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
                  <Label htmlFor={role.id} className="text-base font-medium">
                    {role.label}
                  </Label>
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
