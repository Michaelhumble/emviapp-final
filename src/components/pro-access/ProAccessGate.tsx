
import React from 'react';
import { Lock } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/auth';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface ProAccessGateProps {
  children: React.ReactNode;
  tooltipText?: string;
  blur?: boolean;
}

const ProAccessGate: React.FC<ProAccessGateProps> = ({ 
  children, 
  tooltipText = "This artist is only available to Pro salons",
  blur = true 
}) => {
  const { user, userRole } = useAuth();
  
  // Only apply gating for salon owners
  const shouldGate = userRole === 'salon' || userRole === 'owner';
  
  // No gating needed for these roles or when not logged in
  if (!shouldGate || !user) {
    return <>{children}</>;
  }
  
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              <div className={blur ? "filter blur-sm select-none pointer-events-none" : ""}>
                {children}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px] rounded-md">
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white/90 hover:bg-white border border-primary/20 text-primary hover:text-primary/90 px-4 gap-2"
                  >
                    <Lock className="h-4 w-4 text-primary" />
                    Unlock with Emvi Pro Access
                  </Button>
                </DialogTrigger>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-2 max-w-xs">
            <p>{tooltipText}</p>
            <p className="text-xs text-muted-foreground mt-1">Nâng cấp để liên hệ trực tiếp với kỹ thuật viên này</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Get Full Access to Artists Near You
          </DialogTitle>
          <DialogDescription className="pt-2">
            Emvi Pro salons can directly contact and hire top professionals in your area. 
            Unlock access to contact information and direct messaging with beauty professionals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Pro Access Benefits:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">✓</Badge>
                <span>Direct contact with thousands of beauty professionals</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">✓</Badge>
                <span>Send custom job offers to top artists</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">✓</Badge>
                <span>Unlimited artist searches by location and specialty</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">✓</Badge>
                <span>Premium salon listing with boosted visibility</span>
              </li>
            </ul>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button className="w-full sm:w-auto" size="lg">
            Upgrade to Emvi Pro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProAccessGate;
