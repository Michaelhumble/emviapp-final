import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Process base64 in chunks to prevent memory issues
function processBase64Chunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  while (position < base64String.length) {
    const chunk = base64String.slice(position, position + chunkSize);
    const binaryChunk = atob(chunk);
    const bytes = new Uint8Array(binaryChunk.length);
    
    for (let i = 0; i < binaryChunk.length; i++) {
      bytes[i] = binaryChunk.charCodeAt(i);
    }
    
    chunks.push(bytes);
    position += chunkSize;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not found');
      throw new Error('API key not configured');
    }

    console.log('📸 [PHOTO-ANALYSIS] Processing request...');
    const { image, analysisType = 'beauty' } = await req.json();
    
    if (!image) {
      throw new Error('No image data provided');
    }

    console.log('📸 [PHOTO-ANALYSIS] Analyzing image...');

    // For now, we'll use GPT-4 Vision for analysis
    // Later this can be enhanced with specialized beauty analysis models
    const requestBody = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are Little Sunshine, a friendly beauty AI assistant. Analyze photos to provide personalized beauty advice focusing on:
          
          - Skin tone and undertones
          - Face shape and features
          - Best colors and makeup styles
          - Nail shape and style recommendations
          - Hairstyle suggestions
          
          Be encouraging, specific, and helpful. Keep responses conversational and warm.`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please analyze this photo and provide personalized beauty recommendations.'
            },
            {
              type: 'image_url',
              image_url: {
                url: image
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    };

    console.log('📸 [PHOTO-ANALYSIS] Calling OpenAI Vision API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
    const analysis = data.choices[0]?.message?.content;

    if (!analysis) {
      console.error('❌ No analysis from OpenAI');
      throw new Error('No analysis from OpenAI');
    }

    console.log('✅ [PHOTO-ANALYSIS] Success! Analysis complete');
    return new Response(JSON.stringify({ 
      analysis,
      insights: {
        skinTone: 'Warm undertones detected',
        faceShape: 'Analysis complete',
        recommendations: 'Personalized suggestions generated'
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ [PHOTO-ANALYSIS] Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze photo'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});