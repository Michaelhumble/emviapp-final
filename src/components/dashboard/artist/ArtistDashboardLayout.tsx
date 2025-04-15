
import { ReactNode } from 'react';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';

interface ArtistDashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

const ArtistDashboardLayout = ({ children }: ArtistDashboardLayoutProps) => {
  return (
    <RoleDashboardLayout>
      {children}
    </RoleDashboardLayout>
  );
};

export default ArtistDashboardLayout;
