
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Heart, Star, TrendingUp, Mail } from "lucide-react";
import { toast } from "sonner";

const votingFeatures = [
  { id: "booking", name: "Smart Booking System", votes: 1247 },
  { id: "pos", name: "POS System", votes: 892 },
  { id: "messaging", name: "In-App Messaging", votes: 1156 },
  { id: "ai", name: "AI Assistant", votes: 734 },
  { id: "analytics", name: "Advanced Analytics", votes: 456 },
  { id: "premium", name: "Premium Features", votes: 623 }
];

const FeatureVotingSurvey = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  const handleFeatureToggle = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else if (selectedFeatures.length < 3) {
      setSelectedFeatures([...selectedFeatures, featureId]);
    } else {
      toast.info("You can select up to 3 features");
    }
  };

  const handleSubmitVote = () => {
    if (selectedFeatures.length === 0) {
      toast.error("Please select at least one feature");
      return;
    }

    // Simulate vote submission
    setHasVoted(true);
    toast.success("Thank you for your vote! We'll prioritize these features.");
  };

  const handleJoinWaitlist = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Added to waitlist! You'll be notified when features launch.");
    setEmail("");
  };

  if (hasVoted) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <Star className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Vote Recorded!</h3>
            <p className="text-green-700">
              Thank you for helping us prioritize feature development. 
              We'll keep you updated on progress!
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setHasVoted(false)}
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Vote Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-3">
          <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
          <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vote for Your Most Wanted Features
          </CardTitle>
        </div>
        <p className="text-gray-600 text-sm">
          Help us prioritize development by selecting up to 3 features you want most
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Feature Voting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {votingFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedFeatures.includes(feature.id)
                  ? 'border-purple-400 bg-purple-100 shadow-md'
                  : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">{feature.name}</h4>
                  <div className="flex items-center mt-1">
                    <Heart className="h-3 w-3 text-red-400 mr-1" />
                    <span className="text-xs text-gray-500">{feature.votes} votes</span>
                  </div>
                </div>
                
                {selectedFeatures.includes(feature.id) && (
                  <Badge className="bg-purple-500 text-white">
                    #{selectedFeatures.indexOf(feature.id) + 1}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Features Summary */}
        {selectedFeatures.length > 0 && (
          <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-medium text-gray-800 mb-2">Your Top Picks:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedFeatures.map((featureId, index) => {
                const feature = votingFeatures.find(f => f.id === featureId);
                return (
                  <Badge key={featureId} variant="secondary" className="bg-purple-100 text-purple-700">
                    #{index + 1} {feature?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Submit Vote Button */}
        <Button 
          onClick={handleSubmitVote}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          disabled={selectedFeatures.length === 0}
        >
          Submit My Vote ({selectedFeatures.length}/3 selected)
        </Button>

        {/* Suggestions & Waitlist */}
        <div className="border-t pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Have other suggestions?
            </label>
            <Textarea
              placeholder="Tell us about features you'd love to see..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Enter email for feature updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleJoinWaitlist}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-100"
            >
              <Mail className="h-4 w-4 mr-2" />
              Join Waitlist
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureVotingSurvey;
