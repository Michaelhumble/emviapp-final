
import { ReactNode } from 'react';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';

interface ArtistDashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

const ArtistDashboardLayout = ({ children, className = "" }: ArtistDashboardLayoutProps) => {
  return (
    <RoleDashboardLayout className={className}>
      {children}
    </RoleDashboardLayout>
  );
};

export default ArtistDashboardLayout;
