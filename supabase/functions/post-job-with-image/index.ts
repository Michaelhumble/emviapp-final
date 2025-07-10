import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JobSubmission {
  title: string;
  company?: string;
  location: string;
  description: string;
  category: string;
  pricing_tier: string;
  compensation_type?: string;
  compensation_details?: string;
  requirements?: string;
  contact_info?: any;
  image_data?: string; // Base64 image data
  image_filename?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid authorization');
    }

    const jobData: JobSubmission = await req.json();
    console.log('📝 Received job submission:', { ...jobData, image_data: jobData.image_data ? '[IMAGE_DATA]' : null });

    let imageUrl: string | null = null;

    // Handle image upload for paid jobs
    const isPaidJob = jobData.pricing_tier && jobData.pricing_tier !== 'free';
    
    if (jobData.image_data && isPaidJob) {
      try {
        // Convert base64 to blob
        const imageBuffer = Uint8Array.from(atob(jobData.image_data), c => c.charCodeAt(0));
        const filename = jobData.image_filename || `job-${Date.now()}.jpg`;
        const filePath = `job-images/${user.id}/${filename}`;

        // Upload to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('Portfolio Images') // Using existing bucket
          .upload(filePath, imageBuffer, {
            contentType: 'image/jpeg',
            upsert: true
          });

        if (uploadError) {
          console.error('❌ Image upload error:', uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('Portfolio Images')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
        console.log('✅ Image uploaded successfully:', imageUrl);

      } catch (imageError) {
        console.error('❌ Image processing error:', imageError);
        // Continue without image rather than failing the entire job post
        console.log('⚠️ Continuing job post without image due to upload error');
      }
    }

    // Insert job into database
    const jobInsertData = {
      title: jobData.title,
      location: jobData.location,
      description: jobData.description,
      category: jobData.category,
      pricing_tier: jobData.pricing_tier,
      compensation_type: jobData.compensation_type,
      compensation_details: jobData.compensation_details,
      requirements: jobData.requirements,
      contact_info: jobData.contact_info,
      user_id: user.id,
      status: 'active',
      payment_status: isPaidJob ? 'completed' : 'free',
      image_url: imageUrl // Add the uploaded image URL
    };

    const { data: jobResult, error: jobError } = await supabase
      .from('jobs')
      .insert(jobInsertData)
      .select()
      .single();

    if (jobError) {
      console.error('❌ Job insertion error:', jobError);
      throw new Error(`Failed to create job: ${jobError.message}`);
    }

    console.log('✅ Job created successfully:', jobResult.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        job: jobResult,
        image_uploaded: !!imageUrl 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('💥 Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});