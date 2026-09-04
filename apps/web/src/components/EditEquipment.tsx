"use client"

import { useState } from "react";
import { Equipment } from "@/lib/api";
import { updateEquipmentAction } from "@/app/actions";

interface EditEquipmentProps {
  equipment: Equipment;
  onSaved: () => void;
}

export function EditEquipment({ equipment, onSaved }: EditEquipmentProps) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    await updateEquipmentAction(equipment.id, formData);
    setPending(false);
    onSaved();
  }
  return (
    <form action={handleSubmit} className="flex flex-col gap-4 p-4 bg-stone-800 rounded max-w-xl">
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={120}
          defaultValue={equipment.name}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input
          id="manufacturer"
          name="manufacturer"
          type="text"
          maxLength={120}
          defaultValue={equipment.manufacturer ?? ""}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="manufacturer">Serial Number:</label>
        <input
          id="serialNumber"
          name="serialNumber"
          type="text"
          maxLength={120}
          defaultValue={equipment.serialNumber ?? ""}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="manufacturer">Purchase Date:</label>
        <input
          id="purchaseDate"
          name="purchaseDate"
          type="date"
          maxLength={120}
          defaultValue={equipment.purchaseDate ?? ""}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="font-bold bg-blue-800 rounded p-2 hover:bg-blue-900 duration-300 ease-in-out">
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}