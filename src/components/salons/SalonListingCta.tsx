
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Call-to-action component displayed at the bottom of salon detail pages
 * to encourage users to list their own salons
 */
const SalonListingCta = () => {
  return (
    <div className="container mx-auto py-12">
      <Card className="bg-gradient-to-r from-rose-50 to-orange-50 border-0 shadow-md">
        <CardContent className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                Do you have a salon to sell?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                List your salon on EmviApp and connect with qualified buyers. Our platform helps salon owners find the right buyers quickly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <Link to="/salons/post">List Your Salon</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/salons">View Other Listings</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-100 rounded-full w-48 h-48 flex items-center justify-center">
                <div className="text-orange-500 text-5xl font-bold">+</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingCta;
