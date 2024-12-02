import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import ListItem from "./index";
import { INavigationItem } from "@/types/types";

const mockStore = configureStore();
const store = mockStore({});

const mockItem: INavigationItem = {
  id: "1",
  label: "Home",
  url: "/home",
  depth: 1,
};

const mockOnDelete = jest.fn();
const mockOnEdit = jest.fn();
const mockOnAdd = jest.fn();
const mockOnCloseEdit = jest.fn();

describe("ListItem Component", () => {
  it("renders item label and url", () => {
    render(
      <ListItem
        item={mockItem}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onAdd={mockOnAdd}
        onCloseEdit={mockOnCloseEdit}
      />
    );

    expect(screen.getByText(mockItem.label)).toBeInTheDocument();
    expect(screen.getByText(mockItem.url)).toBeInTheDocument();
  });

  it("renders buttons with correct labels", () => {
    render(
      <ListItem
        item={mockItem}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onAdd={mockOnAdd}
        onCloseEdit={mockOnCloseEdit}
      />
    );

    expect(screen.getByRole("button", { name: /usuń/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edytuj/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /dodaj pozycję menu/i })
    ).toBeInTheDocument();
  });

  it("calls onDelete when 'Usuń' button is clicked", () => {
    render(
      <ListItem
        item={mockItem}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onAdd={mockOnAdd}
        onCloseEdit={mockOnCloseEdit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /usuń/i }));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("calls onEdit when 'Edytuj' button is clicked", () => {
    render(
      <ListItem
        item={mockItem}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onAdd={mockOnAdd}
        onCloseEdit={mockOnCloseEdit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edytuj/i }));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onAdd when 'Dodaj pozycję menu' button is clicked", () => {
    render(
      <ListItem
        item={mockItem}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onAdd={mockOnAdd}
        onCloseEdit={mockOnCloseEdit}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /dodaj pozycję menu/i })
    );
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it("calls onCloseEdit when edit form is closed", () => {
    render(
      <Provider store={store}>
        <ListItem
          item={mockItem}
          editable={true}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
          onAdd={mockOnAdd}
          onCloseEdit={mockOnCloseEdit}
        />
      </Provider>
    );

    const closeButton = screen.getByAltText(/cancel/i);
    fireEvent.click(closeButton);

    expect(mockOnCloseEdit).toHaveBeenCalledTimes(1);
  });

  it("renders children when provided", () => {
    render(
      <ListItem
        item={mockItem}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onAdd={mockOnAdd}
        onCloseEdit={mockOnCloseEdit}
      >
        <div data-testid="child">Child Content</div>
      </ListItem>
    );

    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Child Content");
  });

  it("applies correct margin based on item depth", () => {
    render(
      <Provider store={store}>
        <ListItem
          item={mockItem}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
          onAdd={mockOnAdd}
          onCloseEdit={mockOnCloseEdit}
        />
      </Provider>
    );

    const container = screen
      .getByText(mockItem.label)
      .closest(".bg-background-bg_secondary");
    expect(container).toHaveStyle(`margin-left: ${mockItem.depth * 64}px`);
  });
});
