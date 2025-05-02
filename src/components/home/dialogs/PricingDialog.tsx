
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

interface PricingModalTabProps {
  title: string;
  description: string;
  startingPrice: string;
  features: string[];
  ctaText: string;
  onCtaClick: () => void;
}

const PricingModalTab: React.FC<PricingModalTabProps> = ({
  title,
  description,
  startingPrice,
  features,
  ctaText,
  onCtaClick
}) => (
  <div className="space-y-4">
    <div className="text-center mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="flex justify-center items-baseline gap-2">
        <span className="text-3xl font-bold font-serif">{startingPrice}</span>
        {startingPrice !== "Free" && <span className="text-sm text-gray-500">starting price</span>}
      </div>
      <Badge variant="outline" className="bg-primary/5 mt-2">First post is free</Badge>
    </div>
    
    <div className="space-y-2">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
    
    <div className="pt-4">
      <Button 
        onClick={onCtaClick} 
        className="w-full"
        variant="default"
      >
        {ctaText}
      </Button>
    </div>
  </div>
);

const PricingDialog: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 font-medium shadow-md shadow-primary/10">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          See How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-serif pb-2">Simple, Fair Pricing</DialogTitle>
          <DialogDescription className="text-center">
            Find the perfect way to connect with the beauty community.
            <div className="mt-2">
              <Badge variant="outline" className="bg-primary/5">No contracts</Badge>{' '}
              <Badge variant="outline" className="bg-primary/5">Cancel anytime</Badge>{' '}
              <Badge variant="outline" className="bg-primary/5">First post free</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="jobs" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="salons">Salons</TabsTrigger>
            <TabsTrigger value="booths">Booths</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="p-2">
            <PricingModalTab
              title="Job Listings"
              description="Find talented artists for your salon"
              startingPrice="Free"
              features={[
                "First job post is always free",
                "AI-matched candidates",
                "$10 per additional post",
                "+$5 for nationwide boost",
                "Instant visibility"
              ]}
              ctaText="Post a Job"
              onCtaClick={() => navigate("/jobs/post")}
            />
          </TabsContent>
          
          <TabsContent value="salons" className="p-2">
            <PricingModalTab
              title="Salon Listings"
              description="Sell your salon or promote your business"
              startingPrice="$20"
              features={[
                "Professional listing page",
                "+$10 for national reach",
                "Fast Sale Package available",
                "Photo gallery included",
                "Direct messaging with buyers"
              ]}
              ctaText="List a Salon"
              onCtaClick={() => navigate("/salons/post")}
            />
          </TabsContent>
          
          <TabsContent value="booths" className="p-2">
            <PricingModalTab
              title="Booth Rentals"
              description="Fill your empty chairs with qualified artists"
              startingPrice="$15"
              features={[
                "Local & nationwide options",
                "Bundle with job posts for discount",
                "Featured placement available",
                "30-day active listing",
                "Booth rental agreement templates"
              ]}
              ctaText="Post a Booth"
              onCtaClick={() => navigate("/opportunities/post")}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => navigate("/explore")}>
            Explore First
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Ask a Question</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingDialog;
