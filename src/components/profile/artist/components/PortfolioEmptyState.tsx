
import { ImageIcon } from "lucide-react";
import { PortfolioEmptyStateProps } from "./types";

const PortfolioEmptyState = ({ isUploading }: PortfolioEmptyStateProps) => {
  if (isUploading) return null;
  
  return (
    <div className="text-center py-12 border border-dashed rounded-lg">
      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-1">No portfolio images yet</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Upload photos of your work to showcase your skills and attract more clients.
        Your images will appear here.
      </p>
    </div>
  );
};

export default PortfolioEmptyState;
