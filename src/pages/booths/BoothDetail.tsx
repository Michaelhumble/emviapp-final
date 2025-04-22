import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { MapPin, DollarSign, Calendar, CheckCircle, Info, Phone, Mail, User, ArrowLeft } from 'lucide-react';
import { BoothRental } from '@/types/booth';

const BoothDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Placeholder booth data
  const boothData: BoothRental = {
    id: id || '1',
    title: 'Premium Salon Booth #1',
    description: 'This spacious booth is perfect for a nail tech, hair stylist, or esthetician. Located in a high-traffic area with great natural lighting. The booth includes a styling chair, cabinet storage, and shared access to a washing station. The salon provides free WiFi, coffee for clients, and has a modern, inviting atmosphere. We have a loyal client base and get excellent foot traffic from the adjacent shopping center.',
    location: 'Downtown, Los Angeles, CA',
    price: 275,
    priceUnit: 'week',
    imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800',
    available: true,
    availableFrom: '2023-05-01',
    features: [
      'Private workspace',
      'Storage cabinet',
      'Free WiFi',
      'Reception services',
      'Utilities included',
      'Prime location',
      'Product retail opportunity',
      'Free parking'
    ],
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah@beautysalon.com',
    contactPhone: '(213) 555-1234',
    salonName: 'Elegance Beauty Salon',
    salonId: 'salon-123'
  };

  const formatPriceUnit = (unit: 'day' | 'week' | 'month') => {
    switch(unit) {
      case 'day': return 'per day';
      case 'week': return 'per week';
      case 'month': return 'per month';
      default: return unit;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-6">
          <Link to="/booths" className="flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all booth rentals
          </Link>
          <h1 className="text-3xl font-bold">{boothData.title}</h1>
          <div className="flex items-center mt-2">
            <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-muted-foreground">{boothData.location}</span>
            <Badge 
              variant={boothData.available ? "outline" : "destructive"} 
              className={
                boothData.available 
                  ? "ml-4 bg-green-50 text-green-700 border-green-200" 
                  : "ml-4"
              }
            >
              {boothData.available ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-lg overflow-hidden">
              <ImageWithFallback
                src={boothData.imageUrl}
                alt={boothData.title}
                className="w-full h-[300px] md:h-[400px] object-cover"
                fallbackImage="/placeholder.svg"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">About This Booth</h2>
              <p className="text-gray-700">{boothData.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {boothData.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Salon Information</h2>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">{boothData.salonName}</h3>
                  <p className="text-muted-foreground mb-4">
                    This booth is located within {boothData.salonName}, a well-established salon in {boothData.location.split(',')[0]}.
                  </p>
                  <Button variant="outline" className="w-full sm:w-auto">
                    View Salon Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center text-2xl font-bold mb-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                  ${boothData.price} {formatPriceUnit(boothData.priceUnit)}
                </div>
                
                <div className="flex items-center mb-6">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Available from {formatDate(boothData.availableFrom)}</span>
                </div>

                <Button className="w-full mb-4">Contact About This Booth</Button>
                <Button variant="outline" className="w-full">Schedule a Viewing</Button>
                
                <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      This booth is currently available. Contact the salon owner quickly as booth rentals are in high demand.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">{boothData.contactName}</p>
                      <p className="text-sm text-muted-foreground">Salon Owner</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">{boothData.contactPhone}</p>
                      <p className="text-sm text-muted-foreground">Call or Text</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">{boothData.contactEmail}</p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                  </div>
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
