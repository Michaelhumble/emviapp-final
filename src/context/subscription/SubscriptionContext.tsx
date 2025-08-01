
import { createContext } from "react";
import { SubscriptionContextType } from "./types";

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);
