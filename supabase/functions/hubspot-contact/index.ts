import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const {
      firstname,
      lastname,
      email,
      phone,
      company,
      message,
      reason,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      initial_referrer,
      landing_page
    } = body

    // Get HubSpot credentials from environment
    const portalId = Deno.env.get('HUBSPOT_PORTAL_ID')
    const formId = Deno.env.get('HUBSPOT_FORM_ID')

    if (!portalId || !formId) {
      console.warn('⚠️ HubSpot credentials missing - HUBSPOT_PORTAL_ID or HUBSPOT_FORM_ID not set')
      return new Response(JSON.stringify({ 
        error: 'HubSpot integration not configured',
        success: false 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Prepare HubSpot form submission
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`
    
    const fields = [
      { name: 'firstname', value: firstname || '' },
      { name: 'lastname', value: lastname || '' },
      { name: 'email', value: email || '' },
      { name: 'message', value: message || '' },
    ]

    // Add optional fields if they have values
    if (phone) fields.push({ name: 'phone', value: phone })
    if (company) fields.push({ name: 'company', value: company })
    if (reason) fields.push({ name: 'contact_reason', value: reason })

    // Add UTM and attribution fields
    if (utm_source) fields.push({ name: 'utm_source', value: utm_source })
    if (utm_medium) fields.push({ name: 'utm_medium', value: utm_medium })
    if (utm_campaign) fields.push({ name: 'utm_campaign', value: utm_campaign })
    if (utm_term) fields.push({ name: 'utm_term', value: utm_term })
    if (utm_content) fields.push({ name: 'utm_content', value: utm_content })
    if (initial_referrer) fields.push({ name: 'initial_referrer', value: initial_referrer })
    if (landing_page) fields.push({ name: 'landing_page', value: landing_page })

    const hubspotPayload = {
      fields,
      context: {
        pageUri: req.headers.get('referer') || 'https://www.emvi.app/contact',
        pageName: 'Contact Form - EmviApp',
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow EmviApp to store and process my personal data.",
          communications: [
            {
              value: true,
              subscriptionTypeId: 999,
              text: "I agree to receive marketing communications from EmviApp."
            }
          ]
        }
      }
    }

    console.log('🔄 Submitting to HubSpot:', {
      portalId,
      formId,
      fieldsCount: fields.length,
      email: email
    })

    // Submit to HubSpot
    const hubspotResponse = await fetch(hubspotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotPayload)
    })

    const hubspotData = await hubspotResponse.json()

    if (hubspotResponse.ok) {
      console.log('✅ HubSpot form submitted successfully:', {
        email: email,
        portalId: portalId,
        formId: formId
      })

      return new Response(JSON.stringify({
        success: true,
        hubspotResponse: hubspotData,
        message: 'Form submitted to HubSpot successfully'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } else {
      console.error('❌ HubSpot submission failed:', {
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
    console.error('❌ HubSpot contact form error:', error)
    
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