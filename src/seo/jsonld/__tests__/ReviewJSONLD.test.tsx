import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewJSONLD, { ReviewData } from '../ReviewJSONLD';

describe('ReviewJSONLD', () => {
  const mockReviews: ReviewData[] = [
    {
      id: '1',
      author: 'John Doe',
      datePublished: '2024-01-15',
      reviewRating: {
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: 'Excellent service! The nail technicians were very skilled and professional.',
      itemReviewed: {
        name: 'Test Nail Salon',
        url: 'https://www.emvi.app/salons/123'
      }
    },
    {
      id: '2',
      author: 'Jane Smith',
      datePublished: '2024-01-10',
      reviewRating: {
        ratingValue: 4
      },
      reviewBody: 'Great experience, will definitely come back!'
    }
  ];

  it('renders nothing when no reviews provided', () => {
    const { container } = render(<ReviewJSONLD reviews={[]} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeInTheDocument();
  });

  it('renders single review correctly', () => {
    const singleReview = [mockReviews[0]];
    const { container } = render(<ReviewJSONLD reviews={singleReview} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    
    const jsonData = JSON.parse(script!.textContent || '{}');
    expect(jsonData['@context']).toBe('https://schema.org');
    expect(jsonData['@type']).toBe('Review');
    expect(jsonData['@id']).toBe('#review-1');
    expect(jsonData.author.name).toBe('John Doe');
    expect(jsonData.datePublished).toBe('2024-01-15');
  });

  it('renders multiple reviews with @graph', () => {
    const { container } = render(<ReviewJSONLD reviews={mockReviews} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    
    const jsonData = JSON.parse(script!.textContent || '{}');
    expect(jsonData['@context']).toBe('https://schema.org');
    expect(jsonData['@graph']).toBeDefined();
    expect(jsonData['@graph']).toHaveLength(2);
    
    const firstReview = jsonData['@graph'][0];
    expect(firstReview['@type']).toBe('Review');
    expect(firstReview['@id']).toBe('#review-1');
    expect(firstReview.author.name).toBe('John Doe');
  });

  it('renders review rating correctly', () => {
    const singleReview = [mockReviews[0]];
    const { container } = render(<ReviewJSONLD reviews={singleReview} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.reviewRating).toEqual({
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1
    });
  });

  it('uses default rating bounds when not provided', () => {
    const singleReview = [mockReviews[1]]; // This one doesn't have bestRating/worstRating
    const { container } = render(<ReviewJSONLD reviews={singleReview} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.reviewRating).toEqual({
      '@type': 'Rating',
      ratingValue: 4,
      bestRating: 5,
      worstRating: 1
    });
  });

  it('includes itemReviewed when provided', () => {
    const singleReview = [mockReviews[0]];
    const { container } = render(<ReviewJSONLD reviews={singleReview} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.itemReviewed).toEqual({
      '@type': 'LocalBusiness',
      name: 'Test Nail Salon',
      url: 'https://www.emvi.app/salons/123'
    });
  });

  it('omits itemReviewed when not provided', () => {
    const singleReview = [mockReviews[1]]; // This one doesn't have itemReviewed
    const { container } = render(<ReviewJSONLD reviews={singleReview} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.hasOwnProperty('itemReviewed')).toBe(false);
  });

  it('renders review body correctly', () => {
    const singleReview = [mockReviews[0]];
    const { container } = render(<ReviewJSONLD reviews={singleReview} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.reviewBody).toBe('Excellent service! The nail technicians were very skilled and professional.');
  });
});