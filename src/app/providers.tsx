import { ReactNode } from "react";
import { NavigationProvider } from "@/context/navigationContext/navigationContext";

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <NavigationProvider>{children}</NavigationProvider>;
};
