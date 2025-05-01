
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/context/auth";

const CardDescription = () => {
  const { t, isVietnamese } = useTranslation();
  const { userProfile } = useAuth();
  
  const descriptionText = isVietnamese 
    ? "Xem những nghệ sĩ hàng đầu và ngôi sao mới nổi trong khu vực của bạn." 
    : "View top-rated freelancers and rising stars in your area.";
  
  return (
    <p className="text-sm text-muted-foreground">
      {descriptionText}
      <span className="text-[0.65rem] block mt-0.5">
        {userProfile?.preferred_language?.toLowerCase() === 'vietnamese' 
          ? "Xem những nghệ sĩ hàng đầu gần bạn"
          : ""}
      </span>
    </p>
  );
};

export default CardDescription;
