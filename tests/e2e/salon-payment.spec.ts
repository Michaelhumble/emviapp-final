import { test, expect } from '@playwright/test';

test.describe('Salon Payment Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to salon listing page
    await page.goto('/sell-salon');
  });

  test('should complete salon listing payment flow', async ({ page }) => {
    // Fill in required form fields step by step
    
    // Step 1: Salon Identity
    await page.fill('[name="salonName"]', 'Test Salon for Sale');
    await page.selectOption('[name="businessType"]', 'nail-salon');
    await page.fill('[name="establishedYear"]', '2020');
    await page.click('button:has-text("Continue")');

    // Step 2: Location Details  
    await page.fill('[name="address"]', '123 Test Street');
    await page.fill('[name="city"]', 'Los Angeles');
    await page.selectOption('[name="state"]', 'CA');
    await page.fill('[name="zipCode"]', '90210');
    await page.click('button:has-text("Continue")');

    // Step 3: Business Details
    await page.fill('[name="askingPrice"]', '100000');
    await page.fill('[name="monthlyRent"]', '5000');
    await page.fill('[name="monthlyRevenue"]', '15000');
    await page.fill('[name="numberOfStaff"]', '5');
    await page.click('button:has-text("Continue")');

    // Step 4: Contact Information
    await page.fill('[name="contactName"]', 'John Doe');
    await page.fill('[name="contactEmail"]', 'john@example.com');
    await page.fill('[name="contactPhone"]', '555-123-4567');
    await page.click('button:has-text("Continue")');

    // Step 5: Description
    await page.fill('[name="englishDescription"]', 'Beautiful salon in prime location');
    await page.fill('[name="reasonForSelling"]', 'Relocating');
    await page.click('button:has-text("Continue")');

    // Step 6: Photos (skip for test)
    await page.click('button:has-text("Continue")');

    // Step 7: Preview
    await page.click('button:has-text("Complete Your Listing")');

    // Step 8: Pricing & Payment
    await expect(page.locator('h2:has-text("Pricing & Payment")')).toBeVisible();
    
    // Select a pricing plan
    await page.click('[data-testid="basic-plan"]');
    
    // Click pay button
    await page.click('button:has-text("Pay & Publish Listing")');

    // Should either open Stripe in new tab or redirect
    // For testing, we'll check that the payment flow is initiated
    await expect(page.locator('text=Processing...')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Navigate directly to Step 8
    for (let i = 0; i < 7; i++) {
      await page.click('button:has-text("Continue")');
    }

    // Try to pay without filling required fields
    await page.click('button:has-text("Pay & Publish Listing")');

    // Should show validation error
    await expect(page.locator('text=Please fill in all required fields')).toBeVisible();
  });

  test('should enable debug mode with query parameter', async ({ page }) => {
    await page.goto('/sell-salon?debug_payment=1');
    
    // Should show debug indicators
    // This would be implemented with actual debug UI elements
    await expect(page.locator('[data-testid="debug-mode"]')).toBeVisible();
  });
});