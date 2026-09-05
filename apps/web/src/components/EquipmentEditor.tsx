"use client"

import { useState } from "react";
import { Modal } from "./Modal";
import { EditEquipment } from "./EditEquipment";
import { Equipment } from "@/lib/api";

interface EquipmentEditorProps {
  equipment: Equipment;
}

export function EquipmentEditor({ equipment }: EquipmentEditorProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-yellow-800 text-white py-0 px-1 rounded text-xs hover:bg-yellow-950 hover:cursor-pointer duration-300 ease-in-out"
      >
        Edit {equipment.name}
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Create Equipment">
        <EditEquipment equipment={equipment} onSaved={() => setOpen(false)} />
      </Modal>
    </>
  )
}