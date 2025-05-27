
import { MapPin } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

const CardHeader = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-between mb-1">
      <CardTitle className="text-lg flex items-center">
        <MapPin className="h-5 w-5 text-amber-500 mr-2" />
        {t("Top Artists Near You")}
      </CardTitle>
    </div>
  );
};

export default CardHeader;
