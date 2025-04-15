
import { PropsWithChildren } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const RoleDashboardLayout = ({ children }: PropsWithChildren) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'} max-w-7xl mx-auto`}>
      {children}
    </div>
  );
};

export default RoleDashboardLayout;
