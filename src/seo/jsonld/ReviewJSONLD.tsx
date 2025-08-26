import React from 'react';

export interface ReviewData {
  id: string;
  author: string;
  datePublished: string;
  reviewRating: {
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
  reviewBody: string;
  itemReviewed?: {
    name: string;
    url: string;
  };
}

interface ReviewJSONLDProps {
  reviews: ReviewData[];
}

export default function ReviewJSONLD({ reviews }: ReviewJSONLDProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const reviewsData = reviews.map(review => ({
    "@type": "Review",
    "@id": `#review-${review.id}`,
    author: {
      "@type": "Person",
      name: review.author
    },
    datePublished: review.datePublished,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.reviewRating.ratingValue,
      bestRating: review.reviewRating.bestRating || 5,
      worstRating: review.reviewRating.worstRating || 1
    },
    reviewBody: review.reviewBody,
    ...(review.itemReviewed && {
      itemReviewed: {
        "@type": "LocalBusiness",
        name: review.itemReviewed.name,
        url: review.itemReviewed.url
      }
    })
  }));

  // If single review, return it directly; if multiple, wrap in array
  const structuredData = reviewsData.length === 1 ? {
    "@context": "https://schema.org",
    ...reviewsData[0]
  } : {
    "@context": "https://schema.org",
    "@graph": reviewsData
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  );
}