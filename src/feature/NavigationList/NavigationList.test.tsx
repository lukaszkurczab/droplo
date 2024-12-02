import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "@/store/store";
import NavigationList from "./index";
import { REORDER_ITEMS } from "@/store/slices/navigationSlice";
import { DndContext } from "@dnd-kit/core";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("NavigationList Component", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
    jest.clearAllMocks();
  });

  const mockItems = [
    { id: "item-1", label: "Item 1", url: "/item-1", depth: 0, children: [] },
    { id: "item-2", label: "Item 2", url: "/item-2", depth: 0, children: [] },
  ];

  it("renders the list of items", () => {
    render(
      <Provider store={store}>
        <NavigationList items={mockItems} />
      </Provider>
    );

    const firstItem = screen.getByText("Item 1");
    const secondItem = screen.getByText("Item 2");

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });

  it("renders children passed to the component", () => {
    render(
      <Provider store={store}>
        <NavigationList items={mockItems}>
          <div>Additional Content</div>
        </NavigationList>
      </Provider>
    );

    const additionalContent = screen.getByText("Additional Content");
    expect(additionalContent).toBeInTheDocument();
  });

  it("does not call REORDER_ITEMS if items are undefined", () => {
    const dispatchMock = jest.fn();
    (jest.requireMock("react-redux").useDispatch as jest.Mock).mockReturnValue(
      dispatchMock
    );

    render(
      <Provider store={store}>
        <NavigationList items={undefined} />
      </Provider>
    );

    // Simulate drag end event
    const dragEndEvent = {
      active: { id: "item-1" },
      over: { id: "item-2" },
    };
    fireEvent.dragEnd(document.body, dragEndEvent);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("does not call REORDER_ITEMS if active.id equals over.id", () => {
    const dispatchMock = jest.fn();
    (jest.requireMock("react-redux").useDispatch as jest.Mock).mockReturnValue(
      dispatchMock
    );

    render(
      <Provider store={store}>
        <NavigationList items={mockItems} />
      </Provider>
    );

    const dragEndEvent = {
      active: { id: "item-1" },
      over: { id: "item-1" },
    };
    fireEvent.dragEnd(screen.getByText("Item 1"), dragEndEvent);

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
