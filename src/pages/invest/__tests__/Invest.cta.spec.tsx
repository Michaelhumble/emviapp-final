import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InvestorsPartnersPage from '../../../pages/InvestorsPartners';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock fetch for form submission
global.fetch = vi.fn();

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Investors & Partners Page CTA Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page without errors', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    expect(screen.getByText('We Don\'t Work With')).toBeInTheDocument();
  });

  it('has the main hero CTA button that scrolls to contact form', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    
    const heroCTA = screen.getByRole('button', { name: /prove you're the one/i });
    expect(heroCTA).toBeInTheDocument();
    
    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    fireEvent.click(heroCTA);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('has a contact form with submit button', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    
    const submitButton = screen.getByRole('button', { name: /submit application/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('has the contact form section with correct id for scroll targeting', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    
    const contactFormSection = document.getElementById('contact-form');
    expect(contactFormSection).toBeInTheDocument();
  });

  it('has all required form fields', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    
    // Check for all form inputs
    expect(screen.getByPlaceholderText('Your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://yourcompany.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('LinkedIn profile URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your track record/i)).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithRouter(<InvestorsPartnersPage />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Your full name'), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Company name'), {
      target: { value: 'Test Company' }
    });
    fireEvent.change(screen.getByPlaceholderText(/your track record/i), {
      target: { value: 'Test message' }
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit application/i });
    fireEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/partner-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        website: '',
        linkedin: '',
        message: 'Test message'
      }),
    });
  });

  it('displays the correct page title and meta information', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    
    // Check for SEO elements (DynamicSEO component should set these)
    expect(document.title).toBe('Investors & Partners | EmviApp');
  });

  it('has the main sections visible on the page', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    
    // Check for main content sections
    expect(screen.getByText('We Don\'t Work With')).toBeInTheDocument();
    expect(screen.getByText('Everyone')).toBeInTheDocument();
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('Partnership Spots Are')).toBeInTheDocument();
    expect(screen.getByText('Extremely Limited')).toBeInTheDocument();
    expect(screen.getByText('Think You\'re the One?')).toBeInTheDocument();
  });

  it('has proper accessibility attributes for form elements', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    
    const nameInput = screen.getByPlaceholderText('Your full name');
    const emailInput = screen.getByPlaceholderText('your@email.com');
    const companyInput = screen.getByPlaceholderText('Company name');
    const messageTextarea = screen.getByPlaceholderText(/your track record/i);
    
    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(companyInput).toHaveAttribute('required');
    expect(messageTextarea).toHaveAttribute('required');
  });
});