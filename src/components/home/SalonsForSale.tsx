
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import SalonListings from '@/components/salons/SalonListings';
import { realSalonListings } from '@/data/salons/realSalonListings';
import SalonsLoadingState from '@/components/salons/SalonsLoadingState';
import { Link } from 'react-router-dom';
import ValidatedLink from '@/components/common/ValidatedLink';

// Use real salon listings data

export default function SalonsForSale() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for a better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Use real salon listings
  const allSalonListings = realSalonListings;

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold mb-2">Tiệm Nail Cần Bán</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Browse our curated selection of nail salons for sale across the United States.
            Find your next business opportunity with EmviApp.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/salons">
              <Button variant="outline">View All Listings</Button>
            </Link>
            <ValidatedLink to="/salon-owners" listingId="salon-owners" listingType="page" fallbackRoute="/signup">
              <Button>List Your Salon</Button>
            </ValidatedLink>
          </div>
        </div>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium">Featured Salon Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SalonsLoadingState count={4} />
            ) : (
              <SalonListings salonsForSale={allSalonListings} />
            )}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
