import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobId } = await req.json();
    
    if (!jobId) {
      return new Response(JSON.stringify({ error: 'Job ID required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: 'Missing configuration' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Initialize Supabase with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🧪 Testing job activation for ID:', jobId);

    // Check current status
    const { data: beforeData } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    console.log('📋 Job before update:', beforeData);

    // Update the job
    const { data, error } = await supabase
      .from('jobs')
      .update({ 
        status: 'active',
        payment_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .eq('status', 'draft')
      .select();

    if (error) {
      console.error('❌ Update failed:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message,
        beforeData 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Update successful:', data);

    return new Response(JSON.stringify({ 
      success: true, 
      beforeData,
      afterData: data[0],
      message: 'Job activated successfully'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('💥 Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});