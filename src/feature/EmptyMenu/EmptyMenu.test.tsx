import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyMenu from "./index";

describe("EmptyMenu component", () => {
  it("renders the heading with correct text", () => {
    render(<EmptyMenu />);
    const heading = screen.getByRole("heading", { name: "Menu jest puste" });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("renders the subheading with correct text", () => {
    render(<EmptyMenu />);
    const subheading = screen.getByRole("heading", {
      name: "W tym menu nie ma jeszcze żadnych linków.",
    });
    expect(subheading).toBeInTheDocument();
    expect(subheading.tagName).toBe("H2");
  });

  it("renders the button with an image and text", () => {
    render(<EmptyMenu />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const image = screen.getByAltText("Add");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/add.svg");

    const buttonText = screen.getByText("Dodaj pozycję menu");
    expect(buttonText).toBeInTheDocument();
  });
});
