
import { Loader2 } from 'lucide-react';

interface SimpleLoadingFallbackProps {
  message?: string;
}

const SimpleLoadingFallback = ({ message = "Loading..." }: SimpleLoadingFallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[120px]">
      <Loader2 className="h-5 w-5 text-primary animate-spin mb-2" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default SimpleLoadingFallback;
