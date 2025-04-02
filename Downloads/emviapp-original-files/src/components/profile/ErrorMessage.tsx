
import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center space-x-2 animate-fade-in">
      <AlertTriangle size={20} className="text-red-400" />
      <span>{error}</span>
    </div>
  );
};

export default ErrorMessage;
