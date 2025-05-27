
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeDollarSign, Plus } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { checkCredits } from "@/utils/credits";
import { useTranslation } from "@/hooks/useTranslation";

const SalonCreditStatus = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchCredits = async () => {
      try {
        const userCredits = await checkCredits(user.id);
        setCredits(userCredits);
      } catch (err) {
        console.error("Error fetching credits:", err);
      }
    };
    
    fetchCredits();
    
    // Setup a refresh interval
    const interval = setInterval(fetchCredits, 60000); // refresh every minute
    
    return () => clearInterval(interval);
  }, [user]);
  
  const handleAddCredits = () => {
    toast.info(t("Credit purchase will be available soon!"));
  };
  
  return (
    <Card className="border-purple-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BadgeDollarSign className="h-5 w-5 text-purple-500 mr-2" />
          {t("Credit Status")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-sm text-purple-600">{t("Current Balance")}</p>
              <p className="text-2xl font-bold text-purple-800">{credits} {t("credits")}</p>
            </div>
            <Button 
              className="bg-white text-purple-600 hover:bg-purple-50 border border-purple-200"
              onClick={handleAddCredits}
              disabled={loading}
            >
              <Plus className="h-4 w-4 mr-1" />
              {t("Add Credits")}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-white p-3 rounded-md border border-gray-100">
              <p className="text-gray-500">{t("Featured Listing")}</p>
              <p className="font-medium flex items-center">
                <BadgeDollarSign className="h-4 w-4 text-amber-500 mr-1" />
                10 {t("credits")}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md border border-gray-100">
              <p className="text-gray-500">{t("Post Job")}</p>
              <p className="font-medium flex items-center">
                <BadgeDollarSign className="h-4 w-4 text-green-500 mr-1" />
                0 {t("credits")} <span className="ml-1 text-xs text-green-500">{t("(Free)")}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCreditStatus;
