import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";

export const createStore = () =>
  configureStore({
    reducer: {
      navigation: navigationReducer,
    },
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
