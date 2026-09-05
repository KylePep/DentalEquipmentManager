import { describe, expect, it } from "vitest";
import { Footer } from "../Layout/Footer";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
  it("renders a contentinfo landmark with the current year", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}`))
    ).toBeInTheDocument();
  });
});