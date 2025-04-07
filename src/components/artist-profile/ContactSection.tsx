
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Instagram, Globe } from "lucide-react";
import ProAccessGate from "@/components/pro-access/ProAccessGate";
import { UserProfile } from "@/types/profile";

interface ContactSectionProps {
  profile: UserProfile;
  isSalonOwner: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ profile, isSalonOwner }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-xl font-serif font-semibold">Get In Touch</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Contact Information</h3>
            
            {profile.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {isSalonOwner ? (
                  <ProAccessGate tooltipText="Email is available to Emvi Pro salon owners">
                    <span>{profile.email}</span>
                  </ProAccessGate>
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
            )}
            
            {profile.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {isSalonOwner ? (
                  <ProAccessGate tooltipText="Phone number is available to Emvi Pro salon owners">
                    <span>{profile.phone}</span>
                  </ProAccessGate>
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
            )}
            
            {profile.instagram && (
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-muted-foreground" />
                {isSalonOwner ? (
                  <ProAccessGate tooltipText="Instagram profile is available to Emvi Pro salon owners">
                    <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-600 hover:underline">
                      @{profile.instagram.replace('@', '')}
                    </a>
                  </ProAccessGate>
                ) : (
                  <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    @{profile.instagram.replace('@', '')}
                  </a>
                )}
              </div>
            )}
            
            {profile.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                {isSalonOwner ? (
                  <ProAccessGate tooltipText="Website is available to Emvi Pro salon owners">
                    <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-600 hover:underline truncate">
                      {profile.website}
                    </a>
                  </ProAccessGate>
                ) : (
                  <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline truncate">
                    {profile.website}
                  </a>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col justify-center items-center md:items-end space-y-3">
            {isSalonOwner ? (
              <ProAccessGate tooltipText="Direct messaging is available to Emvi Pro salon owners" blur={false}>
                <Button variant="outline" className="w-full md:w-auto">
                  Send Message
                </Button>
              </ProAccessGate>
            ) : (
              <Button variant="outline" className="w-full md:w-auto">
                Send Message
              </Button>
            )}
            <p className="text-xs text-muted-foreground text-center md:text-right">
              Usually responds within 24 hours
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
