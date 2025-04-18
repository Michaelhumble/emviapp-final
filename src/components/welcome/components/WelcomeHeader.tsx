
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/context/auth/types";
import { getRoleDisplayName, getWelcomeMessage } from "../utils/roleUtils";

interface WelcomeHeaderProps {
  userRole: UserRole;
}

export const WelcomeHeader = ({ userRole }: WelcomeHeaderProps) => {
  return (
    <div className="mb-6">
      <Badge className="px-4 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/30 mb-4">
        {getRoleDisplayName(userRole)}
      </Badge>
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
        Welcome to EmviApp
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        {getWelcomeMessage(userRole)}
      </p>
    </div>
  );
};
