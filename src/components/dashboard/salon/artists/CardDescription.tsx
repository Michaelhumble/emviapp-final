
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/context/auth";

const CardDescription = () => {
  const { t } = useTranslation();
  const { userProfile } = useAuth();
  
  return (
    <p className="text-sm text-muted-foreground">
      {t("View top-rated freelancers and rising stars in your area.")}
      <span className="text-[0.65rem] block mt-0.5">
        {userProfile?.preferred_language?.toLowerCase() === 'vietnamese' 
          ? "Xem những nghệ sĩ hàng đầu gần bạn"
          : ""}
      </span>
    </p>
  );
};

export default CardDescription;
