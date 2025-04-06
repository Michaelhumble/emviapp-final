
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SalonFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  buttonLink: string;
  variant?: "default" | "highlighted";
  buttonVariant?: "default" | "custom";
  buttonColor?: string;
}

const SalonFeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  buttonText, 
  buttonLink,
  variant = "default",
  buttonVariant = "default",
  buttonColor = ""
}: SalonFeatureCardProps) => {
  // Determine card styling based on variant
  const isHighlighted = variant === "highlighted";
  const cardClassName = isHighlighted ? "border-green-200" : "";
  const headerClassName = isHighlighted ? "bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg" : "";

  // Determine button styling
  const buttonClassName = buttonVariant === "custom" && buttonColor 
    ? `w-full ${buttonColor}`
    : "w-full";

  return (
    <Card className={cardClassName}>
      <CardHeader className={headerClassName}>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-indigo-500" />
          {title}
        </CardTitle>
        <CardDescription className={isHighlighted ? "text-green-800" : ""}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <Button className={buttonClassName} asChild>
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SalonFeatureCard;
