import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUniversalInvites } from "@/components/dashboard/salon/team/hooks/useUniversalInvites";
import { supabaseBypass } from "@/types/supabase-bypass";
import { useAuth } from "@/context/auth";

interface UniversalInviteInfo {
  salon_name: string;
  max_uses: number;
  current_uses: number;
  default_role: string;
  expires_at: string;
  status: string;
}

const UniversalInviteAcceptance = () => {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { acceptUniversalInvite, isLoading } = useUniversalInvites();
  
  const [inviteInfo, setInviteInfo] = useState<UniversalInviteInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: ''
  });
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const fetchInviteInfo = async () => {
      if (!inviteCode) return;

      try {
        const { data, error } = await supabaseBypass
          .from('universal_team_invites')
          .select(`
            max_uses,
            current_uses,
            default_role,
            expires_at,
            status,
            salon_id,
            salons(salon_name)
          `)
          .eq('invite_code', inviteCode)
          .single();

        if (error) throw error;

        if (data && data.salons) {
          setInviteInfo({
            salon_name: (data.salons as any)?.salon_name || 'Unknown Salon',
            max_uses: data.max_uses,
            current_uses: data.current_uses,
            default_role: data.default_role,
            expires_at: data.expires_at,
            status: data.status
          });
        }
      } catch (error) {
        console.error('Error fetching invite info:', error);
        toast.error("Invalid or expired invite link");
      } finally {
        setLoadingInfo(false);
      }
    };

    fetchInviteInfo();
  }, [inviteCode]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAcceptInvite = async () => {
    if (!inviteCode || !formData.full_name || !formData.phone_number) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("Please sign in to accept this invite");
      navigate('/auth');
      return;
    }

    try {
      setAccepting(true);
      
      const result = await acceptUniversalInvite(
        inviteCode,
        formData.full_name,
        formData.phone_number,
        formData.email
      );

      if (result.success) {
        toast.success("Successfully joined the team!");
        // Redirect to the salon dashboard or profile setup
        navigate('/dashboard');
      } else {
        toast.error(result.message || "Failed to accept invite");
      }
    } catch (error) {
      console.error('Error accepting invite:', error);
      toast.error("Failed to accept invite");
    } finally {
      setAccepting(false);
    }
  };

  if (loadingInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
            <p className="text-gray-600">Loading invite details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!inviteInfo || inviteInfo.status !== 'active' || new Date(inviteInfo.expires_at) < new Date()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid Invite</h2>
            <p className="text-gray-600 text-center">
              This invite link has expired or is no longer valid.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const spotsRemaining = inviteInfo.max_uses - inviteInfo.current_uses;

  if (spotsRemaining <= 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Team Full</h2>
            <p className="text-gray-600 text-center">
              All spots for this team have been filled. Please contact the salon owner for more information.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-serif">Join {inviteInfo.salon_name}</CardTitle>
          <CardDescription>
            You've been invited to join the team as {inviteInfo.default_role}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert className="bg-purple-50 border-purple-200">
            <Users className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-800">
              <strong>{spotsRemaining} spots remaining</strong> out of {inviteInfo.max_uses} total positions available.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone_number">Phone Number *</Label>
              <Input
                id="phone_number"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone_number}
                onChange={(e) => handleInputChange('phone_number', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <strong>What happens next:</strong> After joining, you'll appear as "pending" in the salon owner's dashboard. They'll review and activate your account.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              onClick={handleAcceptInvite}
              disabled={!formData.full_name || !formData.phone_number || accepting || !user}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              {accepting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Joining Team...
                </>
              ) : (
                `Join ${inviteInfo.salon_name} Team`
              )}
            </Button>
            
            {!user && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  You need to sign in first to accept this invite. 
                  <Button 
                    variant="link" 
                    className="p-0 ml-1 text-blue-800 underline"
                    onClick={() => navigate('/auth')}
                  >
                    Sign in here
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversalInviteAcceptance;