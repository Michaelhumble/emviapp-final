import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InviteRequest {
  salon_id: string;
  email: string;
  full_name: string;
  role: string;
  invite_code: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { salon_id, email, full_name, role, invite_code }: InviteRequest = await req.json();

    // Get salon information
    const { data: salon, error: salonError } = await supabaseClient
      .from('salons')
      .select('salon_name, owner_id')
      .eq('id', salon_id)
      .single();

    if (salonError) {
      throw new Error(`Failed to fetch salon: ${salonError.message}`);
    }

    // Create magic invite link
    const magicLink = `${Deno.env.get('SITE_URL') || 'http://localhost:3000'}/invite/${invite_code}`;

    // In a real implementation, you would send this via email service like Resend
    // For now, we'll return the invite details
    const emailContent = {
      to: email,
      subject: `You're invited to join ${salon.salon_name} on EmviApp!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B5CF6; margin-bottom: 10px;">You're Invited! 🎉</h1>
            <h2 style="color: #374151; margin-bottom: 20px;">Join ${salon.salon_name} Team</h2>
          </div>
          
          <div style="background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
            <p style="margin: 0; font-size: 18px;">Hi ${full_name}!</p>
            <p style="margin: 10px 0 0 0;">You've been invited to join our team as a <strong>${role}</strong>.</p>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #374151; margin-top: 0;">What's Next?</h3>
            <ol style="color: #6B7280; line-height: 1.6;">
              <li>Click the invitation link below</li>
              <li>Create your EmviApp profile</li>
              <li>Set up your password and complete your profile</li>
              <li>Start managing bookings and building your clientele!</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${magicLink}" 
               style="background: linear-gradient(135deg, #8B5CF6, #EC4899); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold; 
                      display: inline-block;">
              Accept Invitation & Join Team
            </a>
          </div>
          
          <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; color: #6B7280; font-size: 14px;">
            <p><strong>Benefits of joining EmviApp:</strong></p>
            <ul style="line-height: 1.6;">
              <li>Manage your bookings and schedule</li>
              <li>Build your client base and portfolio</li>
              <li>Earn credits and rewards for referrals</li>
              <li>Connect with other beauty professionals</li>
            </ul>
            
            <p style="margin-top: 20px;">
              This invitation will expire in 7 days. If you have any questions, feel free to contact us.
            </p>
            
            <p style="color: #9CA3AF; font-size: 12px; margin-top: 20px;">
              If you didn't expect this invitation, you can safely ignore this email.
            </p>
          </div>
        </div>
      `
    };

    // Log the invite for tracking
    console.log('Team invitation prepared:', {
      salon: salon.salon_name,
      invitee: full_name,
      email: email,
      role: role,
      magicLink: magicLink
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Invitation prepared successfully',
      magicLink: magicLink,
      emailContent: emailContent
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-team-invite function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);