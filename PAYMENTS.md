# Payment Integration Guide

## Overview
EmviApp uses Stripe for payment processing on job and salon listings. Payments are processed via Stripe Checkout with webhooks handling post-payment activation.

## Environment Setup

### Required Environment Variables
```bash
# Stripe Keys (get from Stripe Dashboard)
STRIPE_PUBLISHABLE_KEY=pk_test_...  # or pk_live_... for production
STRIPE_SECRET_KEY=sk_test_...       # or sk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_...     # from webhook endpoint configuration

# Site Configuration
SITE_URL=https://www.emvi.app       # your domain for Stripe redirects
PUBLIC_APP_ORIGIN=https://www.emvi.app
```

### Optional Environment Variables
```bash
# Price IDs (if using predefined Stripe products)
STRIPE_PRICE_JOB_POST=price_...
STRIPE_PRICE_SALON_POST=price_...

# Debug mode
VITE_DEBUG_PAYMENTS=true            # enables payment debugging in dev
```

## Test Mode Setup

1. **Get Test Keys**: Visit [Stripe Dashboard - API Keys](https://dashboard.stripe.com/apikeys)
2. **Add Keys**: Add your test keys to Supabase Edge Function secrets
3. **Set Debug Mode**: Add `?debug_payment=1` to URL for debugging

### Test Cards
- **Success**: 4242-4242-4242-4242
- **Declined**: 4000-0000-0000-0002
- **3D Secure**: 4000-0000-0000-3220

## Payment Flow

### 1. Frontend (Salon Listing)
```typescript
// User completes form and clicks "Pay & Publish"
const success = await initiatePayment(pricingOptions, formData, photoUploads);
```

### 2. Backend (create-salon-checkout)
- Validates user authentication
- Saves form data to `pending_salons` table
- Creates Stripe checkout session
- Returns checkout URL

### 3. Stripe Checkout
- User completes payment on Stripe
- Stripe redirects to success/cancel URL
- Stripe sends webhook to our endpoint

### 4. Webhook Processing
- Webhook verifies Stripe signature
- Moves data from `pending_salons` to `salon_sales`
- Activates listing with proper expiration dates

## Testing Steps

### Manual Testing
1. Navigate to `/sell-salon`
2. Complete all form steps
3. Select a pricing plan
4. Click "Pay & Publish Listing"
5. Use test card: 4242-4242-4242-4242
6. Verify redirect to success page
7. Check that salon appears in listings

### Debug Mode
Add `?debug_payment=1` to any page to enable:
- Console logging of payment requests/responses
- Error details in toast messages
- Test mode indicators

### E2E Testing
```bash
# Run Playwright tests
npm run test:e2e payment
```

## Troubleshooting

### Common Issues

**Payment button doesn't work**
- Check browser console for errors
- Verify all required form fields are filled
- Check Stripe keys are configured

**"Failed to create checkout session"**
- Verify STRIPE_SECRET_KEY is set in edge function secrets
- Check Supabase edge function logs
- Ensure form data validation passes

**Webhook not processing**
- Check STRIPE_WEBHOOK_SECRET is configured
- Verify webhook endpoint URL in Stripe dashboard
- Check webhook logs in Supabase functions

**Salon not appearing after payment**
- Check webhook processed successfully
- Verify `salon_sales` table has new entry
- Check listing expiration date

### Debug Commands
```bash
# Check edge function logs
supabase functions logs create-salon-checkout

# Check webhook logs  
supabase functions logs stripe-webhook

# Test webhook locally
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
```

## Production Deployment

1. **Switch to Live Mode**: Update environment variables with live Stripe keys
2. **Configure Webhook**: Add production webhook endpoint in Stripe dashboard
3. **Test Flow**: Complete a real payment test in production
4. **Monitor**: Set up monitoring for payment failures

## Support

For payment-related issues:
1. Check Supabase edge function logs
2. Review Stripe dashboard for payment details
3. Check webhook delivery status in Stripe
4. Verify database state in Supabase