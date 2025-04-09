
import { PortfolioInfoProps } from "./types";

const PortfolioInfo = ({ imageCount }: PortfolioInfoProps) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <div className="flex-1">
        <span className="font-medium">{imageCount}</span> of{" "}
        <span className="font-medium">12</span> images uploaded
      </div>
      <div className="text-right text-xs">
        Upload your best work to attract clients
      </div>
    </div>
  );
};

export default PortfolioInfo;
