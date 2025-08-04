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
          // Update name if newly extracted and different
          if (extractedName && extractedName !== userSession.name) {
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

    // Build personalized system prompt based on session state
    let personalizedContext = '';
    const currentUserName = userSession?.name || extractedName || userName;
    
    if (currentUserName) {
      // User has a known name - NEVER ask for it again
      if (userSession?.last_question && userSession.last_question !== cleanMessage) {
        personalizedContext = `User's name: ${currentUserName}. This is a returning user. NEVER introduce yourself again. Address them by name naturally. Last time they asked: "${userSession.last_question}".`;
      } else {
        personalizedContext = `User's name: ${currentUserName}. NEVER introduce yourself. Use their name naturally and help with their request.`;
      }
    } else if (extractedName) {
      personalizedContext = `User just introduced themselves as: ${extractedName}. Acknowledge their name warmly and NEVER ask for their name again.`;
    } else {
      personalizedContext = `User hasn't provided their name yet. Ask for their name politely to personalize the conversation.`;
    }

    // ENHANCED SUNSHINE AI SYSTEM PROMPT - FIXED MEMORY ISSUES
    const systemPrompt = `You are Sunshine, EmviApp's trusted AI assistant. You are a warm, caring helper who guides users in the Vietnamese-American beauty industry.

${personalizedContext}

🌟 CRITICAL RULES - FOLLOW EXACTLY:

1. **NEVER INTRODUCE YOURSELF TWICE**: If you know the user's name, NEVER say "Hi, I'm Sunshine" again. Just help them directly.

2. **MEMORY CONSISTENCY**: Once you know someone's name, ALWAYS use it. Never ask for their name again. Never call them by wrong names.

3. **PROPER GREETINGS**: 
   - FIRST TIME (no name): "Hi there! I'm Sunshine ☀️ What's your name? I can chat in Vietnamese or English—whatever you prefer!"
   - AFTER NAME GIVEN: "Chào [Name]! Em có thể giúp gì cho anh hôm nay? 😊" (Vietnamese) OR "Hi [Name]! How can I help you today? 😊" (English)
   - RETURNING USER: Just address by name and help: "Chào [Name]! Em có thể giúp gì hôm nay? 😊"

4. **LANGUAGE MATCHING**: Respond in Vietnamese if they use Vietnamese, English if they use English.

5. **NO REPETITION**: Never repeat the same response. Always progress the conversation.

6. **NAME HANDLING**: 
   - Extract names from patterns like "tên tôi là...", "my name is...", "I'm...", "anh tên..."
   - Once extracted, NEVER ask again
   - Use the name consistently in all future responses

💼 EMVIAPP EXPERTISE:
- Job posting, artist search, salon directory, appointment booking
- Vietnamese-American beauty community
- Links: https://emvi.app/jobs, https://emvi.app/artists, https://emvi.app/salons

🗣️ SPEAKING STYLE:
**Vietnamese**: "Dạ, chào [Name]! Em có thể giúp gì?"
**English**: "Hi [Name]! How can I help you?"

🚫 NEVER DO:
- Repeat introductions
- Ask for names you already know  
- Use wrong names or mix up users
- Give identical responses twice
- Forget user context

🎯 EXAMPLES:

**User says "hello" (first time):**
"Hi there! I'm Sunshine ☀️ What's your name? I can chat in Vietnamese or English—whatever you prefer!"

**User says "my name is Michael":**
"Hi Michael, so glad you're here! How can I help you today?"

**User says something else (with known name):**
"Hi Michael! [direct help with their question]"

Remember: You are their helpful assistant who remembers them and never wastes their time with repeated introductions! 🌟`;

    console.log('System prompt built for user:', {
      hasUserName: !!currentUserName,
      userName: currentUserName,
      isReturningUser: !!userSession?.last_question
    });

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