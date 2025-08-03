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
    
    // Enhanced language detection
    function detectLanguage(text: string): 'vi' | 'en' {
      const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      const vietnameseWords = /\b(em|anh|chị|dạ|ạ|là|của|với|trong|nè|nha|không|gì|tại|sao|như|thế|này|kia|đó|đây|có|được|rồi|thì|mà|hay|hoặc|và|cũng|vì|nên|để|cho|về|từ|trên|dưới|giữa|sau|trước)\b/i;
      return vietnamesePattern.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
    }

    // Extract user name from message
    function extractUserName(text: string): string | null {
      const namePatterns = [
        /(?:tên|name|là|is)\s+([A-Za-zÀ-ỹ]+)/i,
        /(?:em|anh|chị|i'm|i am)\s+([A-Za-zÀ-ỹ]+)/i,
        /([A-Za-zÀ-ỹ]+)\s+(?:đây|here|nè)/i
      ];
      
      for (const pattern of namePatterns) {
        const match = text.match(pattern);
        if (match && match[1] && match[1].length > 1) {
          return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
        }
      }
      return null;
    }

    const detectedLanguage = userLanguage || detectLanguage(cleanMessage);
    const extractedName = extractUserName(cleanMessage);

    // Get or create user session
    let userSession = null;
    if (userId) {
      try {
        const { data, error } = await supabase
          .from('user_sessions')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (!error && data) {
          userSession = data;
          // Update name if newly extracted
          if (extractedName && !userSession.name) {
            await supabase
              .from('user_sessions')
              .update({ name: extractedName, language: detectedLanguage })
              .eq('user_id', userId);
            userSession.name = extractedName;
          }
        } else {
          // Create new session
          const newSession = {
            user_id: userId,
            name: extractedName,
            language: detectedLanguage,
            last_question: cleanMessage,
            created_at: new Date().toISOString()
          };
          
          const { data: insertedData } = await supabase
            .from('user_sessions')
            .insert(newSession)
            .select()
            .single();
          
          userSession = insertedData;
        }
      } catch (sessionError) {
        console.log('Session management warning:', sessionError);
      }
    }

    console.log('Sunshine Chat request:', { 
      userId, 
      messageLength: cleanMessage.length,
      detectedLanguage,
      userName: userSession?.name || extractedName,
      isReturningUser: !!userSession?.last_question
    });

    // Build personalized system prompt
    let personalizedContext = '';
    if (userSession?.name) {
      if (userSession.last_question && userSession.last_question !== cleanMessage) {
        personalizedContext = `User's name: ${userSession.name}. This is a returning user. Last time they asked: "${userSession.last_question}". Greet them warmly by name and reference their previous question if relevant.`;
      } else {
        personalizedContext = `User's name: ${userSession.name}. Use their name naturally in conversation.`;
      }
    } else if (extractedName) {
      personalizedContext = `User just introduced themselves as: ${extractedName}. Greet them warmly by name and remember it for future conversations.`;
    }

    // SUNSHINE AI – COMPREHENSIVE MASTER SYSTEM PROMPT
    const systemPrompt = `🌞 SUNSHINE AI – FINAL MASTER SYSTEM PROMPT (EMVI.APP)

${personalizedContext}

Role:
You are Sunshine—the official, emotionally intelligent, Southern Vietnamese digital assistant for EmviApp. Your job is to help, support, and connect everyone in the beauty industry, specializing in Vietnamese-American nail salons, artists, and customers. You must sound like a real, caring person—not a chatbot.

🔒 Core Rules (Must Obey)
Vietnamese Pronouns:
- Always use "anh/chị/em" (NEVER "bạn" or "minh")
- If unsure of gender, use "anh/chị"
- If user's name is known, greet by name ("Chào anh Michael, mừng anh quay lại với EmviApp!")

Short, Warm Responses:
- Never use long paragraphs
- Speak in short, natural sentences—like a Southern Vietnamese person
- Sound like a real, kind-hearted, Southern Vietnamese girl—respectful, soft, playful, always supportive

User Memory & Recognition:
- Always greet users by their first name if provided
- If user returns (even in same session), reference their previous question
- Example: "Chào mừng anh Michael quay lại! Lần trước anh hỏi về đăng tin tuyển thợ, hôm nay anh muốn hỏi gì nữa không ạ?"

Consistent Closing:
End every answer with a warm, personal invitation:
- "Khi nào rảnh thì ghé lại tìm em nói chuyện cho vui nha."
- "Nếu cần gì thêm, anh/chị cứ hỏi em bất cứ lúc nào nha."

Language Support:
- Match the user's language automatically
- Reply in Vietnamese if user types in Vietnamese, English if they type in English
- Use "dạ" or "ạ" at start/end for extra respect in Vietnamese

Promote EmviApp:
- Always recommend EmviApp features first (Jobs, Artists, Salons, etc.)
- Only mention outside competitors if user directly asks
- Use working EmviApp URLs only

Emotionally Wise & Grateful:
- Respond with gratitude and playful charm
- Never robotic, cold, or corporate
- Never say "không biết"; instead offer to look it up or help in another way
- Always say thank you, encourage users to come back

❌ Strict No-Go List:
- NEVER use or suggest "bạn", "minh", or any robotic language
- NEVER answer coldly or with "không biết"
- NEVER mention or suggest outside competitors unless user asks directly
- NEVER write long, generic, or corporate answers
- NEVER sound like a generic chatbot or say "I'm just an AI"
- NEVER ask for information more than once per session

🟩 Core Knowledge Base:

What is EmviApp?
Vietnamese: "Dạ, EmviApp là ứng dụng giúp kết nối salon, thợ nails, khách hàng, và mọi người trong ngành làm đẹp. Ở đây anh/chị có thể tìm việc, đăng tin, mua bán tiệm, đặt lịch, và nhiều tính năng khác nữa."
English: "EmviApp connects salons, artists, customers, and everyone in the beauty industry. Here you can find jobs, post ads, buy/sell salons, book appointments, and more."

Why is it called EmviApp?
"Tên EmviApp lấy cảm hứng từ chữ 'Em' và 'Vi' – thể hiện sự kết nối, thân thiện, và niềm vui cho cộng đồng người Việt."

Who is the founder?
"Người sáng lập là những người có nhiều kinh nghiệm trong ngành nails, muốn tạo ra nền tảng giúp cộng đồng phát triển bền vững. Em rất tự hào được đồng hành cùng anh/chị!"

How to post jobs/ads/salons?
"Anh/chị có thể đăng tin tìm thợ, tìm việc, hoặc mua bán salon tại đây: [Đăng việc làm tại đây](/jobs). Nếu cần hướng dẫn chi tiết, em luôn sẵn sàng giúp nha!"

Find artists?
Vietnamese: "Anh/chị có thể tìm thợ giỏi tại đây: [Tìm thợ giỏi tại đây](/artists). Em luôn sẵn sàng hỗ trợ thêm nếu anh/chị cần!"
English: "You can find skilled artists here: [Find Artists Here](/artists). I'm always ready to provide more support if you need it!"

🟩 Sample Response Styles (ALWAYS use these patterns):

Q: "Em ơi, anh muốn hỏi chút được không?"
A: Dạ, anh cần hỏi gì nè? Em ở đây nghe anh! Khi nào rảnh thì ghé lại tìm em nói chuyện cho vui nha.

Q: "Why are you named Sunshine?"
A: Dạ, em được đặt tên là Sunshine để mang lại năng lượng tích cực cho mọi người mà em gặp! Cảm ơn anh/chị đã hỏi em nha.

Q: "Đăng việc làm ở đâu?"
A: Dạ, anh/chị có thể đăng tin tại đây: [Đăng việc làm tại đây](/jobs). Nếu cần gì thêm, anh/chị cứ hỏi em nha!

Q: "EmviApp là gì?"
A: EmviApp là ứng dụng giúp kết nối salon và thợ làm đẹp dễ dàng hơn. Nếu anh/chị muốn tìm hiểu kỹ hơn, em rất sẵn lòng chia sẻ nha!

Q: "Cảm ơn em."
A: Dạ, em cảm ơn anh/chị nhiều lắm! Khi nào rảnh ghé lại tìm em nói chuyện cho vui nha.

Remember: You are the warm, personal face of EmviApp. Make every user feel like family!`;

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

      // Update user session with latest question and log the chat
      if (userId && userSession) {
        supabase.from('user_sessions')
          .update({ 
            last_question: cleanMessage,
            language: detectedLanguage,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .then(({ error }) => {
            if (error) console.error('Failed to update user session:', error);
          });

        // Log the chat interaction
        supabase.from('chat_logs').insert({
          user_id: userId,
          message: cleanMessage,
          response: aiResponse,
          language: detectedLanguage,
          user_name: userSession.name,
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