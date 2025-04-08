
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

interface ReferralLinkProps {
  referralLink: string;
  onCopy: () => void;
  copied: boolean;
}

const ReferralLink = ({ referralLink, onCopy, copied }: ReferralLinkProps) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{t("Your Referral Link")}</p>
      <div className="flex">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 p-2 text-sm border rounded-l-md bg-gray-50"
        />
        <Button
          size="sm"
          onClick={onCopy}
          className={`rounded-l-none ${copied ? 'bg-green-500' : ''}`}
        >
          {copied ? t("Copied!") : t("Copy")}
        </Button>
      </div>
    </div>
  );
};

export default ReferralLink;
