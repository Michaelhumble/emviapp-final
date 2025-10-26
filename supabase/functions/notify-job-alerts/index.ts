import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotifyRequest {
  jobId: string;
  role: string;
  city: string;
  jobTitle: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { jobId, role, city, jobTitle }: NotifyRequest = await req.json();

    console.log(`📧 [notify-job-alerts] Processing job alert for: ${role} in ${city}`);

    // Find matching subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from('job_alerts')
      .select('email, role, city')
      .eq('role', role)
      .eq('city', city);

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError);
      throw fetchError;
    }

    if (!subscribers || subscribers.length === 0) {
      console.log('No subscribers found for this job criteria');
      return new Response(
        JSON.stringify({ message: 'No subscribers found', count: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${subscribers.length} subscribers to notify`);

    // Prepare email queue entries
    const emailQueue = subscribers.map(sub => {
      const unsubscribeUrl = `https://www.emvi.app/job-alerts/unsubscribe?email=${encodeURIComponent(sub.email)}&role=${encodeURIComponent(sub.role)}&city=${encodeURIComponent(sub.city)}`;
      const jobUrl = `https://www.emvi.app/jobs`;

      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 30px 40px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; color: #111827; font-size: 24px; font-weight: 600;">New ${role} Job in ${city}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                A new <strong>${role}</strong> job has been posted in <strong>${city}</strong>.
              </p>
              <p style="margin: 0 0 30px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                <strong>Job Title:</strong> ${jobTitle}
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 20px 0;">
                    <a href="${jobUrl}" style="display: inline-block; padding: 14px 32px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View Job Details</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 40px 40px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 13px; line-height: 1.5; text-align: center;">
                You're receiving this because you signed up for job alerts on EmviApp.
              </p>
              <p style="margin: 0; text-align: center;">
                <a href="${unsubscribeUrl}" style="color: #6366f1; text-decoration: none; font-size: 13px;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      return {
        to_email: sub.email,
        subject: `New ${role} job in ${city} — EmviApp`,
        html
      };
    });

    // Insert into outbound email queue
    const { error: queueError } = await supabase
      .from('outbound_email_queue')
      .insert(emailQueue);

    if (queueError) {
      console.error('Error queueing emails:', queueError);
      throw queueError;
    }

    console.log(`✅ Queued ${emailQueue.length} email notifications`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Queued ${emailQueue.length} notifications`,
        count: emailQueue.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in notify-job-alerts:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
