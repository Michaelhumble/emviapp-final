
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, Share2, DollarSign, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";

const ArtistReferralCenter = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate a referral link based on user ID
  const referralLink = user ? `https://emviapp.com/ref/${user.id?.substring(0, 8)}` : "https://emviapp.com/join";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Referral Center</CardTitle>
        <CardDescription>Invite friends and earn rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-purple-100"
        >
          <div className="flex items-start space-x-3">
            <DollarSign className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm text-purple-900">Earn while you share</h4>
              <p className="text-xs text-purple-700 mt-1">
                Get $5 for each friend who joins EmviApp using your link and becomes a verified artist.
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium">Your Referral Link</label>
          <div className="flex space-x-2">
            <Input value={referralLink} readOnly className="font-mono text-sm" />
            <Button onClick={handleCopy} variant="outline" className="shrink-0">
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-purple-500 mr-1.5" />
              <span className="text-sm font-medium">Referral Stats</span>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-white border rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Total Referrals</p>
              <p className="font-bold text-xl">4</p>
            </div>
            <div className="bg-white border rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Earnings</p>
              <p className="font-bold text-xl">$20</p>
            </div>
          </div>
        </div>
        
        <Button className="w-full">
          <Share2 className="h-4 w-4 mr-1.5" />
          Share Your Link
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtistReferralCenter;
