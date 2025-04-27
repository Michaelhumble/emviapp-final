
import React from "react";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
};

export default Loading;
