
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/auth';

// Define the invite details type for type safety
interface InviteDetails {
  valid: boolean;
  salon_name?: string;
  role?: string;
  phone_match?: boolean;
  message?: string;
}

const InvitePage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [inviteDetails, setInviteDetails] = useState<InviteDetails | null>(null);

  useEffect(() => {
    const validateInvite = async () => {
      try {
        // For now, use a phone of an empty string as a placeholder
        // In a real app, you'd want to get the user's phone number
        const { data, error } = await supabase.rpc('validate_team_invite', {
          p_invite_code: token || '',
          p_phone_number: ''
        });

        if (error) throw error;
        
        // Ensure data is properly typed
        if (typeof data === 'object') {
          setInviteDetails(data as InviteDetails);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error validating invite:', error);
        toast.error('Failed to validate invite');
      }
    };

    if (token) {
      validateInvite();
    }
  }, [token]);

  const handleJoin = async () => {
    if (!user) {
      // Redirect to signup with invite token
      navigate(`/auth/signup?invite=${token}`);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('accept_team_invite', {
        p_invite_code: token || '',
        p_user_id: user.id
      });

      if (error) throw error;

      if (data) {
        toast.success('Successfully joined the team!');
        navigate('/dashboard/artist'); // Adjust based on role
      } else {
        toast.error('Unable to join the team. Please check your phone number.');
      }
    } catch (error) {
      console.error('Error accepting invite:', error);
      toast.error('Failed to accept invite');
    }
  };

  if (!inviteDetails) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Card>
            <CardHeader>
              <CardTitle>Validating Invite...</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please wait while we verify your invitation.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!inviteDetails.valid) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Invalid Invite</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">{inviteDetails.message || 'This invitation is no longer valid.'}</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              {inviteDetails.salon_name 
                ? `Join ${inviteDetails.salon_name}` 
                : "You've been invited to join a team on EmviApp!"}
            </CardTitle>
            <CardDescription>
              {inviteDetails.role && `Invited as a ${inviteDetails.role}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!inviteDetails.phone_match && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-yellow-800">
                  ⚠️ The phone number associated with this invite doesn't match your current profile. 
                  Ask your salon to resend the invite or contact support.
                </p>
              </div>
            )}

            <Button 
              onClick={handleJoin} 
              className="w-full"
              disabled={!inviteDetails.phone_match}
            >
              {user ? 'Join Team' : 'Create Account & Join'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InvitePage;
