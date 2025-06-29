
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobData } = await req.json();
    console.log('🆓 Creating free job post:', jobData);

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: { persistSession: false }
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    console.log('✅ User authenticated:', user.id);

    // Insert job into database with free pricing tier
    const jobRecord = {
      title: jobData.title || 'Job Title',
      description: jobData.description || '',
      category: jobData.category || 'Other',
      location: jobData.location || '',
      compensation_type: jobData.compensation_type || jobData.employment_type || '',
      compensation_details: jobData.compensation_details || '',
      requirements: Array.isArray(jobData.requirements) 
        ? jobData.requirements.join('\n') 
        : (jobData.requirements || ''),
      contact_info: jobData.contact_info || {},
      pricing_tier: 'free',
      status: 'active',
      user_id: user.id,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };

    console.log('📝 Inserting job record:', jobRecord);

    const { data: insertedJob, error: insertError } = await supabaseClient
      .from('jobs')
      .insert([jobRecord])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Database insert error:', insertError);
      throw new Error(`Failed to create job: ${insertError.message}`);
    }

    console.log('✅ Job created successfully:', insertedJob.id);

    // Log the successful free post
    await supabaseClient
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: insertedJob.id,
        plan_type: 'job',
        pricing_tier: 'free',
        payment_status: 'success',
        expires_at: jobRecord.expires_at
      });

    return new Response(JSON.stringify({ 
      success: true, 
      jobId: insertedJob.id,
      job: insertedJob
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("❌ Error creating free job post:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
