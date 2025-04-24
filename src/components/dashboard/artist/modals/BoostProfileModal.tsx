
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

interface BoostProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const BoostProfileModal = ({ isOpen, onClose, onProceed }: BoostProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-white to-purple-50/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-purple-500" />
            Boost Your Profile
          </DialogTitle>
          <DialogDescription className="text-purple-700">
            Get 30 days of premium visibility and reach more clients
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-4">
            {[
              { icon: Star, text: "Featured placement in search results" },
              { icon: Zap, text: "3x more profile views" },
              { icon: Sparkles, text: "Priority in recommendations" },
            ].map(({ icon: Icon, text }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <Icon className="h-5 w-5 text-purple-500" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          <div className="rounded-lg bg-purple-50 p-4 text-center">
            <p className="text-lg font-semibold text-purple-800">$4.99</p>
            <p className="text-sm text-purple-600">for 30 days of boosted visibility</p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Maybe Later
          </Button>
          <Button
            onClick={onProceed}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Boost Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileModal;
