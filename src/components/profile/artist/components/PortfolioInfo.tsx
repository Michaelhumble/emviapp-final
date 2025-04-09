
import { AlertCircle } from "lucide-react";
import { PortfolioInfoProps } from "./types";

const PortfolioInfo = ({ imageCount, children }: PortfolioInfoProps) => {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>
        {imageCount} of 12 images
      </span>
      <span className="flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        Max 5MB per image
      </span>
      {children}
    </div>
  );
};

export default PortfolioInfo;
