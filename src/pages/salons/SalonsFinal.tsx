
import React, { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Job } from '@/types/job';
import { useSalonListingsFromDatabase } from '@/hooks/useSalonListingsFromDatabase';
import ValidatedSalonCard from '@/components/salons/ValidatedSalonCard';

const SalonsFinal: React.FC = () => {
  const navigate = useNavigate();
  const { salonListings, loading, error } = useSalonListingsFromDatabase();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter salon listings by search term
  const filteredListings = salonListings.filter(salon => 
    salon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Organize salons by pricing tier
  const diamondSalons = filteredListings.filter(salon => salon.pricing_tier === 'diamond');
  const premiumSalons = filteredListings.filter(salon => salon.pricing_tier === 'premium');
  const goldSalons = filteredListings.filter(salon => salon.pricing_tier === 'gold');
  const basicSalons = filteredListings.filter(salon => salon.pricing_tier === 'basic' || salon.pricing_tier === 'free');

  const renderSalonSection = (title: string, salons: Job[], bgColor: string = 'bg-white') => {
    if (salons.length === 0) return null;

    return (
      <section className={`py-8 ${bgColor}`}>
        <Container>
          <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salons.map((salon) => (
              <ValidatedSalonCard 
                key={salon.id}
                salon={salon} 
                listingType="salon"
              />
            ))}
          </div>
        </Container>
      </section>
    );
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading salon listings...</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation */}
      <Container className="py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Home
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">Beauty Salon Directory</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover professional salons offering exceptional beauty services
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search salons by name, location, or services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {error && (
          <Alert className="mb-8 bg-red-50 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Container>

      {/* Diamond Tier Salons */}
      {renderSalonSection("💎 Diamond Tier Salons", diamondSalons, "bg-gradient-to-r from-purple-50 to-pink-50")}

      {/* Premium Tier Salons */}
      {renderSalonSection("⭐ Premium Salons", premiumSalons, "bg-gradient-to-r from-amber-50 to-orange-50")}

      {/* Gold Tier Salons */}
      {renderSalonSection("🥇 Gold Salons", goldSalons, "bg-gradient-to-r from-yellow-50 to-amber-50")}

      {/* Basic/Free Tier Salons */}
      {renderSalonSection("🏪 Featured Salons", basicSalons, "bg-gray-50")}

      {/* Show message if no salons found */}
      {!loading && salonListings.length === 0 && (
        <Container className="py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No salon listings found.</p>
            <Button onClick={() => navigate("/salon-owners")}>
              List Your Salon
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default SalonsFinal;
