
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Shield, Diamond, Check, Globe, Zap } from 'lucide-react';
import { formatCurrency } from '@/utils/posting/pricing';
import { cn } from '@/lib/utils';

interface PricingConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  selectedTier: string;
  finalPrice: number;
  durationMonths: number;
  onConfirmPayment: () => void;
}

const PricingConfirmationModal: React.FC<PricingConfirmationModalProps> = ({
  open,
  onClose,
  selectedTier,
  finalPrice,
  durationMonths,
  onConfirmPayment
}) => {
  const getTierDetails = () => {
    switch (selectedTier) {
      case 'gold':
        return {
          name: 'Gold Featured',
          icon: Crown,
          color: 'text-amber-500',
          bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-100',
          borderColor: 'border-amber-200'
        };
      case 'premium':
        return {
          name: 'Premium Listing',
          icon: Shield,
          color: 'text-purple-500',
          bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-100',
          borderColor: 'border-purple-200'
        };
      case 'diamond':
        return {
          name: 'Diamond Exclusive',
          icon: Diamond,
          color: 'text-cyan-500',
          bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-100',
          borderColor: 'border-cyan-200'
        };
      default:
        return {
          name: 'Premium Plan',
          icon: Shield,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const details = getTierDetails();
  const IconComponent = details.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">
                  Confirm Your Selection
                </DialogTitle>
              </DialogHeader>

              {/* Plan Summary Card */}
              <div className={cn(
                "rounded-2xl p-6 border-2",
                details.bgColor,
                details.borderColor
              )}>
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md">
                      <IconComponent className={cn("h-8 w-8", details.color)} />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-gray-900">{details.name}</h3>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatCurrency(finalPrice)}
                    </div>
                    <Badge variant="outline" className="bg-white/80">
                      {durationMonths === 12 ? '1 Year' : `${durationMonths} Month${durationMonths > 1 ? 's' : ''}`}
                    </Badge>
                  </div>

                  {/* Features Preview */}
                  <div className="pt-4 border-t border-white/50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>Featured Placement</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span>Instant Visibility</span>
                      </div>
                      {selectedTier !== 'gold' && (
                        <>
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3 text-blue-500" />
                            <span>Priority Support</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Check className="h-3 w-3 text-green-500" />
                            <span>Analytics</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">What you get:</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Immediate job posting activation</li>
                  <li>• Enhanced visibility to qualified candidates</li>
                  <li>• Professional listing with premium features</li>
                  {selectedTier === 'diamond' && <li>• Dedicated account manager support</li>}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Go Back
                </Button>
                <Button
                  onClick={onConfirmPayment}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Proceed to Payment
                </Button>
              </div>

              {/* Security Note */}
              <p className="text-xs text-gray-500 text-center">
                🔒 Secure payment powered by Stripe. Cancel anytime.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PricingConfirmationModal;
