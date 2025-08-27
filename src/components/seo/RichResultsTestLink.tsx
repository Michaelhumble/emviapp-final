import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichResultsTestLinkProps {
  jobUrl: string;
}

/**
 * Component that provides a link to Google's Rich Results Test
 * for validating JobPosting structured data
 */
const RichResultsTestLink: React.FC<RichResultsTestLinkProps> = ({ jobUrl }) => {
  const testUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(jobUrl)}`;
  
  return (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-blue-900 mb-1">
            SEO Validation
          </h4>
          <p className="text-xs text-blue-700 mb-2">
            This page includes comprehensive JobPosting structured data for search engines.
          </p>
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
        onClick={() => window.open(testUrl, '_blank')}
      >
        <ExternalLink className="w-3 h-3 mr-1" />
        Test Rich Results
      </Button>
    </div>
  );
};

export default RichResultsTestLink;