"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  navigationReducer,
  initialState,
  NavigationState,
  NavigationAction,
} from "./navigationReducer";

interface NavigationContextType {
  state: NavigationState;
  dispatch: React.Dispatch<NavigationAction>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  return (
    <NavigationContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
