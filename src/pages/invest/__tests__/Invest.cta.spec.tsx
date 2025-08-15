import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { getByText } = renderWithRouter(<InvestorsPartnersPage />);
    expect(getByText('We Don\'t Work With')).toBeInTheDocument();
  });

  it('has the main hero CTA button that scrolls to contact form', async () => {
    const { getByRole } = renderWithRouter(<InvestorsPartnersPage />);
    const user = userEvent.setup();
    
    const heroCTA = getByRole('button', { name: /prove you're the one/i });
    expect(heroCTA).toBeInTheDocument();
    
    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    await user.click(heroCTA);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('has a contact form with submit button', () => {
    const { getByRole } = renderWithRouter(<InvestorsPartnersPage />);
    
    const submitButton = getByRole('button', { name: /submit application/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('has the contact form section with correct id for scroll targeting', () => {
    renderWithRouter(<InvestorsPartnersPage />);
    
    const contactFormSection = document.getElementById('contact-form');
    expect(contactFormSection).toBeInTheDocument();
  });

  it('has all required form fields', () => {
    const { getByPlaceholderText } = renderWithRouter(<InvestorsPartnersPage />);
    
    // Check for all form inputs
    expect(getByPlaceholderText('Your full name')).toBeInTheDocument();
    expect(getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(getByPlaceholderText('Company name')).toBeInTheDocument();
    expect(getByPlaceholderText('https://yourcompany.com')).toBeInTheDocument();
    expect(getByPlaceholderText('LinkedIn profile URL')).toBeInTheDocument();
    expect(getByPlaceholderText(/your track record/i)).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { getByPlaceholderText, getByRole } = renderWithRouter(<InvestorsPartnersPage />);
    const user = userEvent.setup();
    
    // Fill out the form
    await user.type(getByPlaceholderText('Your full name'), 'Test User');
    await user.type(getByPlaceholderText('your@email.com'), 'test@example.com');
    await user.type(getByPlaceholderText('Company name'), 'Test Company');
    await user.type(getByPlaceholderText(/your track record/i), 'Test message');

    // Submit the form
    const submitButton = getByRole('button', { name: /submit application/i });
    await user.click(submitButton);

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
    const { getByText } = renderWithRouter(<InvestorsPartnersPage />);
    
    // Check for main content sections
    expect(getByText('We Don\'t Work With')).toBeInTheDocument();
    expect(getByText('Everyone')).toBeInTheDocument();
    expect(getByText('Requirements')).toBeInTheDocument();
    expect(getByText('Partnership Spots Are')).toBeInTheDocument();
    expect(getByText('Extremely Limited')).toBeInTheDocument();
    expect(getByText('Think You\'re the One?')).toBeInTheDocument();
  });

  it('has proper accessibility attributes for form elements', () => {
    const { getByPlaceholderText } = renderWithRouter(<InvestorsPartnersPage />);
    
    const nameInput = getByPlaceholderText('Your full name');
    const emailInput = getByPlaceholderText('your@email.com');
    const companyInput = getByPlaceholderText('Company name');
    const messageTextarea = getByPlaceholderText(/your track record/i);
    
    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(companyInput).toHaveAttribute('required');
    expect(messageTextarea).toHaveAttribute('required');
  });
});