import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./index";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("px-3.5 py-2.5 rounded-lg font-medium");
    expect(buttonElement).toHaveClass(
      "border border-border-primary bg-background-bg_primary"
    );
  });

  it("renders default children if no content is provided", () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button", { name: /button/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Button");
  });

  it("renders with the 'contained' variant", () => {
    render(<Button variant="contained">Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "bg-buttons-button_primary border border-buttons-button_primary hover:bg-buttons-button_secondary_fb active:bg-buttons-button_primary"
    );
  });

  it("renders with the 'text' variant", () => {
    render(<Button variant="text">Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "bg-transparent border-none hover:underline active:opacity-75"
    );
  });

  it("accepts additional className", () => {
    render(<Button className="extra-class">Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass("extra-class");
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles pointer down events without propagation", () => {
    const handlePointerDown = jest.fn();
    render(<Button onPointerDown={handlePointerDown}>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.pointerDown(buttonElement);
    expect(handlePointerDown).toHaveBeenCalledTimes(1);
  });

  it("renders children correctly", () => {
    render(<Button>Submit</Button>);
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Submit");
  });

  it("applies additional props", () => {
    render(<Button type="submit">Submit</Button>);
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  it("applies combined styles when multiple props are used", () => {
    render(
      <Button variant="contained" className="extra-class">
        Combined
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /combined/i });
    expect(buttonElement).toHaveClass(
      "bg-buttons-button_primary border border-buttons-button_primary extra-class"
    );
  });

  it("does not propagate pointer down events", () => {
    const handleParentPointerDown = jest.fn();
    render(
      <div onPointerDown={handleParentPointerDown}>
        <Button>Click Me</Button>
      </div>
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.pointerDown(buttonElement);
    expect(handleParentPointerDown).not.toHaveBeenCalled();
  });
});
