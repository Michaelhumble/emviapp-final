
import { CheckCircle } from "lucide-react";

const EmviFeatures = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
      <p className="font-medium mb-1">Included with your post:</p>
      <ul className="space-y-1">
        <li className="flex items-center">
          <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
          <span>EmviSEO™ — Optimized for Google visibility</span>
        </li>
        <li className="flex items-center">
          <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
          <span>EmviAgent™ — Auto-reply when you're offline</span>
        </li>
        <li className="flex items-center">
          <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
          <span>EmviReminder™ — Expiration & view spike alerts</span>
        </li>
      </ul>
    </div>
  );
};

export default EmviFeatures;
