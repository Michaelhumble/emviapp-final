
// Test utility to send simulated webhook events to your function
const fetch = require('node-fetch');

// Replace with your Supabase project ID
const PROJECT_ID = 'wwhqbjrhbajpabfdwnip';
const WEBHOOK_URL = `https://${PROJECT_ID}.functions.supabase.co/stripe-webhook-handler`;

// Sample webhook payload (simplified for testing)
const sampleEvent = {
  id: 'evt_' + Math.random().toString(36).substr(2, 9),
  object: 'event',
  api_version: '2023-10-16',
  created: Math.floor(Date.now() / 1000),
  type: 'payment_intent.succeeded', // Change this to test different events
  data: {
    object: {
      id: 'pi_' + Math.random().toString(36).substr(2, 9),
      object: 'payment_intent',
      amount: 2000,
      currency: 'usd',
      status: 'succeeded',
      metadata: {
        user_id: '00000000-0000-0000-0000-000000000000', // Replace with a test user ID
        listing_id: '11111111-1111-1111-1111-111111111111', // Replace with a test listing ID
      }
    }
  }
};

async function sendTestWebhook() {
  console.log(`Sending test webhook to ${WEBHOOK_URL}`);
  
  try {
    // This will fail signature verification, which is expected for a local test
    // In production, only real Stripe-signed requests will pass
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test_signature' // This won't pass verification
      },
      body: JSON.stringify(sampleEvent)
    });
    
    const text = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${text}`);
    
    if (response.status === 400) {
      console.log('\nNOTE: 400 error is EXPECTED due to invalid signature.');
      console.log('To properly test, use the Stripe CLI to forward real webhook events.');
      console.log('https://stripe.com/docs/stripe-cli');
    }
  } catch (error) {
    console.error('Error sending test webhook:', error);
  }
}

sendTestWebhook();
