import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateUserRole } from '@/services/profile';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

const ROLE_CARDS: Array<{
  key: 'artist'|'salon'|'freelancer'|'customer';
  title: string;
  benefits: string;
}> = [
  { key: 'artist', title: 'Artist', benefits: 'Showcase work, get booked, grow your brand.' },
  { key: 'salon', title: 'Salon Owner', benefits: 'Manage team, bookings, and salon growth.' },
  { key: 'freelancer', title: 'Freelancer', benefits: 'Flexible gigs and client discovery.' },
  { key: 'customer', title: 'Customer', benefits: 'Discover top pros and book services.' },
];

const ChooseRolePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const intent = searchParams.get('role');
  const preselected = useMemo(() => {
    const valid = ROLE_CARDS.find(r => r.key === intent);
    return valid?.key ?? null;
  }, [intent]);

  const handleSelect = async (role: 'artist'|'salon'|'freelancer'|'customer') => {
    try {
      setLoadingKey(role);
      const { error } = await updateUserRole(role);
      if (error) throw error;
      toast.success('Role saved. Welcome to EmviApp!');
      navigate('/dashboard');
    } catch (e: any) {
      console.error('Failed to set role', e);
      toast.error(e?.message || 'Could not save role. Please try again.');
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Choose your role | EmviApp</title>
        <meta name="description" content="Select your EmviApp role: Artist, Salon Owner, Freelancer, or Customer." />
        <link rel="canonical" href="https://www.emvi.app/onboarding/choose-role" />
      </Helmet>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Choose your role</h1>
          <p className="mt-2 text-sm opacity-80">This helps us tailor your dashboard and experience.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {ROLE_CARDS.map(({ key, title, benefits }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`group relative rounded-xl border p-6 text-left transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${preselected===key ? 'ring-2' : ''}`}
              aria-label={`Choose ${title}`}
              disabled={loadingKey === key}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-medium">{title}</h2>
                  <p className="mt-2 text-sm opacity-80">{benefits}</p>
                </div>
                {loadingKey === key ? (
                  <span className="ml-4 inline-flex h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
                ) : (
                  <span className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border opacity-60 group-hover:opacity-100 transition" aria-hidden>→</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ChooseRolePage;
