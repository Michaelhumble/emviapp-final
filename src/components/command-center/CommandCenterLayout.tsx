
import React from "react";
import { Shield, AlertCircle } from "lucide-react";

interface CommandCenterLayoutProps {
  children: React.ReactNode;
}

const CommandCenterLayout = ({ children }: CommandCenterLayoutProps) => {
  return (
    <div className="bg-slate-50 min-h-screen w-full overflow-x-hidden">
      <div className="py-2 px-4 bg-blue-900 text-white text-sm flex items-center justify-center">
        <Shield className="h-4 w-4 mr-2" />
        <span>Admin Command Center</span>
        <AlertCircle className="h-4 w-4 ml-2" />
      </div>
      <main className="w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default CommandCenterLayout;
