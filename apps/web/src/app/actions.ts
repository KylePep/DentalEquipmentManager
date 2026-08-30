'use server'

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createEquipmentAction(formData: FormData) {
  await api.createEquipment({
    name: String(formData.get("name")),
    manufacturer: (formData.get("manufacturer") as string | null) ?? null,
    serialNumber: null,
    purchaseDate: null,
  });
  revalidatePath("/"); // Revalidate the home page to show the new equipment
}