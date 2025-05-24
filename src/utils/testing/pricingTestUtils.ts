
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

export const enableVisualReview = () => {
  localStorage.setItem('emvi_premium_pricing_test', 'true');
  localStorage.setItem('emvi_pricing_visual_review', 'true');
  console.log('🎨 Visual review mode enabled - Premium pricing display active');
  const url = new URL(window.location.href);
  url.searchParams.set('pricing_review', 'true');
  window.history.replaceState({}, '', url.toString());
};

export const disablePremiumPricingTest = () => {
  localStorage.removeItem('emvi_premium_pricing_test');
  localStorage.removeItem('emvi_pricing_visual_review');
  console.log('❌ Premium pricing test mode disabled');
  // Remove query parameter
  const url = new URL(window.location.href);
  url.searchParams.delete('premium_pricing');
  url.searchParams.delete('pricing_review');
  window.history.replaceState({}, '', url.toString());
};

export const rollbackToOriginalPricing = () => {
  disablePremiumPricingTest();
  console.log('🔄 Rolled back to original pricing display');
  window.location.reload();
};

export const testScenarios: TestScenario[] = [
  {
    name: 'Visual Review Mode',
    description: 'Enable premium pricing display for design review only',
    setup: () => {
      enableVisualReview();
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
      // This would typically involve setting up test data
    },
    verify: () => {
      return document.querySelector('[data-testid="diamond-scarcity"]')?.textContent?.includes('Only 2') || false;
    }
  },
  {
    name: 'FOMO Elements',
    description: 'Verify FOMO badges and messaging appear correctly',
    setup: () => {},
    verify: () => {
      const bestValue = document.querySelector('[data-testid="best-value-badge"]');
      const vipBadge = document.querySelector('[data-testid="vip-badge"]');
      return (bestValue !== null) && (vipBadge !== null);
    }
  },
  {
    name: 'Price Display',
    description: 'Verify pricing displays match specifications',
    setup: () => {},
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
    visualReview: enableVisualReview,
    disable: disablePremiumPricingTest,
    rollback: rollbackToOriginalPricing,
    runTest: runTestScenario,
    runAll: runAllTests,
    scenarios: testScenarios.map(s => s.name)
  };
}
