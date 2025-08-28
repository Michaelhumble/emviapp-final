// E2E test for booking management flows
// Run with: npx playwright test booking-management.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Booking Management', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the manage token verification
    await page.route('**/functions/v1/verify_manage_token', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    // Mock booking data
    await page.route('**/rest/v1/bookings*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-booking-id',
          client_name: 'John Doe',
          client_email: 'john@example.com',
          date_requested: '2024-02-15',
          time_requested: '10:00',
          status: 'confirmed',
          recipient_id: 'artist-id',
          service_id: 'service-id',
          note: 'Test booking'
        })
      });
    });

    // Mock service data
    await page.route('**/rest/v1/services*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'service-id',
          title: 'Hair Cut',
          duration_minutes: 60,
          price: 50
        })
      });
    });
  });

  test('should load manage booking page with valid token', async ({ page }) => {
    await page.goto('/bookings/manage?id=test-booking-id&token=valid-token');
    
    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Manage Your Booking');
    await expect(page.locator('text=John Doe')).toBeVisible();
    await expect(page.locator('text=Hair Cut')).toBeVisible();
    await expect(page.locator('text=February 15, 2024')).toBeVisible();
  });

  test('should open reschedule dialog and show calendar', async ({ page }) => {
    await page.goto('/bookings/manage?id=test-booking-id&token=valid-token');
    
    // Click reschedule button
    await page.click('button:has-text("Reschedule Booking")');
    
    // Check that dialog opens
    await expect(page.locator('text=Reschedule Booking')).toBeVisible();
    await expect(page.locator('text=Select New Date')).toBeVisible();
    
    // Calendar should be visible
    await expect(page.locator('[role="grid"]')).toBeVisible();
  });

  test('should open cancellation dialog', async ({ page }) => {
    await page.goto('/bookings/manage?id=test-booking-id&token=valid-token');
    
    // Click cancel button
    await page.click('button:has-text("Cancel Booking")');
    
    // Check that dialog opens
    await expect(page.locator('text=Cancel Booking')).toBeVisible();
    await expect(page.locator('text=Why are you cancelling?')).toBeVisible();
    
    // Radio options should be visible
    await expect(page.locator('text=Schedule conflict')).toBeVisible();
    await expect(page.locator('text=No longer needed')).toBeVisible();
  });

  test('should show error for invalid token', async ({ page }) => {
    // Mock failed token verification
    await page.route('**/functions/v1/verify_manage_token', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid token' })
      });
    });

    await page.goto('/bookings/manage?id=test-booking-id&token=invalid-token');
    
    // Should redirect or show error
    await expect(page.locator('text=Invalid Booking Link')).toBeVisible();
    await expect(page.locator('text=This booking link has expired or is no longer valid')).toBeVisible();
  });

  test('should complete reschedule flow', async ({ page }) => {
    // Mock reschedule API
    await page.route('**/functions/v1/bookings-reschedule', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true, 
          message: 'Booking rescheduled successfully' 
        })
      });
    });

    // Mock available slots
    await page.route('**/functions/v1/availability-slots', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            starts_at: '2024-02-16T10:00:00Z',
            ends_at: '2024-02-16T11:00:00Z',
            available: true
          }
        ])
      });
    });

    await page.goto('/bookings/manage?id=test-booking-id&token=valid-token');
    
    // Start reschedule flow
    await page.click('button:has-text("Reschedule Booking")');
    
    // Select a date (next day)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`[data-date="${tomorrow.toISOString().split('T')[0]}"]`);
    
    // Select a time slot
    await page.click('button:has-text("10:00 AM")');
    
    // Confirm reschedule
    await page.click('button:has-text("Confirm Reschedule")');
    
    // Should show success message
    await expect(page.locator('text=Booking rescheduled successfully')).toBeVisible();
  });

  test('should complete cancellation flow', async ({ page }) => {
    // Mock cancel API
    await page.route('**/functions/v1/bookings-cancel', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true, 
          message: 'Booking cancelled successfully' 
        })
      });
    });

    await page.goto('/bookings/manage?id=test-booking-id&token=valid-token');
    
    // Start cancellation flow
    await page.click('button:has-text("Cancel Booking")');
    
    // Select a reason
    await page.click('input[value="schedule_conflict"]');
    
    // Confirm cancellation
    await page.click('button:has-text("Cancel Booking")');
    
    // Should show success message
    await expect(page.locator('text=Booking cancelled successfully')).toBeVisible();
  });
});