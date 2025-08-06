import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not found');
      throw new Error('API key not configured');
    }

    console.log('🎨 [AI-IMAGE-GEN] Processing request...');
    const { prompt, style = 'realistic' } = await req.json();
    
    if (!prompt || prompt.trim() === '') {
      throw new Error('No prompt provided');
    }

    console.log('🎨 [AI-IMAGE-GEN] Prompt:', prompt, 'Style:', style);

    // Enhance prompt based on style
    const stylePrompts = {
      realistic: 'photorealistic, high quality, professional photography, ',
      artistic: 'artistic, stylized, creative interpretation, ',
      minimalist: 'clean, simple, minimalist aesthetic, ',
      glamorous: 'glamorous, bold, dramatic, high fashion, '
    };

    const enhancedPrompt = `${stylePrompts[style] || ''}${prompt}, beauty, high quality, detailed`;

    const requestBody = {
      model: 'gpt-image-1',
      prompt: enhancedPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'high',
      response_format: 'b64_json'
    };

    console.log('🎨 [AI-IMAGE-GEN] Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + openAIApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error('❌ OpenAI API error:', response.status, response.statusText);
      throw new Error('OpenAI API error: ' + response.status);
    }

    const data = await response.json();
    const imageData = data.data[0]?.b64_json;

    if (!imageData) {
      console.error('❌ No image data from OpenAI');
      throw new Error('No image data from OpenAI');
    }

    console.log('✅ [AI-IMAGE-GEN] Success! Generated image');
    return new Response(JSON.stringify({ 
      image: `data:image/png;base64,${imageData}`,
      prompt: enhancedPrompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ [AI-IMAGE-GEN] Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate image'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});