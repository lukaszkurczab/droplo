"use client";

import React from "react";
import { Provider } from "react-redux";
import { createStore } from "@/store/store";
import MainPage from "@/feature/MainPage";

const store = createStore();

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export default Home;
