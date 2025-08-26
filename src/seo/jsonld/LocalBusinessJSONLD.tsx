import React from 'react';

type LocalBusinessProps = {
  name: string;
  url: string;
  telephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string; // 'US'
  geo?: { latitude: number; longitude: number };
  openingHours?: string[]; // e.g., ["Mo-Fr 10:00-19:00","Sa 10:00-18:00"]
  priceRange?: string; // "$$"
  image?: string[];
  sameAs?: string[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
};

export default function LocalBusinessJSONLD(props: LocalBusinessProps) {
  const data: any = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: props.name,
    url: props.url,
    image: props.image,
    telephone: props.telephone,
    priceRange: props.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: props.streetAddress,
      addressLocality: props.addressLocality,
      addressRegion: props.addressRegion,
      postalCode: props.postalCode,
      addressCountry: props.addressCountry || "US",
    },
    geo: props.geo && { "@type": "GeoCoordinates", ...props.geo },
    openingHours: props.openingHours,
    sameAs: props.sameAs,
  };

  // Only add aggregateRating if both values are present and valid
  if (props.aggregateRating && props.aggregateRating.ratingValue > 0 && props.aggregateRating.reviewCount > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: props.aggregateRating.ratingValue,
      reviewCount: props.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1
    };
  }

  // Clean up undefined values
  Object.keys(data).forEach(key => {
    if (data[key] === undefined || data[key] === null) {
      delete data[key];
    }
  });

  // Clean up address object if all fields are undefined
  if (data.address && Object.values(data.address).every(val => val === undefined || val === null)) {
    delete data.address;
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}