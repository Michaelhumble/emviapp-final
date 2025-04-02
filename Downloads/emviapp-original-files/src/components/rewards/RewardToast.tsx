
import { useEffect } from "react";
import { Award, X } from "lucide-react";

interface RewardToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const RewardToast = ({ message, isVisible, onClose }: RewardToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-dismiss after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 transform transition-all duration-500 ease-out animate-fade-in">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-4 rounded-lg shadow-xl flex items-center border border-white/10">
        <Award size={22} className="text-yellow-300 mr-3 flex-shrink-0" />
        <p className="font-medium pr-2">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default RewardToast;
