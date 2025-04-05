
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <>
      <Link to="/sign-in">
        <Button variant="ghost">Sign In</Button>
      </Link>
      <Link to="/sign-up">
        <Button>Sign Up</Button>
      </Link>
    </>
  );
};

export default AuthButtons;
