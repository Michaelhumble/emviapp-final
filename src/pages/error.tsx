
import { useRouteError } from "react-router-dom";
import NotFound from "./NotFound";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Fallback to the NotFound page for all errors
  return <NotFound />;
}
