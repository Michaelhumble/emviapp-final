
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ArtistProfileFormCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ArtistProfileFormCard = ({
  title,
  description,
  icon,
  children,
  className = "",
  delay = 0
}: ArtistProfileFormCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className={`overflow-hidden border-purple-100 shadow-sm ${className}`}>
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
          <div className="flex items-center">
            {icon && <div className="mr-2">{icon}</div>}
            <CardTitle>{title}</CardTitle>
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistProfileFormCard;
