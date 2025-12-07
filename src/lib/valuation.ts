import { getLocationTier, type LocationTierResult } from './valuation-location-data';

export type ProfitMarginChoice = 'LOW' | 'NORMAL' | 'HIGH';
export type LeaseLength = 'short-term' | 'long-term' | 'owned';

export interface ValuationInputs {
  // Required fields
  monthlyRevenue: number;
  yearsInBusiness: number;
  hasLoyalClientBase: boolean;
  location: string; // ZIP code or city name
  
  // Profit - either explicit or estimated
  profitMode: 'explicit' | 'estimate';
  monthlyProfit?: number; // Used when profitMode === 'explicit'
  profitMarginChoice?: ProfitMarginChoice; // Used when profitMode === 'estimate'
  
  // Optional enhancers
  googleRating?: number;
  googleReviewCount?: number;
  leaseYearsRemaining?: number;
  numberOfStations?: number;
  assetsValue?: number;
  
  // Legacy fields for backwards compatibility
  zipCode?: string;
  leaseLength?: LeaseLength;
}

export interface ValuationBreakdown {
  annualSDE: number;
  baseMultiple: number;
  locationAdjustment: number;
  locationTier: number;
  locationAreaName: string;
  yearsAdjustment: number;
  loyaltyAdjustment: number;
  ratingAdjustment: number;
  leaseAdjustment: number;
  finalMultiple: number;
  baseValuation: number;
  assetsAdded: number;
}

export interface ValuationResult {
  low: number;
  high: number;
  base: number;
  breakdown: ValuationBreakdown;
  confidenceScore: number; // 0-100
}

// Helper: Get profit margin from choice
function getProfitMargin(choice: ProfitMarginChoice): number {
  switch (choice) {
    case 'LOW': return 0.18;    // 18% margin
    case 'NORMAL': return 0.28; // 28% margin
    case 'HIGH': return 0.38;   // 38% margin
    default: return 0.28;
  }
}

// Helper: Clamp value between min and max
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Helper: Get years in business adjustment
function getYearsAdjustment(years: number): number {
  if (years < 1) return -0.3;
  if (years < 3) return -0.1;
  if (years < 7) return 0;
  return 0.2; // 7+ years
}

// Helper: Get rating adjustment
function getRatingAdjustment(rating?: number): number {
  if (!rating || rating <= 0) return 0;
  if (rating >= 4.8) return 0.3;
  if (rating >= 4.5) return 0.2;
  if (rating >= 4.0) return 0.1;
  if (rating >= 3.5) return 0;
  return -0.3; // Below 3.5
}

// Helper: Get lease adjustment
function getLeaseAdjustment(yearsRemaining?: number, leaseLength?: LeaseLength): number {
  // Support both new and legacy formats
  if (typeof yearsRemaining === 'number') {
    if (yearsRemaining < 1) return -0.3;
    if (yearsRemaining < 3) return -0.1;
    return 0.1; // 3+ years
  }
  
  // Legacy leaseLength support
  if (leaseLength === 'owned') return 0.3;
  if (leaseLength === 'long-term') return 0.1;
  if (leaseLength === 'short-term') return -0.2;
  
  return 0; // No data
}

/**
 * Validate valuation inputs
 * Returns an object with valid: boolean and errors: string[]
 */
