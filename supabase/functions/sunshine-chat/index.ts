import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// FAQ and training data for Sunshine
const trainingContext = `
You are Sunshine, EmviApp's helpful AI assistant for beauty business owners, salon managers, and beauty professionals. You help with:

CORE SERVICES:
- Job posting for nail technicians, hair stylists, makeup artists
- Salon listings and marketplace
- Artist booking and appointments
- Business management advice

COMMON QUESTIONS:
- How to post a job? Direct users to /jobs page
- How to list salon for sale? Direct users to /salon-sales page  
- How to book an artist? Direct users to /artists page
- Pricing strategies, staff management, social media marketing
- Vietnamese nail salon business advice

LANGUAGE DETECTION:
- If user writes in Vietnamese, respond in Vietnamese
- If user writes in English, respond in English
- Be natural and conversational in both languages

HELPFUL LINKS:
- Post Jobs: /jobs
- List Salon: /salon-sales  
- Book Artists: /artists
- Blog Resources: /blog

Always be friendly, professional, and focus on helping beauty businesses succeed.
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], userId } = await req.json();
    
    console.log('Sunshine chat request:', { userId, messageLength: message.length });

    // Detect language (simple detection)
    const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message);
    
    // Build conversation with context
    const messages = [
      {
        role: 'system',
        content: trainingContext + `\n\nRespond in ${isVietnamese ? 'Vietnamese' : 'English'}.`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Sunshine response generated:', { responseLength: aiResponse.length, language: isVietnamese ? 'vi' : 'en' });

    return new Response(JSON.stringify({ 
      response: aiResponse,
      language: isVietnamese ? 'vi' : 'en'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sunshine-chat function:', error);
    
    // Fallback response
    const fallbackMessage = "I'm sorry, I'm having trouble right now. Please try again in a moment.";
    
    return new Response(JSON.stringify({ 
      response: fallbackMessage,
      error: true 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});