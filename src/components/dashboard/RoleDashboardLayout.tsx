
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
      {children}
    </div>
  );
};

export default RoleDashboardLayout;
