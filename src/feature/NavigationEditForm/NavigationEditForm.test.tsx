import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "@/store/store";
import NavigationEditForm from "./index";
import { EDIT_ITEM, REMOVE_ITEM } from "@/store/slices/navigationSlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("NavigationEditForm Component", () => {
  let store: ReturnType<typeof createStore>;
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    store = createStore();
    jest.clearAllMocks();
  });

  const initialData = {
    id: "edit-1",
    label: "Edytowana pozycja",
    url: "/edytowana-pozycja",
    depth: 0,
  };

  it("renders the form with initial data", () => {
    render(
      <Provider store={store}>
        <NavigationEditForm
          initialData={initialData}
          handleClose={mockHandleClose}
        />
      </Provider>
    );

    const labelInput = screen.getByPlaceholderText("np. Promocje");
    const urlInput = screen.getByPlaceholderText("Wklej lub wyszukaj");

    expect(labelInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(labelInput).toHaveValue(initialData.label);
    expect(urlInput).toHaveValue(initialData.url);
  });

  it("calls handleClose on cancel", () => {
    const dispatchMock = jest.fn();
    (jest.requireMock("react-redux").useDispatch as jest.Mock).mockReturnValue(
      dispatchMock
    );

    render(
      <Provider store={store}>
        <NavigationEditForm
          initialData={initialData}
          handleClose={mockHandleClose}
        />
      </Provider>
    );

    const cancelButton = screen.getByText("Anuluj");
    fireEvent.click(cancelButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });
});
