
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { JobPricingOption } from '@/utils/posting/types';
import { cn } from '@/lib/utils';

interface JobSummaryProps {
  title: string;
  description?: string;
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
  pricingPlan?: JobPricingOption;
  jobType?: string;
}

const JobSummary: React.FC<JobSummaryProps> = ({
  title,
  description,
  location,
  contactEmail,
  contactPhone,
  pricingPlan,
  jobType
}) => {
  return (
    <Card className="bg-white shadow overflow-hidden">
      <CardHeader className={cn(
        "pb-2", 
        pricingPlan?.id === 'premium' && "bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200",
        pricingPlan?.id === 'gold' && "bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200",
        pricingPlan?.id === 'diamond' && "bg-gradient-to-r from-sky-50 to-sky-100 border-b border-sky-200"
      )}>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{title || "Job Title"}</CardTitle>
          {pricingPlan && (
            <Badge className={cn(
              "font-medium",
              pricingPlan.id === 'standard' && "bg-blue-100 text-blue-800 hover:bg-blue-200",
              pricingPlan.id === 'premium' && "bg-purple-100 text-purple-800 hover:bg-purple-200",
              pricingPlan.id === 'gold' && "bg-amber-100 text-amber-800 hover:bg-amber-200",
              pricingPlan.id === 'diamond' && "bg-sky-100 text-sky-800 hover:bg-sky-200"
            )}>
              {pricingPlan.name}
            </Badge>
          )}
        </div>
        
        <CardDescription className="mt-1">
          {location && (
            <div className="text-sm text-gray-600">
              {location}
            </div>
          )}
          {jobType && (
            <div className="text-xs text-gray-500 mt-1">
              {jobType}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {description && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-1">Description</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        )}
        
        {(contactEmail || contactPhone) && (
          <div>
            <h4 className="text-sm font-medium mb-1">Contact</h4>
            {contactEmail && <p className="text-sm text-gray-600">Email: {contactEmail}</p>}
            {contactPhone && <p className="text-sm text-gray-600">Phone: {contactPhone}</p>}
          </div>
        )}
      </CardContent>
      
      {pricingPlan && pricingPlan.features && pricingPlan.features.length > 0 && (
        <CardFooter className="bg-gray-50 px-6 py-4 flex flex-col items-start border-t">
          <h4 className="text-sm font-medium mb-2">Included Features</h4>
          <ul className="space-y-2">
            {pricingPlan.features.map((feature, i) => (
              <li key={i} className="flex text-sm">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardFooter>
      )}
    </Card>
  );
};

export default JobSummary;