export function validateValuationInputs(inputs: Partial<ValuationInputs>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Required: monthlyRevenue
  if (typeof inputs.monthlyRevenue !== 'number' || inputs.monthlyRevenue <= 0) {
    errors.push('Monthly revenue must be greater than $0');
  } else if (inputs.monthlyRevenue > 1000000) {
    errors.push('Monthly revenue cannot exceed $1,000,000');
  }
  
  // Required: yearsInBusiness
  if (typeof inputs.yearsInBusiness !== 'number' || inputs.yearsInBusiness < 0) {
    errors.push('Years in business must be 0 or greater');
  } else if (inputs.yearsInBusiness > 50) {
    errors.push('Years in business cannot exceed 50');
  }
  
  // Required: hasLoyalClientBase
  if (typeof inputs.hasLoyalClientBase !== 'boolean') {
    errors.push('Please indicate if you have a loyal client base');
  }
  
  // Required: location
  if (!inputs.location && !inputs.zipCode) {
    errors.push('Location (ZIP code or city) is required');
  }
  
  // Profit validation
  if (inputs.profitMode === 'explicit') {
    if (typeof inputs.monthlyProfit !== 'number' || inputs.monthlyProfit < 0) {
      errors.push('Monthly profit must be $0 or greater');
    } else if (inputs.monthlyProfit > (inputs.monthlyRevenue || 0)) {
      errors.push('Monthly profit cannot exceed monthly revenue');
    }
  } else if (inputs.profitMode === 'estimate') {
    if (!inputs.profitMarginChoice || !['LOW', 'NORMAL', 'HIGH'].includes(inputs.profitMarginChoice)) {
      errors.push('Please select a profit margin estimate');
    }
  }
  
  // Optional: googleRating
  if (inputs.googleRating !== undefined && inputs.googleRating !== null) {
    if (inputs.googleRating < 0 || inputs.googleRating > 5) {
      errors.push('Google rating must be between 0 and 5');
    }
  }
  
  // Optional: googleReviewCount
  if (inputs.googleReviewCount !== undefined && inputs.googleReviewCount !== null) {
    if (inputs.googleReviewCount < 0) {
      errors.push('Review count cannot be negative');
    }
  }
  
  // Optional: leaseYearsRemaining
  if (inputs.leaseYearsRemaining !== undefined && inputs.leaseYearsRemaining !== null) {
    if (inputs.leaseYearsRemaining < 0) {
      errors.push('Lease years remaining cannot be negative');
    }
  }
  
  // Optional: assetsValue
  if (inputs.assetsValue !== undefined && inputs.assetsValue !== null) {
    if (inputs.assetsValue < 0) {
      errors.push('Assets value cannot be negative');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Calculate salon valuation using SDE-based methodology
 * This follows industry-standard business valuation practices
 */
export function calculateSalonValuation(inputs: ValuationInputs): ValuationResult {
  // 1) Resolve monthly profit
  let monthlyProfit: number;
  if (inputs.profitMode === 'explicit' && inputs.monthlyProfit !== undefined && inputs.monthlyProfit >= 0) {
    monthlyProfit = inputs.monthlyProfit;
  } else {
    const margin = getProfitMargin(inputs.profitMarginChoice || 'NORMAL');
    monthlyProfit = inputs.monthlyRevenue * margin;
  }
  
  // 2) Calculate Annual SDE (Seller's Discretionary Earnings)
  const annualSDE = monthlyProfit * 12;
  
  // 3) Base multiple (industry standard for service businesses)
  const baseMultiple = 2.2;
  
  // 4) Location tier adjustment
  const locationInput = inputs.location || inputs.zipCode || '';
  const locationResult: LocationTierResult = getLocationTier(locationInput);
  const locationAdjustment = locationResult.multiplierAdjustment;
  
  // 5) Years in business adjustment
  const yearsAdjustment = getYearsAdjustment(inputs.yearsInBusiness);
  
  // 6) Loyal client base adjustment
  const loyaltyAdjustment = inputs.hasLoyalClientBase ? 0.2 : 0;
  
  // 7) Rating adjustment
  const ratingAdjustment = getRatingAdjustment(inputs.googleRating);
  
  // 8) Lease adjustment
  const leaseAdjustment = getLeaseAdjustment(inputs.leaseYearsRemaining, inputs.leaseLength);
  
  // 9) Calculate final multiple with all adjustments
  let adjustedMultiple = baseMultiple + locationAdjustment + yearsAdjustment + 
                         loyaltyAdjustment + ratingAdjustment + leaseAdjustment;
  
  // Clamp multiple to reasonable range
  adjustedMultiple = clamp(adjustedMultiple, 1.2, 3.5);
  
  // 10) Calculate base valuation
  let baseValuation = annualSDE * adjustedMultiple;
  
  // 11) Add physical assets if available
  let assetsAdded = 0;
  if (inputs.assetsValue && inputs.assetsValue > 0) {
    assetsAdded = inputs.assetsValue;
    baseValuation += assetsAdded;
  } else if (inputs.numberOfStations && inputs.numberOfStations > 0) {
    // Fallback: estimate assets from station count
    assetsAdded = inputs.numberOfStations * 12000; // $12K per station average
    baseValuation += assetsAdded;
  }
  
  // 12) Final sanity clamp
  baseValuation = clamp(baseValuation, 10000, 2000000);
  
  // 13) Calculate confidence score
  let confidenceScore = 50; // Base confidence
  if (inputs.profitMode === 'explicit') confidenceScore += 15;
  if (inputs.googleRating && inputs.googleReviewCount) confidenceScore += 15;
  if (inputs.leaseYearsRemaining !== undefined || inputs.leaseLength) confidenceScore += 10;
  if (inputs.assetsValue) confidenceScore += 5;
  if (locationResult.tier <= 2) confidenceScore += 5; // Known market
  confidenceScore = clamp(confidenceScore, 0, 100);
  
  // 14) Calculate range based on confidence
  const rangePercent = confidenceScore >= 75 ? 0.10 : 0.15;
  const low = Math.round(baseValuation * (1 - rangePercent));
  const high = Math.round(baseValuation * (1 + rangePercent));
  
  return {
    low,
    high,
    base: Math.round(baseValuation),
    breakdown: {
      annualSDE: Math.round(annualSDE),
      baseMultiple,
      locationAdjustment,
      locationTier: locationResult.tier,
      locationAreaName: locationResult.areaName,
      yearsAdjustment,
      loyaltyAdjustment,
      ratingAdjustment,
      leaseAdjustment,
      finalMultiple: Math.round(adjustedMultiple * 100) / 100,
      baseValuation: Math.round(baseValuation),
      assetsAdded: Math.round(assetsAdded)
    },
    confidenceScore
  };
}

/**
 * Format a number as USD currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Get a human-readable description of the multiple adjustments
 */
export function getMultipleExplanation(breakdown: ValuationBreakdown): string[] {
  const explanations: string[] = [];
  
  explanations.push(`Base multiple: ${breakdown.baseMultiple}× (industry standard for salons)`);
  
  if (breakdown.locationAdjustment > 0) {
    explanations.push(`Location boost: +${breakdown.locationAdjustment.toFixed(1)} (Tier ${breakdown.locationTier}: ${breakdown.locationAreaName})`);
  } else if (breakdown.locationAdjustment < 0) {
    explanations.push(`Location adjustment: ${breakdown.locationAdjustment.toFixed(1)} (Tier ${breakdown.locationTier})`);
  }
  
  if (breakdown.yearsAdjustment > 0) {
    explanations.push(`Established business: +${breakdown.yearsAdjustment.toFixed(1)}`);
  } else if (breakdown.yearsAdjustment < 0) {
    explanations.push(`Newer business: ${breakdown.yearsAdjustment.toFixed(1)}`);
  }
  
  if (breakdown.loyaltyAdjustment > 0) {
    explanations.push(`Loyal client base: +${breakdown.loyaltyAdjustment.toFixed(1)}`);
  }
  
  if (breakdown.ratingAdjustment > 0) {
    explanations.push(`Strong reviews: +${breakdown.ratingAdjustment.toFixed(1)}`);
  } else if (breakdown.ratingAdjustment < 0) {
    explanations.push(`Review concerns: ${breakdown.ratingAdjustment.toFixed(1)}`);
  }
  
  if (breakdown.leaseAdjustment > 0) {
    explanations.push(`Secure lease: +${breakdown.leaseAdjustment.toFixed(1)}`);
  } else if (breakdown.leaseAdjustment < 0) {
    explanations.push(`Lease risk: ${breakdown.leaseAdjustment.toFixed(1)}`);
  }
  
  explanations.push(`Final multiple: ${breakdown.finalMultiple}×`);
  
  return explanations;
}
