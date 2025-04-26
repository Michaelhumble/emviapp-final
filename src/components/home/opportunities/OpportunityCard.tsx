
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, ChevronRight } from 'lucide-react';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

interface OpportunityCardProps {
  listing: Job;
  index: number;
}

const OpportunityCard = ({ listing, index }: OpportunityCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isSignedIn } = useAuth();

  const getListingPath = () => listing.for_sale ? `/salons/${listing.id}` : `/jobs/${listing.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={`overflow-hidden h-full flex flex-col transition-all duration-200 ${
          isHovered ? 'shadow-md transform translate-y-[-2px]' : 'shadow-sm'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
          </div>
          
          <div className="flex items-center text-gray-500 mb-2 text-sm">
            <Building className="h-3.5 w-3.5 mr-1" />
            <span className="mr-3 line-clamp-1">{listing.company}</span>
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>
          
          {listing.specialties && listing.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.specialties.slice(0, 2).map((specialty, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          )}
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
            {listing.description}
          </p>

          {listing.for_sale && listing.asking_price && (
            <p className="text-sm font-medium text-primary mb-4">
              Asking Price: {listing.asking_price}
            </p>
          )}
          
          {!isSignedIn && (
            <p className="text-sm text-gray-500 italic mb-4">
              Sign up or log in to view contact details
            </p>
          )}
          
          <AuthAction 
            onAction={() => true}
            redirectPath={getListingPath()}
          >
            <div className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center cursor-pointer">
              View details <ChevronRight className="h-4 w-4" />
            </div>
          </AuthAction>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OpportunityCard;
