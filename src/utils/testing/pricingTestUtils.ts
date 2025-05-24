
// Production mode - all test utilities disabled

export const enablePremiumPricingTest = () => {
  console.log('❌ Test utilities disabled in production mode');
};

export const enableVisualReview = () => {
  console.log('❌ Visual review disabled in production mode');
};

export const disablePremiumPricingTest = () => {
  console.log('✅ Already in production mode');
};

export const rollbackToOriginalPricing = () => {
  console.log('✅ Already using production pricing');
};

export const showNewPricingInRealApp = () => {
  console.log('❌ New pricing disabled in production mode');
};

export const testScenarios = [];

export const runTestScenario = (scenarioName: string) => {
  console.log('❌ Test scenarios disabled in production mode');
  return false;
};

export const runAllTests = () => {
  console.log('❌ Test utilities disabled in production mode');
};

// Remove global test utilities in production
if (typeof window !== 'undefined') {
  delete (window as any).EmviPricingTests;
  console.log('🔒 Production mode: Test utilities removed');
}
