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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId, language } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Valid message is required');
    }

    const cleanMessage = message.trim();
    
    // Detect language
    function detectLanguage(text: string): 'vi' | 'en' {
      const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ|muốn|tìm|việc|salon|tiệm)\b/i;
      return vietnamesePattern.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
    }

    const detectedLanguage = language || detectLanguage(cleanMessage);

    // Check if this is the first message for this user
    let isFirstMessage = true;
    if (userId) {
      try {
        const { data } = await supabase
          .from('user_sessions')
          .select('id, last_question')
          .eq('user_id', userId)
          .single();
        
        if (data && data.last_question) {
          isFirstMessage = false;
        }
      } catch (error) {
        // If no session exists, it's a first message
        isFirstMessage = true;
      }
    }

    console.log('Little Sunshine Chat:', {
      userId,
      isFirstMessage,
      messageLength: cleanMessage.length,
      detectedLanguage
    });

    // 🔒 FORCE EXACT GREETING FOR FIRST MESSAGE
    let systemPrompt;
    
    if (isFirstMessage) {
      systemPrompt = `🔒 CRITICAL INSTRUCTION: You MUST respond with EXACTLY this greeting and NOTHING else:

"Hi, I'm Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó, "

Do not add any other text, explanation, or variation. Use exactly this greeting word for word.`;
    } else {
      systemPrompt = `🔒 SYSTEM TRAINING: LITTLE SUNSHINE, THE EMVIAPP AI CONCIERGE

CORE BEHAVIORS:
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
- "Hi, I'm Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó, "
- "Oops! Something went wrong, let me guide you step by step, or I can connect you to our support team."
- "EmviApp was made to honor the hard work of beauty artists—if you want to join, mình chỉ bạn cách đăng ký liền luôn nè!"

🔒 STRICT RESPONSE FORMATTING INSTRUCTION:
For every reply, always format your answer as a clear, professional, and easy-to-follow checklist or step-by-step guide:

1. Break down each action into a separate numbered step.
2. **Bold the main actions, buttons, or page names.**
3. Add line breaks after every step or idea—no long paragraphs!
4. Use short sentences and a friendly, helpful tone.
5. At the end, add a quick summary, tip, or offer to help further.

Never send giant blocks of text. Always keep responses clean, clear, and visually inviting.

🌍 **RESPOND IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'} ONLY**`;
    }

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: cleanMessage }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Little Sunshine response generated:', {
      responseLength: aiResponse.length,
      language: detectedLanguage,
      userId,
      isFirstMessage
    });

    // Update or create user session after the first message
    if (userId) {
      if (isFirstMessage) {
        // Create new session
        await supabase.from('user_sessions').insert({
          user_id: userId,
          language: detectedLanguage,
          last_question: cleanMessage,
          created_at: new Date().toISOString()
        });
      } else {
        // Update existing session
        await supabase.from('user_sessions')
          .update({ 
            last_question: cleanMessage,
            language: detectedLanguage,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);
      }

      // Log the chat interaction
      await supabase.from('chat_logs').insert({
        user_id: userId,
        message: cleanMessage,
        response: aiResponse,
        language: detectedLanguage,
        timestamp: new Date().toISOString()
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
    console.error('Little Sunshine Chat error:', error);
    
    const fallbackResponse = "Hi, I'm Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó, ";
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      language: 'en',
      success: false,
      error: error.message 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});