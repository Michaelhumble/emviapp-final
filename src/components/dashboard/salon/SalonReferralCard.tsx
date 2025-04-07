
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import ArtistReferralCenter from "@/components/dashboard/artist/ArtistReferralCenter";

const SalonReferralCard = () => {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        {/* Vietnamese referral text for salons - making it more prominent */}
        <div className="mb-3 py-2 px-3 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-blue-700 text-sm font-medium">
            Giới thiệu chủ tiệm khác để nhận thưởng.
          </p>
        </div>
        
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-2" />
          Salon Referral Program
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Invite other salons and earn free credits. Help grow our community!
        </p>
        <ArtistReferralCenter />
      </CardContent>
    </Card>
  );
};

export default SalonReferralCard;
