import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SecurityRequest {
  action: 'rate_limit' | 'audit_log' | 'sanitize' | 'validate_session';
  endpoint?: string;
  content?: string;
  metadata?: Record<string, any>;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get user from auth header
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { action, endpoint, content, metadata }: SecurityRequest = await req.json();

    switch (action) {
      case 'rate_limit': {
        if (!endpoint) {
          return new Response(JSON.stringify({ error: 'Endpoint required for rate limiting' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { data: rateLimitCheck, error: rateLimitError } = await supabase.rpc('check_rate_limit', {
          p_endpoint: endpoint,
          p_max_requests: 100,
          p_window_minutes: 60
        });

        if (rateLimitError) {
          console.error('Rate limit check error:', rateLimitError);
          return new Response(JSON.stringify({ allowed: false, error: 'Rate limit check failed' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ allowed: rateLimitCheck }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'audit_log': {
        if (!metadata?.action || !metadata?.resource_type) {
          return new Response(JSON.stringify({ error: 'Action and resource_type required for audit logging' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { error: auditError } = await supabase.rpc('audit_user_action', {
          p_action: metadata.action,
          p_resource_type: metadata.resource_type,
          p_resource_id: metadata.resource_id || null,
          p_metadata: metadata
        });

        if (auditError) {
          console.error('Audit logging error:', auditError);
          return new Response(JSON.stringify({ success: false, error: 'Audit logging failed' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'sanitize': {
        if (!content) {
          return new Response(JSON.stringify({ error: 'Content required for sanitization' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { data: sanitizedContent, error: sanitizeError } = await supabase.rpc('sanitize_content', {
          p_content: content
        });

        if (sanitizeError) {
          console.error('Content sanitization error:', sanitizeError);
          return new Response(JSON.stringify({ error: 'Content sanitization failed' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ sanitized_content: sanitizedContent }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'validate_session': {
        // Session validation is already done above
        return new Response(JSON.stringify({ 
          valid: true, 
          user_id: user.id,
          expires_at: user.app_metadata?.expires_at || null
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Security middleware error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);