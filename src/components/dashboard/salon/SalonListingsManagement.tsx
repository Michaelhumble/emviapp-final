import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  PlusCircle, 
  Store, 
  Star, 
  Edit, 
  Lock, 
  Trash2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SalonSale } from "@/types/salonSale";
import { supabase } from "@/integrations/supabase/client";
import { FeatureListingButton } from "@/components/sell-salon/FeatureListingButton";
import { useAuth } from "@/context/auth";
import { formatCurrency } from "@/utils/salonSales";
import { checkCredits } from "@/utils/credits";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

const SalonListingsManagement = () => {
  const [listings, setListings] = useState<SalonSale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCredits, setHasCredits] = useState(false);
  const [hasFeaturedListing, setHasFeaturedListing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) return;
    
    fetchMyListings();
  }, [user]);
  
  const fetchMyListings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('salon_sales')
        .select('*, photos:salon_sale_photos(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching listings:", error);
        toast.error("Failed to load your listings");
        return;
      }
      
      const processedData = data?.map(item => {
        const photos = Array.isArray(item.photos) 
          ? item.photos 
          : (item.photos ? [] : []);
        
        return {
          ...item,
          photos
        };
      }) || [];
      
      setListings(processedData as SalonSale[]);
      
      setHasFeaturedListing(processedData.some(listing => listing.is_featured));
      
      const userCredits = await checkCredits(user.id);
      setHasCredits(userCredits >= 10);
    } catch (error) {
      console.error("Exception fetching listings:", error);
      toast.error("Error loading listings");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditListing = (listingId: string) => {
    navigate(`/sell-salon/${listingId}`);
  };
  
  const handleUnpublishListing = async (listingId: string) => {
    if (!user) return;
    
    setIsUpdatingStatus(true);
    try {
      const { error } = await supabase
        .from('salon_sales')
        .update({ status: 'inactive' })
        .eq('id', listingId)
        .eq('user_id', user.id); // Security check
        
      if (error) {
        console.error("Error unpublishing listing:", error);
        toast.error("Failed to unpublish listing");
        return;
      }
      
      toast.success("Listing unpublished successfully");
      fetchMyListings(); // Refresh listings
    } catch (error) {
      console.error("Exception unpublishing listing:", error);
      toast.error("Error updating listing status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  const handleRepublishListing = async (listingId: string) => {
    if (!user) return;
    
    setIsUpdatingStatus(true);
    try {
      const { error } = await supabase
        .from('salon_sales')
        .update({ status: 'active' })
        .eq('id', listingId)
        .eq('user_id', user.id); // Security check
        
      if (error) {
        console.error("Error republishing listing:", error);
        toast.error("Failed to republish listing");
        return;
      }
      
      toast.success("Listing published successfully");
      fetchMyListings(); // Refresh listings
    } catch (error) {
      console.error("Exception republishing listing:", error);
      toast.error("Error updating listing status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  const openDeleteDialog = (listingId: string) => {
    setListingToDelete(listingId);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteListing = async () => {
    if (!user || !listingToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error: photosError } = await supabase
        .from('salon_sale_photos')
        .delete()
        .eq('salon_sale_id', listingToDelete);
        
      if (photosError) {
        console.error("Error deleting listing photos:", photosError);
      }
      
      const { error } = await supabase
        .from('salon_sales')
        .delete()
        .eq('id', listingToDelete)
        .eq('user_id', user.id); // Security check
        
      if (error) {
        console.error("Error deleting listing:", error);
        toast.error("Failed to delete listing");
        setDeleteDialogOpen(false);
        return;
      }
      
      toast.success("Listing deleted successfully");
      fetchMyListings(); // Refresh listings
    } catch (error) {
      console.error("Exception deleting listing:", error);
      toast.error("Error deleting listing");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    }
  };
  
  const getListingThumbnail = (listing: SalonSale) => {
    if (listing.photos && listing.photos.length > 0) {
      return listing.photos[0].photo_url;
    }
    return null;
  };
  
  const getStatusBadge = (listing: SalonSale) => {
    if (listing.is_featured) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          <Star className="w-3 h-3 mr-1 fill-amber-500" />
          Featured
        </span>
      );
    }
    
    if (listing.status === 'active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <Lock className="w-3 h-3 mr-1" />
        Inactive
      </span>
    );
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
        {hasCredits && listings.length > 0 && !hasFeaturedListing && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start">
              <Star className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800">Boost Your Listing</p>
                <p className="text-sm text-amber-700">
                  Use your credits to feature a listing and get more visibility from potential buyers.
                </p>
              </div>
            </div>
          </div>
        )}
        
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <ImageWithFallback
                    src={getListingThumbnail(listing)}
                    alt={listing.salon_name}
                    className="w-full h-full object-cover"
                    fallbackImage="https://emvi.app/images/fallback-profile.jpg"
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(listing)}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg truncate">{listing.salon_name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {listing.city}, {listing.state} • {formatCurrency(listing.asking_price)}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    Posted: {new Date(listing.created_at).toLocaleDateString()}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditListing(listing.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    
                    {listing.status === 'active' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUnpublishListing(listing.id)}
                        disabled={isUpdatingStatus}
                      >
                        <Lock className="h-4 w-4 mr-1" /> Unpublish
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRepublishListing(listing.id)}
                        disabled={isUpdatingStatus}
                      >
                        Republish
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => openDeleteDialog(listing.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                  
                  {!listing.is_featured && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <FeatureListingButton
                        salonSaleId={listing.id}
                        isFeatured={false}
                        onFeatureSuccess={fetchMyListings}
                        isOwner={true}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this salon listing? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteListing}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Listing"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default SalonListingsManagement;
