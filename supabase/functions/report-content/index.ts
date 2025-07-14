import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client with service role
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Authorization required');
    }

    // Get user from auth header
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    const { 
      contentType, 
      contentId, 
      reason, 
      details 
    } = await req.json();

    // Validate input
    if (!contentType || !contentId || !reason) {
      throw new Error('Missing required fields: contentType, contentId, reason');
    }

    const validContentTypes = ['post', 'ai_answer', 'comment'];
    const validReasons = ['spam', 'inappropriate', 'abuse', 'off_topic', 'fake', 'other'];

    if (!validContentTypes.includes(contentType)) {
      throw new Error('Invalid content type');
    }

    if (!validReasons.includes(reason)) {
      throw new Error('Invalid report reason');
    }

    console.log('Content report received:', {
      reporterId: user.id,
      contentType,
      contentId,
      reason,
      hasDetails: !!details
    });

    // Check if user has already reported this content
    const { data: existingReport, error: checkError } = await supabase
      .from('content_reports')
      .select('id')
      .eq('reporter_id', user.id)
      .eq('reported_content_type', contentType)
      .eq('reported_content_id', contentId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error checking existing report:', checkError);
      throw new Error('Failed to check existing reports');
    }

    if (existingReport) {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'You have already reported this content'
      }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert the report
    const { data: reportData, error: insertError } = await supabase
      .from('content_reports')
      .insert({
        reporter_id: user.id,
        reported_content_type: contentType,
        reported_content_id: contentId,
        report_reason: reason,
        report_details: details || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting report:', insertError);
      throw new Error('Failed to submit report');
    }

    // Auto-action for certain report types (multiple reports on same content)
    const { data: reportCount, error: countError } = await supabase
      .from('content_reports')
      .select('id', { count: 'exact' })
      .eq('reported_content_type', contentType)
      .eq('reported_content_id', contentId)
      .eq('status', 'pending');

    if (!countError && reportCount && reportCount.length >= 3) {
      // Auto-flag content with 3+ reports
      console.log(`Content ${contentId} auto-flagged due to multiple reports`);
      
      // If it's an AI answer, mark it for admin review
      if (contentType === 'ai_answer') {
        await supabase
          .from('ai_usage_logs')
          .update({ 
            flagged_reason: 'multiple_reports',
            admin_reviewed: false
          })
          .eq('id', contentId);
      }
    }

    console.log('Report submitted successfully:', {
      reportId: reportData.id,
      totalReports: reportCount?.length || 1
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Report submitted successfully',
      reportId: reportData.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Report content error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: error.message.includes('Authorization') ? 401 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});