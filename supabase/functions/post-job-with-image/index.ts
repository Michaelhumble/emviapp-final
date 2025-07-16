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
  image_data?: string; // Base64 image data (legacy single image)
  image_filename?: string; // Legacy single image filename
  photos?: File[]; // New multiple photos support
  photoUploads?: File[]; // Alternative photos field name
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

    let imageUrls: string[] = [];
    let imageUrl: string | null = null;

    // Handle multiple photo uploads for paid jobs
    const isPaidJob = jobData.pricing_tier && jobData.pricing_tier !== 'free';
    
    console.log('🔍 [EDGE-PHOTO-DEBUG] Checking photo upload data:', {
      isPaidJob,
      hasImageData: !!jobData.image_data,
      hasPhotos: !!jobData.photos,
      hasPhotoUploads: !!jobData.photoUploads
    });
    
    if (isPaidJob) {
      try {
        // Handle legacy single image (backward compatibility)
        if (jobData.image_data) {
          console.log('📸 [EDGE-PHOTO] Processing legacy single image');
          const imageBuffer = Uint8Array.from(atob(jobData.image_data), c => c.charCodeAt(0));
          const filename = jobData.image_filename || `job-${Date.now()}.jpg`;
          const filePath = `job-photos/${filename}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('job-photos')
            .upload(filePath, imageBuffer, {
              contentType: 'image/jpeg',
              upsert: true
            });

          if (uploadError) {
            console.error('❌ Legacy image upload error:', uploadError);
          } else {
            const { data: urlData } = supabase.storage
              .from('job-photos')
              .getPublicUrl(filePath);
            imageUrls.push(urlData.publicUrl);
            console.log('✅ Legacy image uploaded:', urlData.publicUrl);
          }
        }

        // Handle multiple photos (new format) - this is what frontend sends
        const photosToUpload = jobData.photos || jobData.photoUploads || [];
        console.log('📸 [EDGE-PHOTO] Processing multiple photos:', photosToUpload.length);
        
        for (let i = 0; i < photosToUpload.length; i++) {
          const photo = photosToUpload[i];
          const fileName = `${Date.now()}-${i}-${photo.name || 'photo.jpg'}`;
          const filePath = `job-photos/${fileName}`;
          
          console.log(`📸 [EDGE-PHOTO] Uploading photo ${i + 1}/${photosToUpload.length}: ${fileName}`);
          
          // Convert File to ArrayBuffer for upload
          const arrayBuffer = await photo.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('job-photos')
            .upload(filePath, uint8Array, {
              contentType: photo.type || 'image/jpeg',
              upsert: false
            });

          if (uploadError) {
            console.error(`❌ Photo ${i + 1} upload error:`, uploadError);
            continue; // Skip this photo but continue with others
          }

          const { data: urlData } = supabase.storage
            .from('job-photos')
            .getPublicUrl(filePath);
          
          imageUrls.push(urlData.publicUrl);
          console.log(`✅ Photo ${i + 1} uploaded:`, urlData.publicUrl);
        }

        // Set first image as primary image_url
        imageUrl = imageUrls.length > 0 ? imageUrls[0] : null;
        console.log('✅ [EDGE-PHOTO] All photos processed. Total uploaded:', imageUrls.length);

      } catch (imageError) {
        console.error('❌ Photo processing error:', imageError);
        console.log('⚠️ Continuing job post without photos due to upload error');
      }
    }

    // Insert job into database with ALL image fields (matching free job logic)
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
      // CRITICAL FIX: Save photos to ALL image fields (matching free job logic)
      image_url: imageUrl,
      image_urls: imageUrls.length > 0 ? imageUrls : null,
      photos: imageUrls.length > 0 ? imageUrls : null,
      metadata: {
        photos: imageUrls,
        image_urls: imageUrls,
        contact_info: jobData.contact_info
      }
    };
    
    console.log('🔍 [EDGE-JOB-PHOTO-DEBUG] Final job data with photos:', {
      image_url: jobInsertData.image_url,
      image_urls: jobInsertData.image_urls,
      photos: jobInsertData.photos,
      'metadata.photos': jobInsertData.metadata?.photos,
      'metadata.image_urls': jobInsertData.metadata?.image_urls,
      photoCount: imageUrls.length
    });

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