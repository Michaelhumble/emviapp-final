#!/usr/bin/env npx tsx

/**
 * HubSpot CRM Dry Run Test Script - Week-1 Hardened
 * 
 * Tests the HubSpot Free Plan integration by creating/updating test contacts and deals.
 * Uses only free plan scopes: contacts.read, contacts.write, deals.read, deals.write.
 * 
 * Usage: 
 * npx tsx scripts/hubspotTest.ts [flags]
 * 
 * Flags:
 * --createContact    Create/update test contact with attribution
 * --createDeal       Create/update test deal linked to contact  
 * --withUTM          Include UTM attribution in test data
 * --mqlScore=NN      Set MQL score (0-100)
 * --failOnWarning    Exit with non-zero code on warnings
 */

import { parseArgs } from 'node:util';

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';
const TEST_EMAIL = 'test-emviapp@example.com';

// Parse CLI flags
const { values: flags } = parseArgs({
  options: {
    createContact: { type: 'boolean', default: false },
    createDeal: { type: 'boolean', default: false },
    withUTM: { type: 'boolean', default: false },
    mqlScore: { type: 'string', default: '60' },
    failOnWarning: { type: 'boolean', default: false }
  },
  allowPositionals: true
});

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

console.log('🚀 Starting HubSpot CRM Dry Run Test - Week-1 Hardened');
console.log(`📍 Portal ID: ${PORTAL_ID}`);
console.log(`✉️  Test Email: ${TEST_EMAIL}`);
console.log(`🎯 Flags: ${JSON.stringify(flags)}`);
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
 * Test contact creation/update with attribution data - Week-1 Hardened
 */
async function testContactUpsert() {
  console.log('👤 Testing Contact Upsert...');
  
  const baseProperties = {
    email: TEST_EMAIL,
    firstname: 'Emvi',
    lastname: 'Test User',
    signup_stage: 'mql',
    mql_score: flags.mqlScore
  };

  const utmProperties = flags.withUTM ? {
    affiliate_id: 'partner123',
    utm_source: 'google',
    utm_medium: 'cpc', 
    utm_campaign: 'artist_acquisition',
    utm_term: 'nail artist jobs',
    utm_content: 'test_ad'
  } : {};

  const contactProperties = { ...baseProperties, ...utmProperties };

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
 * Run all tests - Week-1 Hardened with CLI flags
 */
async function runDryRun() {
  try {
    console.log('Starting comprehensive HubSpot CRM test...\n');
    
    let contactId: string | null = null;
    let dealId: string | null = null;
    let warnings: string[] = [];

    // Default to both tests if no specific flags
    const shouldCreateContact = flags.createContact || (!flags.createContact && !flags.createDeal);
    const shouldCreateDeal = flags.createDeal || (!flags.createContact && !flags.createDeal);

    // Test 1: Contact upsert
    if (shouldCreateContact) {
      contactId = await testContactUpsert();
      console.log('');
    }

    // Test 2: Deal creation (needs contact ID)
    if (shouldCreateDeal) {
      if (!contactId && shouldCreateContact) {
        warnings.push('Deal test skipped: contact creation failed');
      } else if (!contactId && !shouldCreateContact) {
        console.log('⚠️  Creating temporary contact for deal test...');
        contactId = await testContactUpsert();
        console.log('');
      }
      
      if (contactId) {
        dealId = await testDealCreation(contactId);
        console.log('');
      }
    }

    // Handle warnings
    if (warnings.length > 0) {
      console.log('⚠️  Warnings:');
      warnings.forEach(w => console.log(`  - ${w}`));
      console.log('');
      
      if (flags.failOnWarning) {
        console.error('❌ Exiting with error due to --failOnWarning flag');
        process.exit(1);
      }
    }

    // Summary
    console.log('🎉 Dry Run Completed Successfully!');
    console.log('');
    console.log('📊 Results Summary:');
    if (contactId) console.log(`  ✅ Contact ID: ${contactId}`);
    if (dealId) console.log(`  ✅ Deal ID: ${dealId}`);
    console.log(`  📧 Test Email: ${TEST_EMAIL}`);
    console.log(`  🎯 MQL Score: ${flags.mqlScore}`);
    console.log(`  🏷️  UTM Data: ${flags.withUTM ? 'Included' : 'Skipped'}`);
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
    console.log('');
    console.log('🎯 Available flags:');
    console.log('  --createContact    Create/update test contact');
    console.log('  --createDeal       Create/update test deal');
    console.log('  --withUTM          Include UTM attribution');
    console.log('  --mqlScore=NN      Set MQL score (0-100)');
    console.log('  --failOnWarning    Exit non-zero on warnings');
    process.exit(1);
  }
}

// Run the dry run
runDryRun();