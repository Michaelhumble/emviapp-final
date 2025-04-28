
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/auth';

const SalonListingCta = () => {
  const { userProfile } = useAuth();
  const isSeller = userProfile?.role === 'seller' || userProfile?.role === 'salon_owner';

  if (isSeller) return null;

  return (
    <div className="py-12 px-4 border-t mt-12">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="font-serif text-2xl mb-4">
          Want to sell your salon or booth rental?
        </h3>
        <p className="text-gray-600 mb-6">
          Get discovered by thousands of qualified buyers on EmviApp.
        </p>
        <Link to="/salon-listing">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            List Your Salon Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SalonListingCta;
