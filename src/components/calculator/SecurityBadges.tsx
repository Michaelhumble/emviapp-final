import React from 'react';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

export const SecurityBadges: React.FC = () => {
  const badges = [
    { icon: Shield, label: 'SSL Secured', color: 'text-blue-600' },
    { icon: Lock, label: 'Data Encrypted', color: 'text-green-600' },
    { icon: Eye, label: 'Privacy Protected', color: 'text-purple-600' },
    { icon: FileCheck, label: 'GDPR Compliant', color: 'text-orange-600' },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 py-6">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <badge.icon className={`w-5 h-5 ${badge.color}`} />
          <span className="font-medium text-muted-foreground">{badge.label}</span>
        </div>
      ))}
    </div>
  );
};
