
import { BadgePercent } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

interface TranslationText {
  english: string;
  vietnamese: string;
}

// Helper function to convert string to translation object
const toTranslatableText = (text: string): TranslationText => ({
  english: text,
  vietnamese: text
});

const ReferralHeader = () => {
  const { t } = useTranslation();
  
  return (
    <CardTitle className="flex items-center text-lg">
      <BadgePercent className="h-5 w-5 text-blue-500 mr-2" />
      {t(toTranslatableText("Referral Program"))}
    </CardTitle>
  );
};

export default ReferralHeader;
