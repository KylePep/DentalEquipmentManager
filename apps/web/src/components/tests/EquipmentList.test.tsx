import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EquipmentList } from "../Equipment/EquipmentList";
import type { Equipment } from "@/lib/api";

function makeEquipment(overrides: Partial<Equipment> = {}): Equipment {
  return {
    id: 1,
    name: "Autoclave 3000",
    manufacturer: "SteriCo",
    serialNumber: null,
    purchaseDate: null,
    createdAt: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("EquipmentList", () => {
  it("shows an empty-state message when there is no equipment", () => {
    render(<EquipmentList equipment={[]} />);
    expect(screen.getByText(/no equipment yet/i)).toBeInTheDocument();
  });

  it("renders each item with its manufacturer", () => {
    render(<EquipmentList equipment={[makeEquipment(), makeEquipment({ id: 2, name: "X-Ray Unit", manufacturer: null })]} />);

    expect(screen.getByText(/Autoclave 3000 — SteriCo/)).toBeInTheDocument();
    expect(screen.getByText("X-Ray Unit")).toBeInTheDocument();
  });
});
