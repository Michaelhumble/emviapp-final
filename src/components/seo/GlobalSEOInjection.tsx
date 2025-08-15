import React from 'react';
import BaseSEO from './BaseSEO';
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from './jsonld';

const GlobalSEOInjection: React.FC = () => {
  return (
    <BaseSEO 
      title="EmviApp - The Beauty Industry's Missing Piece"
      description="Discover premium beauty opportunities, connect with top salons, and grow your career. Join thousands of nail technicians, hair stylists, barbers, and beauty professionals."
      canonical="https://www.emvi.app"
      jsonLd={[buildOrganizationJsonLd(), buildWebsiteJsonLd()]} 
    />
  );
};

export default GlobalSEOInjection;