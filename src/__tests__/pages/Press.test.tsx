import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Press from '@/pages/Press';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <HelmetProvider>
      {children}
    </HelmetProvider>
  </BrowserRouter>
);

describe('Press Page', () => {
  it('renders Organization and Article JSON-LD', () => {
    render(
      <TestWrapper>
        <Press />
      </TestWrapper>
    );

    // Check for JSON-LD scripts
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);

    // Verify schemas
    const jsonLdContent = Array.from(scripts).map(script => 
      JSON.parse(script.textContent || '{}')
    );
    
    const organization = jsonLdContent.find(schema => schema['@type'] === 'Organization');
    expect(organization).toBeDefined();
    expect(organization.name).toBe('EmviApp');

    const article = jsonLdContent.find(schema => schema['@type'] === 'Article');
    expect(article).toBeDefined();
    expect(article.headline).toContain('Press Kit');
  });

  it('renders press kit heading', () => {
    render(
      <TestWrapper>
        <Press />
      </TestWrapper>
    );

    expect(screen.getByText(/Press Kit/)).toBeInTheDocument();
    expect(screen.getByText(/Media Resources/)).toBeInTheDocument();
  });
});