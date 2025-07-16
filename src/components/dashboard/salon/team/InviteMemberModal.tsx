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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Phone, MessageCircle, Send, CheckCircle2, Info } from "lucide-react";
import { toast } from "sonner";
import { useTeamInvites } from "./hooks/useTeamInvites";

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
  const { createInvite, isLoading } = useTeamInvites();
  const [step, setStep] = useState<'form' | 'link'>('form');
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [memberData, setMemberData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    role: 'technician'
  });

  const handleInputChange = (field: string, value: string) => {
    setMemberData({ ...memberData, [field]: value });
  };

  const handleCreateInvite = async () => {
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
        setStep('link');
        toast.success("Invite link created successfully!");
      }
    } catch (err) {
      console.error('Error creating invite:', err);
      toast.error("Failed to create invite link");
    }
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
    const message = `Hi ${memberData.full_name}! You've been invited to join our salon team as ${memberData.role}. Click this link to accept: ${inviteLink}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'sms':
        shareUrl = `sms:${memberData.phone_number}?body=${encodeURIComponent(message)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/${memberData.phone_number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
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
    setMemberData({ full_name: '', phone_number: '', email: '', role: 'technician' });
    onClose();
  };

  const handleBackToForm = () => {
    setStep('form');
    setInviteLink('');
    setCopied(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-purple-600" />
                Invite Team Member
              </DialogTitle>
              <DialogDescription>
                Invite someone to join your salon team using their phone number
              </DialogDescription>
            </DialogHeader>
            
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Phone number preferred:</strong> We'll generate a secure invite link you can send via SMS, WhatsApp, or any messaging app - no fees required!
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 py-4">
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
                <p className="text-xs text-gray-500">
                  This will be used to send the invite link via your preferred messaging app
                </p>
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
                <p className="text-xs text-gray-500">
                  Backup contact method if needed
                </p>
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
                onClick={handleCreateInvite} 
                disabled={!memberData.full_name || !memberData.phone_number || isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Creating Link...' : 'Create Invite Link'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Invite Link Ready!
              </DialogTitle>
              <DialogDescription>
                Share this secure link with {memberData.full_name} to join your team
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Link created successfully!</strong> Copy and send this link using your phone's messaging app. No SMS fees required.
                </AlertDescription>
              </Alert>

              <Card>
                <CardContent className="p-4">
                  <Label className="text-sm font-medium">Invite Link</Label>
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
                <p className="text-xs text-gray-500 text-center">
                  Click any option to open your messaging app with the invite pre-filled
                </p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Instructions:</strong> Copy the link above and send it to {memberData.full_name} using SMS, WhatsApp, Zalo, or any messaging app. They'll click the link to join your team - no app download required!
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
