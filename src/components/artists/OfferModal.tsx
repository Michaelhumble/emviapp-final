
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface OfferModalProps {
  artistName: string;
  onSendOffer: (message: string) => Promise<boolean>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
}

const OfferModal: React.FC<OfferModalProps> = ({
  artistName,
  onSendOffer,
  open,
  onOpenChange,
  isLoading
}) => {
  const [message, setMessage] = useState("");
  const creditCost = 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await onSendOffer(message);
    if (success) {
      setMessage("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite {artistName} to your salon</DialogTitle>
          <DialogDescription>
            Send a professional message to introduce yourself and your salon.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Textarea
              placeholder={`Hi ${artistName}, I'm interested in discussing potential opportunities at our salon...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full"
              required
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              {creditCost} credits
            </Badge> will be used to send this offer
          </div>
          
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading || !message.trim()}
            >
              {isLoading ? "Sending..." : "Send Offer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferModal;
