import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SalonListing } from "@/types/salon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Calendar, User, Phone, Mail, ExternalLink, Share2 } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

interface SalonDetailProps {
  salon: SalonListing;
}

const SalonDetail = ({ salon }: SalonDetailProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const formatPrice = (price?: number, unit?: string) => {
    if (!price) return "Not for sale";
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    
    if (unit === 'one-time') return formattedPrice;
    if (unit === 'monthly') return `${formattedPrice}/month`;
    if (unit === 'weekly') return `${formattedPrice}/week`;
    
    return formattedPrice;
  };
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: salon.name,
        text: salon.shortDescription || salon.description,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      setIsShareModalOpen(true);
      toast.message("Web Share API not supported, copy the link instead.");
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast.success("Link copied to clipboard!");
        setIsShareModalOpen(false);
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link to clipboard.");
      });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden shadow-xl mb-6">
        {salon.image ? (
          <img
            src={salon.image}
            alt={salon.name}
            className="w-full h-80 object-cover object-center"
          />
        ) : (
          <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-500 text-white">{salon.type}</Badge>
        </div>
      </div>
      
      {/* Salon Details */}
      <div className="px-4">
        <h1 className="font-playfair text-3xl font-semibold mb-2">{salon.name}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          {salon.location}
        </div>
        
        {salon.price && (
          <div className="flex items-center text-green-700 font-medium mb-4">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{formatPrice(salon.price, salon.priceUnit)}</span>
          </div>
        )}
        
        <p className="text-gray-700 leading-relaxed mb-6">{salon.description}</p>
        
        {salon.features && salon.features.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {salon.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Contact Information:</h3>
          <div className="text-gray-600">
            {salon.contactName && (
              <div className="flex items-center mb-1">
                <User className="h-4 w-4 mr-2" />
                {salon.contactName}
              </div>
            )}
            {salon.contactPhone && (
              <div className="flex items-center mb-1">
                <Phone className="h-4 w-4 mr-2" />
                {salon.contactPhone}
              </div>
            )}
            {salon.contactEmail && (
              <div className="flex items-center mb-1">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${salon.contactEmail}`} className="hover:text-blue-500">
                  {salon.contactEmail}
                </a>
              </div>
            )}
            {salon.website && (
              <div className="flex items-center mb-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                <a href={salon.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                  {salon.website}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mb-8">
          <Button variant="outline" className="flex items-center" onClick={handleShareClick}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => navigate('/contact')}>Contact Us</Button>
        </div>
      </div>
      
      {/* Share Modal (if Web Share API is not supported) */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium mb-4">Share this listing</h3>
            <p className="text-sm text-gray-500 mb-4">
              Copy the link below to share this listing with others:
            </p>
            <div className="mb-4">
              <input
                type="text"
                value={window.location.href}
                className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                readOnly
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setIsShareModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCopyToClipboard}>
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonDetail;
