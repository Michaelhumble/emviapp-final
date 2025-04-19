
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";

interface ReferralNotificationProps {
  show: boolean;
  credits: number;
  onClose: () => void;
}

export const ReferralNotification = ({ show, credits, onClose }: ReferralNotificationProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-purple-200 p-4 max-w-sm"
        >
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Gift className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Congratulations! 🎉</h4>
              <p className="text-sm text-gray-600">
                You've earned {credits} credits from your referral!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
