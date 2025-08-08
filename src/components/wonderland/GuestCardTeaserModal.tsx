import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { analytics } from "@/lib/analytics";
import { useAuth } from "@/context/auth";

interface GuestCardTeaserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image?: string;
  title?: string;
  cardType?: 'job' | 'salon' | 'artist' | 'gallery';
}

const GuestCardTeaserModal: React.FC<GuestCardTeaserModalProps> = ({ open, onOpenChange, image, title, cardType }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (open) {
      analytics.trackEvent({
        action: 'wonderland_card_teaser_open',
        category: 'wonderland',
        custom_parameters: {
          userStatus: isSignedIn ? 'authenticated' : 'guest',
          cardType
        }
      });
    }
  }, [open, isSignedIn, cardType]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-lg">{title || "Preview"}</DialogTitle>
          <DialogDescription>
            Sign up to unlock full details.
          </DialogDescription>
        </DialogHeader>
        {image && (
          <div className="rounded-md overflow-hidden border border-border">
            <img src={image} alt={title || 'Card image'} className="w-full h-48 object-cover" />
          </div>
        )}
        {/* Lightweight perks and blurred placeholders */}
        <ul className="mt-3 text-sm text-muted-foreground list-disc pl-5">
          <li>Unlock direct contact details</li>
          <li>See full job and salon benefits</li>
        </ul>
        <div className="mt-3 p-3 rounded-md border border-border bg-muted/30">
          <div className="h-4 w-32 bg-muted rounded blur-[1px]" />
          <div className="mt-2 h-4 w-40 bg-muted rounded blur-[1px]" />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => {
            analytics.trackEvent({
              action: 'wonderland_gate_unlock_click',
              category: 'wonderland',
              custom_parameters: {
                userStatus: isSignedIn ? 'authenticated' : 'guest',
                cardType
              }
            });
            navigate('/auth/signup');
          }} className="rounded-lg">
            Sign up to unlock full details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestCardTeaserModal;
