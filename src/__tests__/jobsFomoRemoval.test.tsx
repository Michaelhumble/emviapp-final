import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { JobCard } from '@/components/jobs/JobCard';
import BilingualJobCard from '@/components/jobs/BilingualJobCard';
import { Job } from '@/types/job';

// Mock auth context
const mockAuthContext = {
  isSignedIn: false,
  user: null,
  loading: false
};

vi.mock('@/context/auth', () => ({
  useAuth: () => mockAuthContext
}));

const mockJob: Job = {
  id: 'test-job-1',
  title: 'Senior Nail Technician',
  category: 'nails',
  location: 'Austin, TX',
  description: 'Looking for experienced nail technician',
  created_at: '2025-01-01T00:00:00Z',
  status: 'active',
  pricing_tier: 'free',
  contact_info: {
    phone: '555-0123',
    email: 'hiring@salon.com',
    owner_name: 'Jane Doe'
  }
};

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Jobs FOMO Removal Tests', () => {
  beforeEach(() => {
    mockAuthContext.isSignedIn = false;
  });

  it('JobCard shows active jobs to signed-out users', () => {
    render(
      <TestWrapper>
        <JobCard job={mockJob} />
      </TestWrapper>
    );
    
    expect(screen.getByText('Senior Nail Technician')).toBeInTheDocument();
    expect(screen.getByText('Austin, TX')).toBeInTheDocument();
  });

  it('JobCard shows inline signin button when signed out', () => {
    render(
      <TestWrapper>
        <JobCard job={mockJob} />
      </TestWrapper>
    );
    
    const signinButton = screen.getByTestId('signin-to-view-contact');
    expect(signinButton).toBeInTheDocument();
    expect(signinButton).toHaveTextContent('Sign in to view contact info');
  });

  it('JobCard shows contact info when signed in', () => {
    mockAuthContext.isSignedIn = true;
    
    render(
      <TestWrapper>
        <JobCard job={mockJob} />
      </TestWrapper>
    );
    
    // Contact component should be rendered (not the signin button)
    expect(screen.queryByTestId('signin-to-view-contact')).not.toBeInTheDocument();
  });

  it('BilingualJobCard shows inline signin button when signed out', () => {
    render(
      <TestWrapper>
        <BilingualJobCard 
          job={mockJob} 
          onViewDetails={() => {}} 
          onRenew={() => {}} 
          isRenewing={false} 
        />
      </TestWrapper>
    );
    
    const signinButton = screen.getByTestId('signin-to-view-contact');
    expect(signinButton).toBeInTheDocument();
    expect(signinButton).toHaveTextContent('Sign in to view contact info');
  });

  it('No FOMO/lock overlay elements present', () => {
    const { container } = render(
      <TestWrapper>
        <JobCard job={mockJob} />
      </TestWrapper>
    );
    
    // Check that no FOMO-related classes or elements exist
    expect(container.querySelector('.lockBadge')).not.toBeInTheDocument();
    expect(container.querySelector('.lockedOverlay')).not.toBeInTheDocument();
    expect(container.querySelector('.blurContact')).not.toBeInTheDocument();
    expect(screen.queryByText(/unlock/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up.*view contact/i)).not.toBeInTheDocument();
  });

  it('Job cards have stable keys for list rendering', () => {
    const jobs = [
      { ...mockJob, id: 'job-1' },
      { ...mockJob, id: 'job-2' },
      { ...mockJob, id: 'job-3' }
    ];
    
    const { rerender } = render(
      <TestWrapper>
        <div>
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </TestWrapper>
    );
    
    // Verify all cards are rendered with proper keys
    expect(screen.getAllByText('Senior Nail Technician')).toHaveLength(3);
    
    // Rerender with same order should maintain elements
    rerender(
      <TestWrapper>
        <div>
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </TestWrapper>
    );
    
    expect(screen.getAllByText('Senior Nail Technician')).toHaveLength(3);
  });

  it('No references to removed FOMO components in DOM', () => {
    const { container } = render(
      <TestWrapper>
        <JobCard job={mockJob} />
      </TestWrapper>
    );
    
    const html = container.innerHTML;
    
    // Ensure no references to removed components
    expect(html).not.toContain('TeaserLocked');
    expect(html).not.toContain('FOMONailJobsSection');
    expect(html).not.toContain('PremiumContactGate');
    expect(html).not.toContain('Unlock Contact Details');
  });
});