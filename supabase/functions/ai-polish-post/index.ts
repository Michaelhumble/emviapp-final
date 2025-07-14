import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, style, language, postType } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const stylePrompts = {
      casual: "Make this sound casual, friendly, and conversational",
      professional: "Make this sound professional and polished",
      inspiring: "Make this sound inspiring and motivational",
      fun: "Make this sound fun, playful, and engaging",
      elegant: "Make this sound elegant and sophisticated"
    };

    const languageInstructions = {
      english: "Respond in English",
      vietnamese: "Respond in Vietnamese"
    };

    const postTypeContext = {
      story: "This is a personal story or experience in the beauty industry",
      tip: "This is a professional tip or advice for beauty professionals",
      showcase: "This is showcasing beauty work or portfolio piece",
      question: "This is a question seeking advice or opinions from the community"
    };

    const systemPrompt = `You are an AI assistant helping beauty professionals and enthusiasts create engaging social media posts. ${stylePrompts[style || 'casual']}. ${languageInstructions[language || 'english']}. ${postTypeContext[postType || 'story']}.

Keep the core message and meaning intact, but improve the writing, add relevant emojis, and make it more engaging for a beauty community. Return only the improved post content, nothing else.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: content }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate polished content');
    }

    const polishedContent = data.choices[0].message.content;

    return new Response(JSON.stringify({ polishedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-polish-post function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});