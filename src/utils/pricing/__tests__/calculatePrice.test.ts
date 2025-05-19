
import { calculateJobPostPrice, validatePricingOptions } from '../calculatePrice';
import { PricingOptions } from '@/types/jobPosting';

describe('Job Price Calculation', () => {
  // Test Scenario 1: Standard monthly plan
  test('Standard monthly plan calculates correctly', () => {
    const options: PricingOptions = {
      selectedPricingTier: 'standard',
      durationMonths: 1,
      autoRenew: false,
      isFirstPost: false,
      isNationwide: false
    };
    
    const result = calculateJobPostPrice(options);
    
    expect(result.originalPrice).toBe(9.99);
    expect(result.finalPrice).toBe(9.99);
    expect(result.discountPercentage).toBe(0);
  });
  
  // Test Scenario 2: Premium plan with 6-month duration and auto-renew
  test('Premium plan with 6-month duration applies correct discounts', () => {
    const options: PricingOptions = {
      selectedPricingTier: 'premium',
      durationMonths: 6,
      autoRenew: true,
      isFirstPost: false,
      isNationwide: false
    };
    
    const result = calculateJobPostPrice(options);
    
    expect(result.originalPrice).toBe(119.94); // 19.99 * 6
    expect(result.discountPercentage).toBe(20); // 20% discount for 6 months
    expect(result.finalPrice).toBe(95.95); // 119.94 - (119.94 * 0.2)
  });
  
  // Test Scenario 3: Diamond annual plan
  test('Diamond annual plan applies correct discount', () => {
    const options: PricingOptions = {
      selectedPricingTier: 'diamond',
      durationMonths: 12,
      autoRenew: true,
      isFirstPost: false,
      isNationwide: true
    };
    
    const result = calculateJobPostPrice(options);
    
    expect(result.originalPrice).toBe(11999.88); // 999.99 * 12
    expect(result.discountPercentage).toBe(35); // 35% discount for 12 months
    // Final price with nationwide add-on
    expect(result.finalPrice).toBe(7804.92); // 11999.88 - (11999.88 * 0.35) + 5
  });
  
  // Test Scenario 4: Free plan
  test('Free plan always results in $0', () => {
    const options: PricingOptions = {
      selectedPricingTier: 'free',
      durationMonths: 1,
      autoRenew: false,
      isFirstPost: true,
      isNationwide: true // Even with add-ons
    };
    
    const result = calculateJobPostPrice(options);
    
    expect(result.originalPrice).toBe(0);
    expect(result.finalPrice).toBe(0);
    expect(result.isFreeTrial).toBe(true);
  });
  
  // Test Scenario 5: Pricing validation
  test('Validates pricing options correctly', () => {
    // Valid options
    const validOptions: PricingOptions = {
      selectedPricingTier: 'premium',
      durationMonths: 3,
      autoRenew: true,
      isFirstPost: false,
      isNationwide: false
    };
    
    // Invalid options (missing tier)
    const invalidOptions1 = {
      durationMonths: 1,
      autoRenew: true,
      isFirstPost: false,
      isNationwide: false
    } as PricingOptions;
    
    // Invalid options (Diamond plan not annual)
    const invalidOptions2: PricingOptions = {
      selectedPricingTier: 'diamond',
      durationMonths: 1,
      autoRenew: true,
      isFirstPost: false,
      isNationwide: false
    };
    
    const validResult = validatePricingOptions(validOptions);
    const invalidResult1 = validatePricingOptions(invalidOptions1);
    const invalidResult2 = validatePricingOptions(invalidOptions2);
    
    expect(validResult.valid).toBe(true);
    expect(validResult.errors.length).toBe(0);
    
    expect(invalidResult1.valid).toBe(false);
    expect(invalidResult1.errors).toContain('Pricing tier is required');
    
    expect(invalidResult2.valid).toBe(false);
    expect(invalidResult2.errors).toContain('Diamond plan requires annual subscription');
  });
});
