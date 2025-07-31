
import { useRouteAnalytics } from '@/hooks/useRouteAnalytics';

const RouteLogger = () => {
  // Use the new unified analytics system
  useRouteAnalytics();
  
  // This is a utility component that doesn't render anything
  return null;
};

export default RouteLogger;
