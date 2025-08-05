
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
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-slate-900">
        Welcome to EmviApp
      </h1>
      <p className="text-lg md:text-xl text-slate-600 mb-8 font-primary">
        {getWelcomeMessage(userRole)}
      </p>
    </div>
  );
};
