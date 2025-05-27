
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import { useTranslation } from "@/hooks/useTranslation";

const SalonNotificationCenter = () => {
  const { t } = useTranslation();

  return (
    <NotificationCenter variant="card" />
  );
};

export default SalonNotificationCenter;
