import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import Form from "./index";
import { INavigationItem } from "@/types/types";

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();
const mockOnDelete = jest.fn();

const initialData: INavigationItem = {
  id: "1",
  label: "Example",
  url: "https://example.com",
  depth: 0,
};

describe("Form component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with initial values", () => {
    render(
      <Form
        initialData={initialData}
        submitText="Zapisz"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const labelInput = screen.getByPlaceholderText("np. Promocje");
    const urlInput = screen.getByPlaceholderText("Wklej lub wyszukaj");

    expect(labelInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();

    expect(labelInput).toHaveValue(initialData.label);
    expect(urlInput).toHaveValue(initialData.url);

    const submitButton = screen.getByText("Zapisz");
    expect(submitButton).toBeInTheDocument();
  });

  it("calls onSubmit with form data on submit", async () => {
    render(
      <Form
        initialData={initialData}
        submitText="Zapisz"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const labelInput = screen.getByPlaceholderText("np. Promocje");
    const urlInput = screen.getByPlaceholderText("Wklej lub wyszukaj");
    const submitButton = screen.getByText("Zapisz");

    await act(async () => {
      fireEvent.change(labelInput, { target: { value: "Nowa nazwa" } });
      fireEvent.change(urlInput, {
        target: { value: "https://nowy-link.com" },
      });
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: initialData.id,
      label: "Nowa nazwa",
      url: "https://nowy-link.com",
      depth: initialData.depth,
    });
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("displays validation errors when fields are empty", async () => {
    render(
      <Form
        initialData={{
          id: "1",
          label: "",
          url: "",
          depth: 0,
        }}
        submitText="Zapisz"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const submitButton = screen.getByText("Zapisz");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const errorMessages = screen.getAllByText((content, element) => {
      return (
        element?.tagName === "SPAN" &&
        content === "To pole jest wymagane" &&
        element.className.includes("text-red-500")
      );
    });

    expect(errorMessages).toHaveLength(2);
  });

  it("calls onCancel when the cancel button is clicked", () => {
    render(
      <Form
        initialData={initialData}
        submitText="Zapisz"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const cancelButton = screen.getByText("Anuluj");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when the delete button is clicked", () => {
    render(
      <Form
        initialData={initialData}
        submitText="Zapisz"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByTestId("close-edit");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
