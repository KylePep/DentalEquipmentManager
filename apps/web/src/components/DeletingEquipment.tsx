"use client"

import { deleteEquipmentAction } from "@/app/actions";
import { Equipment } from "@/lib/api";
import { useState } from "react";

interface DeleteEquipmentProps {
  equipment: Equipment;
  onDelete: () => void;
}

export function DeletingEquipment({ equipment, onDelete }: DeleteEquipmentProps) {
  const [pending, setPending] = useState(false);

  async function handleSubmit() {
    setPending(true);
    await deleteEquipmentAction(equipment.id);
    setPending(false);
    onDelete();
  }

  return (
    <div>
      <form action={handleSubmit}>
        <button
          type="submit"
          className="bg-red-800 text-white px-1 rounded text-xs hover:bg-red-950 hover:cursor-pointer duration-300 ease-in-out">
          {pending ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  )
}