import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore, AppStore } from "@/store/store";
import EmptyMenu from "./index";

describe("EmptyMenu component", () => {
  let store: AppStore;

  beforeEach(() => {
    store = createStore();
  });

  it("renders the heading with correct text", () => {
    render(
      <Provider store={store}>
        <EmptyMenu />
      </Provider>
    );

    const heading = screen.getByRole("heading", { name: "Menu jest puste" });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("renders the subheading with correct text", () => {
    render(
      <Provider store={store}>
        <EmptyMenu />
      </Provider>
    );

    const subheading = screen.getByRole("heading", {
      name: "W tym menu nie ma jeszcze żadnych linków.",
    });
    expect(subheading).toBeInTheDocument();
    expect(subheading.tagName).toBe("H2");
  });

  it("renders the button with an image and text", () => {
    render(
      <Provider store={store}>
        <EmptyMenu />
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const image = screen.getByAltText("Add");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/add.svg");

    const buttonText = screen.getByText("Dodaj pozycję menu");
    expect(buttonText).toBeInTheDocument();
  });

  it("dispatches ADD_TEMP_ITEM action when button is clicked", () => {
    render(
      <Provider store={store}>
        <EmptyMenu />
      </Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const state = store.getState();
    expect(state.navigation.tempItems).toHaveLength(1);
    expect(state.navigation.tempItems[0]).toMatchObject({
      label: "",
      url: "",
      depth: 0,
    });
  });

  it("ensures the button has correct accessibility attributes", () => {
    render(
      <Provider store={store}>
        <EmptyMenu />
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });
});
