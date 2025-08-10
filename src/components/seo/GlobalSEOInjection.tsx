import React from 'react';
import BaseSEO from './BaseSEO';
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from './jsonld';

const GlobalSEOInjection: React.FC = () => {
  return <BaseSEO jsonLd={[buildOrganizationJsonLd(), buildWebsiteJsonLd()]} />;
};

export default GlobalSEOInjection;
