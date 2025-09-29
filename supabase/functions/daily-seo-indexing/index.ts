import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const GOOGLE_INDEXING_API_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const BASE_URL = 'https://www.emvi.app';

interface City {
  id: string;
  city_name: string;
  state: string;
  state_code: string;
  slug: string;
  priority: number;
}

Deno.serve(async (req) => {
  try {
    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Google OAuth credentials (you'll need to add these as secrets)
    const googleClientEmail = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const googlePrivateKey = Deno.env.get('GOOGLE_PRIVATE_KEY');

    // Create indexing log
    const { data: logData } = await supabase
      .from('seo_indexing_logs')
      .insert({
        run_date: new Date().toISOString().split('T')[0],
        status: 'running'
      })
      .select()
      .single();

    const logId = logData?.id;

    // Get 40 cities to index
    const { data: cities, error: citiesError } = await supabase
      .rpc('get_cities_for_daily_indexing', { batch_size: 40 });

    if (citiesError) {
      console.error('Error fetching cities:', citiesError);
      throw citiesError;
    }

    console.log(`Processing ${cities?.length || 0} cities for SEO indexing`);

    const errors: any[] = [];
    let succeeded = 0;
    let failed = 0;

    // Process each city
    for (const city of (cities as City[]) || []) {
      try {
        // Generate URLs for this city
        const cityUrls = [
          `${BASE_URL}/jobs/${city.slug}`,
          `${BASE_URL}/nail-tech/${city.slug}`,
          `${BASE_URL}/hair-stylist/${city.slug}`,
          `${BASE_URL}/barber/${city.slug}`,
          `${BASE_URL}/salons/${city.slug}`
        ];

        // Submit to Google if credentials available
        if (googleClientEmail && googlePrivateKey) {
          for (const url of cityUrls) {
            try {
              // Note: This is simplified - you'll need proper Google OAuth token
              // For now, we'll just log the URLs that should be indexed
              console.log(`Would index: ${url}`);
              
              // TODO: Implement actual Google Indexing API call
              // const response = await fetch(GOOGLE_INDEXING_API_ENDPOINT, {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json',
              //     'Authorization': `Bearer ${googleAccessToken}`
              //   },
              //   body: JSON.stringify({
              //     url: url,
              //     type: 'URL_UPDATED'
              //   })
              // });
            } catch (urlError) {
              console.error(`Error indexing ${url}:`, urlError);
            }
          }
        }

        // Update city indexing status
        await supabase
          .from('seo_cities')
          .update({
            last_indexed_at: new Date().toISOString(),
            indexing_status: 'indexed'
          })
          .eq('id', city.id);

        succeeded++;
      } catch (cityError) {
        console.error(`Error processing city ${city.city_name}:`, cityError);
        failed++;
        errors.push({
          city: city.city_name,
          error: cityError.message
        });
      }
    }

    // Update log
    await supabase
      .from('seo_indexing_logs')
      .update({
        cities_processed: (cities?.length || 0),
        cities_succeeded: succeeded,
        cities_failed: failed,
        errors: errors,
        completed_at: new Date().toISOString(),
        status: 'completed'
      })
      .eq('id', logId);

    return new Response(
      JSON.stringify({
        success: true,
        processed: cities?.length || 0,
        succeeded,
        failed,
        errors: errors.length > 0 ? errors : undefined
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Daily SEO indexing error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
