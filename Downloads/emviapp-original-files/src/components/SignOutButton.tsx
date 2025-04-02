
// src/components/SignOutButton.tsx
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
