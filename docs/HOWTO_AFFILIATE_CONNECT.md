# Affiliate Stripe Connect Integration

This document outlines how to set up and test the Stripe Connect integration for affiliate payouts.

## Required Secrets

Set these environment variables/secrets in your Lovable project:

- `STRIPE_SECRET_KEY`: Your Stripe secret key (test mode: `sk_test_...`)
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `STRIPE_CONNECT_CLIENT_ID`: Stripe Connect client ID (test mode: `ca_...`)
- `AFFILIATE_SANDBOX`: Set to `true` for test mode (default)

## Getting Stripe Connect Client ID

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/connect/settings)
2. Navigate to **Developers > Connect > Settings**
3. Copy your Connect client ID (starts with `ca_...`)
4. Add it as `STRIPE_CONNECT_CLIENT_ID` secret in Lovable

## Test Flow

### 1. Set Up Test Mode
- Ensure `AFFILIATE_SANDBOX=true` (default)
- Use test Stripe keys
- UI will show "Test mode" indicators

### 2. Connect Process
1. Visit `/affiliate/settings`
2. Click **"Connect Payouts (Stripe Express)"**
3. Complete Stripe Express onboarding with test data:
   - Use test phone: `+15555551234`
   - Use test SSN: `000-00-0000` 
   - Use test bank: Routing `110000000`, Account `000123456789`
   - Use test address: any US address

### 3. Verify Connection
- After onboarding, return to `/affiliate/settings`
- Status should show **"Connected"** with country and currency
- **"Manage in Stripe"** button should link to test dashboard

## API Endpoints

### POST /affiliate-connect-start
Creates Stripe Express account and returns onboarding link.

**Headers:** `Authorization: Bearer <jwt_token>`

**Response:**
```json
{
  "url": "https://connect.stripe.com/express/setup/...",
  "account_id": "acct_..."
}
```

### GET /affiliate-connect-status  
Fetches current Stripe Connect account status.

**Headers:** `Authorization: Bearer <jwt_token>`

**Response:**
```json
{
  "connected": true,
  "connect_status": "connected",
  "charges_enabled": true,
  "payouts_enabled": true,
  "details_submitted": true,
  "country": "US",
  "default_currency": "usd",
  "stripe_account_id": "acct_..."
}
```

### POST /stripe-connect-webhook
Receives Stripe Connect webhooks (account updates).

**Note:** Currently accepts all webhooks for development. In production, add signature verification.

## Database Schema

The `affiliate_partners` table includes these Connect-related columns:

```sql
- stripe_account_id TEXT        -- Stripe Connect account ID
- connect_status TEXT           -- 'not_connected', 'pending', 'connected', 'restricted'  
- last_connect_check TIMESTAMPTZ -- Last status check timestamp
- country TEXT                  -- Account country (e.g., 'US')
- default_currency TEXT         -- Account currency (e.g., 'usd')
```

## Connect Status Values

- **`not_connected`**: No Stripe account exists
- **`pending`**: Account exists but onboarding incomplete
- **`connected`**: Full access, can receive payouts
- **`restricted`**: Account has restrictions or missing requirements

## Testing Commands

### Check Status API
```bash
curl -H "Authorization: Bearer <dev_jwt>" \
     "https://your-project.supabase.co/functions/v1/affiliate-connect-status"
```

### Manual Status Refresh
In the UI, click **"Refresh Status"** to fetch latest Stripe account details.

## Production Setup

1. Switch to live Stripe keys (`sk_live_...`, `ca_live_...`)
2. Set `AFFILIATE_SANDBOX=false`
3. Configure production webhook endpoint in Stripe Dashboard
4. Test with real bank account information

## Troubleshooting

### "No Connect Client ID" Error
- Verify `STRIPE_CONNECT_CLIENT_ID` is set in secrets
- Ensure it starts with `ca_` and matches your Stripe dashboard

### "Onboarding Link Failed" 
- Check Stripe secret key is valid and has Connect permissions
- Verify affiliate partner record exists in database

### Status Shows "Pending" After Completion
- Click **"Refresh Status"** button
- Check Stripe dashboard for any outstanding requirements
- Ensure test data was entered correctly during onboarding

## Security Notes

- Stripe Connect accounts are scoped to individual affiliates
- Account IDs are stored securely in the database
- All financial data stays within Stripe's secure environment
- API calls require authenticated affiliate user context