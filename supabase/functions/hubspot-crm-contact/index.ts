import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactUpsertRequest {
  email: string;
  contactData: {
    firstName?: string;
    lastName?: string;
    userId?: string;
    role?: string;
    city?: string;
    plan?: string;
    salon_name?: string;
    specialty?: string;
    years_experience?: number;
    signup_stage?: 'visitor' | 'lead' | 'mql' | 'sql' | 'customer';
    mql_score?: number;
    // Attribution fields
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    affiliate_id?: string;
    landing_url?: string;
    first_seen_at?: string;
    press_slug?: string;
    city_slug?: string;
    category_slug?: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, contactData }: ContactUpsertRequest = await req.json()

    // Get credentials
    const privateToken = Deno.env.get('HS_PRIVATE_APP_TOKEN')
    if (!privateToken) {
      console.warn('⚠️ HubSpot Private App Token not configured')
      return new Response(JSON.stringify({ 
        error: 'HubSpot CRM integration not configured',
        success: false 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Build properties object for HubSpot
    const properties: Record<string, string> = {
      email
    }

    // Map contact data to HubSpot properties
    if (contactData.firstName) properties.firstname = contactData.firstName
    if (contactData.lastName) properties.lastname = contactData.lastName
    if (contactData.userId) properties.custom_user_id = contactData.userId
    if (contactData.role) properties.user_role = contactData.role
    if (contactData.city) properties.city = contactData.city
    if (contactData.plan) properties.subscription_plan = contactData.plan
    if (contactData.salon_name) properties.salon_name = contactData.salon_name
    if (contactData.specialty) properties.specialty = contactData.specialty
    if (contactData.years_experience) properties.years_experience = contactData.years_experience.toString()
    if (contactData.signup_stage) properties.signup_stage = contactData.signup_stage
    if (contactData.mql_score) properties.mql_score = contactData.mql_score.toString()

    // Map attribution fields
    if (contactData.utm_source) properties.utm_source = contactData.utm_source
    if (contactData.utm_medium) properties.utm_medium = contactData.utm_medium
    if (contactData.utm_campaign) properties.utm_campaign = contactData.utm_campaign
    if (contactData.utm_content) properties.utm_content = contactData.utm_content
    if (contactData.utm_term) properties.utm_term = contactData.utm_term
    if (contactData.affiliate_id) properties.affiliate_id = contactData.affiliate_id
    if (contactData.landing_url) properties.landing_url = contactData.landing_url
    if (contactData.first_seen_at) properties.first_seen_at = new Date(contactData.first_seen_at).getTime().toString()
    if (contactData.press_slug) properties.press_slug = contactData.press_slug
    if (contactData.city_slug) properties.city_slug = contactData.city_slug
    if (contactData.category_slug) properties.category_slug = contactData.category_slug

    console.log('🔄 Upserting HubSpot contact:', { email, propertiesCount: Object.keys(properties).length })

    // Try to find existing contact first
    const searchUrl = `https://api.hubapi.com/crm/v3/objects/contacts/search`
    const searchPayload = {
      filterGroups: [{
        filters: [{
          propertyName: 'email',
          operator: 'EQ',
          value: email
        }]
      }],
      properties: ['id', 'email', 'firstname', 'lastname']
    }

    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${privateToken}`
      },
      body: JSON.stringify(searchPayload)
    })

    let contactId: string | null = null
    let isUpdate = false

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json()
      if (searchResult.results && searchResult.results.length > 0) {
        contactId = searchResult.results[0].id
        isUpdate = true
        console.log('📝 Found existing contact, updating:', contactId)
      }
    }

    // Create or update contact
    let hubspotResponse: Response
    let url: string

    if (contactId) {
      // Update existing contact
      url = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`
      hubspotResponse = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${privateToken}`
        },
        body: JSON.stringify({ properties })
      })
    } else {
      // Create new contact
      url = `https://api.hubapi.com/crm/v3/objects/contacts`
      hubspotResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${privateToken}`
        },
        body: JSON.stringify({ properties })
      })
    }

    const hubspotData = await hubspotResponse.json()

    if (hubspotResponse.ok) {
      const finalContactId = contactId || hubspotData.id
      console.log(`✅ Contact ${isUpdate ? 'updated' : 'created'} successfully:`, finalContactId)

      return new Response(JSON.stringify({
        success: true,
        contactId: finalContactId,
        isUpdate,
        message: `Contact ${isUpdate ? 'updated' : 'created'} successfully`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } else {
      console.error('❌ HubSpot contact operation failed:', {
        status: hubspotResponse.status,
        statusText: hubspotResponse.statusText,
        data: hubspotData
      })

      return new Response(JSON.stringify({
        success: false,
        error: hubspotData.message || `HTTP ${hubspotResponse.status}: ${hubspotResponse.statusText}`,
        hubspotResponse: hubspotData
      }), {
        status: hubspotResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

  } catch (error) {
    console.error('❌ HubSpot contact upsert error:', error)
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})