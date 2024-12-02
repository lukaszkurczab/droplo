import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "@/store/store";
import NavigationItem from "./index";
import { REMOVE_ITEM } from "@/store/slices/navigationSlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("NavigationItem Component", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
    jest.clearAllMocks();
  });

  const mockItem = {
    id: "item-1",
    label: "Test Item",
    url: "/test-item",
    depth: 0,
    children: [],
  };

  it("renders the item with label", () => {
    render(
      <Provider store={store}>
        <NavigationItem item={mockItem} />
      </Provider>
    );

    const listItem = screen.getByText("Test Item");
    expect(listItem).toBeInTheDocument();
  });

  it("renders child items if they exist", () => {
    const itemWithChildren = {
      ...mockItem,
      children: [
        {
          id: "child-1",
          label: "Child Item",
          url: "/child-item",
          depth: 1,
          children: [],
        },
      ],
    };

    render(
      <Provider store={store}>
        <NavigationItem item={itemWithChildren} />
      </Provider>
    );

    const childItem = screen.getByText("Child Item");
    expect(childItem).toBeInTheDocument();
  });
});
