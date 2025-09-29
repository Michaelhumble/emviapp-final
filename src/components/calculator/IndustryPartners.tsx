import React from 'react';
import { Shield, Award, CheckCircle } from 'lucide-react';

export const IndustryPartners: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="text-center mb-4">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">Trusted Industry Standards</h4>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-foreground">BBB Accredited</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <span className="text-xs font-semibold text-foreground">IBBA Member</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
          <span className="text-xs font-semibold text-foreground">Verified Data</span>
        </div>
      </div>
    </div>
  );
};
