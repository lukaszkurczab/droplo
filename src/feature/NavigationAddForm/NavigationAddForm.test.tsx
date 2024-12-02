import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "@/store/store";
import NavigationAddForm from "./index";
import {
  ADD_ITEM,
  REMOVE_TEMP_ITEM,
  ADD_CHILD,
} from "@/store/slices/navigationSlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("NavigationAddForm Component", () => {
  let store: ReturnType<typeof createStore>;
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    store = createStore();
    jest.clearAllMocks();
  });

  const initialData = {
    id: "temp-1",
    label: "Nowa pozycja",
    url: "/nowa-pozycja",
    depth: 0,
  };

  it("renders the form with initial data", () => {
    render(
      <Provider store={store}>
        <NavigationAddForm initialData={initialData} />
      </Provider>
    );

    const labelInput = screen.getByPlaceholderText("np. Promocje");
    const urlInput = screen.getByPlaceholderText("Wklej lub wyszukaj");

    expect(labelInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(labelInput).toHaveValue(initialData.label);
    expect(urlInput).toHaveValue(initialData.url);
  });

  it("calls REMOVE_TEMP_ITEM and handleClose on cancel", () => {
    const dispatchMock = jest.fn();
    (jest.requireMock("react-redux").useDispatch as jest.Mock).mockReturnValue(
      dispatchMock
    );

    render(
      <Provider store={store}>
        <NavigationAddForm
          initialData={initialData}
          handleClose={mockHandleClose}
        />
      </Provider>
    );

    const cancelButton = screen.getByText("Anuluj");
    fireEvent.click(cancelButton);

    expect(dispatchMock).toHaveBeenCalledWith(REMOVE_TEMP_ITEM(initialData.id));
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("does not throw if handleClose is undefined", () => {
    const dispatchMock = jest.fn();
    (jest.requireMock("react-redux").useDispatch as jest.Mock).mockReturnValue(
      dispatchMock
    );

    render(
      <Provider store={store}>
        <NavigationAddForm initialData={initialData} />
      </Provider>
    );

    const cancelButton = screen.getByText("Anuluj");
    fireEvent.click(cancelButton);

    expect(dispatchMock).toHaveBeenCalledWith(REMOVE_TEMP_ITEM(initialData.id));
  });
});
