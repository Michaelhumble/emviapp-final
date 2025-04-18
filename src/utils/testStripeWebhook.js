
// This script simulates a Stripe webhook event for testing purposes
// Run with: node testStripeWebhook.js

const fetch = require('node-fetch');

// Sample checkout.session.completed event payload
// This mimics what Stripe would send but without a valid signature
const sampleEvent = {
  id: 'evt_test_webhook_' + Math.floor(Math.random() * 1000000),
  object: 'event',
  api_version: '2023-10-16',
  created: Math.floor(Date.now() / 1000),
  data: {
    object: {
      id: 'cs_test_' + Math.floor(Math.random() * 1000000),
      object: 'checkout.session',
      amount_total: 1000, // $10.00
      customer: 'cus_test123',
      customer_email: 'test@example.com',
      payment_status: 'paid',
      metadata: {
        user_id: '00000000-0000-0000-0000-000000000000', // Replace with actual user ID for testing
        post_type: 'job',
        is_first_post: 'true'
      }
    }
  },
  type: 'checkout.session.completed',
  livemode: false
};

// Project ID from your Supabase project
const PROJECT_ID = 'wwhqbjrhbajpabfdwnip';
const webhookUrl = `https://${PROJECT_ID}.functions.supabase.co/stripe-webhook`;

async function sendTestWebhook() {
  console.log(`Sending test webhook to: ${webhookUrl}`);
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: This is just for testing - real requests would include a valid
        // stripe-signature header that's cryptographically signed
        'stripe-signature': 'test_signature'
      },
      body: JSON.stringify(sampleEvent)
    });
    
    const data = await response.text();
    console.log(`Response status: ${response.status}`);
    console.log(`Response data: ${data}`);
    
    if (response.status === 400) {
      console.log('\nNOTE: A 400 error about invalid signature is EXPECTED in this test.');
      console.log('The real Stripe webhook has signature verification that this test cannot reproduce.');
      console.log('However, you can check the function logs in Supabase to see if the function was triggered.');
    }
  } catch (error) {
    console.error('Error sending test webhook:', error);
  }
}

sendTestWebhook();
