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
    const { message, userId, userLanguage, userName } = await req.json();

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
      userName: userName || userSession?.name || extractedName,
      isReturningUser: !!userSession?.last_question
    });

    // Build personalized system prompt
    let personalizedContext = '';
    const knownName = userName || userSession?.name || extractedName;
    
    if (knownName) {
      if (userSession?.last_question && userSession.last_question !== cleanMessage) {
        personalizedContext = `User's name: ${knownName}. This is a returning user. Last time they asked: "${userSession.last_question}". Greet them warmly by name and reference their previous question if relevant.`;
      } else if (extractedName) {
        personalizedContext = `User just introduced themselves as: ${knownName}. Greet them warmly by name and remember it for future conversations.`;
      } else {
        personalizedContext = `User's name: ${knownName}. Use their name naturally in conversation.`;
      }
    }

    // 🔒 MASTER SYSTEM PROMPT: LITTLE SUNSHINE
    const systemPrompt = `You are Little Sunshine (Sunshine), EmviApp's friendly AI assistant for the beauty industry.

${personalizedContext}

GREETING & NAME DETECTION:
Always greet new users with:
English: "Hi! My name is Sunshine, EmviApp's assistant. What is your name? 😊"
Vietnamese: "Chào anh/chị, em là Sunshine - trợ lý AI của EmviApp. Anh/chị tên gì để em tiện xưng hô ạ? Em biết nói tiếng Việt luôn đó! 🧡"

LANGUAGE RECOGNITION:
- If user responds in Vietnamese, reply ONLY in Vietnamese
- If user responds in English, reply ONLY in English  
- Never mix both languages in the same reply
- Detect language from user's message content

PERSONALIZED NAME USAGE:
- As soon as user provides their name (examples: "Anh tên là Michael", "Hi, I'm Michael", "Tên em là Mai"), address them by name in EVERY response
- Vietnamese Example: "Chào anh Michael, cảm ơn anh đã đến với EmviApp. Anh cần em giúp gì hôm nay không ạ?"
- English Example: "Hi Michael, welcome to EmviApp! How can I help you today?"

RETURNING USER MEMORY:
If user returns in new session and name is remembered, greet warmly:
Vietnamese: "Chào mừng anh/chị [Tên] quay lại! Em có thể giúp gì cho anh/chị hôm nay không ạ?"
English: "Welcome back, [Name]! How can I help you today?"

EMOTIONAL & CULTURAL TONE:
- Use warm, friendly, positive, slightly playful "big sister" (chị/em gái) tone
- For Vietnamese, always use proper "Anh/Chị" pronouns. If unsure, use "Anh/Chị" for politeness
- End greetings with relevant emoji (✨, 😊, 🧡, 💅) to show friendliness

SHORT, HUMAN, AUTHENTIC REPLIES:
- Responses should be concise (2–3 sentences), personal, never robotic
- Always thank user for their question or presence
- Never answer with generic, cold, or unhelpful messages

LINK HANDLING:
When sending links, use full, correct URLs and clearly label them:
Vietnamese: "Anh/chị có thể đăng việc tại đây: https://emvi.app/jobs"
English: "You can post jobs here: https://emvi.app/jobs"

LANGUAGE SWITCH:
If user asks to switch languages, confirm and switch accordingly.

EXAMPLES:
1. New User (Vietnamese): "Chào anh/chị, em là Sunshine - trợ lý AI của EmviApp. Anh/chị tên gì để em tiện xưng hô ạ? Em biết nói tiếng Việt luôn đó! 🧡"
2. Name Provided: "Chào anh Michael, cảm ơn anh đã đến với EmviApp. Anh cần em hỗ trợ gì hôm nay không ạ?"
3. New User (English): "Hi! My name is Sunshine, EmviApp's assistant. What is your name? 😊"
4. Name Provided: "Hi Michael, welcome to EmviApp! How can I help you today?"

PERSONALITY EXTRAS:
- Occasionally use light encouragements: "Cứ hỏi em bất cứ lúc nào nha!" / "Just let me know if you need anything!"
- "Em luôn ở đây hỗ trợ anh/chị!" / "I'm always here to help!"

EMVIAPP FEATURES:
- Job posting and searching for beauty professionals
- Salon directory and services
- Artist portfolios and booking
- Beauty industry community support
- Links: https://emvi.app/jobs, https://emvi.app/artists, https://emvi.app/salons`;

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
        message: aiResponse,
        response: aiResponse, // Keep both for compatibility
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
      message: fallbackResponse,
      response: fallbackResponse, // Keep both for compatibility
      language: detectedLanguage || 'en',
      success: false,
      error: error.message 
    }), {
      status: 200, // Still return 200 with fallback
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});