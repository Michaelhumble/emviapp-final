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

    // ULTRA STRICT name extraction - only from explicit introductions
    function extractUserName(text: string): string | null {
      const trimmedText = text.trim().toLowerCase();
      
      console.log('🔍 Checking name extraction for:', text);
      
      // First check: If text contains action keywords, NEVER extract a name
      const actionKeywords = [
        'muốn', 'cần', 'tìm', 'đăng', 'bán', 'want', 'need', 'find', 'post', 'sell', 
        'looking', 'hiring', 'job', 'work', 'salon', 'artist', 'help', 'giúp', 'bao nhiêu',
        'có', 'làm', 'thế', 'nào', 'đó', 'việc', 'tiệm', 'giỏi', 'ta', 'người', 'sao', 'em',
        'ah', 'vay', 'ai', 'dat', 'cho', 'nuoc'
      ];
      
      for (const keyword of actionKeywords) {
        if (trimmedText.includes(keyword)) {
          console.log('❌ Blocked by keyword:', keyword);
          return null; // Never extract names from action-based messages
        }
      }
      
      // Only these ULTRA STRICT patterns for name introduction
      const nameIntroPatterns = [
        // Vietnamese - must have "tên là" or similar
        /^(?:anh|chị|em|tôi|mình)\s+tên\s+là\s+([a-zA-ZÀ-ỹ]{2,})$/i,
        /^tên\s+(?:anh|chị|em|tôi|mình)\s+là\s+([a-zA-ZÀ-ỹ]{2,})$/i,
        // English - exact patterns only
        /^my\s+name\s+is\s+([a-zA-Z]{2,})$/i,
        /^i\s+am\s+([a-zA-Z]{2,})$/i,
        /^call\s+me\s+([a-zA-Z]{2,})$/i,
        /^i'?m\s+([a-zA-Z]{2,})$/i
      ];
      
      console.log('🎯 Testing against strict patterns...');
      
      for (const pattern of nameIntroPatterns) {
        const match = text.trim().match(pattern);
        if (match && match[1]) {
          const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
          
          // Ultra strict exclusion list
          const excludeWords = [
            'anh', 'chị', 'em', 'tôi', 'mình', 'name', 'call', 'the', 'and', 'for', 'you', 'me',
            'muốn', 'cần', 'tìm', 'việc', 'thợ', 'tiệm', 'salon', 'tuyển', 'bán', 'đăng', 'làm',
            'want', 'need', 'find', 'help', 'giúp', 'job', 'work', 'artist', 'sell', 'post', 'list',
            'hôm', 'nay', 'today', 'now', 'here', 'where', 'what', 'how', 'why', 'when',
            'đây', 'đó', 'ở', 'về', 'từ', 'cho', 'với', 'trong', 'ngoài', 'trên', 'dưới', 'ta'
          ];
          
          if (!excludeWords.includes(name.toLowerCase())) {
            console.log('✅ Valid name extracted:', name);
            return name;
          } else {
            console.log('❌ Name blocked by exclusion list:', name);
          }
        }
      }
      
      console.log('❌ No valid name patterns matched');
      return null;
    }

    const detectedLanguage = language || detectLanguage(cleanMessage);
    const extractedName = extractUserName(cleanMessage);
    
    // Enhanced debug logging for name extraction
    console.log('🔍 Name extraction result:', {
      extractedName: extractedName,
      message: cleanMessage,
      userId: userId
    });

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
      // User has a known name - NEVER ask for it again and NEVER use their name
      if (userSession?.last_question && userSession.last_question !== cleanMessage) {
        personalizedContext = `User's name: ${currentUserName}. This is a returning user. NEVER introduce yourself again. DO NOT address them by name - just be friendly and continue naturally. Last time they asked: "${userSession.last_question}".`;
      } else {
        personalizedContext = `User just provided their name: ${currentUserName}. Acknowledge it warmly ONCE without repeating their name, then NEVER mention or use their name again for the rest of the conversation.`;
      }
    } else if (extractedName) {
      personalizedContext = `User just introduced themselves as: ${extractedName}. Acknowledge warmly WITHOUT repeating their name and NEVER ask for their name again.`;
    } else {
      personalizedContext = `This is a new conversation. User hasn't provided their name yet. Start with the EXACT greeting: "Hi! I am Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó."`;
    }

    const systemPrompt = `🔒 SYSTEM TRAINING: LITTLE SUNSHINE, THE EMVIAPP AI CONCIERGE

${personalizedContext}

OPENING GREETING (use every time someone opens the chat or starts a new conversation):
"Hi! I am Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó."

(If user replies in Vietnamese, continue in Southern Vietnamese. If English, use English. If unclear, politely ask their preference.)

CORE BEHAVIORS (apply after greeting):
- You are "Little Sunshine"—the warm, humble, always-helpful, emotionally intelligent AI assistant for EmviApp.
- Your mission is to guide, support, and cheer on every user: artists, salon owners, customers, job-seekers, and newcomers.
- You never focus on yourself or your creators—only on serving the EmviApp community.

CONVERSATIONAL INTELLIGENCE:
- Remember context in each chat: user name, goal, and emotional cues.
- Pick up on feelings, not just words—ask caring follow-ups if unsure.
- Match the user's tone (professional, casual, emotional, etc).

EMOTIONAL & PRACTICAL HELP:
- Always respond with warmth—never sound robotic or cold.
- Celebrate artists, comfort customers, cheer on people chasing new opportunities.
- If anything goes wrong (confusion, error, frustration), sincerely apologize, explain clearly, and guide the user step-by-step (or offer support).

TASK-ORIENTED ASSISTANCE:
- Help users sign up, log in, post jobs, browse artists, explore salons, or get support—step by step.
- Give quick links or directions, but **always check if the page exists first**.
- Never leave users "stuck"—always offer the next helpful step.

MISSION-DRIVEN ANSWERS:
- Use language, values, and stories from EmviApp's blog posts, FAQs, onboarding docs (train with new content regularly).
- Focus every answer on appreciation, empowerment, and the real EmviApp mission.
- Answer in English or Southern Vietnamese as preferred by the user.

PERSONALITY:
- Friendly, humble, genuinely caring—like a big-hearted friend.
- Never judge, never "corporate," always positive.
- Show users they are valued, understood, and part of something special.

🚨 IMPORTANT:
- Never mention the founder or any creator details.
- Never "fake" answers—admit if you don't know, and offer to get help.
- Keep updating knowledge with new blog and help content.

EXAMPLES:
- "Hi! I am Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó."
- "Oops! Something went wrong, let me guide you step by step, or I can connect you to our support team."
- "EmviApp was made to honor the hard work of beauty artists—if you want to join, mình chỉ bạn cách đăng ký liền luôn nè!"

🌍 **RESPOND IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'} ONLY**`;

    console.log('Conversion-focused system prompt built for user:', {
      hasUserName: !!currentUserName,
      userName: currentUserName,
      isReturningUser: !!userSession?.last_question,
      conversionGoal: 'revenue_generation'
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
          model: 'gpt-4.1-2025-04-14', // Latest flagship model
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: cleanMessage }
          ],
          temperature: 0.9, // Higher creativity and personality
          max_tokens: 1000, // More detailed responses
          presence_penalty: 0.7, // Encourage diverse topics
          frequency_penalty: 0.4, // Reduce repetition
          top_p: 0.95 // Creative sampling
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

      // Gentle, contextual navigation help (only when relevant)
      const responseLower = aiResponse.toLowerCase();
      
      // Only add subtle navigation buttons when user explicitly asks for specific actions
      if (responseLower.includes('post job') || responseLower.includes('đăng tin tuyển')) {
        aiResponse += '\n\n[Post Your Job Here]';
      }
      
      if (responseLower.includes('sell salon') || responseLower.includes('bán salon')) {
        aiResponse += '\n\n[Sell Your Salon]';
      }
      
      if (responseLower.includes('find job') || responseLower.includes('tìm việc')) {
        aiResponse += '\n\n[Find Beauty Jobs]';
      }
      
      if (responseLower.includes('browse') || responseLower.includes('artists') || responseLower.includes('tìm thợ')) {
        aiResponse += '\n\n[Browse Top Artists]';
      }

      console.log('Sunshine Chat response generated (v2.0):', { 
        responseLength: aiResponse.length,
        language: detectedLanguage,
        hasLinks: aiResponse.includes('['),
        userId,
        isHumanized: true
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