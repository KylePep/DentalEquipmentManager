import { beforeEach, describe, expect, it, vi } from "vitest";
import { createEquipmentAction } from "../actions"
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";

vi.mock("@/lib/api", () => ({
  api: {
    createEquipment: vi.fn(),
  },
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

function formDataOf(entries: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.append(key, value);
  }
  return formData;
}

describe("createEquipmentAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maps form fields to the API payload and calls the API", async () => {
    await createEquipmentAction(formDataOf({ name: "X-Ray Unit", manufacturer: "RayCo" }));

    expect(api.createEquipment).toHaveBeenCalledWith({
      name: "X-Ray Unit",
      manufacturer: "RayCo",
      serialNumber: null,
      purchaseDate: null,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/");
  });

  it("sends null manufacturer when the field is empty", async () => {
    await createEquipmentAction(formDataOf({ name: "compressor" }));
    expect(api.createEquipment).toHaveBeenCalledWith(
      expect.objectContaining({ manufacturer: null }),
    );
  });
});