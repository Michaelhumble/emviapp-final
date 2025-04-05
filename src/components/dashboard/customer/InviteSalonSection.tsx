
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, Send, CheckCircle, Clipboard } from "lucide-react";
import { toast } from "sonner";

const InviteSalonSection = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [invitesSent, setInvitesSent] = useState(0);
  
  const handleSendInvite = () => {
    if (!emailInput || !emailInput.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending an invitation
    setTimeout(() => {
      setIsSending(false);
      setInvitesSent(prev => prev + 1);
      setEmailInput("");
      toast.success("Invitation sent successfully!");
    }, 1500);
  };
  
  const handleCopyLink = () => {
    const inviteLink = "https://emviapp.com/invite-salon";
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard!");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Store className="h-5 w-5 text-primary" />
          Invite a Salon
        </CardTitle>
        <CardDescription>
          Help your favorite salons get discovered
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Invite your favorite salons to join EmviApp and get exclusive offers and discounts.
        </p>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="salon-email" className="text-sm font-medium">
            Salon Email
          </label>
          <div className="flex gap-2">
            <Input
              id="salon-email"
              type="email"
              placeholder="salon@example.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Button 
              onClick={handleSendInvite} 
              disabled={isSending || !emailInput}
              className="shrink-0"
            >
              {isSending ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm pt-2">
          <div className="flex items-center gap-1 text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{invitesSent} invitations sent</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleCopyLink} className="h-8">
            <Clipboard className="h-4 w-4 mr-1" />
            Copy Link
          </Button>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 text-xs text-muted-foreground">
        When salons you invite join, they'll appear in your feed first.
      </CardFooter>
    </Card>
  );
};

export default InviteSalonSection;
