
import { PropsWithChildren } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface RoleDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const RoleDashboardLayout = ({ children, className = "" }: RoleDashboardLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'} max-w-7xl mx-auto ${className}`}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '50px',
        background: '#ff0033',
        color: '#fff',
        fontSize: '2rem',
        zIndex: 99999,
        textAlign: 'center',
        lineHeight: '50px'
      }}>
        🚨 THIS IS THE FILE YOU ARE EDITING: src/components/dashboard/RoleDashboardLayout.tsx 🚨
      </div>
      {children}
    </div>
  );
};

export default RoleDashboardLayout;
