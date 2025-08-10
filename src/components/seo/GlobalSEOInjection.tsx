import React from 'react';
import BaseSEO from './BaseSEO';

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EmviApp',
  url: 'https://www.emvi.app',
  logo: 'https://www.emvi.app/logo-512.png',
  sameAs: [
    'https://www.youtube.com/@EmviApp',
    'https://www.instagram.com/emvi.app',
    'https://www.facebook.com/EmviApp',
    'https://www.tiktok.com/@emviapp',
    'https://x.com/EmviApp',
  ],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'EmviApp',
  url: 'https://www.emvi.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.emvi.app/jobs?query={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const GlobalSEOInjection: React.FC = () => {
  return <BaseSEO jsonLd={[org, website]} />;
};

export default GlobalSEOInjection;
