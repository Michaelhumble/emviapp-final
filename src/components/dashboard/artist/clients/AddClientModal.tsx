
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ClientData } from "./types";
import { toast } from "sonner";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (clientData: Omit<ClientData, 'id' | 'totalSpent' | 'visitCount' | 'lastVisit' | 'bookingHistory'>) => void;
}

const AddClientModal = ({ isOpen, onClose, onAddClient }: AddClientModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Client name is required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onAddClient({
        name: name.trim(),
        phone: phone.trim(),
        notes: notes.trim()
      });
      
      // Reset form
      setName("");
      setPhone("");
      setNotes("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form on close
    setName("");
    setPhone("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Add New Client</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input
              id="name"
              placeholder="Enter client name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any notes about preferences, style, or allergies"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
