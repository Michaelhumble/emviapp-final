
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Send, Gift } from "lucide-react";
import { toast } from "sonner";

const FeatureSuggestionWidget: React.FC = () => {
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!suggestion.trim()) return;
    
    setSubmitted(true);
    toast.success("Feature suggestion submitted! +15 credits earned! 🎉");
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setSuggestion("");
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="text-center py-8">
          <Gift className="h-12 w-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-green-800 mb-2">Thank You! 🎉</h3>
          <p className="text-green-700 mb-2">Your suggestion has been submitted!</p>
          <Badge className="bg-amber-100 text-amber-700">+15 Credits Added</Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          Suggest a Feature, Earn Credits!
          <Badge className="bg-amber-100 text-amber-700 ml-auto">+15 Credits</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-700">
            Have an idea to make EmviApp even better? Share it with us and earn credits! 💡
          </div>
          
          <Textarea
            placeholder="What feature would make your beauty journey even more amazing? Be specific and creative! 🚀"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="min-h-[80px] border-yellow-200 focus:border-yellow-400"
          />
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {suggestion.length}/500 characters
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!suggestion.trim() || suggestion.length > 500}
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit & Earn Credits
            </Button>
          </div>
          
          <div className="text-xs text-center text-yellow-700">
            💰 Popular suggestions can earn bonus credits!
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureSuggestionWidget;
