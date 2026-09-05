'use server'

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createEquipmentAction(formData: FormData) {
  await api.createEquipment({
    name: String(formData.get("name")),
    manufacturer: (formData.get("manufacturer") as string | null) ?? null,
    serialNumber: null,
    purchaseDate: null,
    manufacturerDate: null,
    description: null,
  });
  revalidatePath("/"); // Revalidate the home page to show the new equipment
}

export async function updateEquipmentAction(equipmentId: number, formData: FormData){
  await api.updateEquipment(equipmentId, {
    name: String(formData.get("name")),
    manufacturer: (formData.get("manufacturer") as string | null) ?? null,
    serialNumber: (formData.get("serialNumber") as string | null) ?? null,
    purchaseDate: (formData.get("purchaseDate") as string | null) ?? null,
    manufacturerDate: (formData.get("manufacturerDate") as string | null) ?? null,
    description: (formData.get("description") as string | null) ?? null,
  });
  revalidatePath("/");
}

export async function deleteEquipmentAction (id: number){
  await api.deleteEquipment(id);
  revalidatePath("/");
}