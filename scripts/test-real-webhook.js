
// This script creates a real, properly signed Stripe webhook event
// Requires your Stripe API key and webhook secret to be set as environment variables
// Run with: STRIPE_SECRET_KEY=sk_test_... STRIPE_WEBHOOK_SECRET=whsec_... node test-real-webhook.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');

// Project ID from your Supabase project
const PROJECT_ID = 'wwhqbjrhbajpabfdwnip';
const webhookUrl = `https://${PROJECT_ID}.functions.supabase.co/stripe-webhook`;

async function createTestEvent() {
  try {
    // Create a test event
    const event = {
      id: 'evt_test_webhook_' + Math.floor(Math.random() * 1000000),
      object: 'event',
      api_version: '2023-10-16',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: 'cs_test_' + Math.floor(Math.random() * 1000000),
          object: 'checkout.session',
          amount_total: 1000, // $10.00
          payment_status: 'paid',
          metadata: {
            user_id: '00000000-0000-0000-0000-000000000000', // Replace with actual user ID
            post_type: 'job',
            is_first_post: 'true'
          }
        }
      },
      type: 'checkout.session.completed',
      livemode: false
    };

    // Create a webhook signature (like what Stripe would create)
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify(event);
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error('STRIPE_WEBHOOK_SECRET environment variable is required');
      process.exit(1);
    }
    
    const signedPayload = `${timestamp}.${payload}`;
    const signature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');
    
    // Create the full signature as Stripe would format it
    const stripeSignature = `t=${timestamp},v1=${signature}`;
    
    console.log(`Sending properly signed webhook to: ${webhookUrl}`);
    
    // Send the request with a proper signature
    const fetch = require('node-fetch');
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': stripeSignature
      },
      body: payload
    });
    
    const data = await response.text();
    console.log(`Response status: ${response.status}`);
    console.log(`Response data: ${data}`);
    
    if (response.status === 200) {
      console.log('\nSUCCESS: The webhook was properly signed and accepted.');
    } else {
      console.log('\nERROR: The webhook request failed. Check the error message above.');
    }
  } catch (error) {
    console.error('Error sending test webhook:', error);
  }
}

createTestEvent();
