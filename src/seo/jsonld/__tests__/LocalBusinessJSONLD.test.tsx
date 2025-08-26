import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocalBusinessJSONLD from '../LocalBusinessJSONLD';

describe('LocalBusinessJSONLD', () => {
  const mockProps = {
    name: 'Test Nail Salon',
    url: 'https://www.emvi.app/salons/123',
    telephone: '(555) 123-4567',
    streetAddress: '123 Main St',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10001',
    addressCountry: 'US',
    geo: { latitude: 40.7128, longitude: -74.0060 },
    openingHours: ['Mo-Fr 10:00-19:00', 'Sa 10:00-18:00'],
    priceRange: '$$',
    image: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    sameAs: ['https://instagram.com/testsalon', 'https://facebook.com/testsalon'],
    aggregateRating: { ratingValue: 4.5, reviewCount: 25 }
  };

  it('renders structured data script with all props', () => {
    const { container } = render(<LocalBusinessJSONLD {...mockProps} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    
    const jsonData = JSON.parse(script!.textContent || '{}');
    expect(jsonData['@context']).toBe('https://schema.org');
    expect(jsonData['@type']).toBe('NailSalon');
    expect(jsonData.name).toBe('Test Nail Salon');
    expect(jsonData.url).toBe('https://www.emvi.app/salons/123');
    expect(jsonData.telephone).toBe('(555) 123-4567');
    expect(jsonData.priceRange).toBe('$$');
  });

  it('renders address object correctly', () => {
    const { container } = render(<LocalBusinessJSONLD {...mockProps} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.address).toEqual({
      '@type': 'PostalAddress',
      streetAddress: '123 Main St',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US'
    });
  });

  it('renders geo coordinates correctly', () => {
    const { container } = render(<LocalBusinessJSONLD {...mockProps} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.geo).toEqual({
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.0060
    });
  });

  it('renders aggregate rating correctly', () => {
    const { container } = render(<LocalBusinessJSONLD {...mockProps} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.aggregateRating).toEqual({
      '@type': 'AggregateRating',
      ratingValue: 4.5,
      reviewCount: 25,
      bestRating: 5,
      worstRating: 1
    });
  });

  it('omits aggregate rating when values are invalid', () => {
    const propsWithoutRating = {
      ...mockProps,
      aggregateRating: { ratingValue: 0, reviewCount: 0 }
    };
    
    const { container } = render(<LocalBusinessJSONLD {...propsWithoutRating} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.aggregateRating).toBeUndefined();
  });

  it('handles minimal props correctly', () => {
    const minimalProps = {
      name: 'Minimal Salon',
      url: 'https://www.emvi.app/salons/456'
    };
    
    const { container } = render(<LocalBusinessJSONLD {...minimalProps} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData['@context']).toBe('https://schema.org');
    expect(jsonData['@type']).toBe('NailSalon');
    expect(jsonData.name).toBe('Minimal Salon');
    expect(jsonData.url).toBe('https://www.emvi.app/salons/456');
    expect(jsonData.address).toBeUndefined();
    expect(jsonData.geo).toBeUndefined();
    expect(jsonData.aggregateRating).toBeUndefined();
  });

  it('omits undefined fields from output', () => {
    const partialProps = {
      name: 'Partial Salon',
      url: 'https://www.emvi.app/salons/789',
      telephone: '(555) 987-6543'
      // Missing other optional fields
    };
    
    const { container } = render(<LocalBusinessJSONLD {...partialProps} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent || '{}');
    
    expect(jsonData.name).toBe('Partial Salon');
    expect(jsonData.telephone).toBe('(555) 987-6543');
    expect(jsonData.hasOwnProperty('streetAddress')).toBe(false);
    expect(jsonData.hasOwnProperty('geo')).toBe(false);
    expect(jsonData.hasOwnProperty('sameAs')).toBe(false);
  });
});