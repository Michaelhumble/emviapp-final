
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditOption } from "./types";
import { Check, Clock, Sparkles } from "lucide-react";

export interface CreditOptionCardProps {
  option: CreditOption;
  canAfford: boolean;
  onRedeem: (option: CreditOption) => void;
  isProcessing: boolean;
  isSuccess: boolean;
}

const CreditOptionCard = ({
  option,
  canAfford,
  onRedeem,
  isProcessing,
  isSuccess,
}: CreditOptionCardProps) => {
  const { id, title, description, icon, creditCost, duration } = option;

  return (
    <Card className={`overflow-hidden transition-all ${canAfford ? 'hover:shadow-md' : 'opacity-60'}`}>
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              {icon && (
                <div className="mr-3 bg-primary/10 p-2 rounded-full">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="font-medium text-lg">{title}</h3>
                {duration && (
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{duration}</span>
                  </div>
                )}
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {creditCost} Credits
            </Badge>
          </div>

          <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>

          <Button
            onClick={() => onRedeem(option)}
            disabled={!canAfford || isProcessing || isSuccess}
            className="w-full"
            variant={isSuccess ? "outline" : canAfford ? "default" : "outline"}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center text-green-600">
                <Check className="h-4 w-4 mr-2" />
                Redeemed
              </span>
            ) : (
              <span className="flex items-center">
                {canAfford && <Sparkles className="h-4 w-4 mr-2" />}
                {canAfford ? "Redeem Now" : "Not Enough Credits"}
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditOptionCard;
