
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactInformationSectionProps {
  contactInfo: Job['contact_info'];
  onChange: (contactInfo: Job['contact_info']) => void;
}

const ContactInformationSection = ({ contactInfo = {}, onChange }: ContactInformationSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      <p className="text-muted-foreground">Provide contact details for interested candidates</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="owner-name">Contact Name</Label>
          <Input 
            id="owner-name"
            value={contactInfo.owner_name || ''}
            onChange={(e) => onChange({ ...contactInfo, owner_name: e.target.value })}
            placeholder="Your name or business name"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone"
            type="tel"
            value={contactInfo.phone || ''}
            onChange={(e) => onChange({ ...contactInfo, phone: e.target.value })}
            placeholder="e.g. (555) 123-4567"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email"
            type="email"
            value={contactInfo.email || ''}
            onChange={(e) => onChange({ ...contactInfo, email: e.target.value })}
            placeholder="e.g. youremail@example.com"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="zalo">Zalo (Optional)</Label>
          <Input 
            id="zalo"
            value={contactInfo.zalo || ''}
            onChange={(e) => onChange({ ...contactInfo, zalo: e.target.value })}
            placeholder="Your Zalo contact"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="notes">Additional Contact Notes</Label>
          <Textarea
            id="notes"
            value={contactInfo.notes || ''}
            onChange={(e) => onChange({ ...contactInfo, notes: e.target.value })}
            placeholder="Best time to contact, preferred method, etc."
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;
