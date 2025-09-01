import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  Check, 
  Loader2, 
  Receipt,
  Star
} from 'lucide-react';
import { useStripe } from '@/hooks/useStripe';
import { analytics } from '@/lib/analytics';
import { toast } from 'sonner';

interface BookingPaymentFlowProps {
  bookingData: {
    providerId: string;
    providerName: string;
    serviceId: string;
    serviceName: string;
    servicePrice: number;
    date: string;
    time: string;
    duration: number;
  };
  customerData: {
    name: string;
    email: string;
    phone: string;
  };
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentError: (error: string) => void;
}

const BookingPaymentFlow: React.FC<BookingPaymentFlowProps> = ({
  bookingData,
  customerData,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'credits'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const { initiatePayment } = useStripe();

  const handleStripePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Track payment initiation
      analytics.trackBeginCheckout('booking_flow', {
        items: [{
          item_id: bookingData.serviceId,
          item_name: bookingData.serviceName,
          category: 'booking',
          price: bookingData.servicePrice,
          quantity: 1
        }],
        total_amount: bookingData.servicePrice
      });

      const paymentData = {
        amount: bookingData.servicePrice * 100, // Convert to cents
        currency: 'usd',
        metadata: {
          booking_type: 'service',
          provider_id: bookingData.providerId,
          service_id: bookingData.serviceId,
          customer_name: customerData.name,
          customer_email: customerData.email,
          booking_date: bookingData.date,
          booking_time: bookingData.time
        }
      };

      const success = await initiatePayment(paymentData, customerData);
      
      if (success) {
        // Track successful payment
        analytics.trackPaymentCompleted({
          transactionId: `booking_${Date.now()}`,
          amount: bookingData.servicePrice,
          paymentMethod: 'stripe',
          itemType: 'booking',
          itemId: bookingData.serviceId
        });

        const result = {
          transactionId: `booking_${Date.now()}`,
          amount: bookingData.servicePrice,
          paymentMethod: 'stripe',
          status: 'completed',
          receiptUrl: '#'
        };
        
        setPaymentResult(result);
        setShowReceipt(true);
        onPaymentSuccess(result);
        toast.success('Payment successful! Booking confirmed.');
      } else {
        throw new Error('Payment was not completed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError(error instanceof Error ? error.message : 'Payment failed');
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreditsPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate credits payment (this would integrate with your credits system)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = {
        transactionId: `credits_${Date.now()}`,
        amount: bookingData.servicePrice,
        paymentMethod: 'credits',
        status: 'completed',
        creditsUsed: bookingData.servicePrice * 10 // Example: $1 = 10 credits
      };
      
      setPaymentResult(result);
      setShowReceipt(true);
      onPaymentSuccess(result);
      toast.success('Payment with credits successful! Booking confirmed.');
    } catch (error) {
      console.error('Credits payment error:', error);
      onPaymentError('Credits payment failed');
      toast.error('Credits payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (showReceipt && paymentResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
          >
            <Check className="w-8 h-8 text-green-600" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
          <p className="text-gray-600">Your booking has been confirmed</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Booking Receipt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Transaction ID:</span>
                <div className="font-mono">{paymentResult.transactionId}</div>
              </div>
              <div>
                <span className="text-gray-600">Payment Method:</span>
                <div className="capitalize">{paymentResult.paymentMethod}</div>
              </div>
              <div>
                <span className="text-gray-600">Service:</span>
                <div>{bookingData.serviceName}</div>
              </div>
              <div>
                <span className="text-gray-600">Provider:</span>
                <div>{bookingData.providerName}</div>
              </div>
              <div>
                <span className="text-gray-600">Date & Time:</span>
                <div>{bookingData.date} at {bookingData.time}</div>
              </div>
              <div>
                <span className="text-gray-600">Amount Paid:</span>
                <div className="font-bold text-green-600">${paymentResult.amount}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                Payment secured by Stripe
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button className="w-full" size="lg">
            View My Bookings
          </Button>
          <Button variant="outline" className="w-full">
            Download Receipt
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Service:</span>
            <span className="font-medium">{bookingData.serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span>Provider:</span>
            <span className="font-medium">{bookingData.providerName}</span>
          </div>
          <div className="flex justify-between">
            <span>Date & Time:</span>
            <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-medium">{bookingData.duration} minutes</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-purple-600">${bookingData.servicePrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stripe Payment */}
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === 'stripe' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
            }`}
            onClick={() => setPaymentMethod('stripe')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'stripe' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'stripe' && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-gray-600">Secure payment via Stripe</div>
                </div>
              </div>
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Credits Payment */}
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === 'credits' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
            }`}
            onClick={() => setPaymentMethod('credits')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'credits' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'credits' && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium">EmviApp Credits</div>
                  <div className="text-sm text-gray-600">
                    Use your earned credits • Balance: 250 credits
                  </div>
                </div>
              </div>
              <Badge variant="secondary">
                {bookingData.servicePrice * 10} credits
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={customerData.name} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={customerData.email} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={customerData.phone} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        onClick={paymentMethod === 'stripe' ? handleStripePayment : handleCreditsPayment}
        disabled={isProcessing}
        className="w-full bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            {paymentMethod === 'stripe' 
              ? `Pay $${bookingData.servicePrice}` 
              : `Pay ${bookingData.servicePrice * 10} Credits`
            }
          </>
        )}
      </Button>

      {/* Security Notice */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <Shield className="h-4 w-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </div>
  );
};

export default BookingPaymentFlow;