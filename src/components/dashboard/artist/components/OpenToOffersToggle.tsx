
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Edit, Eye, Sparkles } from "lucide-react";
import OpenToOffersModal, { OpenToOffersData } from "./OpenToOffersModal";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const OpenToOffersToggle = () => {
  const { userProfile, refreshProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isOpenToOffers = userProfile?.open_to_offers || false;
  const offersData = userProfile?.offers_data as OpenToOffersData | undefined;

  const handleToggleOffers = async (data?: OpenToOffersData) => {
    setIsLoading(true);
    try {
      const updateData = data ? {
        open_to_offers: true,
        offers_data: data,
        spotlight_until: data.spotlightEnabled ? 
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null
      } : {
        open_to_offers: false,
        offers_data: null,
        spotlight_until: null
      };

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userProfile?.id);

      if (error) throw error;
      
      await refreshProfile();
      toast.success(data ? "You're now open to offers!" : "No longer open to offers");
    } catch (error) {
      console.error('Error updating offers status:', error);
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const isSpotlighted = userProfile?.spotlight_until && 
    new Date(userProfile.spotlight_until) > new Date();

  return (
    <>
      <Card className="border-dashed border-primary/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Open to Offers
              {isSpotlighted && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Spotlighted
                </Badge>
              )}
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {isOpenToOffers && offersData ? (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Live & Visible</span>
                </div>
                <h4 className="font-medium text-sm">{offersData.headline}</h4>
                <p className="text-xs text-muted-foreground mt-1">{offersData.bio}</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleToggleOffers()}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-700"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Let salons know you're looking for new opportunities
              </p>
              <Button 
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className="w-full"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Start Receiving Offers
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <OpenToOffersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleToggleOffers}
        currentData={offersData}
      />
    </>
  );
};

export default OpenToOffersToggle;
