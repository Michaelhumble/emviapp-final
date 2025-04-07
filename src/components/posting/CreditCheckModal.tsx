
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { CreditCard, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreditCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
  requiredCredits: number;
}

const CreditCheckModal = ({ isOpen, onClose, currentCredits, requiredCredits }: CreditCheckModalProps) => {
  const navigate = useNavigate();
  
  const handleBuyCredits = () => {
    navigate("/dashboard/salon");
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-amber-700">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Not Enough Credits
          </DialogTitle>
          <DialogDescription>
            You need more credits to post this job
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-amber-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-700">Your current balance: <span className="font-bold">{currentCredits} credits</span></p>
            <p className="text-sm text-gray-700">Required for job post: <span className="font-bold">{requiredCredits} credits</span></p>
            <p className="text-sm text-gray-700 mt-2">You need <span className="font-bold text-red-500">{requiredCredits - currentCredits} more credits</span> to post this job.</p>
          </div>
          
          <p className="text-sm text-gray-600">
            Job posts require credits to ensure quality listings and connect you with qualified candidates quickly.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Bạn cần tín dụng để đăng công việc mới.
          </p>
        </div>
        
        <DialogFooter className="flex-col space-y-2 sm:space-y-0">
          <Button 
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600"
            onClick={handleBuyCredits}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Buy Credits Now
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreditCheckModal;
