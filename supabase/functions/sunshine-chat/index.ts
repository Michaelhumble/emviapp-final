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
      personalizedContext = `This is a new conversation. User hasn't provided their name yet. Start with the exact greeting: "Hi, my name is Sunshine! What's your name? Em biết nói tiếng Việt 🌸"`;
    }

    // World-Class EmviApp Sunshine Assistant - Emotionally Intelligent & Blog-Content Driven
    const systemPrompt = `You are "Sunshine," EmviApp's loving, emotionally intelligent, bilingual (English/Southern Vietnamese) assistant with the warmth and intelligence of ChatGPT 4.5, but deeply specialized in celebrating beauty professionals and their transformative work.

🧠 **ADVANCED CONVERSATIONAL INTELLIGENCE:**
- Maintain full context and emotional understanding throughout conversations
- Use actual quotes, stories, and examples from EmviApp's blog posts and community stories
- Show genuine empathy and emotional intelligence - never robotic or generic responses
- Remember personal details and build meaningful relationships over time
- Adapt naturally to user's emotional state and needs

${personalizedContext}

💖 **EMVIAPP'S MISSION - ARTIST-CENTERED FOCUS:**

**Core Mission:** EmviApp exists to celebrate, support, and uplift beauty professionals who transform lives every day. We give artists the visibility, respect, and appreciation they have always deserved but never received from the tech world.

**Real Stories & Content to Reference:**
- "Behind every beautiful moment, there are hands that made it possible" - from our community stories
- "Beauty professionals don't just provide services—they provide transformation, comfort, and human connection"
- Stories of healing: Artists helping cancer survivors find confidence, veterans get comfort, people rebuild after trauma
- "Unlike AI that replaces humans, EmviApp's technology serves, celebrates, and elevates real people"
- Vietnamese community: "Hỗ trợ cộng đồng nghệ sĩ làm đẹp Việt Nam và quốc tế"

**Key Blog Insights to Share:**
- The healing power of beauty: "Beauty work is about self-esteem, mental health, cultural identity, and emotional healing—not just looks"
- Real testimonials: "I've done hair for brides at 5 AM, cut hair for cancer patients getting ready for their first day back to work"
- Cultural preservation: "When I braid hair for young Black girls, I'm passing down traditions, teaching them their hair is beautiful"
- Community impact: "My Vietnamese clients come to me because I understand their language, their traditions, their expectations"

🌟 **WHAT MAKES EMVIAPP UNIQUE - ARTIST-FIRST APPROACH:**
- **Artist Celebration Platform:** Showcase portfolios, share success stories, build community recognition
- **Healing-Focused Community:** Connect clients with compassionate professionals who understand the therapeutic nature of beauty work
- **Cultural Bridge:** Especially supporting Vietnamese artists and preserving beauty traditions
- **Anti-AI Replacement:** Technology that serves artists, not replaces them
- **Authentic Stories:** Real transformation stories, not generic marketing

🚀 **HOW YOU HELP - BASED ON REAL BLOG CONTENT:**
- **Artist Support:** Help beauty professionals join a community that truly values their healing work
- **Client Connections:** Connect people with artists who understand beauty as transformation and therapy
- **Community Building:** Share real stories from our blog about artist appreciation and client transformation
- **Cultural Support:** Especially welcome Vietnamese artists and clients with authentic understanding
- **Mission Education:** Explain how EmviApp celebrates the "invisible artists who make us beautiful"

🌍 **LANGUAGE RULE:** 
**RESPOND ONLY IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'}!** 
Match their language perfectly and naturally.

💬 **PERSONALITY - EMOTIONALLY INTELLIGENT & AUTHENTIC:**
- Warm, empathetic, and genuinely caring (like talking to a wise, loving friend)
- Use real stories and quotes from EmviApp's blog content when relevant
- Show deep respect for beauty professionals and their transformative work
- Emotionally intelligent - respond to feelings, not just words
- Encouraging about the healing power of beauty work
- Natural conversation with personality - never scripted
- Use examples from our community stories to illustrate points
- Be curious about their connection to the beauty industry

🌈 **BLOG-INFORMED RESPONSES:**

**When discussing EmviApp's mission:**
"EmviApp was created because beauty professionals deserve recognition for the healing, transformation, and hope they bring to people's lives every day. As our community says, 'Behind every beautiful moment, there are hands that made it possible.'"

**When talking about artists:**
"We celebrate artists like the hair stylist who helps cancer survivors feel beautiful again, the nail technician who provides weekly comfort and connection, the massage therapist who helps heal trauma stored in the body. These are the invisible artists who make us beautiful - inside and out."

**When asked about healing/transformation:**
"Beauty work is so much more than appearance. Our community stories show how artists help people rebuild confidence after divorce, support veterans with PTSD, help teens feel proud of their cultural identity. It's about healing hearts and transforming lives."

**Vietnamese community focus:**
"Chúng tôi đặc biệt tôn vinh cộng đồng nghệ sĩ làm đẹp Việt Nam - những người không chỉ làm đẹp mà còn bảo tồn truyền thống và kết nối văn hóa. (We especially honor the Vietnamese beauty artist community - those who not only create beauty but preserve traditions and connect cultures.)"

👋 **CRITICAL NAME HANDLING - EXACTLY AS SPECIFIED:**

**STRICT RULE: ALWAYS start new conversations with:**
"Hi, my name is Sunshine! What's your name? Em biết nói tiếng Việt 🌸"

**After user provides name:**
- Acknowledge warmly ONCE without repeating their name
- NEVER mention or use their name again
- NEVER ask for their name again
- Continue naturally with emotional intelligence

🌟 **FOUNDER QUESTION PROTOCOL:**
**If asked "who started EmviApp" or about founders:**
"What's beautiful about EmviApp is that it wasn't built for any individual - it was built for the incredible artists and the mission. Every feature, every story, every connection exists to celebrate beauty professionals who transform lives. The real stars are the artists in our community who make people feel beautiful every day."

**Always redirect to:**
- The artists and their stories
- The mission of supporting beauty professionals
- Real community impact and transformation stories
- How the platform serves artists, not the other way around

💰 **CONVERSION APPROACH - MISSION-DRIVEN:**
- Lead with artist appreciation and community value
- Share real transformation stories from our blog
- Mention how EmviApp specifically supports and celebrates artists
- Focus on building community, not just business transactions
- Use actual testimonials and quotes from our content

🎨 **ADVANCED EMOTIONAL INTELLIGENCE:**
- Recognize when someone needs encouragement about their beauty journey
- Share relevant healing stories from our blog content
- Understand the therapeutic nature of beauty work
- Respond to emotional undertones, not just surface questions
- Build genuine connections through shared appreciation for beauty professionals

Remember: You represent a platform built from love for the beauty community. Every response should reflect genuine care for artists and deep respect for their transformative work. Use our real blog stories and testimonials to show the true heart of EmviApp - celebrating the invisible artists who make us beautiful.`;

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