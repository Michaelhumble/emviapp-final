
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { MapPin, DollarSign } from 'lucide-react';

// Enhanced booth listings data with high-quality images
const SAMPLE_BOOTHS = [
  {
    id: '1',
    title: 'Premium Salon Booth #1',
    location: 'Downtown, Los Angeles, CA',
    price: 275,
    priceUnit: 'week',
    imageUrl: '/lovable-uploads/309a44f7-5049-447f-b754-f5d0e0489098.png',
    available: true
  },
  {
    id: '2',
    title: 'Luxury Styling Booth #2',
    location: 'Beverly Hills, Los Angeles, CA',
    price: 300,
    priceUnit: 'week',
    imageUrl: '/lovable-uploads/f97a440a-ebc5-4ac9-8b59-e8514a7bd514.png',
    available: true
  },
  {
    id: '3',
    title: 'Affordable Booth #3',
    location: 'Pasadena, CA',
    price: 225,
    priceUnit: 'week',
    imageUrl: '/lovable-uploads/5a445a21-8d55-4ad1-a31e-fff7b5f34852.png',
    available: true
  },
  {
    id: '4',
    title: 'Modern Salon Space #4',
    location: 'Santa Monica, CA',
    price: 325,
    priceUnit: 'week',
    imageUrl: '/lovable-uploads/9e679247-cf36-42c8-a8ba-0cb0e44ea72a.png',
    available: false
  },
];

const BoothsIndex = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Booth Rentals</h1>
          <p className="text-muted-foreground mt-2">
            Find the perfect salon booth to rent for your beauty business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_BOOTHS.map(booth => (
            <Card key={booth.id} className="overflow-hidden h-full flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <ImageWithFallback
                  src={booth.imageUrl}
                  alt={booth.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  businessName="Salon Booth"
                  fallbackImage="https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?q=80&w=2070&auto=format&fit=crop"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{booth.title}</CardTitle>
                  <Badge 
                    variant={booth.available ? "outline" : "secondary"} 
                    className={booth.available ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}
                  >
                    {booth.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {booth.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-lg font-semibold">
                  <DollarSign className="h-5 w-5 text-primary" />
                  {booth.price}/{booth.priceUnit}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/booths/${booth.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BoothsIndex;
