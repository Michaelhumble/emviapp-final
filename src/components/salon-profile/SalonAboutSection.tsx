
import React from 'react';
import { Salon } from '@/types/salon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface SalonAboutSectionProps {
  salon: Salon;
}

const SalonAboutSection: React.FC<SalonAboutSectionProps> = ({ salon }) => {
  // Function to convert text with line breaks to paragraphs with emoji support
  const formatBio = (text: string) => {
    if (!text) return null;
    
    // Split by line breaks
    return text.split('\n').map((paragraph, i) => {
      if (!paragraph.trim()) return <br key={i} />;
      
      // Process for emoji and bold text (basic implementation)
      const formattedParagraph = paragraph
        // Bold text using asterisks (e.g., *bold*)
        .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
        // Italic text using underscores (e.g., _italic_)
        .replace(/_([^_]+)_/g, '<em>$1</em>');
      
      return (
        <p 
          key={i} 
          className="mb-3" 
          dangerouslySetInnerHTML={{ __html: formattedParagraph }} 
        />
      );
    });
  };
  
  return (
    <section className="max-w-4xl mx-auto">
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2 border-b border-gray-50">
          <CardTitle className="flex items-center text-xl font-serif">
            <Info className="h-5 w-5 mr-2 text-purple-600" />
            About {salon.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="prose prose-sm sm:prose max-w-none">
            {formatBio(salon.bio)}
          </div>
          
          <div className="mt-8 flex flex-wrap gap-3">
            {salon.services.slice(0, 5).map((service, index) => (
              <span 
                key={index}
                className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {service}
              </span>
            ))}
            {salon.services.length > 5 && (
              <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                +{salon.services.length - 5} more
              </span>
            )}
          </div>
          
          {salon.established && (
            <div className="mt-4 text-sm text-gray-500">
              Established {salon.established}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default SalonAboutSection;
