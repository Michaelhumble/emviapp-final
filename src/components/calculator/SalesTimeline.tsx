import React from 'react';
import { Calendar, Clock, FileText, Mail, Handshake, PartyPopper } from 'lucide-react';

export const SalesTimeline: React.FC = () => {
  const timeline = [
    { phase: 'List on EmviApp', duration: '1 day', Icon: FileText },
    { phase: 'Receive inquiries', duration: '1-2 weeks', Icon: Mail },
    { phase: 'Negotiate & due diligence', duration: '2-4 weeks', Icon: Handshake },
    { phase: 'Close the sale', duration: '2-3 weeks', Icon: PartyPopper },
  ];

  return (
    <div className="bg-white border border-purple-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-primary" />
        <h4 className="text-lg font-bold">Expected Sales Timeline</h4>
      </div>
      <div className="space-y-4">
        {timeline.map((step, index) => {
          const IconComponent = step.Icon;
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-8 bg-purple-200 my-1" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <div className="font-semibold text-foreground">{step.phase}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  {step.duration}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <p className="text-sm text-center font-semibold text-purple-900">
          Total estimated timeline: <span className="text-purple-600">6-10 weeks</span>
        </p>
      </div>
    </div>
  );
};
