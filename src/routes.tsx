
import Index from "./pages/Index";
import SignUp from "./pages/auth/SignUp";

const routes = [
  {
    path: "/",
    element: Index,
  },
  {
    path: "/sign-up", 
    element: SignUp,
  },
];

export default routes;
