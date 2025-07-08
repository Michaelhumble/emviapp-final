# 🔒 PAID JOB POSTING - LIVE TESTING GUIDE

## ⚠️ CRITICAL DISTINCTIONS

### 🧪 TEST MODE (Simulation Only)
- **Route**: `/post-job-paid-test`
- **Navigation**: Only visible in development or with `?test=true`
- **Payment**: Simulated - NO real Stripe charges
- **Database**: Jobs are NOT saved to live database
- **Visibility**: Jobs do NOT appear on Jobs page
- **Purpose**: UI/UX testing and form validation only

### 🔴 PRODUCTION MODE (Real Payment Flow)
- **Route**: `/post-job` 
- **Navigation**: Always visible as "Post Paid Job"
- **Payment**: Real Stripe payment (use test cards to avoid charges)
- **Database**: Jobs saved to main Supabase `jobs` table
- **Visibility**: Jobs appear immediately on Jobs page after payment
- **Purpose**: Live job posting with real payment processing

## 🧪 TESTING REAL PAID JOBS (Step-by-Step)

### Step 1: Access Production Flow
1. Navigate to `/post-job` (NOT `/post-job-paid-test`)
2. You should see the job template selector
3. Warning banners should indicate this is the REAL payment flow

### Step 2: Complete Job Form
1. Select any job template (Nail Tech, Hair Stylist, etc.)
2. Fill out all required fields
3. Submit the form to proceed to payment

### Step 3: Payment with Test Card
Use these Stripe test card numbers to avoid real charges:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0000 0000 3220`
- **Expiry**: Any future date (e.g., 12/26)
- **CVC**: Any 3-digit number (e.g., 123)

### Step 4: Verify Success
After successful payment, you should see:
1. ✅ Success page with payment confirmation
2. ✅ Toast notifications confirming job is live
3. ✅ Job appears immediately on `/jobs` page
4. ✅ Job exists in Supabase `jobs` table with `status: 'active'`

## 🔍 VERIFICATION CHECKLIST

### Payment Verification
- [ ] Stripe test payment processed successfully
- [ ] Webhook received and processed (check Supabase function logs)
- [ ] No real money charged (using test card)

### Database Verification
- [ ] Job exists in Supabase `jobs` table
- [ ] Job status is `active` (not `draft`)
- [ ] All form fields correctly saved
- [ ] `pricing_tier` set correctly (not 'free')

### Frontend Verification
- [ ] Job appears on public Jobs page immediately
- [ ] Job card displays properly with all details
- [ ] No test jobs from `/post-job-paid-test` appear on Jobs page

## 🚨 TROUBLESHOOTING

### Job Not Appearing on Jobs Page
1. Check Supabase `jobs` table - is the job there?
2. Check job `status` - should be `active`, not `draft`
3. Check Stripe webhook logs for errors
4. Check browser console for any errors

### Payment Issues
1. Verify Stripe test keys are configured
2. Check webhook endpoint is accessible
3. Check Supabase function logs for webhook processing

### Webhook Not Firing
1. Check Stripe dashboard webhook logs
2. Verify webhook URL is correct
3. Check webhook signing secret

## 📱 TESTING ON DIFFERENT DEVICES
Test the full flow on:
- [ ] Desktop Chrome
- [ ] Desktop Safari  
- [ ] Mobile iOS Safari
- [ ] Mobile Android Chrome

## 🎯 SUCCESS CRITERIA
A successful test means:
1. Payment processes without errors
2. Job appears on Jobs page within 30 seconds
3. Job data is complete and accurate
4. No test jobs leak into production
5. All logging confirms each step

## ⛔ WHAT NOT TO TEST
- Do NOT use real credit cards
- Do NOT test with `/post-job-paid-test` for production verification
- Do NOT expect test jobs to appear on live site

---

**Last Updated**: Ready for testing
**Next Step**: Execute full test with Stripe test card and verify all checkpoints