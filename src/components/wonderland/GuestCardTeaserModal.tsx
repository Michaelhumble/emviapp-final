import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GuestCardTeaserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image?: string;
  title?: string;
}

const GuestCardTeaserModal: React.FC<GuestCardTeaserModalProps> = ({ open, onOpenChange, image, title }) => {
  const navigate = useNavigate();
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
        <div className="mt-4 flex justify-end">
          <Button onClick={() => navigate('/auth/signup')} className="rounded-lg">
            Sign Up Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestCardTeaserModal;
