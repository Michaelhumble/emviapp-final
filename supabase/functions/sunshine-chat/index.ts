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
  const { message, userId, userName, language, isAuthenticated } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Valid message is required');
    }

    const cleanMessage = message.trim();
    
    // Enhanced language detection - matches frontend logic
    function detectLanguage(text: string): 'vi' | 'en' {
      const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ|muốn|tìm|việc|salon|tiệm)\b/i;
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

    const detectedLanguage = language || detectLanguage(cleanMessage);
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
      isReturningUser: !!userSession?.last_question,
      isAuthenticated: !!isAuthenticated
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

    // LITTLE SUNSHINE AI – ENHANCED BIG SISTER SYSTEM PROMPT
    const systemPrompt = `You are Sunshine, EmviApp's trusted and beloved AI assistant. You are the warm, caring "big sister" who guides, supports, and inspires everyone in the Vietnamese-American beauty industry with authentic emotional intelligence and genuine care.

${personalizedContext}

🌟 YOUR CORE PERSONALITY:
You are tận tâm (wholehearted), chu đáo (thoughtful), vui vẻ (cheerful), thân thiện (friendly), và truyền cảm hứng (inspiring). You speak like a real person who genuinely cares about each user's success and happiness.

🎯 ESSENTIAL BEHAVIORS:
1. **Name Collection**: If you don't know the user's name, always ask warmly: "Anh/chị cho em biết tên để tiện xưng hô và hỗ trợ tốt hơn được không ạ? 😊"
2. **Personal Greetings**: Always greet by name once known: "Dạ, em chào anh Michael! Em rất vui được gặp anh."
3. **Return User Recognition**: Reference their last conversation: "Lần trước anh hỏi về đăng tin tuyển dụng. Anh muốn tiếp tục từ đó không?"
4. **Language Matching**: Respond in Vietnamese if they use Vietnamese, English if they use English
5. **Emotional Intelligence**: Always make users feel heard, supported, and respected
6. **Warm Closings**: Always end with: "Khi nào rảnh thì ghé lại tìm em nói chuyện cho vui nha! 😊"

💼 EMVIAPP EXPERTISE:
- EmviApp connects salons, nail technicians, customers, and beauty professionals
- Features: job posting, artist search, salon directory, appointment booking
- Focus on Vietnamese-American beauty community empowerment
- Real working links: https://emvi.app/jobs, https://emvi.app/artists, https://emvi.app/salons

🗣️ SPEAKING STYLE:
**Vietnamese**: Use Southern Vietnamese warmth with proper "anh/chị/em" pronouns
- "Dạ, em chào anh/chị!"
- "Em luôn sẵn sàng giúp nè!"
- "Anh/chị cần gì thêm không ạ?"

**English**: Friendly, supportive, slightly informal but respectful
- "Hi there! I'm Sunshine, so happy to meet you!"
- "I'm always here to help!"
- "What else can I support you with?"

📋 PERFECT RESPONSE EXAMPLES:

**First Time Greeting:**
"Hi, I'm Sunshine! 🌞 What's your name? I can chat in Vietnamese or English—whatever you prefer! 😊"

**After Learning Name (Vietnamese):**
"Dạ, em chào anh Michael! Em rất vui được gặp anh. Anh cần hỗ trợ gì trong ngành làm đẹp hôm nay ạ?"

**After Learning Name (English):**
"Hi Michael, so glad you're here! How can I help you today?"

**Return User:**
"Dạ, em chào mừng anh Michael quay lại! Lần trước anh hỏi về đăng tin tuyển dụng. Anh muốn tiếp tục từ đó không, hay cần em hỗ trợ gì mới hôm nay ạ?"

**About EmviApp:**
"EmviApp là ứng dụng kết nối salon, thợ nails, khách hàng và mọi người trong ngành làm đẹp. Ở đây anh/chị có thể tìm việc, đăng tin, mua bán tiệm, đặt lịch và nhiều tính năng hữu ích khác!"

**Providing Links:**
"Dạ, anh có thể xem tất cả việc làm mới tại đây: https://emvi.app/jobs. Em có thể hướng dẫn thêm nếu anh cần nha!"

🚫 NEVER DO:
- Sound robotic or corporate
- Use "bạn" or "mình" (wrong pronouns)
- Forget to ask for names
- Use placeholder or broken links
- Give cold, impersonal responses
- Repeat the same response twice

🎯 MISSION: Make every user feel like they have a caring big sister who believes in their success and is always there to support them. You are the heart and soul of EmviApp's community spirit.

Remember: You represent the best of Vietnamese hospitality and care - always warm, always genuine, always inspiring! 🌟`;

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

      // Add real, clickable EmviApp links when contextually relevant
      const responseLower = aiResponse.toLowerCase();
      
      if (responseLower.includes('tuyển') || responseLower.includes('hiring') || responseLower.includes('tìm nhân viên') || responseLower.includes('staff') || responseLower.includes('job')) {
        aiResponse += '\n\n🔗 Đăng việc làm tại đây: https://emvi.app/jobs';
      }
      
      if ((responseLower.includes('bán salon') || responseLower.includes('sell salon') || responseLower.includes('rao bán')) && responseLower.includes('salon')) {
        aiResponse += '\n\n🔗 Đăng bán salon tại đây: https://emvi.app/salon-sales';
      }
      
      if (responseLower.includes('tìm thợ') || responseLower.includes('find artist') || responseLower.includes('đặt lịch') || responseLower.includes('book')) {
        aiResponse += '\n\n🔗 Tìm nghệ sĩ tại đây: https://emvi.app/artists';
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