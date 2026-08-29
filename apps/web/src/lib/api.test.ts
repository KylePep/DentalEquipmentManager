import { afterEach, describe, expect, it, vi } from "vitest";
import { api } from "./api";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("api", () => {
  it("fetches the equipment list", async () => {
    const payload = [{ id: 1, name: "Autoclave 3000" }];
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(payload), { status: 200 }),
    );

    await expect(api.listEquipment()).resolves.toEqual(payload);
  });

  it("throws on a non-OK response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("nope", { status: 500 }));

    await expect(api.listEquipment()).rejects.toThrow(/API 500/);
  });
});
