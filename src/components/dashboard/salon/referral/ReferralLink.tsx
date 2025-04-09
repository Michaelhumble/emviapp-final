
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface ReferralLinkProps {
  referralLink: string;
  onCopy: () => void;
  copied: boolean;
}

const ReferralLink = ({ referralLink, onCopy, copied }: ReferralLinkProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {t("Your Referral Link")}
      </label>
      <div className="flex space-x-2">
        <Input 
          value={referralLink} 
          readOnly 
          className="bg-gray-50"
        />
        <Button 
          variant="outline" 
          size="icon"
          onClick={onCopy}
          className={copied ? "bg-green-50 text-green-600 border-green-200" : ""}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReferralLink;
