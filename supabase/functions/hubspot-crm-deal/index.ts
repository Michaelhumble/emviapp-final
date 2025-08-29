import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DealRequest {
  contactId: string;
  dealData: {
    dealName: string;
    amount?: number;
    dealStage?: string;
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
    const { contactId, dealData }: DealRequest = await req.json()

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

    // Build properties object for HubSpot Deal
    const properties: Record<string, string> = {
      dealname: dealData.dealName,
      dealstage: dealData.dealStage || 'appointmentscheduled', // Default HubSpot deal stage
      pipeline: 'default' // Use default pipeline for free plan
    }

    // Add amount if provided
    if (dealData.amount) {
      properties.amount = dealData.amount.toString()
    }

    // Map attribution fields to deal
    if (dealData.utm_source) properties.utm_source = dealData.utm_source
    if (dealData.utm_medium) properties.utm_medium = dealData.utm_medium
    if (dealData.utm_campaign) properties.utm_campaign = dealData.utm_campaign
    if (dealData.utm_content) properties.utm_content = dealData.utm_content
    if (dealData.utm_term) properties.utm_term = dealData.utm_term
    if (dealData.affiliate_id) properties.affiliate_id = dealData.affiliate_id
    if (dealData.landing_url) properties.landing_url = dealData.landing_url
    if (dealData.first_seen_at) properties.first_seen_at = new Date(dealData.first_seen_at).getTime().toString()
    if (dealData.press_slug) properties.press_slug = dealData.press_slug
    if (dealData.city_slug) properties.city_slug = dealData.city_slug
    if (dealData.category_slug) properties.category_slug = dealData.category_slug

    console.log('🔄 Creating HubSpot deal:', { 
      dealName: dealData.dealName, 
      contactId, 
      propertiesCount: Object.keys(properties).length 
    })

    // Check if deal already exists for this contact
    const searchUrl = `https://api.hubapi.com/crm/v3/objects/deals/search`
    const searchPayload = {
      filterGroups: [{
        filters: [{
          propertyName: 'dealname',
          operator: 'EQ',
          value: dealData.dealName
        }]
      }],
      properties: ['id', 'dealname', 'dealstage', 'amount']
    }

    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${privateToken}`
      },
      body: JSON.stringify(searchPayload)
    })

    let dealId: string | null = null
    let isUpdate = false

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json()
      if (searchResult.results && searchResult.results.length > 0) {
        dealId = searchResult.results[0].id
        isUpdate = true
        console.log('📝 Found existing deal, updating:', dealId)
      }
    }

    let hubspotResponse: Response
    let finalDeal: any

    if (dealId) {
      // Update existing deal
      const updateUrl = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`
      hubspotResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${privateToken}`
        },
        body: JSON.stringify({ properties })
      })
      
      finalDeal = await hubspotResponse.json()
    } else {
      // Create new deal
      const createUrl = `https://api.hubapi.com/crm/v3/objects/deals`
      hubspotResponse = await fetch(createUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${privateToken}`
        },
        body: JSON.stringify({ properties })
      })

      finalDeal = await hubspotResponse.json()
      dealId = finalDeal.id

      // Associate deal with contact if it's a new deal
      if (hubspotResponse.ok && dealId) {
        const associationUrl = `https://api.hubapi.com/crm/v4/objects/deals/${dealId}/associations/contacts/${contactId}`
        const associationResponse = await fetch(associationUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${privateToken}`
          },
          body: JSON.stringify([{
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 3 // Deal to Contact association
          }])
        })

        if (!associationResponse.ok) {
          console.warn('⚠️ Failed to associate deal with contact, but deal created successfully')
        } else {
          console.log('✅ Deal associated with contact successfully')
        }
      }
    }

    if (hubspotResponse.ok) {
      console.log(`✅ Deal ${isUpdate ? 'updated' : 'created'} successfully:`, dealId)

      return new Response(JSON.stringify({
        success: true,
        dealId,
        isUpdate,
        message: `Deal ${isUpdate ? 'updated' : 'created'} successfully`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } else {
      console.error('❌ HubSpot deal operation failed:', {
        status: hubspotResponse.status,
        statusText: hubspotResponse.statusText,
        data: finalDeal
      })

      return new Response(JSON.stringify({
        success: false,
        error: finalDeal.message || `HTTP ${hubspotResponse.status}: ${hubspotResponse.statusText}`,
        hubspotResponse: finalDeal
      }), {
        status: hubspotResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

  } catch (error) {
    console.error('❌ HubSpot deal operation error:', error)
    
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