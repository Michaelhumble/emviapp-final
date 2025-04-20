
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  children?: React.ReactNode;
}

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "primary",
  className,
  children,
}: DashboardCardProps) => {
  const variantStyles = {
    primary: "border-blue-100 hover:border-blue-200 bg-white hover:bg-blue-50/50",
    secondary: "border-amber-100 hover:border-amber-200 bg-white hover:bg-amber-50/50",
    outline: "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/50",
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        "transition-all duration-200 p-6",
        "cursor-pointer select-none",
        variantStyles[variant],
        className
      )}
    >
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="mt-0.5">
              <Icon className="h-5 w-5 text-blue-500" />
            </div>
          )}
          <div className="space-y-1 flex-1">
            <h3 className="font-medium text-base">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {children && <div className="pt-2">{children}</div>}
      </div>
    </Card>
  );
};

export default DashboardCard;
