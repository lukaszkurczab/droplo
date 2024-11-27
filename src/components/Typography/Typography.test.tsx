import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Typography from "./index";

describe("Typography component", () => {
  it("renders the children correctly", () => {
    render(<Typography>Test content</Typography>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders with the default tag <p>", () => {
    render(<Typography>Default tag</Typography>);
    const element = screen.getByText("Default tag");
    expect(element.tagName).toBe("P");
  });

  it("renders with a custom tag", () => {
    render(<Typography as="h1">Custom tag</Typography>);
    const element = screen.getByText("Custom tag");
    expect(element.tagName).toBe("H1");
  });

  it("applies the default styles", () => {
    render(<Typography>Styled text</Typography>);
    const element = screen.getByText("Styled text");
    expect(element).toHaveClass("text.text_primary text-base font-medium");
  });

  it("applies additional custom classes", () => {
    render(<Typography className="custom-class">Custom class</Typography>);
    const element = screen.getByText("Custom class");
    expect(element).toHaveClass("custom-class");
  });

  it("combines default and custom styles", () => {
    render(
      <Typography className="text-lg font-bold">Combined styles</Typography>
    );
    const element = screen.getByText("Combined styles");
    expect(element).toHaveClass("text.text_primary text-base font-medium");
    expect(element).toHaveClass("text-lg font-bold");
  });
});
