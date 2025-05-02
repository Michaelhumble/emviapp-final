
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "artist" | "salon" | "customer" | "default" | "premium";
}

export function GradientBackground({
  children,
  className,
  variant = "default",
}: GradientBackgroundProps) {
  const gradientStyles = {
    artist: "bg-gradient-to-br from-purple-50 to-pink-50",
    salon: "bg-gradient-to-br from-blue-50 to-indigo-50",
    customer: "bg-gradient-to-br from-rose-50 to-pink-50",
    default: "bg-gradient-to-br from-gray-50 to-slate-50",
    premium: "bg-gradient-to-br from-purple-50 via-white to-indigo-50",
  };

  return (
    <div className={cn(gradientStyles[variant], "rounded-xl backdrop-blur-sm", className)}>
      {children}
    </div>
  );
}
