
// Utility functions for testing the premium pricing system

interface TestScenario {
  name: string;
  description: string;
  setup: () => void;
  verify: () => boolean;
}

export const enablePremiumPricingTest = () => {
  localStorage.setItem('emvi_premium_pricing_test', 'true');
  console.log('✅ Premium pricing test mode enabled');
  const url = new URL(window.location.href);
  url.searchParams.delete('disable_premium');
  window.history.replaceState({}, '', url.toString());
  window.location.reload();
};

export const enableVisualReview = () => {
  localStorage.setItem('emvi_premium_pricing_test', 'true');
  localStorage.setItem('emvi_pricing_visual_review', 'true');
  console.log('🎨 Visual review mode enabled - Premium pricing display active');
  const url = new URL(window.location.href);
  url.searchParams.set('pricing_review', 'true');
  url.searchParams.delete('disable_premium');
  window.history.replaceState({}, '', url.toString());
  window.location.reload();
};

export const disablePremiumPricingTest = () => {
  localStorage.removeItem('emvi_premium_pricing_test');
  localStorage.removeItem('emvi_pricing_visual_review');
  console.log('❌ Premium pricing test mode disabled');
  const url = new URL(window.location.href);
  url.searchParams.set('disable_premium', 'true');
  url.searchParams.delete('pricing_review');
  window.history.replaceState({}, '', url.toString());
  window.location.reload();
};

export const rollbackToOriginalPricing = () => {
  console.log('🔄 Rolling back to original pricing display');
  disablePremiumPricingTest();
};

export const showNewPricingInRealApp = () => {
  localStorage.setItem('emvi_premium_pricing_test', 'true');
  localStorage.setItem('emvi_pricing_visual_review', 'true');
  console.log('🚀 New premium pricing now visible in real app job posting flow');
  console.log('Navigate to /post-job to see the new pricing table');
  const url = new URL(window.location.href);
  url.searchParams.delete('disable_premium');
  url.searchParams.delete('pricing_review');
  window.history.replaceState({}, '', url.toString());
};

export const testScenarios: TestScenario[] = [
  {
    name: 'Real App Integration',
    description: 'Show new premium pricing in the actual job posting flow',
    setup: () => {
      showNewPricingInRealApp();
    },
    verify: () => {
      return document.querySelector('[data-testid="premium-pricing-table"]') !== null;
    }
  },
  {
    name: 'First Post Free',
    description: 'Verify first post shows free banner and appropriate messaging',
    setup: () => {
      localStorage.setItem('emvi_first_post', 'true');
    },
    verify: () => {
      return document.querySelector('[data-testid="first-post-banner"]') !== null;
    }
  },
  {
    name: 'Diamond Scarcity',
    description: 'Verify Diamond plan shows "Only 2 left" messaging',
    setup: () => {
      showNewPricingInRealApp();
    },
    verify: () => {
      return document.querySelector('[data-testid="diamond-scarcity"]')?.textContent?.includes('Only 2') || false;
    }
  },
  {
    name: 'FOMO Elements',
    description: 'Verify FOMO badges and messaging appear correctly',
    setup: () => {
      showNewPricingInRealApp();
    },
    verify: () => {
      const bestValue = document.querySelector('[data-testid="best-value-badge"]');
      const vipBadge = document.querySelector('[data-testid="vip-badge"]');
      return (bestValue !== null) && (vipBadge !== null);
    }
  },
  {
    name: 'Price Display',
    description: 'Verify pricing displays match new specifications',
    setup: () => {
      showNewPricingInRealApp();
    },
    verify: () => {
      const standardPrice = document.querySelector('[data-testid="standard-price"]');
      const goldPrice = document.querySelector('[data-testid="gold-price"]');
      const diamondPrice = document.querySelector('[data-testid="diamond-price"]');
      
      return standardPrice?.textContent?.includes('24.99') && 
             goldPrice?.textContent?.includes('49.99') && 
             diamondPrice?.textContent?.includes('999.99') || false;
    }
  }
];

export const runTestScenario = (scenarioName: string) => {
  const scenario = testScenarios.find(s => s.name === scenarioName);
  if (!scenario) {
    console.error(`Test scenario "${scenarioName}" not found`);
    return false;
  }

  console.log(`🧪 Running test scenario: ${scenario.name}`);
  scenario.setup();
  
  setTimeout(() => {
    const result = scenario.verify();
    console.log(`${result ? '✅' : '❌'} Test scenario "${scenario.name}": ${result ? 'PASSED' : 'FAILED'}`);
  }, 1000);
  
  return true;
};

export const runAllTests = () => {
  console.log('🧪 Running all pricing test scenarios...');
  testScenarios.forEach(scenario => {
    runTestScenario(scenario.name);
  });
};

// Global test utilities for browser console
if (typeof window !== 'undefined') {
  (window as any).EmviPricingTests = {
    enable: enablePremiumPricingTest,
    disable: disablePremiumPricingTest,
    visualReview: enableVisualReview,
    rollback: rollbackToOriginalPricing,
    showInRealApp: showNewPricingInRealApp,
    runTest: runTestScenario,
    runAll: runAllTests,
    scenarios: testScenarios.map(s => s.name)
  };
  
  console.log('🎯 EmviPricingTests utilities loaded. Available commands:');
  console.log('- EmviPricingTests.showInRealApp() - Show new pricing in real app');
  console.log('- EmviPricingTests.disable() - Switch back to old pricing');
  console.log('- EmviPricingTests.runAll() - Run all test scenarios');
  console.log('Navigate to /post-job to see the pricing table');
}
