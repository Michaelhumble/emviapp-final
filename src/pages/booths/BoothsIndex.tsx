import React from 'react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { MapPin, DollarSign } from 'lucide-react';
import { getAllBooths } from '@/utils/featuredContent';

const BoothsIndex = () => {
  const booths = getAllBooths();

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif mb-2">Booth Rentals</h1>
        <p className="text-gray-600">Find booth rental opportunities in your area.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booths.map((booth) => (
          <Card key={booth.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-gray-100">
                <ImageWithFallback
                  src={booth.image || ""}
                  alt={booth.title || "Booth Rental"}
                  className="object-cover w-full h-full"
                />
              </div>
              <Badge className="absolute top-2 left-2 bg-white text-black rounded-full">{booth.type}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{booth.title}</h3>
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {booth.location}
              </div>
              <div className="flex items-center text-gray-700 font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                {booth.price} / month
              </div>
              <Button variant="outline" className="mt-4 w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default BoothsIndex;
