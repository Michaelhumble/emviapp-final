
import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <p className="text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;
