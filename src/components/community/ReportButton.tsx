import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Flag, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface ReportButtonProps {
  contentType: 'post' | 'ai_answer' | 'comment';
  contentId: string;
  compact?: boolean;
}

const ReportButton = ({ contentType, contentId, compact = false }: ReportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isSignedIn } = useAuth();

  const reportReasons = [
    { value: 'spam', label: 'Spam', description: 'Repetitive or unwanted content' },
    { value: 'inappropriate', label: 'Inappropriate', description: 'Offensive or inappropriate content' },
    { value: 'abuse', label: 'Harassment/Abuse', description: 'Bullying or harassment' },
    { value: 'off_topic', label: 'Off Topic', description: 'Not beauty-related content' },
    { value: 'fake', label: 'Fake/Misleading', description: 'False or misleading information' },
    { value: 'other', label: 'Other', description: 'Other violations' }
  ];

  const handleSubmitReport = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to report content');
      return;
    }

    if (!reason) {
      toast.error('Please select a reason for reporting');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('report-content', {
        body: {
          contentType,
          contentId,
          reason,
          details: details.trim() || null
        }
      });

      if (error) throw error;

      if (data.success) {
        toast.success('Report submitted successfully');
        setIsOpen(false);
        setReason('');
        setDetails('');
      } else {
        toast.error(data.message || 'Failed to submit report');
      }
    } catch (error: any) {
      console.error('Report submission error:', error);
      if (error.message?.includes('already reported')) {
        toast.error('You have already reported this content');
      } else {
        toast.error('Failed to submit report');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return null; // Don't show report button to non-authenticated users
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {compact ? (
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
            <Flag className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Report Content
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Help us keep the community safe by reporting content that violates our guidelines.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Reporting:</strong> {contentType.replace('_', ' ')} content
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Reason for reporting *
            </label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {reportReasons.map((reasonOption) => (
                  <SelectItem key={reasonOption.value} value={reasonOption.value}>
                    <div>
                      <div className="font-medium">{reasonOption.label}</div>
                      <div className="text-xs text-gray-500">{reasonOption.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Additional details (optional)
            </label>
            <Textarea
              placeholder="Provide more context about why you're reporting this content..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              Reports are reviewed by our moderation team. False reports may result in account restrictions.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReport}
              disabled={!reason || loading}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportButton;