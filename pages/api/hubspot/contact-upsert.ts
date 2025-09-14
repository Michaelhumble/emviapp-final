import type { NextApiRequest, NextApiResponse } from "next";

const HS = "https://api.hubapi.com";

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryFetch(url: string, options: RequestInit, maxRetries = 3) {
  const delays = [250, 750, 1500];
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok || response.status < 500) {
        return response;
      }
      
      // Retry on 5xx errors or 429
      if (response.status === 429 || response.status >= 500) {
        if (attempt < maxRetries - 1) {
          await sleep(delays[attempt]);
          continue;
        }
      }
      
      return response;
    } catch (error) {
      if (attempt < maxRetries - 1) {
        await sleep(delays[attempt]);
        continue;
      }
      throw error;
    }
  }
  
  throw new Error('Max retries exceeded');
}

async function upsertContact(body: any) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token || !body?.email) return { status: 204 };
  
  try {
    // Search for existing contact by email
    const contactSearch = await retryFetch(`${HS}/crm/v3/objects/contacts/search`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ 
        filterGroups: [{ 
          filters: [{ 
            propertyName: "email", 
            operator: "EQ", 
            value: body.email 
          }] 
        }], 
        properties: ["email"] 
      })
    });
    
    const searchResult = contactSearch.ok ? await contactSearch.json() : null;
    
    const props: any = {
      email: body.email,
    };
    
    if (body.role) props.role = body.role;
    if (body.provider) props.signup_provider = body.provider;
    if (body.user_id) props.user_id = body.user_id;
    if (body.utms?.utm_source) props.utm_source = body.utms.utm_source;
    if (body.utms?.utm_medium) props.utm_medium = body.utms.utm_medium;
    if (body.utms?.utm_campaign) props.utm_campaign = body.utms.utm_campaign;
    if (body.utms?.utm_term) props.utm_term = body.utms.utm_term;
    if (body.utms?.utm_content) props.utm_content = body.utms.utm_content;
    if (body.utms?.first_touch_url) props.first_touch_url = body.utms.first_touch_url;
    if (body.utms?.referrer) props.referrer = body.utms.referrer;
    
    // Add timestamps based on context
    if (body.context === 'signin') {
      props.last_login_at = new Date().toISOString();
    } else if (body.context === 'signup') {
      props.signup_completed_at = new Date().toISOString();
    }
    
    const existingId = searchResult?.results?.[0]?.id;
    
    if (existingId) {
      // Update existing contact
      await retryFetch(`${HS}/crm/v3/objects/contacts/${existingId}`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ properties: props })
      });
    } else {
      // Create new contact
      await retryFetch(`${HS}/crm/v3/objects/contacts`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ properties: props })
      });
    }
    
    // Handle company association for salon owners
    if (body.role === "salon_owner" && (body.company_name || body.company_domain)) {
      // This is a simplified company upsert - could be expanded later
      const companyProps: any = {};
      if (body.company_name) companyProps.name = body.company_name;
      if (body.company_domain) companyProps.domain = body.company_domain;
      
      if (Object.keys(companyProps).length > 0) {
        await retryFetch(`${HS}/crm/v3/objects/companies`, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({ properties: companyProps })
        });
      }
    }
    
    return { status: 204 };
  } catch (error) {
    console.error("HubSpot contact upsert error:", error);
    return { status: 204 }; // Never fail to UI
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  
  try {
    const result = await upsertContact(req.body);
    return res.status(result.status).end();
  } catch (error) {
    console.error("Contact upsert handler error:", error);
    return res.status(204).end(); // Never expose errors to client
  }
}