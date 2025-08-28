/**
 * No-op component - PremiumSignupModal has been permanently removed
 * All popup modals have been disabled to eliminate blocking overlays
 * Users sign up directly via CTAs that lead to inline forms
 */
import { FC } from 'react';

interface PremiumSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumSignupModal: FC<PremiumSignupModalProps> = () => {
  // Component completely disabled - no more popup overlays
  return null;
};

export default PremiumSignupModal;