
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays } from "date-fns";

interface RenewPostButtonProps {
  postId: string;
  onRenew?: () => void;
  isExpired?: boolean;
}

const RenewPostButton = ({ postId, onRenew, isExpired = false }: RenewPostButtonProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRenew = async () => {
    setIsLoading(true);
    
    try {
      // Call Stripe payment and then update the post expiration
      const newExpiresAt = addDays(new Date(), 30);
      
      // Update post expiration date
      const { error } = await supabase
        .from('posts')
        .update({ 
          expires_at: newExpiresAt.toISOString(),
          status: 'active'
        })
        .eq('id', postId);
      
      if (error) {
        throw error;
      }
      
      // Show success toast
      toast({
        title: "Post renewed successfully!",
        description: `Your post has been extended until ${format(newExpiresAt, "MMMM d, yyyy")}`,
        variant: "default"
      });
      
      // Call the onRenew callback if provided
      if (onRenew) {
        onRenew();
      }
    } catch (error) {
      console.error("Error renewing post:", error);
      toast({
        title: "Renewal failed",
        description: "There was a problem renewing your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleRenew}
      disabled={isLoading}
      variant={isExpired ? "default" : "outline"}
      className={isExpired ? "" : "border-blue-500 text-blue-700 hover:bg-blue-50"}
    >
      <RefreshCw className="mr-2 h-4 w-4" />
      {isLoading ? "Processing..." : "Renew for 30 Days"}
    </Button>
  );
};

export default RenewPostButton;
