"use client";

import React from "react";
import EmptyMenu from "@/feature/EmptyMenu";
import NavigationList from "@/feature/NavigationList";
import Button from "@/components/Button";
import { useNavigation } from "@/context/navigationContext/navigationContext";

const Home: React.FC = () => {
  const { state } = useNavigation();

  return (
    <div className="m-5 border border-border-border_primary rounded-md overflow-hidden">
      {state.navigationItems.length ? (
        <>
          <NavigationList items={state.navigationItems} />
          <div className="px-6 py-5 bg-background-bg_tertiary">
            <Button>Dodaj pozycję menu</Button>
          </div>
        </>
      ) : (
        <EmptyMenu />
      )}
    </div>
  );
};

export default Home;
