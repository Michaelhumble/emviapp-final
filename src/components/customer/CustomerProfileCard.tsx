import React, { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProfileCompletion } from "@/context/profile/ProfileCompletionProvider";
import { Link } from "react-router-dom";
import { Sun, Moon, UserRound } from "lucide-react"; // Allowed lucide-react icons

interface CustomerProfileCardProps {}

const quotes = [
  "Self-care isn't selfish—it's necessary.",
  "Looking great starts with feeling great.",
  "Your beauty, your rules.",
  "Confidence is your best accessory.",
  "Small acts of self-kindness matter.",
];

const getGreeting = (name?: string) => {
  const hour = new Date().getHours();
  let emoji = "";
  let salutation = "";
  if (hour < 12) {
    salutation = "Good morning";
    emoji = "☀️";
  } else if (hour < 18) {
    salutation = "Good afternoon";
    emoji = "🌤️";
  } else {
    salutation = "Good evening";
    emoji = "🌙";
  }
  return `${salutation}${name ? `, ${name}` : ""}! ${emoji}`;
};

// Simple status logic: add more statuses as needed
const getStatus = (profile?: any, completion?: number) => {
  if (!profile) return "New Member";
  if (typeof completion === 'number') {
    if (completion < 50) return "New Member";
    if (completion < 90) return "Active Member";
    if (profile?.premium) return "Premium Member";
    return "Member";
  }
  return "Member";
};

const CustomerProfileCard: React.FC<CustomerProfileCardProps> = () => {
  const { userProfile } = useAuth();
  // Fix: Use correct properties from useProfileCompletion
  const { completionPercentage, incompleteFields } = useProfileCompletion();
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx(idx => (idx + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fix: Use full_name instead of firstName
  const name = userProfile?.full_name || "there";
  const greeting = getGreeting(name);
  const status = getStatus(userProfile, completionPercentage);

  // Determine if the profile is incomplete using incompleteFields array
  const isIncomplete = incompleteFields && incompleteFields.length > 0 && incompleteFields[0] !== "all";

  return (
    <section className="w-full relative rounded-2xl bg-primary/5 border border-primary/10 shadow-sm mb-6 flex flex-col sm:flex-row items-center sm:items-end p-4 sm:p-6 gap-3 sm:gap-6 animate-fade-in max-w-3xl mx-auto">
      {/* Avatar & Greeting */}
      <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-3 flex-shrink-0">
        <Avatar className="h-16 w-16 ring-2 ring-primary/80 shadow-md mb-1 bg-white">
          <AvatarImage src={userProfile?.avatar_url} alt={name} />
          <AvatarFallback>
            <UserRound className="h-8 w-8 text-primary" />
          </AvatarFallback>
        </Avatar>
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-primary text-white font-medium text-center">
          {status}
        </span>
      </div>
      {/* Greeting, Quotes, Actions */}
      <div className="flex flex-col items-center sm:items-start flex-1 gap-2 w-full">
        {/* Greeting */}
        <h1 className="text-lg sm:text-2xl font-serif font-bold text-primary text-center sm:text-left leading-tight" style={{fontSize: 'clamp(1.1rem,4vw,2rem)'}}>
          {greeting}
        </h1>
        {/* Rotating Quote/Tip */}
        <div className="text-sm sm:text-base text-gray-600 italic min-h-[1.5rem]">{quotes[quoteIdx]}</div>
        {/* Actions */}
        <div className="flex w-full gap-2 mt-2 flex-wrap justify-center sm:justify-start">
          <Link to="/profile/view" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              View Profile
            </Button>
          </Link>
          {isIncomplete && (
            <Link to="/profile/edit" className="w-full sm:w-auto">
              <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                Complete Your Profile
              </Button>
            </Link>
          )}
          <Link to="/explore/artists" className="w-full sm:w-auto">
            <Button variant="default" size="sm" className="w-full sm:w-auto">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomerProfileCard;
