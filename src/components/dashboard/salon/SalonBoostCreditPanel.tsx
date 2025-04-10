
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeDollarSign, Rocket, Plus, RefreshCw, Shield, TrendingUp } from "lucide-react";
import { useSalonCredits } from "@/hooks/useSalonCredits";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router-dom";

const SalonBoostCreditPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { credits, boostStatus, loading, refreshCredits } = useSalonCredits();
  const [boosting, setBoosting] = useState(false);
  
  const handleBuyCredits = () => {
    // Temporary handling until checkout is implemented
    toast.info(t("Credit purchase will be available soon!"));
    navigate("/dashboard/owner");
  };
  
  const handleBoost = async () => {
    if (credits < 10) {
      toast.error(t("Not enough credits! You need at least 10 credits to boost your listing."));
      return;
    }
    
    setBoosting(true);
    
    try {
      // This is a placeholder for future payment flow
      setTimeout(() => {
        setBoosting(false);
        toast.info(t("Boost functionality will be implemented in a future update!"));
      }, 1000);
    } catch (error) {
      console.error("Boost error:", error);
      setBoosting(false);
      toast.error(t("Something went wrong. Please try again."));
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  
  const getDaysRemaining = () => {
    if (!boostStatus.expiresAt) return 0;
    
    const now = new Date();
    const diff = boostStatus.expiresAt.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  
  return (
    <Card className="border-purple-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BadgeDollarSign className="h-5 w-5 text-purple-500 mr-2" />
          {t("Boost & Credits")}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {loading ? (
          <div className="py-4 text-center text-gray-500">
            <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
            <p>{t("Loading credit data...")}</p>
          </div>
        ) : (
          <>
            {/* Credit Balance */}
            <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
              <div>
                <h3 className="font-medium text-purple-800">{t("Credit Balance")}</h3>
                <p className="text-2xl font-bold text-purple-700">{credits}</p>
              </div>
              <Button 
                variant="outline" 
                className="border-purple-200 hover:bg-purple-100 transition-colors"
                onClick={handleBuyCredits}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("Buy Credits")}
              </Button>
            </div>
            
            {/* Boost Status */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-blue-800 flex items-center">
                    <Rocket className="h-4 w-4 mr-1" />
                    {t("Listing Boost")}
                  </h3>
                  <p className="text-sm text-blue-600">
                    {boostStatus.isActive 
                      ? `${t("Active until")} ${formatDate(boostStatus.expiresAt)}`
                      : credits === 0 ? t("Inactive") : t("Not active")}
                  </p>
                </div>
                
                {boostStatus.isActive ? (
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {getDaysRemaining()} {t("days left")}
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                    disabled={credits < 10 || boosting}
                    onClick={handleBoost}
                  >
                    {boosting ? (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        {t("Processing")}
                      </>
                    ) : (
                      <>
                        <Rocket className="h-3 w-3 mr-1" />
                        {t("Boost Now")}
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              {boostStatus.isActive && (
                <Progress
                  value={Math.min((getDaysRemaining() / 7) * 100, 100)}
                  className="h-2 bg-blue-100"
                />
              )}
              
              <div className="mt-2 text-xs text-blue-700 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                <span>{t("10 credits for 7 days of premium visibility")}</span>
              </div>
            </div>
            
            {/* Boost Benefits */}
            <div className="mt-2 space-y-2">
              <h4 className="text-sm font-medium text-gray-700">{t("Boost Benefits")}:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-start">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                  <span>{t("3x higher visibility in search results")}</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                  <span>{t("Featured in \"Recommended Salons\" section")}</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                  <span>{t("Priority placement in salon listings")}</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonBoostCreditPanel;
