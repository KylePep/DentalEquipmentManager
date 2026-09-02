"use client"

import { useState } from "react";
import { Modal } from "./Modal";
import { CreateEquipment } from "./CreateEquipment";

export function EquipmentCreation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-bold bg-blue-800 rounded px-4 py-1 hover:bg-blue-900 duration-300"
      >
        Create Equipment
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Create Equipment">
        <CreateEquipment />
      </Modal>
    </>
  )
}