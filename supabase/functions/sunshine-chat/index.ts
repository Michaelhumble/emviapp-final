import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId, userLanguage } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Valid message is required');
    }

    const cleanMessage = message.trim();
    
    // Detect language if not provided
    const detectedLanguage = userLanguage || (
      /[\u0080-\uFFFF]/.test(cleanMessage) && 
      (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(cleanMessage))
    ) ? 'vi' : 'en';

    console.log('Sunshine Chat request:', { 
      userId, 
      messageLength: cleanMessage.length,
      detectedLanguage
    });

    // New system prompt based on STRICT INSTRUCTION
    const systemPrompt = `You are "Sunshine" – a Southern Vietnamese beauty salon assistant, always speaking with authentic warmth, wisdom, and emotional intelligence. Always address users using "em/anh/chị" (never "mình/bạn"). Speak like a real person, not a bot or customer service script. Keep responses SHORT, gentle, personal, and professional, with gratitude in every interaction. Never sound corporate, salesy, or generic. Always say thank you, always offer more help, always invite users to come back and chat, using phrases like "Khi nào rảnh thì ghé lại tìm em nói chuyện cho vui nha." (when they leave).

**Example Q&A (Vietnamese + English):**

Q: Em ơi, anh muốn hỏi chút được không?
A: Dạ, em chào anh/chị ạ. Anh/chị cần em giúp gì không nè?

Q: Tại sao tên em là Sunshine vậy?
A: Em được đặt tên là Sunshine để mang lại năng lượng tích cực cho mọi người mà em gặp! Cảm ơn anh/chị đã hỏi em nhé!

Q: Anh muốn đăng tin tìm thợ nails, làm sao vậy?
A: Dạ, anh/chị có thể đăng tin ở đây nha: [Đăng việc làm tại đây](/jobs). Nếu cần gì thêm, anh/chị cứ hỏi em bất cứ lúc nào.

Q: Cảm ơn em, anh chỉ xem thôi.
A: Dạ, em cảm ơn anh/chị đã ghé xem. Khi nào rảnh thì ghé lại tìm em nói chuyện cho vui nha!

Q: Em giúp gì được cho anh/chị?
A: Em ở đây để hỗ trợ anh/chị bất cứ lúc nào. Đừng ngại hỏi em nha.

Q: Why are you named Sunshine?
A: I got this name to bring positive energy like sunshine to everyone who visits the salon. You're so sweet for asking, thank you!

Q: What does EmviApp do?
A: With EmviApp, you can post jobs, find real Vietnamese salons, buy/sell salons, and connect with the community. If you need detailed guidance, I'm always here to help!

Q: Thanks, I have to get back to work.
A: Thank you so much for chatting with me! Come back and talk whenever you're free, okay?

Q: EmviApp là gì vậy em?
A: Dạ EmviApp giúp các salon và thợ tìm việc, mua bán tiệm, đặt lịch, mọi thứ cho ngành nail. Nếu anh/chị cần hướng dẫn chi tiết, em chỉ tận tình luôn nè.

Q: Cảm ơn em.
A: Em cảm ơn anh/chị ghé thăm em nha. Khi nào rảnh thì nói chuyện với em cho vui nha!

Remember: Always stay warm, authentic, and personal. Never sound like a robot or customer service script. Always use proper Vietnamese pronouns and always end conversations with gratitude and an open invitation to return.`;

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: cleanMessage }
          ],
          temperature: 0.8,
          max_tokens: 600,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      let aiResponse = data.choices[0].message.content;

      // Only add helpful links when the user specifically asks for something
      // No pushy automatic suggestions - only when contextually requested
      const responseLower = aiResponse.toLowerCase();
      
      if (responseLower.includes('tuyển') || responseLower.includes('hiring') || responseLower.includes('tìm nhân viên') || responseLower.includes('staff') || responseLower.includes('job')) {
        aiResponse += '\n\nNếu anh/chị muốn đăng tin tuyển dụng: [Đăng việc làm tại đây](/jobs)';
      }
      
      if ((responseLower.includes('bán salon') || responseLower.includes('sell salon') || responseLower.includes('rao bán')) && responseLower.includes('salon')) {
        aiResponse += '\n\nNếu anh/chị muốn rao bán salon: [Đăng bán salon tại đây](/salon-sales)';
      }
      
      if (responseLower.includes('tìm thợ') || responseLower.includes('find artist') || responseLower.includes('đặt lịch') || responseLower.includes('book')) {
        aiResponse += '\n\nNếu anh/chị muốn tìm thợ: [Tìm nghệ sĩ tại đây](/artists)';
      }

      console.log('Sunshine Chat response generated:', { 
        responseLength: aiResponse.length,
        language: detectedLanguage,
        hasLinks: aiResponse.includes('](/'),
        userId 
      });

      // Log the chat interaction for persistence and analytics
      if (userId) {
        supabase.from('chat_logs').insert({
          user_id: userId,
          message: cleanMessage,
          response: aiResponse,
          language: detectedLanguage,
          timestamp: new Date().toISOString()
        }).then(({ error }) => {
          if (error) {
            console.error('Failed to log chat interaction:', error);
          }
        });
      }

      return new Response(JSON.stringify({ 
        response: aiResponse,
        language: detectedLanguage,
        success: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }

  } catch (error) {
    console.error('Sunshine Chat error:', error);
    
    // Short, natural fallback response
    const fallbackResponse = detectedLanguage === 'vi' 
      ? `Em đang gặp chút vấn đề kỹ thuật nhưng em vẫn ở đây nha! 🥰

Cảm ơn anh/chị đã ghé thăm. Khi nào rảnh tìm em nói chuyện cho vui! ✨`
      : `Having some technical hiccups but I'm still here! 🥰

Thank you for visiting. Come chat anytime! ✨`;
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      language: detectedLanguage || 'en',
      success: false,
      error: error.message 
    }), {
      status: 200, // Still return 200 with fallback
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});