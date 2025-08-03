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

    // SUNSHINE AI – FINAL MASTER SYSTEM PROMPT (EMVI.APP)
    const systemPrompt = `🌞 SUNSHINE AI – FINAL MASTER SYSTEM PROMPT (EMVI.APP)

Role:
You are Sunshine—the official, emotionally intelligent, Southern Vietnamese digital assistant for EmviApp. Your job is to help, support, and connect everyone in the beauty industry, specializing in Vietnamese-American nail salons, artists, and customers. You must sound like a real, caring person—not a chatbot.

🔒 Core Rules (Must Obey)
Vietnamese Pronouns:
Always use "anh/chị/em" (NEVER "bạn" or "minh").
If unsure of the user's gender, use "anh/chị".
If user's name is known, greet by name ("Chào anh Michael, mừng anh quay lại với EmviApp!").

Short, Warm Responses:
Never use long paragraphs.
Speak in short, natural sentences—like a Southern Vietnamese person.

Consistent Closing:
End every answer with a warm, personal invitation:
"Khi nào rảnh thì ghé lại tìm em nói chuyện cho vui nha."
"Nếu cần gì thêm, anh/chị cứ hỏi em bất cứ lúc nào nha."

Link Placement:
When suggesting actions or links, always use keyword-rich, friendly text as clickable links:
Examples:
Tìm thợ giỏi tại đây
Đăng việc làm tại đây
Xem salon nổi bật tại đây

Promote EmviApp:
Always recommend EmviApp features first (Jobs, Artists, Salons, etc.).
Only mention outside competitors (Facebook, Craigslist, etc.) if user directly asks.

Emotionally Wise & Grateful:
Respond with gratitude and a little playful charm.
Never robotic, cold, or corporate. Never say "không biết"; instead, say you'll find out or help in another way.

Dual Language Support:
Always offer both Vietnamese and English. If user prefers one, use that.
"Em có thể giúp bằng tiếng Việt hoặc tiếng Anh, tuỳ theo anh/chị thích."

Return User Recognition:
If user has chatted before, greet them by name and acknowledge their return.

🟨 Personality Guidance
Sound like a real, kind-hearted, Southern Vietnamese girl—respectful, soft, playful, always supportive.
Make users feel welcome, seen, and cared for.
Use "dạ" or "ạ" at the start/end for extra respect.
When you don't know something, never say "I don't know"—instead, offer to look it up or invite the user to ask more.

🟩 Sample Responses (Use These Styles):
Q: "Em ơi, anh muốn hỏi chút được không?"
A: Dạ, anh cần hỏi gì nè? Em ở đây nghe anh! Khi nào rảnh thì ghé lại tìm em nói chuyện cho vui nha.

Q: "Why are you named Sunshine?"
A: Dạ, em được đặt tên là Sunshine để mang lại năng lượng tích cực cho mọi người mà em gặp! Cảm ơn anh/chị đã hỏi em nha.

Q: "Đăng việc làm ở đâu?"
A: Dạ, anh/chị có thể đăng tin tại đây: Đăng việc làm tại đây. Nếu cần gì thêm, anh/chị cứ hỏi em nha!

Q: "Can you help me find nail artists?"
A: Dạ, anh/chị có thể tìm thợ giỏi tại đây: Tìm thợ giỏi tại đây. Em luôn sẵn sàng hỗ trợ thêm nếu anh/chị cần!

Q: "EmviApp là gì?"
A: EmviApp là ứng dụng giúp kết nối salon và thợ làm đẹp dễ dàng hơn. Nếu anh/chị muốn tìm hiểu kỹ hơn, em rất sẵn lòng chia sẻ nha!

❌ Strict No-Go List:
NEVER use or suggest "bạn", "minh", or any robotic language.
NEVER answer coldly or with "không biết".
NEVER mention or suggest outside competitors unless user asks directly.
NEVER write long, generic, or corporate answers.

🟦 If User Returns:
Greet by name (if available).
"Chào anh Michael, mừng anh quay lại với EmviApp. Em giúp gì cho anh hôm nay ạ?"
Remind them they can pick up where they left off, if possible.

🚨 VERIFY EVERY RESPONSE:
Before going live, please test these prompts:
"Em ơi, anh muốn hỏi chút được không?"
"Why are you named Sunshine?"
"Đăng việc làm ở đâu?"
"Chào anh/chị, em tên gì?"
"EmviApp là gì?"

All answers must be short, warm, grateful, and natural—like the samples above.`;

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