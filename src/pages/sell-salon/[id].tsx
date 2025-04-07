
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSalonSaleById, formatCurrency } from '@/utils/salonSales';
import { SalonSale } from '@/types/salonSale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Store, 
  MapPin, 
  Calendar, 
  FireIcon,
  MessageSquare,
  ChevronLeft
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import NotFound from '@/pages/NotFound';

const SalonSaleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<SalonSale | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    const loadSalonDetails = async () => {
      try {
        if (!id) {
          setError(true);
          return;
        }
        
        setLoading(true);
        const salonData = await fetchSalonSaleById(id);
        
        if (salonData) {
          setSalon(salonData as SalonSale);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading salon sale:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSalonDetails();
  }, [id]);

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading salon details...</div>
        </div>
      </div>
    );
  }

  if (error || !salon) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/sell-salon" className="inline-flex items-center text-primary hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Salon Listings
        </Link>
      </div>

      {/* Private Listing Warning */}
      {salon.is_private && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
          <p className="text-amber-800 font-medium">
            Private listing — only visible to approved buyers
          </p>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
          {salon.salon_name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {salon.city}, {salon.state}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            Listed {formatDate(salon.created_at)}
          </div>
          {salon.is_urgent && (
            <Badge className="bg-red-500 hover:bg-red-600">
              <FireIcon className="h-3 w-3 mr-1" /> Urgent Sale
            </Badge>
          )}
          {salon.business_type && (
            <Badge variant="outline">
              {salon.business_type}
            </Badge>
          )}
        </div>
        
        <h2 className="text-2xl md:text-3xl text-primary font-semibold mb-6">
          Listed for {formatCurrency(salon.asking_price)}
        </h2>
      </div>
      
      {/* Photo Gallery */}
      <div className="mb-10">
        {salon.photos && salon.photos.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {salon.photos.map((photo) => (
                <CarouselItem key={photo.id}>
                  <div className="aspect-video w-full overflow-hidden rounded-xl">
                    <img 
                      src={photo.photo_url} 
                      alt={salon.salon_name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
          <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-xl">
            <Store className="h-20 w-20 text-gray-300" />
          </div>
        )}
      </div>
      
      {/* Details and Contact Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Details Section */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Business Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {salon.business_type && (
                  <div>
                    <p className="text-gray-500 text-sm">Business Type</p>
                    <p className="font-medium">{salon.business_type}</p>
                  </div>
                )}
                {salon.size && (
                  <div>
                    <p className="text-gray-500 text-sm">Size</p>
                    <p className="font-medium">{salon.size}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500 text-sm">Asking Price</p>
                  <p className="font-medium">{formatCurrency(salon.asking_price)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="font-medium">{salon.city}, {salon.state}</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <div className="whitespace-pre-line mb-6">
                {salon.description}
              </div>
              
              <div className="border-t pt-6 text-gray-600 italic mt-6">
                <p>Liên hệ với người bán qua EmviApp để biết thêm thông tin.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Card */}
        <div className="md:col-span-1">
          <Card className="bg-white shadow-md sticky top-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Interested in this salon?</h3>
              <p className="text-gray-600 mb-6">
                Contact the seller to learn more about this business opportunity.
              </p>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setShowInquiryModal(true)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Inquiry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Inquiry Modal */}
      <Dialog open={showInquiryModal} onOpenChange={setShowInquiryModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Seller</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-gray-600">
              This feature is coming soon! You'll be able to send direct inquiries to salon sellers.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowInquiryModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalonSaleDetail;
