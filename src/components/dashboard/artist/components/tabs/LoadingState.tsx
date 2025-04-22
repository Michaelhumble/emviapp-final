
import { Loader } from "lucide-react";

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState = ({ message = "Loading...", className = "" }: LoadingStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <Loader className="h-8 w-8 animate-spin text-purple-600 mb-4" />
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  );
};

export default LoadingState;
