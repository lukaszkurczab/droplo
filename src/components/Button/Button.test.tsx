import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "./index";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("px-3.5 py-2.5 rounded-lg font-medium");
    expect(buttonElement).toHaveClass(
      "border border.border-primary text-text-text_secondary bg-background-bg_primary"
    );
  });

  it("renders with the 'contained' variant", () => {
    render(<Button variant="contained">Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "bg-buttons-button_primary text-text-text_primary_fg border border-buttons-button_primary hover:bg-buttons-button_secondary_fb active:bg-buttons-button_primary"
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
});
