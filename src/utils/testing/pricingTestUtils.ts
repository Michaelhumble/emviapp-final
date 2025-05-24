
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
  window.location.search = '?premium_pricing=true';
};

export const disablePremiumPricingTest = () => {
  localStorage.removeItem('emvi_premium_pricing_test');
  console.log('❌ Premium pricing test mode disabled');
  // Remove query parameter
  const url = new URL(window.location.href);
  url.searchParams.delete('premium_pricing');
  window.history.replaceState({}, '', url.toString());
};

export const rollbackToOriginalPricing = () => {
  disablePremiumPricingTest();
  console.log('🔄 Rolled back to original pricing display');
  window.location.reload();
};

export const testScenarios: TestScenario[] = [
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
      // This would typically involve setting up test data
    },
    verify: () => {
      return document.querySelector('[data-testid="diamond-scarcity"]')?.textContent?.includes('Only 2 left') || false;
    }
  },
  {
    name: 'Price Calculation',
    description: 'Verify pricing calculations match expected values',
    setup: () => {},
    verify: () => {
      // Check if standard plan shows $24.99
      const standardPrice = document.querySelector('[data-testid="standard-price"]');
      return standardPrice?.textContent?.includes('24.99') || false;
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
    rollback: rollbackToOriginalPricing,
    runTest: runTestScenario,
    runAll: runAllTests,
    scenarios: testScenarios.map(s => s.name)
  };
}
