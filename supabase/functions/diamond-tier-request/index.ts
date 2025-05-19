
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header for user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: { headers: { Authorization: authHeader } }
      }
    );
    
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Authenticate user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse the request
    const { postType, additionalInfo } = await req.json();
    
    if (!postType) {
      return new Response(JSON.stringify({ error: 'Missing post type parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get the waitlist table or create it if it doesn't exist
    const { error: tableError } = await supabaseAdmin.rpc('create_diamond_tier_waitlist_if_not_exists');
    
    if (tableError) {
      console.error('Error checking/creating waitlist table:', tableError);
      // Continue anyway as the table might already exist
    }
    
    // Add to waitlist
    const { data: waitlistData, error: waitlistError } = await supabaseAdmin
      .from('diamond_tier_waitlist')
      .insert({
        user_id: user.id,
        post_type: postType,
        requested_at: new Date().toISOString(),
        additional_info: additionalInfo || {}
      })
      .select()
      .single();
    
    if (waitlistError) {
      console.error('Error adding to waitlist:', waitlistError);
      return new Response(JSON.stringify({ error: 'Failed to add to waitlist' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Notify admin (could add email notification here)
    
    return new Response(JSON.stringify({ 
      success: true,
      message: "Successfully added to Diamond tier waitlist",
      waitlist_id: waitlistData.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error processing Diamond tier request:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
