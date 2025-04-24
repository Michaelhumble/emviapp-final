
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Star, Diamond } from "lucide-react";
import { motion } from "framer-motion";

interface PremiumFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const PremiumFeaturesModal = ({ isOpen, onClose, onProceed }: PremiumFeaturesModalProps) => {
  const features = [
    {
      icon: Crown,
      title: "Premium Profile",
      description: "Stand out with a verified badge and premium profile customization",
    },
    {
      icon: Star,
      title: "Priority Booking",
      description: "Get priority in client booking requests",
    },
    {
      icon: Diamond,
      title: "Analytics Dashboard",
      description: "Access detailed insights about your performance",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-white to-purple-50/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-amber-500" />
            Premium Features
          </DialogTitle>
          <DialogDescription>
            Unlock the full potential of your artistic journey
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-white/50 border border-purple-100"
            >
              <Icon className="h-6 w-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </motion.div>
          ))}
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
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Premium
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumFeaturesModal;
