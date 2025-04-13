
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, MapPin, DollarSign, Calendar, ArrowRight, Phone, Mail } from 'lucide-react';

// Type definition for a booth rental
interface BoothRental {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  priceUnit: 'day' | 'week' | 'month';
  imageUrl: string;
  available: boolean;
  availableFrom: string;
  features: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  salonName: string;
}

// Placeholder booth data based on ID
const getBoothData = (id: string): BoothRental => {
  // In a real app, this would fetch from a database
  return {
    id,
    title: `Premium Salon Booth #${id}`,
    description: `This spacious booth rental is perfect for beauty professionals looking for a prime location. Booth #${id} features excellent lighting, ample storage, and a modern design. Located in a high-traffic area with established clientele.`,
    location: 'Downtown Fashion District, Los Angeles, CA',
    price: 250 + (parseInt(id) * 25),
    priceUnit: 'week',
    imageUrl: `https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800`,
    available: true,
    availableFrom: '2025-05-01',
    features: [
      'Professional styling chair',
      'Premium shampoo bowl',
      'Storage cabinet',
      'Free WiFi',
      'Utilities included',
      'Reception services',
      'Parking available',
      'Marketing support'
    ],
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah@beautysalon.com',
    contactPhone: '(213) 555-1234',
    salonName: 'Elegance Beauty Salon'
  };
};

const BoothDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [booth, setBooth] = useState<BoothRental | null>(null);

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      if (id) {
        const boothData = getBoothData(id);
        setBooth(boothData);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!booth) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Booth Not Found</h2>
                <p className="mt-2 text-muted-foreground">
                  The booth you're looking for doesn't exist or has been removed.
                </p>
                <Button className="mt-6" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content - 2/3 width on desktop */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={booth.imageUrl}
                  alt={booth.title}
                  className="w-full h-full object-cover"
                  fallbackImage="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{booth.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {booth.location}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={booth.available ? "success" : "destructive"}
                    className={booth.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {booth.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{booth.description}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {booth.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Availability</h3>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span>Available from {new Date(booth.availableFrom).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Rental Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <div className="flex items-center font-semibold text-lg">
                    <DollarSign className="h-5 w-5 mr-1 text-primary" />
                    {booth.price}/{booth.priceUnit}
                  </div>
                </div>
                <Separator />
                <div>
                  <Button className="w-full">Contact About This Booth</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardDescription>{booth.salonName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span>{booth.contactPhone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  <span>{booth.contactEmail}</span>
                </div>
                <Separator />
                <div>
                  <Button variant="outline" className="w-full">
                    View Salon Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BoothDetail;
