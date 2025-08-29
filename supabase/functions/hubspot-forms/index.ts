import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FormSubmissionData {
  formType: 'contact_general' | 'press_inquiry' | 'partner_affiliate';
  name: string;
  email: string;
  phone?: string;
  role?: string;
  city?: string;
  website?: string;
  message: string;
  // UTM fields
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  // Additional context
  userId?: string;
  referrer?: string;
  landingPage?: string;
}

const FORM_IDS = {
  contact_general: 'f5a8b2c4-d6e8-4a9b-8c7d-1234567890ab',
  press_inquiry: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  partner_affiliate: '9876543210-abcd-ef12-3456-789012345678'
} as const;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body: FormSubmissionData = await req.json()
    const {
      formType,
      name,
      email,
      phone,
      role,
      city,
      website,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      userId,
      referrer,
      landingPage
    } = body

    // Get HubSpot credentials from environment
    const portalId = Deno.env.get('VITE_HUBSPOT_PORTAL_ID') || Deno.env.get('HUBSPOT_PORTAL_ID')
    const privateToken = Deno.env.get('HS_PRIVATE_APP_TOKEN')

    if (!portalId) {
      console.warn('⚠️ HubSpot Portal ID not configured')
      return new Response(JSON.stringify({ 
        error: 'HubSpot integration not configured - missing Portal ID',
        success: false 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get form ID for the specific form type
    const formId = FORM_IDS[formType]
    if (!formId) {
      return new Response(JSON.stringify({ 
        error: `Invalid form type: ${formType}`,
        success: false 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Split name into first/last if provided as single field
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Prepare HubSpot form submission
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`
    
    const fields = [
      { name: 'firstname', value: firstName },
      { name: 'lastname', value: lastName },
      { name: 'email', value: email },
      { name: 'message', value: message },
    ]

    // Add optional fields if they have values
    if (phone) fields.push({ name: 'phone', value: phone })
    if (role) fields.push({ name: 'user_role', value: role })
    if (city) fields.push({ name: 'city', value: city })
    if (website) fields.push({ name: 'website', value: website })
    if (userId) fields.push({ name: 'custom_user_id', value: userId })

    // Add UTM and attribution fields
    if (utm_source) fields.push({ name: 'utm_source', value: utm_source })
    if (utm_medium) fields.push({ name: 'utm_medium', value: utm_medium })
    if (utm_campaign) fields.push({ name: 'utm_campaign', value: utm_campaign })
    if (utm_term) fields.push({ name: 'utm_term', value: utm_term })
    if (utm_content) fields.push({ name: 'utm_content', value: utm_content })
    if (referrer) fields.push({ name: 'initial_referrer', value: referrer })
    if (landingPage) fields.push({ name: 'landing_page', value: landingPage })

    const hubspotPayload = {
      fields,
      context: {
        pageUri: req.headers.get('referer') || 'https://www.emvi.app',
        pageName: `${formType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Form - EmviApp`,
        hutk: req.headers.get('cookie')?.match(/hubspotutk=([^;]*)/)?.[1] || undefined,
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

    console.log('🔄 Submitting form to HubSpot:', {
      formType,
      portalId,
      formId,
      fieldsCount: fields.length,
      email: email
    })

    // Submit to HubSpot Forms API
    const hubspotResponse = await fetch(hubspotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(privateToken && { 'Authorization': `Bearer ${privateToken}` })
      },
      body: JSON.stringify(hubspotPayload)
    })

    const hubspotData = await hubspotResponse.json()

    if (hubspotResponse.ok) {
      console.log('✅ HubSpot form submitted successfully:', {
        formType,
        email,
        portalId,
        formId
      })

      return new Response(JSON.stringify({
        success: true,
        formType,
        hubspotResponse: hubspotData,
        message: 'Form submitted to HubSpot successfully'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } else {
      console.error('❌ HubSpot submission failed:', {
        formType,
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
    console.error('❌ HubSpot forms submission error:', error)
    
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