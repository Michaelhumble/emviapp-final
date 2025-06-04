
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Send, Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";

const FeatureSuggestionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!suggestion.trim()) {
      toast.error("Please enter your suggestion");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast.success("Feature suggestion submitted! +15 credits earned! 🎉");
      setSuggestion("");
      setIsOpen(false);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 hover:from-yellow-100 hover:to-amber-100 text-yellow-800"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">Suggest a Feature</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gift className="h-3 w-3 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">+15 Credits</span>
              </div>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>Suggest a Feature</span>
              <div className="flex items-center space-x-1 ml-auto">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-amber-600">+15 Credits</span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                💡 Have an idea to make EmviApp even better? Share it with us and earn credits!
              </p>
            </div>

            <Textarea
              placeholder="What feature would make your beauty journey even more amazing? Be specific and creative! 🚀"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="min-h-[100px] border-yellow-200 focus:border-yellow-400"
              maxLength={500}
            />

            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{suggestion.length}/500 characters</span>
              <span className="text-yellow-600 font-medium">💰 Popular suggestions earn bonus credits!</span>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!suggestion.trim() || suggestion.length > 500 || isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit & Earn Credits
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeatureSuggestionButton;
