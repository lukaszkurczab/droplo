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

  it("does not render left icon when not provided", () => {
    render(<InputText value="" onChange={() => {}} placeholder="Enter text" />);
    const leftIcon = screen.queryByTestId("icon-left");
    expect(leftIcon).not.toBeInTheDocument();
  });

  it("does not render right icon when not provided", () => {
    render(<InputText value="" onChange={() => {}} placeholder="Enter text" />);
    const rightIcon = screen.queryByTestId("icon-right");
    expect(rightIcon).not.toBeInTheDocument();
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

  it("renders input as disabled when 'disabled' prop is true", () => {
    render(
      <InputText
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        disabled
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeDisabled();
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

  it("does not propagate pointer down events", () => {
    const handleParentPointerDown = jest.fn();
    render(
      <div onPointerDown={handleParentPointerDown}>
        <InputText value="" onChange={() => {}} placeholder="Enter text" />
      </div>
    );
    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.pointerDown(inputElement);
    expect(handleParentPointerDown).not.toHaveBeenCalled();
  });

  it("handles pointer down events without propagation", () => {
    const handlePointerDown = jest.fn((e) => e.stopPropagation());
    render(
      <InputText
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        onPointerDown={handlePointerDown}
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.pointerDown(inputElement);
    expect(handlePointerDown).toHaveBeenCalledTimes(1);
  });
});
