
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SalonSale } from "@/types/salonSale";
import { supabase } from "@/integrations/supabase/client";
import { FeatureListingButton } from "@/components/sell-salon/FeatureListingButton";
import { useAuth } from "@/context/auth";
import { formatCurrency } from "@/utils/salonSales";

const SalonListingsManagement = () => {
  const [listings, setListings] = useState<SalonSale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) return;
    
    const fetchMyListings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('salon_sales')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching listings:", error);
          return;
        }
        
        setListings(data || []);
      } catch (error) {
        console.error("Exception fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMyListings();
  }, [user]);
  
  const refreshListings = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('salon_sales')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error refreshing listings:", error);
        return;
      }
      
      setListings(data || []);
    } catch (error) {
      console.error("Exception refreshing listings:", error);
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Store className="mr-2 h-5 w-5 text-primary" />
          My Salon Listings
        </CardTitle>
        <Button 
          size="sm" 
          onClick={() => navigate("/sell-salon/new")}
        >
          <PlusCircle className="mr-1 h-4 w-4" /> New Listing
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Salon Listings</h3>
            <p className="text-gray-600 mb-4">
              You haven't posted any salon listings yet.
            </p>
            <Button 
              onClick={() => navigate("/sell-salon/new")}
            >
              List Your Salon
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {listings.map((listing) => (
              <div key={listing.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h3 className="font-medium">{listing.salon_name}</h3>
                    <p className="text-sm text-gray-500">
                      {listing.city}, {listing.state} • {formatCurrency(listing.asking_price)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Posted: {new Date(listing.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <FeatureListingButton 
                      salonSaleId={listing.id} 
                      isFeatured={listing.is_featured || false}
                      onFeatureSuccess={refreshListings}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/sell-salon/${listing.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonListingsManagement;
