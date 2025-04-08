
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInformationSectionProps {
  contactInfo?: Job['contact_info'];
  onChange: (contactInfo: Job['contact_info']) => void;
}

const ContactInformationSection = ({ 
  contactInfo = { owner_name: '', phone: '', email: '' },
  onChange 
}: ContactInformationSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      <p className="text-muted-foreground">How applicants can reach you</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="owner-name">Contact Name</Label>
          <Input
            id="owner-name"
            value={contactInfo.owner_name || ''}
            onChange={(e) => onChange({ ...contactInfo, owner_name: e.target.value })}
            placeholder="e.g. John Smith"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={contactInfo.phone || ''}
            onChange={(e) => onChange({ ...contactInfo, phone: e.target.value })}
            placeholder="e.g. (555) 123-4567"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={contactInfo.email || ''}
            onChange={(e) => onChange({ ...contactInfo, email: e.target.value })}
            placeholder="e.g. contact@yoursalon.com"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;
