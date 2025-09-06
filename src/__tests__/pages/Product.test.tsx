import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Product from '@/pages/Product';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <HelmetProvider>
      {children}
    </HelmetProvider>
  </BrowserRouter>
);

describe('Product Page', () => {
  it('renders SoftwareApplication and Organization JSON-LD', () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>
    );

    // Check for JSON-LD scripts
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);

    // Verify SoftwareApplication schema
    const jsonLdContent = Array.from(scripts).map(script => 
      JSON.parse(script.textContent || '{}')
    );
    
    const softwareApp = jsonLdContent.find(schema => schema['@type'] === 'SoftwareApplication');
    expect(softwareApp).toBeDefined();
    expect(softwareApp.name).toBe('EmviApp');

    const organization = jsonLdContent.find(schema => schema['@type'] === 'Organization');
    expect(organization).toBeDefined();
    expect(organization.name).toBe('EmviApp');
  });

  it('renders main heading', () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>
    );

    expect(screen.getByText(/The Beauty Industry's/)).toBeInTheDocument();
    expect(screen.getByText(/Missing Piece/)).toBeInTheDocument();
  });
});