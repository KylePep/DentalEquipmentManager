import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateEquipment } from "../CreateEquipment";
import { createEquipmentAction } from "@/app/actions";

vi.mock("@/app/actions", () => ({
  createEquipmentAction: vi.fn(),
}));

const actionMock = vi.mocked(createEquipmentAction);

describe("CreateEquipment", () => {
  beforeEach(() => {
    actionMock.mockReset();
  });

  it("renders name and manufacturer fields", () => {
    render(<CreateEquipment />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/manufacturer/i)).toBeInTheDocument();
  });

  it("submits the entered values to create action", async () => {
    const user = userEvent.setup();
    render(<CreateEquipment />);

    await user.type(screen.getByLabelText(/name/i), "Autoclave 3000");
    await user.type(screen.getByLabelText(/manufacturer/i), "SteriCo");
    await user.click(screen.getByRole("button", { name: /create equipment/i }));

    expect(actionMock).toHaveBeenCalledTimes(1);
    const formData = actionMock.mock.calls[0][0] as FormData;
    expect(formData.get("name")).toBe("Autoclave 3000");
    expect(formData.get("manufacturer")).toBe("SteriCo");
  });
});