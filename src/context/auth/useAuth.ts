
import { useContext } from "react";
import { AuthContext } from "./context";
import { AuthContextType } from "./types";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a ReliableAuthProvider");
  }
  return context;
};
