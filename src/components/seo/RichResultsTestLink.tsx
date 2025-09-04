import React, { useState } from 'react';
import { ExternalLink, HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RichResultsTestLinkProps {
  jobUrl?: string;
  url?: string;
}

/**
 * Component that provides a link to Google's Rich Results Test
 * for validating structured data - only visible to admins/devs
 */
const RichResultsTestLink: React.FC<RichResultsTestLinkProps> = ({ jobUrl, url }) => {
  const { userRole } = useAuth();
  const [showFallbackModal, setShowFallbackModal] = useState(false);
  
  // Gate visibility: only show in development, for admins, or with localStorage override
  const isDev = process.env.NODE_ENV !== 'production';
  const isAdmin = userRole === 'admin';
  const hasLocalStorageOverride = typeof window !== 'undefined' && 
    window.localStorage.getItem('SEO_BADGE') === '1';
  
  const shouldShow = isDev || isAdmin || hasLocalStorageOverride;
  
  if (!shouldShow) {
    return null;
  }

  const currentUrl = jobUrl || url || (typeof window !== 'undefined' ? window.location.href : '');
  const testUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(currentUrl)}`;
  
  const handleTestClick = () => {
    try {
      const newWindow = window.open(testUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        // Popup blocked or failed to open
        setShowFallbackModal(true);
      }
    } catch (error) {
      console.warn('Failed to open Rich Results Test:', error);
      setShowFallbackModal(true);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
    }
  };

  return (
    <>
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              SEO Validation
            </h4>
            <p className="text-xs text-blue-700 mb-2">
              This page includes comprehensive structured data for search engines.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
            onClick={handleTestClick}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Test Rich Results
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-blue-600 hover:text-blue-800"
            onClick={() => setShowFallbackModal(true)}
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            Having trouble?
          </Button>
        </div>
      </div>

      {/* Fallback Modal */}
      <Dialog open={showFallbackModal} onOpenChange={setShowFallbackModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              SEO Validation Tools
            </DialogTitle>
            <DialogDescription>
              If the automatic link didn't work, try these alternatives:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Google Rich Results Test</h4>
              <p className="text-sm text-gray-600 mb-3">
                Test structured data markup for this page
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-white p-2 rounded border break-all">
                  {testUrl}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(testUrl)}
                >
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Schema Markup Validator</h4>
              <p className="text-sm text-gray-600 mb-3">
                Alternative validator for structured data
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-white p-2 rounded border">
                  https://validator.schema.org/
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard('https://validator.schema.org/')}
                >
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
              <strong>💡 Troubleshooting Tips:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Try disabling ad-blockers or browser shields</li>
                <li>Use incognito/private browsing mode</li>
                <li>Copy the URL and paste it manually into the tools</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => setShowFallbackModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RichResultsTestLink;