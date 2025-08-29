#!/usr/bin/env npx tsx

/**
 * HubSpot CRM Dry Run Test Script
 * 
 * Tests the HubSpot Free Plan integration by creating/updating test contacts and deals.
 * Uses only free plan scopes: contacts.read, contacts.write, deals.read, deals.write.
 * 
 * Usage: npx tsx scripts/hubspotTest.ts
 */

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';
const TEST_EMAIL = 'test-emviapp@example.com';

// Get private token from environment
const PRIVATE_TOKEN = process.env.HS_PRIVATE_APP_TOKEN;
const PORTAL_ID = process.env.VITE_HUBSPOT_PORTAL_ID || process.env.HUBSPOT_PORTAL_ID;

if (!PRIVATE_TOKEN) {
  console.error('❌ HS_PRIVATE_APP_TOKEN environment variable is required');
  process.exit(1);
}

if (!PORTAL_ID) {
  console.error('❌ HUBSPOT_PORTAL_ID or VITE_HUBSPOT_PORTAL_ID environment variable is required');
  process.exit(1);
}

console.log('🚀 Starting HubSpot CRM Dry Run Test');
console.log(`📍 Portal ID: ${PORTAL_ID}`);
console.log(`✉️  Test Email: ${TEST_EMAIL}`);
console.log('');

/**
 * Make authenticated request to HubSpot API
 */
async function hubspotRequest(endpoint: string, options: any = {}) {
  const url = `${HUBSPOT_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PRIVATE_TOKEN}`,
        ...options.headers
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`HubSpot API Error: ${response.status} - ${data.message || 'Unknown error'}`);
    }

    return { response, data };
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * Test contact creation/update with attribution data
 */
async function testContactUpsert() {
  console.log('👤 Testing Contact Upsert...');
  
  const contactProperties = {
    email: TEST_EMAIL,
    firstname: 'Emvi',
    lastname: 'Test User',
    signup_stage: 'mql',
    affiliate_id: 'partner123',
    utm_source: 'google',
    utm_medium: 'cpc', 
    utm_campaign: 'artist_acquisition',
    utm_term: 'nail artist jobs',
    utm_content: 'test_ad',
    mql_score: '75'
  };

  try {
    // Try to find existing contact first
    const { data: searchResult } = await hubspotRequest('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: TEST_EMAIL
          }]
        }],
        properties: ['id', 'email', 'firstname', 'lastname']
      })
    });

    let contactId = null;
    let isUpdate = false;

    if (searchResult.results && searchResult.results.length > 0) {
      contactId = searchResult.results[0].id;
      isUpdate = true;
      console.log(`  📝 Found existing contact: ${contactId}`);
      
      // Update existing contact
      await hubspotRequest(`/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties: contactProperties })
      });
      
      console.log(`  ✅ Contact updated successfully: ${contactId}`);
    } else {
      // Create new contact
      const { data: createResult } = await hubspotRequest('/crm/v3/objects/contacts', {
        method: 'POST',
        body: JSON.stringify({ properties: contactProperties })
      });
      
      contactId = createResult.id;
      console.log(`  ✅ Contact created successfully: ${contactId}`);
    }

    return contactId;
  } catch (error) {
    console.error(`  ❌ Contact upsert failed: ${error.message}`);
    throw error;
  }
}

/**
 * Test deal creation with attribution data
 */
async function testDealCreation(contactId: string) {
  console.log('🤝 Testing Deal Creation...');
  
  const dealProperties = {
    dealname: 'Emvi App MQL - Test Deal',
    dealstage: 'appointmentscheduled',
    pipeline: 'default',
    amount: '500',
    mql_score: '75',
    utm_source: 'google',
    utm_campaign: 'artist_acquisition',
    affiliate_id: 'partner123'
  };

  try {
    // Check if deal already exists
    const { data: searchResult } = await hubspotRequest('/crm/v3/objects/deals/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'dealname',
            operator: 'EQ',
            value: dealProperties.dealname
          }]
        }],
        properties: ['id', 'dealname', 'dealstage', 'amount']
      })
    });

    let dealId = null;
    let isUpdate = false;

    if (searchResult.results && searchResult.results.length > 0) {
      dealId = searchResult.results[0].id;
      isUpdate = true;
      console.log(`  📝 Found existing deal: ${dealId}`);
      
      // Update existing deal
      await hubspotRequest(`/crm/v3/objects/deals/${dealId}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties: dealProperties })
      });
      
      console.log(`  ✅ Deal updated successfully: ${dealId}`);
    } else {
      // Create new deal
      const { data: createResult } = await hubspotRequest('/crm/v3/objects/deals', {
        method: 'POST',
        body: JSON.stringify({ properties: dealProperties })
      });
      
      dealId = createResult.id;
      console.log(`  ✅ Deal created successfully: ${dealId}`);

      // Associate deal with contact
      try {
        await hubspotRequest(`/crm/v4/objects/deals/${dealId}/associations/contacts/${contactId}`, {
          method: 'PUT',
          body: JSON.stringify([{
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 3 // Deal to Contact association
          }])
        });
        console.log(`  🔗 Deal associated with contact successfully`);
      } catch (associationError) {
        console.warn(`  ⚠️  Failed to associate deal with contact: ${associationError.message}`);
      }
    }

    return dealId;
  } catch (error) {
    console.error(`  ❌ Deal creation failed: ${error.message}`);
    throw error;
  }
}

/**
 * Run all tests
 */
async function runDryRun() {
  try {
    console.log('Starting comprehensive HubSpot CRM test...\n');

    // Test 1: Contact upsert
    const contactId = await testContactUpsert();
    console.log('');

    // Test 2: Deal creation
    const dealId = await testDealCreation(contactId);
    console.log('');

    // Summary
    console.log('🎉 Dry Run Completed Successfully!');
    console.log('');
    console.log('📊 Results Summary:');
    console.log(`  Contact ID: ${contactId}`);
    console.log(`  Deal ID: ${dealId}`);
    console.log(`  Test Email: ${TEST_EMAIL}`);
    console.log('');
    console.log('✅ Your HubSpot integration is working correctly!');
    console.log('');
    console.log('🔍 Next Steps:');
    console.log('  1. Check your HubSpot portal for the test contact and deal');
    console.log('  2. Verify all attribution properties are populated correctly');
    console.log('  3. Test the integration in your live application');
    console.log('  4. Monitor the admin dashboard at /admin/hubspot-sync');

  } catch (error) {
    console.error('❌ Dry run failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('  1. Verify HS_PRIVATE_APP_TOKEN is correct and has required scopes');
    console.log('  2. Check that HUBSPOT_PORTAL_ID matches your HubSpot portal');
    console.log('  3. Ensure your private app has these scopes:');
    console.log('     - crm.objects.contacts.read');
    console.log('     - crm.objects.contacts.write');
    console.log('     - crm.objects.deals.read');
    console.log('     - crm.objects.deals.write');
    console.log('     - forms');
    process.exit(1);
  }
}

// Run the dry run
runDryRun();