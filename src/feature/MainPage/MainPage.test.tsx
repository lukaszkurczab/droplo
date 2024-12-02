import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore, AppStore } from "@/store/store";
import MainPage from "./index";
import { ADD_TEMP_ITEM, ADD_ITEM } from "@/store/slices/navigationSlice";

describe("MainPage Component Tests", () => {
  let store: AppStore;

  beforeEach(() => {
    store = createStore();
  });

  it("renders EmptyMenu when no navigationItems and no tempItems", () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const emptyMenuMessage = screen.getByRole("heading", {
      name: /menu jest puste/i,
    });

    expect(emptyMenuMessage).toBeInTheDocument();
  });

  it("renders NavigationAddForm when there are tempItems but no navigationItems", () => {
    store.dispatch(ADD_TEMP_ITEM());

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const inputField = screen.getByPlaceholderText("np. Promocje");
    expect(inputField).toBeInTheDocument();
  });

  it("renders NavigationList when there are navigationItems", () => {
    store.dispatch(
      ADD_ITEM({
        id: "1",
        label: "Strona główna",
        url: "/",
        depth: 0,
        children: [],
      })
    );

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const listItem = screen.getByText("Strona główna");
    expect(listItem).toBeInTheDocument();
  });

  it("adds a tempItem when the 'Dodaj pozycję menu' button is clicked", () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const addButton = screen.getByText("Dodaj pozycję menu");
    fireEvent.click(addButton);

    const state = store.getState();
    expect(state.navigation.tempItems).toHaveLength(1);
    expect(state.navigation.tempItems[0]).toMatchObject({
      label: "",
      url: "",
      depth: 0,
    });
  });
});
