import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputText from "./index";

describe("InputText component", () => {
  it("renders input with placeholder", () => {
    render(<InputText value="" onChange={() => {}} placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders left icon when provided", () => {
    render(
      <InputText
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        iconLeft={<span data-testid="icon-left">Left Icon</span>}
      />
    );
    const leftIcon = screen.getByTestId("icon-left");
    expect(leftIcon).toBeInTheDocument();
  });

  it("renders right icon when provided", () => {
    render(
      <InputText
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        iconRight={<span data-testid="icon-right">Right Icon</span>}
      />
    );
    const rightIcon = screen.getByTestId("icon-right");
    expect(rightIcon).toBeInTheDocument();
  });

  it("displays error styles when errorMessage is provided", () => {
    render(
      <InputText
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        errorMessage="Error message"
      />
    );
    const container = screen.getByText("Error message").parentElement;
    expect(container).toHaveClass("border-red-500");
  });

  it("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <InputText value="" onChange={handleChange} placeholder="Enter text" />
    );
    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "New value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders with default and additional custom styles", () => {
    render(
      <InputText
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        className="custom-class"
      />
    );
    const container = screen.getByPlaceholderText("Enter text").parentElement;
    expect(container).toHaveClass(
      "flex border rounded-md overflow-hidden px-3.5 py-2 items-center gap-2 mt-1.5"
    );
    expect(container).toHaveClass("custom-class");
  });

  it("renders input with the provided value", () => {
    render(<InputText value="Test value" onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue("Test value");
    expect(inputElement).toBeInTheDocument();
  });
});
