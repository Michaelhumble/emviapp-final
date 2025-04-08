
export interface StripeCheckoutProps {
  amount: number;
  productName: string;
  buttonText: string;
  onSuccess: () => void;
  // Additional properties that are being used
  isSubscription?: boolean;
  subscriptionInterval?: string;
  setupOnly?: boolean;
}
