import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "../Layout/Header";

describe("Header", () => {
  it("renders a banner landmark with the application title", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Dental Equipment Manager/i })
    ).toBeInTheDocument();
  });

  it("renders a link to the home page", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /Home/i })).toHaveAttribute("href", "/");
  });
});