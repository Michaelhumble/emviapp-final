// GA4 Enhanced eCommerce implementation for EmviApp

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export interface GA4Item {
  item_id: string;
  item_name: string;
  category: string;
  quantity?: number;
  price: number;
  item_category2?: string;
  item_category3?: string;
  item_variant?: string;
  item_brand?: string;
}

export interface GA4PurchaseEvent {
  transaction_id: string;
  value: number;
  currency: string;
  items: GA4Item[];
  coupon?: string;
  shipping?: number;
  tax?: number;
}

// Track when user begins checkout process
export const trackBeginCheckout = (items: GA4Item[], value: number, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency,
      value,
      items
    });
  }
};

// Track completed purchases (bookings, job posts, subscriptions)
export const trackPurchase = (purchaseData: GA4PurchaseEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: purchaseData.transaction_id,
      value: purchaseData.value,
      currency: purchaseData.currency,
      items: purchaseData.items,
      coupon: purchaseData.coupon,
      shipping: purchaseData.shipping,
      tax: purchaseData.tax
    });
  }
};

// Track when user adds service to cart/booking
export const trackAddToCart = (item: GA4Item, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency,
      value: item.price,
      items: [item]
    });
  }
};

// Track when user removes item from cart
export const trackRemoveFromCart = (item: GA4Item, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency,
      value: item.price,
      items: [item]
    });
  }
};

// Track when user views item details (service, job, salon profile)
export const trackViewItem = (item: GA4Item, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency,
      value: item.price,
      items: [item]
    });
  }
};

// Track refunds
export const trackRefund = (transaction_id: string, value: number, currency = 'USD', items?: GA4Item[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'refund', {
      transaction_id,
      value,
      currency,
      items
    });
  }
};

// Helper function to create booking item for GA4
export const createBookingItem = (booking: {
  id: string;
  serviceName: string;
  serviceType: string;
  price: number;
  artistName?: string;
  salonName?: string;
}): GA4Item => {
  return {
    item_id: booking.id,
    item_name: booking.serviceName,
    category: 'booking',
    price: booking.price,
    quantity: 1,
    item_category2: booking.serviceType,
    item_brand: booking.salonName,
    item_variant: booking.artistName
  };
};

// Helper function to create job post item for GA4
export const createJobPostItem = (jobPost: {
  id: string;
  title: string;
  type: string;
  price: number;
  location?: string;
}): GA4Item => {
  return {
    item_id: jobPost.id,
    item_name: jobPost.title,
    category: 'job_post',
    price: jobPost.price,
    quantity: 1,
    item_category2: jobPost.type,
    item_category3: jobPost.location
  };
};

// Helper function to create subscription item for GA4
export const createSubscriptionItem = (subscription: {
  id: string;
  planName: string;
  price: number;
  duration: string;
}): GA4Item => {
  return {
    item_id: subscription.id,
    item_name: subscription.planName,
    category: 'subscription',
    price: subscription.price,
    quantity: 1,
    item_variant: subscription.duration
  };
};