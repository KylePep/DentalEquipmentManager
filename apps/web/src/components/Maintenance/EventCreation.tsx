"use client"

import { useState } from "react";
import { Modal } from "../Layout/Modal";
import { Equipment } from "@/lib/api";
import { CreateEvent } from "./CreateEvent";

interface EventCreationProps {
  equipment: Equipment;
}

export function EventCreation({ equipment }: EventCreationProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-yellow-800 text-white py-0 px-1 rounded text-xs hover:bg-yellow-950 hover:cursor-pointer duration-300 ease-in-out">Create Maintenance Event</button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={`Create a Maintenance Event for ${equipment.name}`}
      >
        <CreateEvent equipmentId={equipment.id} />
      </Modal>
    </>
  )
}