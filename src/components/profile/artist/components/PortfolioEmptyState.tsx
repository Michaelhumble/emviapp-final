
import { Image } from "lucide-react";
import { PortfolioEmptyStateProps } from "./types";

const PortfolioEmptyState = ({ isUploading }: PortfolioEmptyStateProps) => {
  if (isUploading) return null;
  
  return (
    <div className="text-center p-4 bg-muted/20 rounded-lg mt-2">
      <Image className="h-8 w-8 mx-auto text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">No portfolio images uploaded yet.</p>
      <p className="text-xs text-muted-foreground">Upload your best work to attract more clients.</p>
    </div>
  );
};

export default PortfolioEmptyState;
