import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

console.log('=== SUNSHINE CHAT DEBUG ===');
console.log('OpenAI API Key configured:', openAIApiKey ? 'YES' : 'NO');
console.log('Key length:', openAIApiKey ? openAIApiKey.length : 0);
console.log('Key starts with sk-:', openAIApiKey ? openAIApiKey.startsWith('sk-') : false);

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
    
    // Check if API key is missing
    if (!openAIApiKey || !openAIApiKey.startsWith('sk-')) {
      console.error('❌ OpenAI API key is missing or invalid');
      // Detect language for error message
      const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message);
      const errorMessage = isVietnamese 
        ? "Xin lỗi, tôi chưa được cấu hình đúng. Vui lòng liên hệ quản trị viên."
        : "I'm sorry, I haven't been configured properly. Please contact the administrator.";
      
      return new Response(JSON.stringify({ 
        response: errorMessage,
        error: 'missing_api_key'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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

    console.log('🚀 Making OpenAI API request...');
    console.log('Model: gpt-4o-mini, Messages count:', messages.length);
    
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

    console.log('📡 OpenAI Response Status:', response.status);
    console.log('📡 OpenAI Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`❌ OpenAI API error: ${response.status}`, errorData);
      
      // Handle rate limiting with exponential backoff
      if (response.status === 429) {
        const fallbackMessage = isVietnamese 
          ? "Tôi đang quá bận ngay bây giờ. Vui lòng thử lại sau vài giây!" 
          : "I'm experiencing high demand right now. Please try again in a few seconds!";
        
        return new Response(JSON.stringify({ 
          response: fallbackMessage,
          language: isVietnamese ? 'vi' : 'en',
          retry_after: 5
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('✅ OpenAI response generated successfully');
    console.log('Response length:', aiResponse.length, 'Language:', isVietnamese ? 'vi' : 'en');
    console.log('Usage:', data.usage);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      language: isVietnamese ? 'vi' : 'en'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sunshine-chat function:', error);
    
    // Better fallback messages
    const fallbackMessage = message.includes('Vietnamese') || /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message)
      ? "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Bạn có thể thử đặt câu hỏi khác hoặc liên hệ trực tiếp qua trang /contact được không?"
      : "I'm sorry, I'm having technical difficulties. Could you try asking something else or contact us directly at /contact?";
    
    return new Response(JSON.stringify({ 
      response: fallbackMessage,
      error: true,
      contact_link: '/contact'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});