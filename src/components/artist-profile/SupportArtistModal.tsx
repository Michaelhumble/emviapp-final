
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth';
import { checkCredits, supportArtist, CREDIT_COSTS } from '@/utils/credits';
import { toast } from 'sonner';
import { Heart, Coins } from 'lucide-react';

interface SupportArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistId: string;
  artistName: string;
}

const SupportArtistModal: React.FC<SupportArtistModalProps> = ({
  isOpen,
  onClose,
  artistId,
  artistName
}) => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [userCredits, setUserCredits] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const supportOptions = [
    { value: CREDIT_COSTS.SUPPORT_ARTIST_SMALL, label: '10 Credits' },
    { value: CREDIT_COSTS.SUPPORT_ARTIST_MEDIUM, label: '25 Credits' },
    { value: CREDIT_COSTS.SUPPORT_ARTIST_LARGE, label: '50 Credits' }
  ];
  
  useEffect(() => {
    if (isOpen && user) {
      const fetchCredits = async () => {
        const credits = await checkCredits(user.id);
        setUserCredits(credits);
      };
      
      fetchCredits();
    }
  }, [isOpen, user]);
  
  const handleSupport = async () => {
    if (!user || !selectedAmount) return;
    
    setLoading(true);
    
    try {
      const success = await supportArtist(
        user.id,
        artistId,
        selectedAmount,
        message
      );
      
      if (success) {
        toast.success(`You supported ${artistName} with ${selectedAmount} credits!`);
        
        // Update user credits after support
        const newCredits = await checkCredits(user.id);
        setUserCredits(newCredits);
        
        // Reset form
        setSelectedAmount(null);
        setMessage('');
        
        // Close modal
        onClose();
      }
    } catch (error) {
      console.error('Error supporting artist:', error);
      toast.error('Failed to support artist. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500 fill-pink-100" />
            Support {artistName}
          </DialogTitle>
          <DialogDescription>
            Your support helps artists continue creating beautiful work and earns you community status.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Your balance:</span>
            <span className="flex items-center gap-1 font-medium">
              <Coins className="h-4 w-4 text-amber-500" />
              {userCredits} Credits
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Choose amount to send:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {supportOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={selectedAmount === option.value ? "default" : "outline"}
                    onClick={() => setSelectedAmount(option.value)}
                    disabled={loading || userCredits < option.value}
                    className={`
                      ${selectedAmount === option.value ? "bg-pink-600 hover:bg-pink-700" : ""}
                      ${userCredits < option.value ? "opacity-50" : ""}
                    `}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              
              {userCredits < CREDIT_COSTS.SUPPORT_ARTIST_SMALL && (
                <p className="text-xs text-amber-600 mt-2">
                  You need {CREDIT_COSTS.SUPPORT_ARTIST_SMALL - userCredits} more credits to support this artist.
                </p>
              )}
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Add a personal message (optional):
              </label>
              <Textarea
                placeholder="Your message of support..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                rows={3}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {message.length}/200 characters
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="sm:w-auto w-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSupport}
            disabled={!selectedAmount || loading || userCredits < (selectedAmount || 0)}
            className="sm:w-auto w-full bg-pink-600 hover:bg-pink-700"
          >
            {loading ? "Processing..." : `Send ${selectedAmount || 0} Credits`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupportArtistModal;
