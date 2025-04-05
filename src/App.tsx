
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

// Import our components
import LanguagePreference from "@/components/common/LanguagePreference";
import RouteLogger from "@/components/common/RouteLogger";

const App = () => {
  return (
    <>
      <Outlet />
      <RouteLogger />
      <Toaster />
      <LanguagePreference />
    </>
  );
};

export default App;
