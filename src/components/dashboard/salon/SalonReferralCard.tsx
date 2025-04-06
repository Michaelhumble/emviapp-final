
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import ArtistReferralCenter from "@/components/dashboard/artist/ArtistReferralCenter";

const SalonReferralCard = () => {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        {/* Vietnamese referral text for salons */}
        <p className="text-gray-500 text-sm italic mb-2">
          <span className="block">Giới thiệu bạn bè và nhận thưởng từ Emvi.</span>
          <span className="block">Invite friends and earn rewards from Emvi.</span>
        </p>
        
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-2" />
          Salon Referral Program
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Invite other salon owners and beauty professionals to EmviApp and earn rewards!
        </p>
        <ArtistReferralCenter />
      </CardContent>
    </Card>
  );
};

export default SalonReferralCard;
