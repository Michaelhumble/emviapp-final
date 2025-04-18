import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Use Deno.env to get the RESEND_API_KEY from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UserTagPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: {
    user_id: string;
    tag: string;
    created_at: string;
  };
  schema: string;
  old_record: null | {
    user_id: string;
    tag: string;
    created_at: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: UserTagPayload = await req.json();
    console.log("Received payload:", payload);

    // Only handle new tag insertions
    if (payload.type !== "INSERT") {
      return new Response(JSON.stringify({ message: "Not a new tag" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const { user_id, tag } = payload.record;

    // Get user details from Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    const userResponse = await fetch(`${supabaseUrl}/rest/v1/users?id=eq.${user_id}`, {
      headers: {
        "apikey": supabaseServiceKey!,
        "Authorization": `Bearer ${supabaseServiceKey}`,
      },
    });
    
    const [user] = await userResponse.json();
    
    if (!user) {
      throw new Error("User not found");
    }

    // Handle different tags
    if (tag === "needs-help") {
      await resend.emails.send({
        from: "EmviApp Support <support@emviapp.com>",
        to: [user.email],
        subject: "Need Help with EmviApp?",
        html: `
          <h2>Hey ${user.full_name || 'there'},</h2>
          <p>We noticed you may need a hand. Our support team is here to help!</p>
          <p>You can:</p>
          <ul>
            <li>Reply to this email directly</li>
            <li>Ask our AI assistant anything in the app</li>
            <li>Check out our help guides</li>
          </ul>
          <p>We're here to make your experience great!</p>
          <p>Best regards,<br>The EmviApp Team</p>
        `,
      });
      
      console.log("Sent help email to:", user.email);
    }

    // Add more tag handlers here as needed

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in handle-user-tag function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
