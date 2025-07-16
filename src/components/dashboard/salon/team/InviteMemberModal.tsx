import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Phone, MessageCircle, Send, CheckCircle2, Info, Users, User, Settings } from "lucide-react";
import { toast } from "sonner";
import { useTeamInvites } from "./hooks/useTeamInvites";
import { useUniversalInvites } from "./hooks/useUniversalInvites";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (data: any) => Promise<void>;
}

const InviteMemberModal = ({ 
  isOpen, 
  onClose, 
  onSendInvite 
}: InviteMemberModalProps) => {
  const { createInvite, isLoading: individualLoading } = useTeamInvites();
  const { createUniversalInvite, isLoading: universalLoading } = useUniversalInvites();
  
  const [activeTab, setActiveTab] = useState<'individual' | 'universal' | 'solo'>('individual');
  const [step, setStep] = useState<'form' | 'link'>('form');
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentInviteType, setCurrentInviteType] = useState<'individual' | 'universal'>('individual');
  
  // Individual invite data
  const [memberData, setMemberData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    role: 'technician'
  });

  // Universal invite data  
  const [universalData, setUniversalData] = useState({
    max_uses: 5,
    default_role: 'technician'
  });

  const handleInputChange = (field: string, value: string) => {
    setMemberData({ ...memberData, [field]: value });
  };

  const handleUniversalChange = (field: string, value: string | number) => {
    setUniversalData({ ...universalData, [field]: value });
  };

  const handleCreateIndividualInvite = async () => {
    if (!memberData.full_name || !memberData.phone_number) {
      toast.error("Please fill in name and phone number");
      return;
    }

    try {
      const result = await createInvite({
        full_name: memberData.full_name,
        phone_number: memberData.phone_number,
        role: memberData.role
      });

      if (result) {
        const link = `${window.location.origin}/team-invite/${result.invite_code}`;
        setInviteLink(link);
        setCurrentInviteType('individual');
        setStep('link');
        toast.success("Individual invite link created successfully!");
      }
    } catch (err) {
      console.error('Error creating individual invite:', err);
      toast.error("Failed to create invite link");
    }
  };

  const handleCreateUniversalInvite = async () => {
    try {
      const result = await createUniversalInvite(universalData.max_uses, universalData.default_role);

      if (result) {
        const link = `${window.location.origin}/universal-invite/${result.invite_code}`;
        setInviteLink(link);
        setCurrentInviteType('universal');
        setStep('link');
        toast.success(`Universal invite created! ${universalData.max_uses} spots available.`);
      }
    } catch (err) {
      console.error('Error creating universal invite:', err);
      toast.error("Failed to create universal invite");
    }
  };

  const handleSkipTeamSetup = () => {
    toast.success("Solo mode activated - you can always add team members later!");
    onClose();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: 'sms' | 'whatsapp' | 'messenger') => {
    let message = '';
    
    if (currentInviteType === 'individual') {
      message = `Hi ${memberData.full_name}! You've been invited to join our salon team as ${memberData.role}. Click this link to accept: ${inviteLink}`;
    } else {
      message = `Join our salon team! We have ${universalData.max_uses} open positions. Click this link to apply: ${inviteLink}`;
    }
    
    let shareUrl = '';
    switch (platform) {
      case 'sms':
        shareUrl = `sms:?body=${encodeURIComponent(message)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'messenger':
        shareUrl = `fb-messenger://share?text=${encodeURIComponent(message)}`;
        break;
    }
    
    if (navigator.share && platform === 'sms') {
      navigator.share({
        text: message
      }).catch(() => {
        window.open(shareUrl, '_blank');
      });
    } else {
      window.open(shareUrl, '_blank');
    }
  };

  const handleClose = () => {
    setStep('form');
    setInviteLink('');
    setCopied(false);
    setActiveTab('individual');
    setCurrentInviteType('individual');
    setMemberData({ full_name: '', phone_number: '', email: '', role: 'technician' });
    setUniversalData({ max_uses: 5, default_role: 'technician' });
    onClose();
  };

  const handleBackToForm = () => {
    setStep('form');
    setInviteLink('');
    setCopied(false);
  };

  const isLoading = individualLoading || universalLoading;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Team Setup
              </DialogTitle>
              <DialogDescription>
                Choose how you want to build your salon team
              </DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="individual" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Individual
                </TabsTrigger>
                <TabsTrigger value="universal" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Link
                </TabsTrigger>
                <TabsTrigger value="solo" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Solo Mode
                </TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <User className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Personal invite:</strong> Send a unique invite link to a specific person with their name and role.
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Maria Garcia"
                      autoComplete="name"
                      value={memberData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g., +1 (555) 123-4567"
                      autoComplete="tel"
                      value={memberData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="maria@example.com"
                      autoComplete="email"
                      value={memberData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select 
                      value={memberData.role}
                      onValueChange={(value) => handleInputChange('role', value)}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technician">Artist / Technician</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="front_desk">Front Desk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={handleClose}>Cancel</Button>
                  <Button 
                    onClick={handleCreateIndividualInvite} 
                    disabled={!memberData.full_name || !memberData.phone_number || isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? 'Creating...' : 'Create Personal Invite'}
                  </Button>
                </DialogFooter>
              </TabsContent>

              <TabsContent value="universal" className="space-y-4">
                <Alert className="bg-purple-50 border-purple-200">
                  <Users className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Universal team link:</strong> Create one link that multiple people can use to join your team. Perfect for team chats or group sharing.
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="max_uses">Maximum Team Members</Label>
                    <Select 
                      value={universalData.max_uses.toString()}
                      onValueChange={(value) => handleUniversalChange('max_uses', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of spots" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="5">5 people</SelectItem>
                        <SelectItem value="10">10 people</SelectItem>
                        <SelectItem value="15">15 people</SelectItem>
                        <SelectItem value="20">20 people</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      How many people can use this link to join your team
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="default_role">Default Role</Label>
                    <Select 
                      value={universalData.default_role}
                      onValueChange={(value) => handleUniversalChange('default_role', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select default role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technician">Artist / Technician</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="front_desk">Front Desk</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      New team members will be assigned this role (you can change it later)
                    </p>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>How it works:</strong> Share this link in your team chat. Each person must sign up with their own info. All new members will appear as "pending" until you review and approve them.
                  </AlertDescription>
                </Alert>

                <DialogFooter>
                  <Button variant="outline" onClick={handleClose}>Cancel</Button>
                  <Button 
                    onClick={handleCreateUniversalInvite} 
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? 'Creating...' : `Create Team Link (${universalData.max_uses} spots)`}
                  </Button>
                </DialogFooter>
              </TabsContent>

              <TabsContent value="solo" className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <Settings className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Solo salon mode:</strong> Skip team setup for now. You can add team members anytime later from your dashboard.
                  </AlertDescription>
                </Alert>

                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Just you for now?</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                    Perfect! Your salon dashboard will be optimized for solo operations. You can always invite team members later when you're ready to grow.
                  </p>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={handleClose}>Cancel</Button>
                  <Button 
                    onClick={handleSkipTeamSetup}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue as Solo Salon
                  </Button>
                </DialogFooter>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                {currentInviteType === 'individual' ? 'Personal Invite Ready!' : 'Team Link Ready!'}
              </DialogTitle>
              <DialogDescription>
                {currentInviteType === 'individual' 
                  ? `Share this secure link with ${memberData.full_name} to join your team`
                  : `Share this link with your team - ${universalData.max_uses} people can use it to join`
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Link created successfully!</strong> Copy and share this link using your preferred messaging method.
                </AlertDescription>
              </Alert>

              <Card>
                <CardContent className="p-4">
                  <Label className="text-sm font-medium">
                    {currentInviteType === 'individual' ? 'Personal Invite Link' : 'Universal Team Link'}
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={inviteLink}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Quick Share Options</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleShare('sms')}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Send className="h-5 w-5 text-blue-600" />
                    <span className="text-xs">SMS</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare('whatsapp')}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare('messenger')}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-xs">Messenger</span>
                  </Button>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {currentInviteType === 'individual' ? (
                    <span><strong>Instructions:</strong> Send this link to {memberData.full_name} using SMS, WhatsApp, or any messaging app. They'll create their profile and join your team.</span>
                  ) : (
                    <span><strong>Instructions:</strong> Share this link in your team chat, social media, or send directly to potential team members. Each person will create their own profile and appear in your dashboard for approval.</span>
                  )}
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleBackToForm}>
                Create Another Invite
              </Button>
              <Button onClick={handleClose} className="bg-green-600 hover:bg-green-700">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
