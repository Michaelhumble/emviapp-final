
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  const location = useLocation();
  const currentPath = encodeURIComponent(location.pathname + location.search);
  
  return (
    <>
      <Link to={`/sign-in?redirect=${currentPath}`}>
        <Button variant="ghost">Sign In</Button>
      </Link>
      <Link to={`/sign-up?redirect=${currentPath}`}>
        <Button>Sign Up</Button>
      </Link>
    </>
  );
};

export default AuthButtons;
