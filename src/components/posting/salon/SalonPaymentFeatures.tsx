
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Diamond, Flame, Crown, Sparkles, TrendingUp, Eye, Star } from 'lucide-react';

interface SalonPaymentFeaturesProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (addFeature: boolean) => void;
  onProceedToPayment: () => void;
  currentPlan: string;
  basePrice: number;
}

const SalonPaymentFeatures: React.FC<SalonPaymentFeaturesProps> = ({
  isOpen,
  onClose,
  onSelect,
  onProceedToPayment,
  currentPlan,
  basePrice
}) => {
  const handleAddFeature = () => {
    onSelect(true);
    onProceedToPayment();
  };

  const handleSkipFeature = () => {
    onSelect(false);
    onProceedToPayment();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="relative">
          {/* Premium Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-6 text-white">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <Diamond className="h-8 w-8 text-yellow-300" />
                  <Sparkles className="h-4 w-4 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <DialogTitle className="text-2xl font-bold">
                  VIP Featured Upgrade
                </DialogTitle>
              </div>
              <p className="text-lg text-purple-100">
                Get Noticed. 5x More Views. Stand Out Instantly.
              </p>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-6">
            {/* Feature Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-4 text-center">
                  <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-bold text-purple-800">5x Visibility</h4>
                  <p className="text-sm text-purple-600">Top placement guaranteed</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-4 text-center">
                  <Flame className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-orange-600">Premium badge & highlighting</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
                <CardContent className="p-4 text-center">
                  <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-bold text-yellow-800">VIP Status</h4>
                  <p className="text-sm text-yellow-600">Exclusive positioning</p>
                </CardContent>
              </Card>
            </div>

            {/* Urgency Message */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <p className="font-semibold text-orange-800">Limited Time: 90% of buyers see featured listings first</p>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                Don't let your salon get lost in the crowd. Stand out now for just $10 more.
              </p>
            </div>

            {/* Pricing Display */}
            <div className="bg-white border-2 border-purple-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{currentPlan} Plan</p>
                  <p className="text-sm text-gray-600">Your selected plan</p>
                </div>
                <p className="text-xl font-bold text-gray-800">${basePrice}</p>
              </div>
              
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  <p className="font-semibold text-purple-800">VIP Featured Upgrade</p>
                </div>
                <p className="text-xl font-bold text-purple-800">+$10</p>
              </div>
              
              <div className="border-t-2 border-purple-300 mt-3 pt-3 flex justify-between items-center">
                <p className="text-xl font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${basePrice + 10}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleSkipFeature}
                variant="outline"
                className="h-12 border-2 border-gray-300 hover:border-gray-400"
              >
                Continue with {currentPlan} Plan
              </Button>
              
              <Button
                onClick={handleAddFeature}
                className="h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse"
              >
                <Diamond className="h-5 w-5 mr-2" />
                Add VIP Feature (+$10)
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Secure payment processed by Stripe • Cancel anytime
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonPaymentFeatures;
