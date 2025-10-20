import { calculateLocationPremium } from './valuation-location-data';

export interface ValuationInputs {
  monthlyRevenue: number;
  numberOfStations: number;
  zipCode: string;
  leaseLength: 'short-term' | 'long-term' | 'owned';
  googleRating?: number;
  googleReviewCount?: number;
  yearsInBusiness?: number;
  hasLoyalClientBase?: boolean;
}

export interface ValuationResult {
  low: number;
  high: number;
  base: number;
  breakdown: {
    revenueMultiple: number;
    stationValue: number;
    locationAdjustment: number;
    locationAreaName: string;
    reviewsAdjustment: number;
    leaseAdjustment: number;
    businessAgeBonus: number;
    clientBaseBonus: number;
  };
  confidenceScore: number; // 0-100
}

export function calculateSalonValuation(inputs: ValuationInputs): ValuationResult {
  // ========================================
  // STEP 1: BASE VALUE CALCULATION
  // ========================================
  
  // Revenue multiple: 2.5x monthly revenue (industry standard for profitable salons)
  // For high-revenue salons (>$80K/month), reduce multiple slightly (diminishing returns)
  let revenueMultiplier = 2.5;
  if (inputs.monthlyRevenue > 80000) {
    revenueMultiplier = 2.3; // Slight reduction for very high revenue
  }
  const revenueMultiple = inputs.monthlyRevenue * revenueMultiplier;
  
  // Station value: $15,000 per station (equipment, furniture, plumbing)
  const stationValue = inputs.numberOfStations * 15000;
  
  // Initial base value
  let base = revenueMultiple + stationValue;
  
  // ========================================
  // STEP 2: LOCATION PREMIUM (NEW SYSTEM)
  // ========================================
  
  const locationData = calculateLocationPremium(base, inputs.zipCode);
  const locationAdjustment = locationData.premium;
  const locationAreaName = locationData.areaName;
  
  // ========================================
  // STEP 3: ONLINE REPUTATION VALUE
  // ========================================
  
  let reviewsAdjustment = 0;
  if (inputs.googleReviewCount && inputs.googleRating) {
    // Tiered reputation bonus
    if (inputs.googleReviewCount > 400 && inputs.googleRating >= 4.8) {
      // Elite reputation: 20% bonus
      reviewsAdjustment = base * 0.20;
    } else if (inputs.googleReviewCount > 200 && inputs.googleRating >= 4.5) {
      // Strong reputation: 15% bonus
      reviewsAdjustment = base * 0.15;
    } else if (inputs.googleReviewCount > 100 && inputs.googleRating >= 4.2) {
      // Good reputation: 8% bonus
      reviewsAdjustment = base * 0.08;
    } else if (inputs.googleReviewCount < 50 || inputs.googleRating < 3.8) {
      // Poor reputation: -5% penalty
      reviewsAdjustment = base * -0.05;
    }
  }
  
  // ========================================
  // STEP 4: LEASE SECURITY
  // ========================================
  
  let leaseAdjustment = 0;
  if (inputs.leaseLength === 'owned') {
    // Ownership: major value add (property included)
    leaseAdjustment = base * 0.30; // 30% premium for property ownership
  } else if (inputs.leaseLength === 'long-term') {
    // Long-term lease (2+ years): slight bonus
    leaseAdjustment = base * 0.05;
  } else if (inputs.leaseLength === 'short-term') {
    // Short-term lease: risk penalty
    leaseAdjustment = base * -0.12; // Increased penalty from -10% to -12%
  }
  
  // ========================================
  // STEP 5: BUSINESS MATURITY BONUS
  // ========================================
  
  let businessAgeBonus = 0;
  if (inputs.yearsInBusiness) {
    if (inputs.yearsInBusiness >= 10) {
      // Established business: 10% bonus
      businessAgeBonus = base * 0.10;
    } else if (inputs.yearsInBusiness >= 5) {
      // Mature business: 5% bonus
      businessAgeBonus = base * 0.05;
    } else if (inputs.yearsInBusiness >= 3) {
      // Stable business: 2% bonus
      businessAgeBonus = base * 0.02;
    }
    // <3 years: no bonus (higher risk)
  }
  
  // ========================================
  // STEP 6: CLIENT BASE LOYALTY
  // ========================================
  
  let clientBaseBonus = 0;
  if (inputs.hasLoyalClientBase) {
    // Repeat clients = predictable revenue
    clientBaseBonus = base * 0.08;
  }
  
  // ========================================
  // STEP 7: APPLY ALL ADJUSTMENTS
  // ========================================
  
  base = base + locationAdjustment + reviewsAdjustment + leaseAdjustment + businessAgeBonus + clientBaseBonus;
  
  // ========================================
  // STEP 8: CONFIDENCE SCORE (0-100)
  // ========================================
  
  let confidenceScore = 60; // Base confidence
  
  // Increase confidence with more data
  if (inputs.googleReviewCount && inputs.googleRating) confidenceScore += 15;
  if (inputs.yearsInBusiness) confidenceScore += 10;
  if (inputs.hasLoyalClientBase) confidenceScore += 5;
  if (locationData.multiplier > 1.0) confidenceScore += 5; // Premium location data
  if (inputs.leaseLength === 'owned' || inputs.leaseLength === 'long-term') confidenceScore += 5;
  
  // Cap at 100
  confidenceScore = Math.min(confidenceScore, 100);
  
  // ========================================
  // STEP 9: CALCULATE RANGE
  // ========================================
  
  // Confidence affects range width
  const rangePercent = confidenceScore >= 85 ? 0.08 : 0.12; // Narrower range for high confidence
  const low = Math.round(base * (1 - rangePercent));
  const high = Math.round(base * (1 + rangePercent));
  
  return {
    low,
    high,
    base: Math.round(base),
    breakdown: {
      revenueMultiple: Math.round(revenueMultiple),
      stationValue,
      locationAdjustment: Math.round(locationAdjustment),
      locationAreaName,
      reviewsAdjustment: Math.round(reviewsAdjustment),
      leaseAdjustment: Math.round(leaseAdjustment),
      businessAgeBonus: Math.round(businessAgeBonus),
      clientBaseBonus: Math.round(clientBaseBonus)
    },
    confidenceScore
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
