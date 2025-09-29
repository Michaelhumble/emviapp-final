import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ConfidenceMeterProps {
  level: 'low' | 'medium' | 'high';
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ level }) => {
  const config = {
    low: {
      label: 'Low Confidence',
      description: 'Add more details for a more accurate estimate',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      icon: AlertCircle,
    },
    medium: {
      label: 'Medium Confidence',
      description: 'Good estimate based on provided information',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: CheckCircle2,
    },
    high: {
      label: 'High Confidence',
      description: 'Comprehensive data provides accurate estimate',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: CheckCircle2,
    },
  };

  const { label, description, color, bgColor, icon: Icon } = config[level];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg ${bgColor} border border-current/20`}>
      <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
      <div>
        <div className={`font-semibold ${color}`}>{label}</div>
        <div className="text-sm text-muted-foreground mt-1">{description}</div>
      </div>
    </div>
  );
};
