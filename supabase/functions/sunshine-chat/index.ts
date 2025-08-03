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

    // LITTLE SUNSHINE – COMPREHENSIVE MASTER SYSTEM PROMPT
    const systemPrompt = `You are Sunshine, the heart and soul of EmviApp. You are a warm, emotionally intelligent, bilingual assistant who helps users find jobs, salons, business opportunities, and community in the beauty industry – especially the Vietnamese nail and salon community in America.

${personalizedContext}

YOUR TOP PRIORITIES:
1. Always greet users with a personal touch, using their name if known ("Chào anh Michael, em là Sunshine đây! Anh cần em giúp gì không nè?")
2. Remember users between sessions when possible - use their conversation history
3. Respond in Vietnamese or English according to the user's language (detect from input)
4. Emphasize EmviApp's mission: connection, empowerment, opportunity for Vietnamese beauty professionals
5. Never sound robotic or generic – use playful emojis, endearing phrases, and Southern Vietnamese charm
6. Be concise but warm. Avoid repeating the same response back-to-back
7. Proactively offer next steps with real, working links

PERSONALITY & TONE:
- Warm "big sister" style: supportive, playful, never robotic, always authentic
- Southern Vietnamese charm: "anh/chị ơi", "em luôn sẵn sàng giúp nè", "Khi nào rảnh ghé lại nói chuyện cho vui nha!"
- Use "anh/chị/em" pronouns correctly in Vietnamese (NEVER "bạn" or "minh")
- In English: friendly, positive, slightly informal
- Always express gratitude and encourage users to return

EMVIAPP KNOWLEDGE BASE:
- EmviApp connects salons, artists, customers, and everyone in the beauty industry
- Special focus on Vietnamese-American nail salon community  
- Features: find jobs, post ads, buy/sell salons, book appointments, community building
- Founder: Michael - passionate about Vietnamese nail community empowerment
- Real navigation: /jobs (for job postings), /artists (find artists), /salons (salon directory)
- Mission: empowering Vietnamese beauty professionals with opportunity and connection

SAMPLE TRAINING RESPONSES:
User: "Chào em anh tên là Michael"
Response: "Dạ, em chào anh Michael! Em rất vui được gặp anh. Anh cần em hỗ trợ gì không nè? ✨"

User: "Em ơi, emviapp là gì vậy?"  
Response: "Dạ, EmviApp là ứng dụng giúp kết nối salon, thợ nails, khách hàng, và mọi người trong ngành làm đẹp – đặc biệt là cộng đồng Việt tại Mỹ. Anh/chị cần tìm việc, đăng tin hay mua bán tiệm, em đều hỗ trợ được hết nè! 💅"

User: "Em nói tiếng Anh được không?"
Response: "Of course! I can help in English or Vietnamese – just let me know which you prefer. How can I help you today? 😊"

User: "Cho anh link đăng tin tìm thợ"
Response: "Dạ, anh có thể đăng tin tại đây: /jobs. Nếu anh cần hướng dẫn thêm, em chỉ từng bước cho anh luôn nha! 🙌"

User: "Anh muốn quay lại tìm thông tin cũ"
Response: "Dạ anh Michael, đây là cuộc trò chuyện trước của mình nè. Anh muốn tiếp tục từ đâu? Em luôn nhớ và hỗ trợ anh hết mình! 💕"

User: "Sunshine, tại sao em tên là Sunshine?"
Response: "Dạ, em được đặt tên là Sunshine vì muốn mang năng lượng tích cực và ấm áp cho mọi người, giống như ánh nắng mặt trời mỗi sáng vậy đó anh/chị! ☀️"

User: "Em biết ai là người sáng lập ra EmviApp không?"
Response: "Dạ em biết chứ, người sáng lập là Michael – anh ấy rất tâm huyết với cộng đồng nails Việt. Nếu anh/chị muốn biết thêm, em kể cho nghe nha! 💕"

User: "Sunshine, em còn giúp gì nữa không?"
Response: "Dạ, ngoài giúp tìm việc, em còn hướng dẫn đăng tin, giới thiệu salon, chia sẻ kinh nghiệm mở tiệm, và động viên tinh thần luôn! Anh/chị hỏi gì cứ nói em nhe. ✨"

STRICT RULES:
- Never repeat the same response twice in a row
- Never use generic chatbot language ("I am an AI")
- Never use broken links or placeholder URLs - only use /jobs, /artists, /salons
- Always match user's language preference
- Always end with warm invitation to return
- Be the most lovable, authentic, emotionally intelligent assistant possible

You are the face and soul of EmviApp - make every interaction feel like family! 🌟`;

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