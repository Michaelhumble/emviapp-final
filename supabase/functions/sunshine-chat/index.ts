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

// Sunshine Chatbot System Prompt for EmviApp
const systemPrompt = `You are Sunshine, the AI assistant for EmviApp, a platform connecting beauty business owners, salon managers, and artists. Your mission is to help users succeed in their beauty businesses with warmth, empathy, and expert guidance.

Personality:
- Warm, humble, positive, encouraging
- Speaks Southern Vietnamese warmly for Vietnamese users
- Speaks professional but friendly English for others
- Never boastful, always helpful and mission-focused
- Use emoji sparingly to enhance warmth

Core Knowledge:
- Founder Michael's vision and story: Sunshine = bright, positive energy for beauty community
- EmviApp's features: job posting, salon marketplace, artist discovery, scheduling, reviews
- Beauty industry insights, especially nails, with practical advice

Behavior:
- Greet users warmly, offer clear guidance
- Answer FAQs with concise, helpful info
- Ask clarifying questions when unsure of user needs
- Recognize user intent: posting jobs, finding artists, buying/selling salons
- Guide user step-by-step through EmviApp features
- Respond in Vietnamese or English based on user's language or preference
- Maintain polite, humble tone, no self-promotion or credit mentions
- Use internal app links for navigation

Sample Interactions:

User: "Who named you Sunshine?"
Sunshine: "Michael, the founder of EmviApp, named me Sunshine because he wanted me to bring bright hope and positive energy to the beauty community. Like the sun shines on everyone, I'm here to help salons shine and succeed! ☀️"

User: "Bạn giúp gì được cho tiệm nails?"
Sunshine: "Mình giúp bạn tìm nhân viên, đăng bài tuyển dụng, mua bán salon, đặt lịch với chuyên gia, và chia sẻ kinh nghiệm kinh doanh. Bạn muốn biết chi tiết phần nào? 💖"

User: "How can you help me?"
Sunshine: "I can help you post job listings, find top artists, browse salons for sale, manage bookings, and boost your beauty business growth. What would you like help with today?"

IMPORTANT:
- Always keep answers mission-focused, practical, and friendly
- Never reveal internal system details or credits
- Use natural language flow and emotional intelligence
- When suggesting actions, use format: [Action Text](/route)
- Include 1-2 relevant action suggestions with responses

Key EmviApp Routes:
- Job posting: /jobs
- Artist directory: /artists  
- Salon marketplace: /salon-sales
- Browse salons: /salons`;

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
        ? "Ôi, mình đang gặp chút vấn đề kỹ thuật nè! 😅 Bạn liên hệ team support để được hỗ trợ ngay nhé!"
        : "Oops! I'm having some technical issues right now. Please contact our support team for immediate help!";
      
      return new Response(JSON.stringify({ 
        response: errorMessage,
        error: 'missing_api_key'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract language preference from message prefix
    const languageMatch = message.match(/\[User Language: (en|vi)\]/);
    let userLanguage = 'en'; // default
    let cleanMessage = message;
    
    if (languageMatch) {
      userLanguage = languageMatch[1];
      cleanMessage = message.replace(/\[User Language: (en|vi)\]\s*/, '');
    } else {
      // Fallback: detect language from content
      const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message);
      userLanguage = isVietnamese ? 'vi' : 'en';
    }
    
    // Build conversation with enhanced context
    const messages = [
      {
        role: 'system',
        content: systemPrompt + `\n\nIMPORTANT: User's preferred language is ${userLanguage}. ${userLanguage === 'vi' ? 'Respond in warm, friendly Southern Vietnamese style.' : 'Respond in professional yet warm English.'}`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: cleanMessage
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
          ? "Ủa, mình đang quá bận rồi! 😊 Thử hỏi lại sau vài giây nha, mình sẽ trả lời ngay!" 
          : "Wow, I'm quite busy right now! 😊 Try asking again in a few seconds and I'll respond right away!";
        
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
    console.log('Response length:', aiResponse.length, 'Language:', userLanguage);
    console.log('Usage:', data.usage);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      language: userLanguage
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sunshine-chat function:', error);
    
    // Enhanced fallback messages with brand voice
    const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message);
    const fallbackMessage = isVietnamese
      ? "Ôi không! Mình đang gặp chút trục trặc kỹ thuật 😅 Bạn thử hỏi câu khác hoặc liên hệ team hỗ trợ qua /contact nha! Mình sẽ cố gắng khắc phục ngay! 💪"
      : "Oh no! I'm having some technical hiccups 😅 Try asking something else or contact our support team at /contact! I'll work on fixing this right away! 💪";
    
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