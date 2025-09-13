import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routeByRole } from '@/utils/auth/routeByRole';
import { ALLOWED_ROLES, AllowedRole, isValidRole } from '@/utils/auth/role';

const ROLE_CARDS: Array<{
  key: AllowedRole;
  title: string;
  benefits: string;
}> = [
  { key: 'customer', title: 'Customer', benefits: 'Discover top pros and book services.' },
  { key: 'artist', title: 'Artist', benefits: 'Showcase work, get booked, grow your brand.' },
  { key: 'salon_owner', title: 'Salon Owner', benefits: 'Manage team, bookings, and salon growth.' },
  { key: 'freelancer', title: 'Freelancer', benefits: 'Flexible gigs and client discovery.' },
];

const ChooseRolePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<AllowedRole | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for prefill parameter and set initial selection
  useEffect(() => {
    const prefill = searchParams.get('prefill');
    if (isValidRole(prefill)) {
      setSelectedRole(prefill);
    }
  }, [searchParams]);

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    try {
      setLoading(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('No authenticated user found');
      }

      // Update user's role in profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: selectedRole })
        .eq('id', user.id);

      if (updateError) throw updateError;
      
      toast.success('Role saved. Welcome to EmviApp!');
      
      // Route by role using utility function
      routeByRole(navigate, selectedRole);
    } catch (e: any) {
      console.error('Failed to set role', e);
      toast.error(e?.message || 'Could not save role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50/50 to-white px-4">
      <Helmet>
        <title>Choose your role | EmviApp</title>
        <meta name="description" content="Select your EmviApp role: Artist, Salon Owner, Freelancer, or Customer." />
        <link rel="canonical" href="https://emviapp-final.vercel.app/auth/choose-role" />
      </Helmet>

      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">Choose your role</CardTitle>
          <p className="text-sm text-muted-foreground">This helps us tailor your dashboard and experience.</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {ROLE_CARDS.map(({ key, title, benefits }) => (
              <label
                key={key}
                className={`group relative rounded-xl border p-6 text-left transition cursor-pointer ${
                  selectedRole === key 
                    ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={key}
                  checked={selectedRole === key}
                  onChange={() => setSelectedRole(key)}
                  className="sr-only"
                />
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{benefits}</p>
                  </div>
                  <span className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border opacity-60 group-hover:opacity-100 transition">
                    →
                  </span>
                </div>
              </label>
            ))}
          </div>
          
          <Button 
            onClick={handleRoleSelection}
            disabled={!selectedRole || loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {loading ? 'Setting up your account...' : 'Continue'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChooseRolePage;