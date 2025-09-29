export interface ValuationInputs {
  monthlyRevenue: number;
  numberOfStations: number;
  zipCode: string;
  leaseLength: 'short-term' | 'long-term';
  googleRating?: number;
  googleReviewCount?: number;
}

export interface ValuationResult {
  low: number;
  high: number;
  base: number;
  breakdown: {
    revenueMultiple: number;
    stationValue: number;
    locationAdjustment: number;
    reviewsAdjustment: number;
    leaseAdjustment: number;
  };
}

// High-demand Orange County zip codes
const HIGH_DEMAND_ZIPS = [
  '92704', '92705', '92663', '92660', '92625', '92626', '92651', '92653',
  '92657', '92677', '92691', '92692', '92694', '92618', '92620', '92612'
];

export function calculateSalonValuation(inputs: ValuationInputs): ValuationResult {
  // Base calculation: Revenue × 2.5
  const revenueMultiple = inputs.monthlyRevenue * 2.5;
  
  // Station value: $15,000 per station
  const stationValue = inputs.numberOfStations * 15000;
  
  // Base value
  let base = revenueMultiple + stationValue;
  
  // Location adjustment (+20% for high-demand zips)
  let locationAdjustment = 0;
  if (HIGH_DEMAND_ZIPS.includes(inputs.zipCode)) {
    locationAdjustment = base * 0.20;
  }
  
  // Reviews adjustment (+15% if >200 reviews and >4.5 rating)
  let reviewsAdjustment = 0;
  if (inputs.googleReviewCount && inputs.googleRating) {
    if (inputs.googleReviewCount > 200 && inputs.googleRating > 4.5) {
      reviewsAdjustment = base * 0.15;
    }
  }
  
  // Lease adjustment (-10% for short-term)
  let leaseAdjustment = 0;
  if (inputs.leaseLength === 'short-term') {
    leaseAdjustment = base * -0.10;
  }
  
  // Apply all adjustments
  base = base + locationAdjustment + reviewsAdjustment + leaseAdjustment;
  
  // Calculate range (±10%)
  const low = Math.round(base * 0.9);
  const high = Math.round(base * 1.1);
  
  return {
    low,
    high,
    base: Math.round(base),
    breakdown: {
      revenueMultiple: Math.round(revenueMultiple),
      stationValue,
      locationAdjustment: Math.round(locationAdjustment),
      reviewsAdjustment: Math.round(reviewsAdjustment),
      leaseAdjustment: Math.round(leaseAdjustment)
    }
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
